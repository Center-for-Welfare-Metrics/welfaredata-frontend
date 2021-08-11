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
    

    const [processograms,setProcessograms] = useState<any[]>([])
    
    const [firstLoad,setFirstLoad] = useState(false)

    

    const [onFetch,setOnFetch] = useState(false)
    
    const [specieItem,setSpecieItem] = useState<ISpecie>(null)


    const timer = useRef(null)

    useEffect(() => {
        fetchInitial()
    },[])


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

    return (
        firstLoad?
        (<>
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
                    <DataEntryForm />                                            
                </FormSpace>
            </Container>
        </>)
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