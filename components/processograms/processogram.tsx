import { SvgContainer } from './processogram-styled'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import { TweenLite, gsap } from 'gsap'
import ProcessogramContext from '@/context/processogram'
import { MouseEvent as MS , useContext } from 'react';
import SVG from 'react-inlinesvg'
gsap.registerPlugin(TweenLite)

interface IProcessogram {
    productionSystem:ProductionSystemTypes,
    specie:SpeciesTypes
}

const Processogram = ({productionSystem,specie}:IProcessogram) => {   

    const {setOnHover} = useContext(ProcessogramContext)
    
    const mouseEnter = (event:MS<SVGElement,MouseEvent>) => {
        let id = event.currentTarget.id
        setOnHover(id)
    }

    const mouseLeave = (event:MS<SVGElement,MouseEvent>) => {
        setOnHover(null)
    }

    return (      
        <SvgContainer>
            <SVG      
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                                      
            />
        </SvgContainer>
    )
}

export default Processogram