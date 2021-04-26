import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import ProductionSystemSelector from "@/components/processograms/production-system-selector"
import {Container} from "@/components/layouts/default-processogram-page-styled"
import { useEffect, useState } from "react"

import processogramApi from '@/api/processogram'

const PigPage = () => {

    const [processograms,setProcessograms] = useState<any>([])

    useEffect(()=>{
        processogramApi.all()
        .then(({data}) => {
            setProcessograms(data)
        })

    },[])

    return (        
        <DefaultLayout>
            <Container>
                <ProductionSystemSelector data_entry={false} processograms={processograms}  specie='pig' />
            </Container>
        </DefaultLayout>
    )
}

export default withAuth(PigPage)