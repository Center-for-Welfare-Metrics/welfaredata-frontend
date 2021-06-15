import { SvgContainer } from './processogram-styled'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import { TweenLite, gsap } from 'gsap'
import ProcessogramContext, { IParentDimensions, IProcessogramContext } from '@/context/processogram'
import { getElementSizeInformations, getRightTargetID } from '@/utils/processogram'
import { MouseEvent as MS , useContext, useEffect, useRef, useState } from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import React from 'react'
gsap.registerPlugin(TweenLite)

interface IProcessogram {
    productionSystem:ProductionSystemTypes,
    specie:SpeciesTypes
}

const ProcessogramSVG = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
    <SVG innerRef={ref} {...props} />
));

const LEVELS = ['--ps','--lf','--ph','--ci']

const Processogram = ({productionSystem,specie}:IProcessogram) => {   

    const {setOnHover,setCurrentProcessogram,currentProcessogram,parentDimensions} = useContext(ProcessogramContext)
    
    const [level,setLevel] = useState(0)

    const [innerHover,setInnerHover] = useState<string>(null)

    const [innerCurrent,setInnerCurrent] = useState<string>(null)

    const [isMoving,setIsMoving] = useState(false)

    const svgRef = useRef<SVGElement>(null)    

    const imOnFocus = () => currentProcessogram === svgRef.current?.id

    useEffect(()=>{
        if(currentProcessogram){
            if(imOnFocus()){
                brigToFocus()
            }else{
                hidden()
            }            
        }
    },[currentProcessogram])   

    useEffect(()=>{
        if(svgRef.current && parentDimensions && currentProcessogram){             
            if(imOnFocus()){           
                TweenLite.to(svgRef.current,{
                    width:(parentDimensions.width*0.9),                    
                }).duration(0)
            }else{
                TweenLite.to(svgRef.current,{
                    width:(parentDimensions.width*0.8),                    
                }).duration(0)
            }            
        }
    },[parentDimensions])

    const mouseEnter = (event:MS<SVGElement,MouseEvent>) => {
        let id = event.currentTarget.id
        setOnHover(id)
    }

    const mouseLeave = (event:MS<SVGElement,MouseEvent>) => {
        setOnHover(null)
        if(imOnFocus()){
            setInnerHover(null)
        }
    }

    const ProcessogramClick = (event:MS<SVGElement,MouseEvent>) => {
        if(currentProcessogram === null){
            let id = event.currentTarget.id
            setCurrentProcessogram(id)
            setLevel(1)
        }else{
            if(imOnFocus() && innerHover){
                InnerClick()
            }            
        }
    }

    const InnerClick = () => {
        let element = svgRef.current.querySelector(`#${innerHover}`)
        if(element){
            toNextLevel(element)
        }
    }

    const toNextLevel = (element:Element) => {
        let elementInfos = getElementSizeInformations(element)
        let svgInfos = getElementSizeInformations(svgRef.current)

        let moveX = parentDimensions.middleX - elementInfos.middleX
        let moveY = parentDimensions.middleY - elementInfos.middleY
        setInnerCurrent(element.id)
        setIsMoving(true)
        setLevel(level+1)
        TweenLite.to(svgRef.current,{
            left:svgInfos.left + moveX,
            top:svgInfos.top + moveY,
            translateX:'0',
            translateY:'0'
        }).duration(0.5)
        .then(()=>setIsMoving(false))
    }

    const stuckPosition = (position='fixed') => {
        let {top,left,width} = getElementSizeInformations(svgRef.current)
        return TweenLite.to(svgRef.current,
            {
                top,
                left,
                width,                
                position
            }
        ).duration(0)
    }

    const brigToFocus = () => {    
        let { width } = parentDimensions
        stuckPosition('absolute').then(() => {
            setIsMoving(true)
            TweenLite.to(svgRef.current,{
                top:'50%',
                left:'50%',
                translateX:'-50%',
                translateY:'-50%',
                width:(width*0.9)                
            }).duration(0.5)
            .then(()=>setIsMoving(false))
        })
    }

    const hidden = () => {
        stuckPosition().then(()=>{
            TweenLite.to(svgRef.current,{display:'none'}).duration(0)
        })        
    }

    const mouseMove = (event:MS<SVGElement,MouseEvent>) => {
        if(imOnFocus()){            
            let right_target_id = getRightTargetID({
                element:event.target,
                level:LEVELS[level],
                current:currentProcessogram
            })
            if(innerHover!==right_target_id){
                setInnerHover(right_target_id)
            }
        }
    }

    return (      
        <SvgContainer 
            level={level}
            equalLevel={LEVELS[level-1] || null}
            innerlevel={LEVELS[level]}
            current={innerCurrent || currentProcessogram}
            hover={innerHover}
        >
            <ProcessogramSVG
                ref={svgRef}
                onClick={ProcessogramClick}      
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onMouseMove={mouseMove}      
                src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                                      
            />
        </SvgContainer>
    )
}

export default Processogram