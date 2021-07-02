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
    neverLoaded?:true
    level:number
    viewBox?:string
    focused?:string
    parent?:any
}

const Processogram = ({productionSystem,specie}:IProcessogram) => {   

    const {setOnHover,setCurrentProcessogram,currentProcessogram,parentDimensions} = useContext(ProcessogramContext)    

    const [mainState,setMainState] = useState<ImainState>({
        neverLoaded:true,
        level:0               
    })

    const [innerHover,setInnerHover] = useState<string>(null)

    const [innerCurrent,setInnerCurrent] = useState<string>(null)

    const [isMoving,setIsMoving] = useState(false)

    const svgRef = useRef<SVGElement>(null)

    const ref = useRef<HTMLDivElement>(null)

    const imOnFocus = () => currentProcessogram === svgRef.current?.id        

    const getParent = () => {        
        if(innerCurrent){
            let node = svgRef.current.querySelector(`#${innerCurrent}`)
            let levelBefore = LEVELS[mainState.level-2]
            while(node!==svgRef.current){
                node = node.parentElement                
                if(node.id.includes(levelBefore)){
                    break
                }
            }
            return node
        }else{
            return null
        }
    }

    const clickOut = () => {
        let parent = getParent() as any
        if(mainState.level>1){
            if(parent){
                let bbox = parent.getBBox()

                let viewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`

                setMainState({
                    level:mainState.level-1,
                    viewBox            
                })
                if(parent.id.includes('--ps')){
                    setInnerCurrent(null)
                }else{
                    setInnerCurrent(parent.id)
                }
                
            }
        }
    }

    useEffect(()=>{        
        if(!mainState.neverLoaded){         
            if(mainState.level > 0){
                document.onclick = clickOut
            }else{
                document.onclick = null
            }
            if(mainState.viewBox){
                moveFigure()
            }
        }
    },[mainState])

    useEffect(()=>{
        if(currentProcessogram){    
            stuckPosition()
            if(imOnFocus()){                
                focusOnMe()
            }else{
                hiddeMe()
            }
        }
    },[currentProcessogram])    

    const clickWasInside = (elementClicked:EventTarget) => {
        let currentElement = innerCurrent?
        svgRef.current.querySelector(`#${innerCurrent}`)
        :
        svgRef.current
        
        return currentElement.contains(elementClicked as Node)
    }

    const moveFigure = () => {
        setIsMoving(true)
        TweenLite.to(svgRef.current,{
            attr:{
                viewBox:mainState.viewBox
            },
            ease:'power1.inOut'
        }).duration(0.5)
        .then(()=>setIsMoving(false))
    }

    const focusOnMe = () => {
        setMainState({level:1})
        setIsMoving(true)
        TweenLite.to(ref.current,{
            width:'90%',
            top:'50%',
            left:'50%',
            translateX:'-50%',
            translateY:'-50%'
        }).duration(0.5).then(()=>setIsMoving(false))        
    }

    const hiddeMe = () => {
        TweenLite.to(ref.current,{
            zIndex:-99
        }).duration(0)
    }

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
                if(clickWasInside(event.target)){
                    event.stopPropagation()
                    InnerClick()
                }
            }
        }      
    }

    const InnerClick = () => {
        let element = svgRef.current.querySelector(`#${innerHover}`)
        if(element){
            toNextLevel(element)
        }
    }
    

    const toNextLevel = (element:any) => {  
        let bbox = element.getBBox()

        let viewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`

        setMainState({
            level:mainState.level+1,
            viewBox            
        })

        setInnerCurrent(element.id)
    }    

    const stuckPosition = () => {
        let {top,left} = getElementSizeInformations(ref.current)
        return TweenLite.to(ref.current,
            {
                top,
                left,                              
                position:'absolute'                
            }
        ).duration(0)
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
            selected={currentProcessogram}
            level={mainState.level}
            equallevel={LEVELS[mainState.level-1] || null}
            innerlevel={LEVELS[mainState.level]}
            current={innerCurrent || currentProcessogram}
            hover={innerHover}
            ref={ref}
            style={{width:'80%'}}
        >
            <ProcessogramSVG                
                ref={svgRef}
                onClick={ProcessogramClick}      
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onMouseMove={mouseMove}      
                src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                                      
            />
            <span style={{position:'absolute'}}>O</span>
        </SvgContainer>
    )
}

export default Processogram