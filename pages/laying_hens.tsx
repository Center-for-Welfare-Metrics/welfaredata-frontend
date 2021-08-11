import ProductionSystemSelector from "@/components/processograms/processogram-list"
import { Container } from "@/components/layouts/default-processogram-page-styled"
import { useEffect, useRef, useState } from "react"
import theme from 'theme/schema.json'
import processogramApi from '@/api/processogram'
import { LoaderContainer } from "@/components/miscellaneous/loaders"
import Loader from "react-loader-spinner"
import toast from "react-hot-toast"

const PublicChickensPage = () => {

    const [processograms,setProcessograms] = useState<any>([])

    const containerRef = useRef(null)

    const [firstLoad,setFirstLoad] = useState(false)

    // useEffect(()=>{
    //     processogramApi.all()
    //     .then(({data}) => {
    //         setProcessograms(data)
    //         setFirstLoad(true)
    //     })
    //     .catch((error) => {
    //         toast.error('Something Wrong. Some elements may not work.')
    //         setFirstLoad(true)
    //     })
    // },[])

    return (                            
        <Container ref={containerRef}>
            {/* {
                firstLoad?
                (
                    <ProductionSystemSelector   
                        specie='chicken'
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
            }               */}
        </Container>        
    )
}

export default PublicChickensPage