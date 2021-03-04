import DataEntryContext, { IDataEntryContext, IDataEntryFormInformations } from '@/context/data-entry'
import { SpeciesTypes } from '@/utils/enum_types'
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

    const [currentFieldReference,setCurrentFieldReference] = useState<string>(null)

    const [idTree,setIdTree] = useState<any>(null)

    const [processograms,setProcessograms] = useState<any[]>([])

    const timer = useRef(null)

    useEffect(()=>{
        processogramApi.all()
        .then(({data})=>{
            setProcessograms(data)
        })
    },[])

    useEffect(()=>{
        if(containerRef.current){
            setLoaded(true)            
        }
    },[containerRef.current])

    const refreshProcessograms = (_id,new_processogram) => {
        let indexOf = processograms.findIndex(x => x._id === _id)
         
        if(indexOf>=0){
            setProcessograms(update(processograms,{                
                [indexOf]:{$merge:new_processogram}
            }))
        }
    }

    const updateProcessogram = (values) => {
        // clearTimeout(timer.current)
        // timer.current = setTimeout(() => {
        //     processogramApi.update({
        //         id_tree:{...idTree,_id:undefined},
        //         values:values
        //     },
        //     idTree._id)
        //     .then(({data}) => {
        //         refreshProcessograms(idTree._id,data)
        //     })
        // }, 500);                
    }

    const updateCurrentInformations = (updateValue) => {
        setCurrentInformations(
            update(currentInformations,{
                $merge:updateValue
            })
        )
        updateProcessogram(updateValue)
    }
    
    const contextValues : IDataEntryContext = {currentInformations,currentFieldReference,updateCurrentInformations}

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
            refreshProcessograms(id_tree._id,data)
        })
    }

    return (
        <DataEntryContext.Provider value={contextValues}>
            <Container>            
                <ProcessogramSpace ref={containerRef}>{
                    loaded &&
                    <ProductionSystemSelector 
                        specie={specie}
                        parent={containerRef.current}
                        onChange={onChange}
                        processograms={processograms}
                        setTarget={setCurrentInformations}
                    />}
                </ProcessogramSpace>
                <FormSpace onClick={(e:Event)=>e.stopPropagation()}>
                    {
                        currentInformations?
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