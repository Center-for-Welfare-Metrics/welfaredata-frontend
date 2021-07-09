import ProductionSystemSelector from "@/components/processograms/processogram-list"
import { Container } from "@/components/layouts/default-processogram-page-styled"
import { useEffect, useRef, useState } from "react"
import theme from 'theme/schema.json'
import processogramApi from '@/api/processogram'
import { LoaderContainer } from "@/components/miscellaneous/loaders"
import Loader from "react-loader-spinner"
import toast from "react-hot-toast"
import DefaultLayout from "@/components/layouts"

const PublicPigsPage = ({data}) => {

    const [processograms,setProcessograms] = useState<any[]>(data)

    const [firstLoad,setFirstLoad] = useState(false)    

    console.log(data)

    return (            
        <Container>
            {                
                <ProductionSystemSelector   
                    specie='pig' 
                    collection={processograms}
                />                
            }              
        </Container>        
    )
}

export async function getStaticProps(context) {
    let data = await (await processogramApi.all()).data
    return {
      props: {
          data
      },
      revalidate:(15*60)
    }
  }

export default PublicPigsPage