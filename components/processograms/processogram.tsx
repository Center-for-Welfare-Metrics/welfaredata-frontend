import React from 'react'
import { TweenLite, gsap } from 'gsap'
gsap.registerPlugin(TweenLite)
import { MouseEvent as MS , useEffect, useRef, useState } from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import update from 'immutability-helper'

import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import { ImainState, ImainStateChange } from '@/context/processogram'
import { getRightTargetID } from '@/utils/processogram'
import { SvgContainer} from './processogram-styled'
import ProcessogramHud from './hud/hud';
import { getElementViewBox } from './processogram-helpers';


interface IProcessogram {
    productionSystem:ProductionSystemTypes,
    specie:SpeciesTypes,
    hoverChange(hover):void
    onSelect(id:string):void
}

const ProcessogramSVG = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
    <SVG innerRef={ref} {...props} />
));

const LEVELS = ['--ps','--lf','--ph','--ci']

const Processogram = ({productionSystem,specie,hoverChange,onSelect}:IProcessogram) => {

    const [isMoving,setIsMoving] = useState(false)    

    const [mainState,setMainState] = useState<ImainState>(null)

    const svgRef = useRef<SVGElement>(null)

    const ref = useRef<HTMLDivElement>(null)

    const [onHover,setOnHover] = useState<string>(null)

    const applyDocumentTriggers = () => {
        document.onclick = clickOut        
    }

    const removeDocumentTriggers = () => {
        document.onclick = null        
    }

    const [stack,setStack] = useState<string[]>([])

    useEffect(()=>{
        if(mainState){                                          
            updateStack()
            applyDocumentTriggers()
            if(mainState.level === 0){
                focusOnMe()
            }
            if(mainState.viewBox){
                moveFigure()
            }                             
        }else{
            setStack([])
            originalPosition()
        }                  
    },[mainState])


    const getCurrentDomElement = () => mainState.currentDomID?svgRef.current.querySelector(`#${mainState.currentDomID}`):svgRef.current    

    const updateStack = () => {
        let updated_stack_lenght = (mainState.level)+1
        let old_stack_lenght = stack.length
                
        if(updated_stack_lenght>old_stack_lenght){
            setStack(update(stack,{
                $push:[mainState.currentDomID || svgRef.current.id]
            }))
        }else if(updated_stack_lenght<old_stack_lenght){             
            setStack(update(stack,{
                $splice:[[old_stack_lenght-(old_stack_lenght-updated_stack_lenght)]]
            }))
        }else if(old_stack_lenght===updated_stack_lenght){
            setStack(update(stack,{
                [updated_stack_lenght-1]:{
                    $set:mainState.currentDomID
                }
            }))
        }                
    }
  

    const getParent = () => {        
        if(mainState.currentDomID){
            let node = svgRef.current.querySelector(`#${mainState.currentDomID}`)
            let levelBefore = LEVELS[mainState.level-1]
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
        if(mainState.level>0){
            if(parent){                
                let viewBox = getElementViewBox(parent)
                let inner_current = null 
                if(!parent.id.includes('--ps')){
                    inner_current = parent.id
                }                
                setMainState({
                    ...mainState,
                    level:mainState.level-1,
                    viewBox,
                    currentDomID:inner_current          
                })            
            }
        }else if(mainState.level === 0){     
            removeDocumentTriggers()         
            setMainState(null)
            onSelect(null)
            hoverChange(null)
        }
    }       

    const targetIsInside = (elementClicked:EventTarget) => {
        let currentElement = mainState.currentDomID?
        svgRef.current.querySelector(`#${mainState.currentDomID}`)
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
        }).duration(0.7)
        .then(()=>setIsMoving(false))
    }

    const focusOnMe = () => {        
        TweenLite.to(ref.current,{
            position:'absolute',
            top:'0',
            left:'0',
            overflow:'hidden'           
        }).duration(0)
    }

    const originalPosition = () => {
        if(ref.current){
            TweenLite.to(ref.current,{position:'static',overflow:'auto'}).duration(0)
        }
    }

    const mouseLeave = (event:MS<SVGElement,MouseEvent>) => {
        if(mainState === null){
            hoverChange(null)
        }else{
            setOnHover(null)       
        }
    }

    const mouseMove = (event:MS<SVGElement,MouseEvent>) => {
        if(mainState===null){
            hoverChange(svgRef.current.id)
        }else{            
            if(targetIsInside(event.target)){                
                let right_target_id = getRightTargetID({
                    element:event.target,
                    level:LEVELS[mainState.level+1],
                    current:svgRef.current.id
                })                
                if(onHover!==right_target_id){                    
                    setOnHover(right_target_id)                                  
                }
            }else{ 
                if(onHover!==null){               
                    setOnHover(null)
                }
            }
        }
    }

    const ProcessogramClick = (event:MS<SVGElement,MouseEvent>) => {
        if(mainState === null){
            let id = svgRef.current.id
            onSelect(id)
            setMainState({
                currentDomID:null,
                viewBox:null,                                                
                level:0
            })                       
        }else{               
            if(targetIsInside(event.target)){
                event.stopPropagation()
                InnerClick()
            }            
        }      
    }

    const InnerClick = () => {
        let element = svgRef.current.querySelector(`#${onHover}`)
        if(element){
            toNextLevel(element)
        }
    }

    const toNextLevel = (element:any) => {  
        setIsMoving(true)        
        let viewBox = getElementViewBox(element)
        setMainState({
            ...mainState,
            level:mainState.level+1,
            viewBox,
            currentDomID:element.id                     
        })        
    }    

           

    const handleHudChange = (change:ImainStateChange) => {
        setIsMoving(true)
        setMainState({...mainState,...change})
    }

    return (           
        <>   
            <SvgContainer                
                level={mainState?.level}
                current={mainState?.currentDomID}
                siblings={LEVELS[mainState?.level] || null}
                childrens={LEVELS[mainState?.level+1] || null}                
                hover={onHover}
                ref={ref}                
            >
                <ProcessogramSVG                
                    ref={svgRef}
                    onClick={ProcessogramClick}                    
                    onMouseLeave={mouseLeave}
                    onMouseMove={mouseMove}      
                    src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                                      
                />
                { 
                    mainState &&                            
                    <ProcessogramHud 
                        element={getCurrentDomElement()}
                        onChange={handleHudChange}
                        level={mainState.level}
                        stack={stack}
                        isMoving={isMoving}
                    />                
                }                                     
            </SvgContainer>              
        </>                  
    )
}

export default React.memo(Processogram)