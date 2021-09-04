import ProductionSystemSelector from "@/components/processograms/processogram-list"
import { Container } from "@/components/layouts/default-processogram-page-styled"
import processogramApi from '@/api/processogram'
import specieApi from '@/api/specie'
import Head from "next/head"

const PublicHensPage = ({data,specie}) => {    

    return (            
        <Container>
            <Head>
                <title>Welfare Data - Laying Hens</title>
            </Head>
            {                
                <ProductionSystemSelector   
                    specie={specie}
                    collection={data}
                />                
            }              
        </Container>        
    )
}

export default PublicHensPage

export async function getStaticProps(context) {
    let data = await (await processogramApi.all('chicken')).data
    let specie = await(await specieApi.getOne('chicken')).data
    return {
      props: {
          data,
          specie
      }            
    }
}