import DataEntryContext, { ICommonDataEntry, IDataEntryContext, IDataEntryFormInformations } from '@/context/data-entry'
import { FieldReferenceTypes, SpeciesTypes, TabTypes } from '@/utils/enum_types'
import { useEffect, useRef, useState } from 'react'
import ProductionSystemSelector from '../processograms/processogram-list'
import Loader from "react-loader-spinner";
import { 
    Container,
    FormSpace,
    ProcessogramSpace,
    Title,SubTitle,
    NoProductionSystemSelected    
} from './processogram-styled'

import voca from 'voca'
import DataEntryForm from './form/data-entry-form'
import update from 'immutability-helper'
import processogramApi from '@/api/processogram'
import specieApi from '@/api/specie'
import theme from 'theme/schema.json'
import lodash from 'lodash'
import toast from 'react-hot-toast'
import { LoaderContainer } from '../miscellaneous/loaders';
import { ISpecie } from '@/context/processogram';

interface IProcessogramDataEntry {
    specie:SpeciesTypes
}

const ProcessogramDataEntry = ({specie}:IProcessogramDataEntry) => {        
    
    const [currentInformations,setCurrentInformations] = useState<IDataEntryFormInformations>(null)

    const [currentFieldReference,setCurrentFieldReference] = useState<FieldReferenceTypes>(null)

    const [currentProductionSystem,setCurrentProductionSystem] = useState<IDataEntryFormInformations>(null)

    const [idTree,setIdTree] = useState<any>(null)

    const [processograms,setProcessograms] = useState<any[]>([])
    
    const [firstLoad,setFirstLoad] = useState(false)

    const [tab,setTab] = useState<TabTypes>('description')

    const [onFetch,setOnFetch] = useState(false)

    const [clickLevel,setClickLevel] = useState<number>(null)
    
    const [specieItem,setSpecieItem] = useState<ISpecie>(null)


    const timer = useRef(null)

    useEffect(() => {
        fetchInitial()
    },[])

    useEffect(()=> {                   
        if(currentInformations !== undefined){           
            if(lodash.keys(currentInformations).includes('productionSystem')){
                setCurrentProductionSystem(currentInformations)
            }            
        }
    },[currentInformations])

    const fetchInitial = async () => {
        try {
            let processogramData = await (await (processogramApi.all())).data 
            // fast gambiarra
            let specie_helper_gambiarra : string = specie
            if(specie_helper_gambiarra === 'laying_hens'){
                specie_helper_gambiarra = 'chicken'
            }else if(specie_helper_gambiarra === 'pigs'){
                specie_helper_gambiarra = 'pig'
            }
            let specieData = await (await (specieApi.getOne(specie_helper_gambiarra))).data
            setProcessograms(processogramData)
            setSpecieItem(specieData)
        } catch (error) {
            toast.error('Error trying to download collection informations')
        } finally {
            setFirstLoad(true)
        }  
    }

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
        }).catch(CommonErrorHandler)
    }

    const updateReferenceDataWithDelay = (value : any,callback=null) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            let reference : ICommonDataEntry = currentInformations[currentFieldReference]  
            processogramApi.updateReference(currentFieldReference,reference._id,value).then(() => {                               
                refreshProcessogram()
            }).catch(CommonErrorHandler)
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

    const CommonErrorHandler = (error) => {
        setOnFetch(false)
        let error_string = 'Operation error. Try later. '
        if(error.response){
            error_string += `\nCode: ${error.response.status}`
        }else{
            error_string = 'Server not running. Try Later'
        }
        toast.error(error_string)
    }

    const updateProcessogramWithDelay = (value:any) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(()=>{
            processogramApi.update({
                id_tree:{...idTree,_id:undefined},
                values:value,
            },currentProductionSystem._id)
            .then(({data}) => {
                refreshProcessograms(idTree._id,data)
            }).catch(CommonErrorHandler)
        },500)
    }

    const updateProcessogram = (value:any) => {
        processogramApi.update({
            id_tree:{...idTree,_id:undefined},
            values:value,
        },idTree._id)
        .then(({data}) => {
            refreshProcessograms(idTree._id,data)
        }).catch(CommonErrorHandler) 
    } 

    const refreshProcessogramWithDelay = () => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            processogramApi.getOne(idTree._id)
            .then(({data}) => {                            
                refreshProcessograms(idTree._id,data)
            }).catch(CommonErrorHandler) 
        }, 500);            
    }
    
    const refreshProcessogram = () => {
        if(idTree._id){          
            processogramApi.getOne(idTree._id)
            .then(({data}) => {            
                refreshProcessograms(idTree._id,data)
            }).catch(CommonErrorHandler) 
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
        idTree,
        clickLevel,
        setClickLevel        
    }


    return (
        firstLoad?
        (<DataEntryContext.Provider value={contextValues}>
            <Container>            
                <ProcessogramSpace id='processogram-editor-space'>
                {                    
                    <ProductionSystemSelector 
                        specie={specieItem}
                        collection={processograms}
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
        </DataEntryContext.Provider>)
        :
        (
            <LoaderContainer>
                <h1>Working</h1>
                <Loader 
                    color={theme.default.colors.blue}
                    type='ThreeDots'
                    height={100}
                    width={250} 
                />
            </LoaderContainer>
        )
    )
}




export default ProcessogramDataEntry