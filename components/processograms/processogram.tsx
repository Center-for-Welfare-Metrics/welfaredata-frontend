import { SvgContainer } from './processogram-styled'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import { TweenLite, gsap } from 'gsap'
import ProcessogramContext, { IParentDimensions, IProcessogramContext } from '@/context/processogram'
import { getElementSizeInformations } from '@/utils/processogram'
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

const Processogram = ({productionSystem,specie}:IProcessogram) => {   

    const {setOnHover,setCurrentProcessogram,currentProcessogram,parentDimensions} = useContext(ProcessogramContext)
    
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

    useEffect(()=>{
        if(svgRef.current){
            if(parentDimensions){
                let {top,left,width,height} = getElementSizeInformations(svgRef.current)
                TweenLite.to(svgRef.current,{
                    width:(parentDimensions.width*0.9),
                    height:(parentDimensions.height*0.9)
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
        let { width,height } = parentDimensions
        stuckPosition().then(() => {
            TweenLite.to(svgRef.current,{
                top:'50%',
                left:'50%',
                translateX:'-50%',
                translateY:'-50%',
                width:(width*0.9),
                height:(height*0.9)
            })
        })
    }

    const hidden = () => {
        stuckPosition().then(()=>{
            TweenLite.to(svgRef.current,{display:'none'}).delay(0.5).duration(0)
        })        
    }

    return (      
        <SvgContainer>
            <ProcessogramSVG
                ref={svgRef}
                onClick={ProcessogramClick}      
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                                      
            />
        </SvgContainer>
    )
}

export default Processogram