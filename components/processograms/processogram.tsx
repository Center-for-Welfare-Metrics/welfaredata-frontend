import { SvgContainer } from './processogram-styled'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import { TweenLite, gsap } from 'gsap'
import ProcessogramContext, { IDimensions, IProcessogramContext } from '@/context/processogram'
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

interface ImainState {
    top:number
    left:number
    scale:number
    neverLoaded?:true
    level:number
    matrix:string
}

const Processogram = ({productionSystem,specie}:IProcessogram) => {   

    const {setOnHover,setCurrentProcessogram,currentProcessogram,parentDimensions} = useContext(ProcessogramContext)    

    const [mainState,setMainState] = useState<ImainState>({
        top:0,
        left:0,
        scale:1,
        neverLoaded:true,
        level:0,
        matrix:null
    })

    const [innerHover,setInnerHover] = useState<string>(null)

    const [innerCurrent,setInnerCurrent] = useState<string>(null)

    const [isMoving,setIsMoving] = useState(false)

    const matrix = new DOMMatrix()

    const svgRef = useRef<SVGElement>(null)       

    const imOnFocus = () => currentProcessogram === svgRef.current?.id

    useEffect(()=>{        
        if(!mainState.neverLoaded){
            setIsMoving(true)
            TweenLite.to(svgRef.current,{
                top:mainState.top,
                left:mainState.left,
                scale:mainState.scale
            }).duration(0.5)
            .then(()=>setIsMoving(false))
        }
    },[mainState])

    useEffect(()=>{
        if(currentProcessogram){    
            stuckPosition()
            if(imOnFocus()){                
                focus()
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
        }else{
            if(imOnFocus()){
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

    const getScale = (elementWidth,elementHeight) => {
        let parentWidth = parentDimensions.width

        let maxElementWidth = parentWidth
        
        let scale = (maxElementWidth/elementWidth)                
        
        return scale
    }

    const getX = (new_scale,elementMiddleX) => {
    
        let parentMiddleX = parentDimensions.middleX

        let svgInfos = getElementSizeInformations(svgRef.current)        

        let move = svgInfos.left + ((parentMiddleX - elementMiddleX)*mainState.scale)
    
        // let new_move = (new_scale*move)
        
        return move
    }

    const getY = (new_scale,elementMiddleY) => {

        let parentMiddleY = parentDimensions.middleY

        let svgInfos = getElementSizeInformations(svgRef.current)        

        let move = svgInfos.top + (parentMiddleY - elementMiddleY)

        // let new_move = (new_scale*move)

        return move
    }

    const getMoveVariables = (elementDimensions:IDimensions) => {                
        let scale = getScale(elementDimensions.width,elementDimensions.height)

        let moveX = getX(scale,elementDimensions.middleX)

        let moveY = getY(scale,elementDimensions.middleY)        
        
        matrix.preMultiplySelf(new DOMMatrix()
        .translateSelf(elementDimensions.middleX, elementDimensions.middleY)
        .scaleSelf(scale, scale))

        return {
            moveX,
            moveY,
            scale,
            matrix:matrix.toString()   
        }
    }

    const toNextLevel = (element:Element) => {        
        let elementDimensions = getElementSizeInformations(element)            
        let {moveX,moveY,scale,matrix} = getMoveVariables(elementDimensions)                
        setInnerCurrent(element.id)        
        setMainState({
            top:moveY,
            left:moveX,
            scale:scale,
            level:mainState.level+1,
            matrix            
        })
    }    

    const stuckPosition = () => {
        let {top,left,width} = getElementSizeInformations(svgRef.current)
        return TweenLite.to(svgRef.current,
            {
                top,
                left,
                width,                
                position:'absolute'
            }
        ).duration(0)
    } 

    const focus = () => {
        toNextLevel(svgRef.current)
    }

    const hidden = () => {        
        TweenLite.to(svgRef.current,{opacity:0,zIndex:'-99'}).duration(0.5)             
    }

    const mouseMove = (event:MS<SVGElement,MouseEvent>) => {
        if(imOnFocus()){            
            let right_target_id = getRightTargetID({
                element:event.target,
                level:LEVELS[mainState.level],
                current:currentProcessogram
            })
            if(innerHover!==right_target_id){
                setInnerHover(right_target_id)
            }
        }
    }

    return (      
        <SvgContainer 
            level={mainState.level}
            equalLevel={LEVELS[mainState.level-1] || null}
            innerlevel={LEVELS[mainState.level]}
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