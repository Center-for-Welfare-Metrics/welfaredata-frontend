import {Title,Container,SvgBackground} from './processogram-card-styled'
import { SvgZooPath } from '@/utils/assets_path'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types'
import Link from 'next/link'

interface IProcessogramCard {
    title:string
    specie:SpeciesTypes
    productionSystem:ProductionSystemTypes
}

const ProcessogramCard = ({title,specie,productionSystem}:IProcessogramCard) => {


    return (
        <Link href={{
            pathname:'processograms/[specie]',
            query:{specie}
        }}>
            <Container>                            
                <Title>{title}</Title>
                <SvgBackground 
                    src={SvgZooPath({specie,productionSystem})}
                />                      
            </Container>
        </Link>
    )

}



export default ProcessogramCard