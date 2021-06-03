import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import ProductionSystemSelector from "@/components/processograms/production-system-selector"
import {Container} from "@/components/layouts/default-processogram-page-styled"
import { useEffect, useRef, useState } from "react"
import theme from 'theme/schema.json'
import processogramApi from '@/api/processogram'
import { LoaderContainer } from "@/components/miscellaneous/loaders"
import Loader from "react-loader-spinner"

const PigPage = () => {

    const [processograms,setProcessograms] = useState<any>([])

    const containerRef = useRef(null)

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
            <Container ref={containerRef}>
                {
                    firstLoad?
                    (
                        <ProductionSystemSelector 
                            parent={containerRef.current} 
                            data_entry={false} 
                            processograms={processograms}  
                            specie='pig' 
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