import ProductionSystemSelector from "@/components/processograms/production-system-selector"
import {Container} from "@/components/layouts/default-processogram-page-styled"
import { useEffect, useState } from "react"

import processogramApi from '@/api/processogram'


const PublicPigsPage = () => {


    const [processograms,setProcessograms] = useState<any>([])

    useEffect(()=>{
        processogramApi.all()
        .then(({data}) => {
            setProcessograms(data)
        })

    },[])

    return (
        <Container>
            <ProductionSystemSelector data_entry={false} specie='pig' processograms={processograms} />
        </Container>
    )

}

export default PublicPigsPage