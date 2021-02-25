import {Title,Container,SvgBackground} from './processogram-card-styled'
import SVG from 'react-inlinesvg'
import { SvgZooPath } from '@/utils/assets_path'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/consts'

interface IProcessogramCard {
    title:string
    specie:SpeciesTypes
    productionSystem:ProductionSystemTypes
}

const ProcessogramCard = ({title,specie,productionSystem}:IProcessogramCard) => {


    return (
        <Container>
            <Title>{title}</Title>
            <SvgBackground 
                src={SvgZooPath({specie,productionSystem})}
            />
        </Container>
    )

}



export default ProcessogramCard