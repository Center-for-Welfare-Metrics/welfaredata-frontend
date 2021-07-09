import React from 'react'
import { TweenLite, gsap } from 'gsap'
import { MouseEvent as MS , useContext, useEffect, useRef, useState } from 'react';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import update from 'immutability-helper'

import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import ProcessogramContext from '@/context/processogram'
import { getElementSizeInformations, getRightTargetID } from '@/utils/processogram'
import { SvgContainer} from './processogram-styled'
import ProcessogramHud from './hud/hud';
import { getElementViewBox } from './processogram-helpers';

gsap.registerPlugin(TweenLite)

interface IProcessogram {
    productionSystem:ProductionSystemTypes,
    specie:SpeciesTypes
    gambiarraRef:any
}

const ProcessogramSVG = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
    <SVG innerRef={ref} {...props} />
));

const LEVELS = ['--ps','--lf','--ph','--ci']

interface ImainState {
    neverLoaded?:boolean
    level:number
    viewBox:string    
    parent:any
    innerCurrent:string
}

const Processogram = ({productionSystem,specie,gambiarraRef}:IProcessogram) => {   

    const {onHover,setOnHover,setCurrentProcessogram,currentProcessogram,setFocusedFigure,focusedFigure} = useContext(ProcessogramContext)    

    const [initialAxis,setInitialAxis] = useState({x:0,y:0})

    const [mainState,setMainState] = useState<ImainState>({
        neverLoaded:true,
        level:0,
        parent:null,
        innerCurrent:null,
        viewBox:null              
    })      

    const [isMoving,setIsMoving] = useState(false)    

    const svgRef = useRef<SVGElement>(null)

    const ref = useRef<HTMLDivElement>(null)

    const applyDocumentTriggers = () => {
        document.onclick = clickOut        
    }

    const removeDocumentTriggers = () => {
        document.onclick = null        
    }

    const [stack,setStack] = useState<string[]>([])

    useEffect(()=>{
        if(focusedFigure){
            if(imOnFocus()){
                updateStack()                
            }
        }
    },[focusedFigure])

    useEffect(()=>{        
        if(!mainState.neverLoaded){         
            if(mainState.level > 0){
                if(mainState.innerCurrent){
                    setFocusedFigure(mainState.innerCurrent)
                }else{
                    setFocusedFigure(currentProcessogram)
                }
                applyDocumentTriggers()                
            }else{
                removeDocumentTriggers()
                originalPosition()                
            }
            if(mainState.viewBox){
                moveFigure()
            }
        }
    },[mainState])
    
    useEffect(()=>{
        if(currentProcessogram){                
            if(imOnFocus()){                
                focusOnMe()
            }else{
                hideMe()
            }                       
        }else{
            if(ref.current){                
                setMainState({
                    innerCurrent:null,
                    level:0,
                    parent:null,
                    viewBox:null                   
                })
            }                                    
        }
    },[currentProcessogram])

    const getCurrentDomElement = () => mainState.innerCurrent?svgRef.current.querySelector(`#${mainState.innerCurrent}`):svgRef.current    

    const updateStack = () => {
        let level = mainState.level
        let stack_lenght = stack.length
        
        if(level>stack_lenght){
            setStack(update(stack,{
                $push:[focusedFigure]
            }))
        }else if(level<stack_lenght){                                  
            setStack(update(stack,{
                $splice:[[ stack_lenght -(stack_lenght-level),stack_lenght-level]]
            }))
        }else if(level===stack_lenght){
            setStack(update(stack,{
                [stack_lenght-1]:{
                    $set:focusedFigure
                }
            }))
        }
    }



    const imOnFocus = () => currentProcessogram === svgRef.current?.id        

    const getParent = () => {        
        if(mainState.innerCurrent){
            let node = svgRef.current.querySelector(`#${mainState.innerCurrent}`)
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
                let viewBox = getElementViewBox(parent)
                let inner_current = null 
                if(!parent.id.includes('--ps')){
                    inner_current = parent.id
                }
                setIsMoving(true)
                setMainState({
                    ...mainState,
                    level:mainState.level-1,
                    viewBox,
                    innerCurrent:inner_current          
                })            
            }
        }else if(mainState.level === 1){  
            setIsMoving(true)
            setMainState({
                level:0,
                parent:null,
                innerCurrent:null,
                viewBox:null,                               
            })
        }
    }       

    const targetIsInside = (elementClicked:EventTarget) => {
        let currentElement = mainState.innerCurrent?
        svgRef.current.querySelector(`#${mainState.innerCurrent}`)
        :
        svgRef.current
        
        return currentElement.contains(elementClicked as Node)
    }

    const moveFigure = () => {        
        TweenLite.to(svgRef.current,{
            attr:{
                viewBox:mainState.viewBox
            },
            ease:'power1.inOut'
        }).duration(0.7)
        .then(()=>setIsMoving(false))
    }

    const fixFigure = () => {        
        let {top,left} = getElementSizeInformations(ref.current)
        setInitialAxis({
            x:left,
            y:top
        })
        return TweenLite.to(ref.current,{
            top,left,
            position:'absolute'
        }).duration(0)
    }

    const focusOnMe = () => {
        fixFigure()
        .then(()=>{
            TweenLite.to(ref.current,{
                zIndex:99,
                top:'50%',
                translateY:'-50%'
            }).duration(.5)            
        })
        setMainState({
            ...mainState,
            level:1,                       
        })              
    }

    const hideMe = () => {
        fixFigure()
        TweenLite.to(ref.current,{opacity:0}).duration(.5)
        .then(()=>{
            TweenLite.to(ref.current,{display:'none'}).duration(.5)
        })
    }

    const originalPosition = () => {
        if(ref.current && svgRef.current){
            let {x,y} = initialAxis
            TweenLite.to(ref.current,{                
                opacity:1,
                top:y,
                left:x,
                display:'block',
                translateY:0,
                zIndex:77
            }).duration(.5)
            .then(()=>{
                TweenLite.to(ref.current,{
                    position:'static'
                }).duration(0).then(()=>{
                    if(imOnFocus()){                        
                        TweenLite.to(gambiarraRef.ref,{overflow:'auto'}).duration(0).then(()=>{
                            gambiarraRef.ref.scrollTop = gambiarraRef.scrollTop
                        })
                    }
                })
            })      
            setCurrentProcessogram(null)      
        }
    }

    const mouseEnter = (event:MS<SVGElement,MouseEvent>) => {        
        if(currentProcessogram === null || imOnFocus()){
            let id = event.currentTarget.id
            setOnHover(id)
        }        
    }

    const mouseLeave = (event:MS<SVGElement,MouseEvent>) => {
        setOnHover(null)
        if(imOnFocus()){
            setOnHover(null)
        }
    }

    const ProcessogramClick = (event:MS<SVGElement,MouseEvent>) => {
        if(currentProcessogram === null){
            let id = svgRef.current.id
            setCurrentProcessogram(id)           
        }else{
            if(imOnFocus()){   
                if(targetIsInside(event.target)){
                    event.stopPropagation()
                    InnerClick()
                }
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
        let bbox = element.getBBox()
        let viewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
        setMainState({
            ...mainState,
            level:mainState.level+1,
            viewBox,
            innerCurrent:element.id           
        })        
    }    

    

    const mouseMove = (event:MS<SVGElement,MouseEvent>) => {
        if(imOnFocus()){            
            if(targetIsInside(event.target)){
                let right_target_id = getRightTargetID({
                    element:event.target,
                    level:LEVELS[mainState.level],
                    current:currentProcessogram
                })
                if(onHover!==right_target_id){
                    setOnHover(right_target_id)                                  
                }
            }else{                
                setOnHover(null)
            }
        }
    }        

    const handleHudChange = (change) => {
        setIsMoving(true)
        setMainState({...mainState,...change})
    }

    return (           
        <>   
            <SvgContainer
                selected={currentProcessogram}
                level={mainState.level}
                equallevel={LEVELS[mainState.level-1] || null}
                innerlevel={LEVELS[mainState.level]}
                current={mainState.innerCurrent || currentProcessogram}
                hover={onHover}
                ref={ref}                
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
            { 
                (imOnFocus() && mainState.level >= 0) &&                            
                <ProcessogramHud 
                    element={getCurrentDomElement()}
                    onChange={handleHudChange}
                    level={mainState.level}
                    stack={stack}
                    isMoving={isMoving}
                />                
            }  
        </>                  
    )
}

export default Processogram