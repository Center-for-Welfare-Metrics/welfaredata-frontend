import { Svg } from './processogram-styled'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import { TweenLite, gsap } from 'gsap'

gsap.registerPlugin(TweenLite)

interface IProcessogram {
    productionSystem:ProductionSystemTypes,
    specie:SpeciesTypes
}

const Processogram = ({productionSystem,specie}:IProcessogram) => {   

    
    return (                
        <Svg 
            src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                                      
        />                    
    )
}

export default Processogram