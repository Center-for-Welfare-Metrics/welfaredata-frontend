import { Container, Title,Description } from './description-tab-styled'
import voca from 'voca'
interface IDescriptionTab{
    ref_name:string
    ref_description:string
    description:string
}

const DescriptionTab = ({ref_name,ref_description,description}:IDescriptionTab) => {



    return (
        <Container>
            <Title>{ voca.titleCase(ref_name)}</Title>
            <Description>               
                    {(ref_description || '') + (description || '')}                
            </Description>
        </Container>
    )
}





export default DescriptionTab