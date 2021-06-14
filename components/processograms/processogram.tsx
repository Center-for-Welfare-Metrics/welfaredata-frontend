import { SvgContainer } from './processogram-styled'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import { TweenLite, gsap } from 'gsap'
import ProcessogramContext from '@/context/processogram'
import { getElementSizeInformations } from '@/utils/processogram'
import { MouseEvent as MS , useContext, useEffect, useRef } from 'react';
import SVG from 'react-inlinesvg'
gsap.registerPlugin(TweenLite)

interface IProcessogram {
    productionSystem:ProductionSystemTypes,
    specie:SpeciesTypes
}

const Processogram = ({productionSystem,specie}:IProcessogram) => {   

    const {setOnHover,setCurrentProcessogram,currentProcessogram} = useContext(ProcessogramContext)
    
    const svgRef = useRef<SVGElement>(null)

    useEffect(()=>{
        if(currentProcessogram){
            if(currentProcessogram === svgRef.current.id){
                brigToFocus()
            }else{
                hidden()
            }
        }
    },[currentProcessogram])

    const mouseEnter = (event:MS<SVGElement,MouseEvent>) => {
        let id = event.currentTarget.id
        setOnHover(id)
    }

    const mouseLeave = (event:MS<SVGElement,MouseEvent>) => {
        setOnHover(null)
    }

    const ProcessogramClick = (event:MS<SVGElement,MouseEvent>) => {
        let id = event.currentTarget.id
        setCurrentProcessogram(id)
    }

    const stuckPosition = () => {
        let {top,left,width,height} = getElementSizeInformations(svgRef.current)
        return TweenLite.to(svgRef.current,
            {
                top,
                left,
                width,
                height,
                position:'absolute'
            }
        ).duration(0)
    }

    const brigToFocus = () => {
        let {top,left,width,height} = getElementSizeInformations(svgRef.current)
        stuckPosition().then(() => {
            TweenLite.fromTo(svgRef.current,{
                top,
                left,
                width,
                height
            },{
                top:'50%',
                left:'50%',
                translateY:'-50%',
                translateX:'-50%',
                width:width*1.2,
                height:height*1.2
            }).duration(0.5)
        })
    }

    const hidden = () => {
        stuckPosition().then(()=>{
            TweenLite.to(svgRef.current,{display:'none'}).delay(0.5).duration(0)
        })        
    }

    return (      
        <SvgContainer>
            <SVG
                innerRef={svgRef}
                onClick={ProcessogramClick}      
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                                      
            />
        </SvgContainer>
    )
}

export default Processogram