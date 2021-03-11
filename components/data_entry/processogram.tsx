import DataEntryContext, { ICommonDataEntry, IDataEntryContext, IDataEntryFormInformations } from '@/context/data-entry'
import { FieldReferenceTypes, SpeciesTypes, TabTypes } from '@/utils/enum_types'
import { useEffect, useRef, useState } from 'react'
import ProductionSystemSelector from '../processograms/production-system-selector'
import { Container,FormSpace,ProcessogramSpace,Title,SubTitle,NoProductionSystemSelected } from './processogram-styled'
import voca from 'voca'
import DataEntryForm from './form/data-entry-form'
import update from 'immutability-helper'
import processogramApi from '@/api/processogram'
import { needSetInformations } from '@/utils/processogram'

interface IProcessogramDataEntry {
    specie:SpeciesTypes
}

const ProcessogramDataEntry = ({specie}:IProcessogramDataEntry) => {

    const containerRef = useRef<HTMLElement>(null)

    const [loaded,setLoaded] = useState(false)
    
    const [currentInformations,setCurrentInformations] = useState<IDataEntryFormInformations>(null)

    const [currentFieldReference,setCurrentFieldReference] = useState<FieldReferenceTypes>(null)

    const [idTree,setIdTree] = useState<any>(null)

    const [processograms,setProcessograms] = useState<any[]>([])

    const [tab,setTab] = useState<TabTypes>('description')

    const [modificationsCount,setModificationsCount] = useState(0)

    const [onFetch,setOnFetch] = useState(false)

    const timer = useRef(null)

    useEffect(()=>{
        if(!idTree){
            processogramApi.all()
        .then(({data})=>{
            setProcessograms(data)
        })
        }
    },[idTree])

    useEffect(()=>{
        if(containerRef.current){
            setLoaded(true)            
        }
    },[containerRef.current])

    const refreshProcessograms = (_id,updated_processogram) => {        
        let indexOf = processograms.findIndex(x => x._id === _id)
         
        if(indexOf>=0){
            setProcessograms(update(processograms,{                
                [indexOf]:{$merge:updated_processogram}
            }))
        }
    }

    const updateReferenceData = (value : any,callback=null) => {
        let reference : ICommonDataEntry = currentInformations[currentFieldReference]  
        processogramApi.updateReference(currentFieldReference,reference._id,value).then(({data}) => {                   
            updateCurrentInformations({
                [currentFieldReference]:data
            },false)
            if(callback){
                callback()
            }
        }) 
    }

    const updateReferenceDataWithDelay = (value : any,callback=null) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            let reference : ICommonDataEntry = currentInformations[currentFieldReference]  
            processogramApi.updateReference(currentFieldReference,reference._id,value).then(() => {                               
                refreshProcessogram()
            }) 
        }, 500);          
    }

    const handleReferenceInputChange = (value:any) => {
        setCurrentInformations(update(currentInformations,{
            [currentFieldReference]:{$merge:value}
        }))
        updateReferenceDataWithDelay(value)
    }

    const handleLocalInputChange = (value:any,withDelay=true) => {
        setCurrentInformations(update(currentInformations,{
            $merge:value
        }))
        if(withDelay){
            updateProcessogramWithDelay(value)
        }else{
            updateProcessogram(value)
        }
        
    }

    const updateProcessogramWithDelay = (value:any) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(()=>{
            processogramApi.update({
                id_tree:{...idTree,_id:undefined},
                values:value,
            },idTree._id)
            .then(({data}) => {
                refreshProcessograms(idTree._id,data)
            })
        },500)
    }

    const updateProcessogram = (value:any) => {
        processogramApi.update({
            id_tree:{...idTree,_id:undefined},
            values:value,
        },idTree._id)
        .then(({data}) => {
            refreshProcessograms(idTree._id,data)
        }) 
    } 

    const refreshProcessogramWithDelay = () => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            processogramApi.getOne(idTree._id)
            .then(({data}) => {                            
                refreshProcessograms(idTree._id,data)
            }) 
        }, 500);            
    }
    
    const refreshProcessogram = () => {
        if(idTree._id){          
            processogramApi.getOne(idTree._id)
            .then(({data}) => {            
                refreshProcessograms(idTree._id,data)
            })  
        }
    }

    const updateCurrentInformations = (updateValue,withDelay) => {
        setCurrentInformations(
            update(currentInformations,{
                $merge:updateValue
            })
        )                      
        if(withDelay){ 
            refreshProcessogramWithDelay()
        }else{
            refreshProcessogram()
        }
    }
    
    const contextValues : IDataEntryContext = {
        currentInformations,
        currentFieldReference,
        tab,
        setTab,
        updateReferenceData,
        updateCurrentInformations,
        handleReferenceInputChange,
        onFetch,
        setOnFetch,
        handleLocalInputChange,
        idTree
    }

    const onChange = (currentInformations,id_tree,svg_id) => {           
        setIdTree(id_tree)
        setCurrentInformations(currentInformations)        
        if(svg_id){
            let { field } = needSetInformations(svg_id)
            setCurrentFieldReference(field)
        }else{
            setCurrentFieldReference(null)
        }
        if(!currentInformations && id_tree){            
            setOnFetch(true)
            needToCreateNew(id_tree,svg_id)
        }
    }

    const needToCreateNew = (id_tree,svg_id) => {     
        let needed_informations = needSetInformations(svg_id)
        if(Object.keys(id_tree).length > 0){            
            createNewLayer(needed_informations,id_tree)
        }else{
            createNewProcessogram(needed_informations)
        }
    }


    const createNewProcessogram = (needed_informations:ReturnType<typeof needSetInformations>) => {

        let {name,field} = needed_informations

        const searchReferenceData = () => {
            return processogramApi.getOneReference(field,{
                name:name,
                specie:specie
            })
        }

        const createProcessogram = ({data}) => {
            return processogramApi.create({
                productionSystem:data._id,
                specie
            })
        }

        searchReferenceData()
        .then(createProcessogram)
        .then(({data}) => {  
            setOnFetch(false)
            setProcessograms(update(processograms,{
                $push:[data]
            }))            
            setCurrentInformations(data)
        })
    }

    const createNewLayer = (needed_informations:ReturnType<typeof needSetInformations>,id_tree) => {        

        let {name,field,collectionName} = needed_informations

        const searchReferenceData = () => {
            return processogramApi.getOneReference(field,{
                name:name,
                specie:specie
            })
        }

        const createLayer = ({data}) => {
            return processogramApi.newLayer({
                id_tree:{...id_tree,_id:undefined},
                object:{[field]:data._id},
                pushTo:collectionName
            },id_tree._id)
        }

        searchReferenceData()
        .then(createLayer)
        .then(({data}) => {    
            setOnFetch(false)        
            refreshProcessograms(id_tree._id,data)
            setModificationsCount(modificationsCount+1)
        })
    }

    return (
        <DataEntryContext.Provider value={contextValues}>
            <Container>            
                <ProcessogramSpace ref={containerRef}>
                {
                    loaded &&
                    <ProductionSystemSelector 
                        specie={specie}
                        parent={containerRef.current}
                        onChange={onChange}
                        processograms={processograms}                        
                        setTarget={setCurrentInformations}
                        triggerToSetFetchData={modificationsCount}
                    />
                }
                </ProcessogramSpace>
                <FormSpace onClick={(e:Event)=>e.stopPropagation()}>
                    {
                        currentInformations || onFetch?
                        (
                            <DataEntryForm />
                        )
                        :
                        (
                            <NoProductionSystemSelected>
                                <Title>{voca.capitalize(specie)}</Title>
                                <SubTitle>
                                    Choose a Production System To Begin
                                </SubTitle>
                            </NoProductionSystemSelected>
                        )
                    }
                </FormSpace>
            </Container>
        </DataEntryContext.Provider>
    )
}




export default ProcessogramDataEntry