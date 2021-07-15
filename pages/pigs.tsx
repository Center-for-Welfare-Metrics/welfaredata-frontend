import ProductionSystemSelector from "@/components/processograms/processogram-list"
import { Container } from "@/components/layouts/default-processogram-page-styled"
import processogramApi from '@/api/processogram'

const PublicPigsPage = ({data}) => {
    
    console.log(data)
    return (            
        <Container>
            {                
                <ProductionSystemSelector   
                    specie='pig' 
                    collection={data}
                />                
            }              
        </Container>        
    )
}


export default PublicPigsPage


export async function getStaticProps(context) {
    let data = await (await processogramApi.all()).data
    return {
      props: {
          data
      }      
    }
}