import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import ProductionSystemSelector from "@/components/processograms/processogram-list"
import {Container} from "@/components/layouts/default-processogram-page-styled"
import { useEffect, useRef, useState } from "react"
import theme from 'theme/schema.json'
import processogramApi from '@/api/processogram'
import { LoaderContainer } from "@/components/miscellaneous/loaders"
import Loader from "react-loader-spinner"

const PigPage = () => {

    const [processograms,setProcessograms] = useState<any>([])    

    const [firstLoad,setFirstLoad] = useState(false)

    useEffect(()=>{
        processogramApi.all()
        .then(({data}) => {
            setProcessograms(data)
            setFirstLoad(true)
        })
    },[])

    return (        
        <DefaultLayout>            
            <Container>
                {
                    firstLoad?
                    (
                        <ProductionSystemSelector                               
                            specie='pig'
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