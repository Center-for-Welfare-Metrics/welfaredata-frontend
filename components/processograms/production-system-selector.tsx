import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"

import { Container } from './production-system-selector-styled'

import { TweenLite, gsap } from 'gsap'
gsap.registerPlugin(TweenLite)

interface IProcessogramsHomePage {
    specie:SpeciesTypes
}


const ProductionSystemSelector = ({specie}:IProcessogramsHomePage) => {
    


    return (               
        <Container>            
            {
                SPECIES[specie].map((productionSystem,index) => (
                    <Processogram 
                        specie={specie}
                        productionSystem={productionSystem}
                    />
                ))
            }              
        </Container>       
    )
}

export default ProductionSystemSelector