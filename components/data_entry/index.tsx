import { SpeciesTypes } from '@/utils/enum_types'
import { useEffect, useState } from 'react'
import ProductionSystemSelector from '../processograms/processogram-list'
import Loader from "react-loader-spinner";
import { 
    Container,
    FormSpace,
    ProcessogramSpace,  
} from './index-styled'
import DataEntryForm from './form/data-entry-form'
import processogramApi from '@/api/processogram'
import specieApi from '@/api/specie'
import theme from 'theme/schema.json'
import toast from 'react-hot-toast'
import { LoaderContainer } from '../miscellaneous/loaders';
import { ISpecie } from '@/context/processogram';
import { getCollectionInformationsByCoolFormat, ICoolFormat } from '@/utils/processogram';
import DataEntryContext from "@/context/data-entry"

interface IProcessogramDataEntry {
    specie:SpeciesTypes
}

const ProcessogramDataEntry = ({specie}:IProcessogramDataEntry) => {        
    

    const [processograms,setProcessograms] = useState<any[]>([])
    
    const [firstLoad,setFirstLoad] = useState(false)
    
    const [specieItem,setSpecieItem] = useState<ISpecie>(null)

    const [content,setContent] = useState(null)

    useEffect(() => {
        setContent(null)
        fetchInitial()
    },[specie])    

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
            // end of fast gambiarra

            let specieData = await (await (specieApi.getOne(specie_helper_gambiarra))).data
            setProcessograms(processogramData)
            setSpecieItem(specieData)
        } catch (error) {
            toast.error('Error trying to download collection informations')
        } finally {
            setFirstLoad(true)
        }  
    }

    const onChildStateChange = (e:ICoolFormat[]) => {
        setContent(getCollectionInformationsByCoolFormat(e,processograms))
    }

    return (
        firstLoad?
        (<Container>            
            <ProcessogramSpace id='processogram-editor-space'>
            {                    
                <ProductionSystemSelector 
                    specie={specieItem}
                    collection={processograms}         
                    onChange={onChildStateChange}
                />
            }
            </ProcessogramSpace>
            <FormSpace onClick={(e:Event)=>e.stopPropagation()}>   
                <DataEntryContext.Provider value={{contentInformation:content,specie:specieItem,processograms,setProcessograms}}>
                    <DataEntryForm />
                </DataEntryContext.Provider>                                           
            </FormSpace>
        </Container>)
        :
        (<LoaderContainer>
            <h1>Working</h1>
            <Loader 
                color={theme.default.colors.blue}
                type='ThreeDots'
                height={100}
                width={250} 
            />
        </LoaderContainer>)
    )
}




export default ProcessogramDataEntry