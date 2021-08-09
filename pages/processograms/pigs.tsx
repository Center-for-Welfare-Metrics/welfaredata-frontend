import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import ProductionSystemSelector from "@/components/processograms/processogram-list"
import { Container } from "@/components/layouts/default-processogram-page-styled"
import { useEffect, useRef, useState } from "react"
import theme from 'theme/schema.json'
import processogramApi from '@/api/processogram'
import specieApi from '@/api/specie'
import { LoaderContainer } from "@/components/miscellaneous/loaders"
import Loader from "react-loader-spinner"
import toast from "react-hot-toast"
import { ISpecie } from "@/context/processogram"

const PigPage = () => {

    const [processograms,setProcessograms] = useState<any>([])    

    const [firstLoad,setFirstLoad] = useState(false)

    const [specie,setSpecie] = useState<ISpecie>(null)

    useEffect(()=>{
        fetchInitialData()                
    },[])

    const fetchInitialData = async () => {
        try {
            let processogramData = await (await (processogramApi.all())).data        
            let specieData = await (await (specieApi.getOne('pig'))).data
            setProcessograms(processogramData)
            setSpecie(specieData)
        } catch (error) {
            toast.error('Error trying to download collection informations')
        } finally {
            setFirstLoad(true)
        }    
    }

    return (        
        <DefaultLayout>            
            <Container>
                {
                    firstLoad?
                    (
                        <ProductionSystemSelector                               
                            specie={specie}
                            collection={processograms}
                        />
                    )
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
                }                
            </Container>            
        </DefaultLayout>
    )
}

export default withAuth(PigPage)