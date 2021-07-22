import ProductionSystemSelector from "@/components/processograms/processogram-list"
import { Container } from "@/components/layouts/default-processogram-page-styled"
import processogramApi from '@/api/processogram'
import specieApi from '@/api/specie'
import Head from "next/head"

const PublicPigsPage = ({data,specie}) => {    

    return (            
        <Container>
            <Head>
                <title>Welfare Data - Pigs</title>
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

export default PublicPigsPage

export async function getStaticProps(context) {
    let data = await (await processogramApi.all()).data
    let specie = await(await specieApi.getOne('pig')).data
    return {
      props: {
          data,
          specie
      }            
    }
}