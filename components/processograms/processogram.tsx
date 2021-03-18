import { useContext, useEffect, useRef, useState } from 'react'

import { Container,Svg } from './processogram-styled'
import ProcessogramContext from '@/context/processogram'
import { getElementByLayerSufix,getFixedSufixAndLayerName } from '@/utils/processogram';
import update from 'immutability-helper'
import ContextMenuContext from '@/context/context-menu'
import Router from 'next/router'
import { ProductionSystemTypes, SpeciesTypes } from '@/utils/enum_types';
import CustomContext from '@/context/custom-global-styles';

import { TweenLite, gsap } from 'gsap'
gsap.registerPlugin(TweenLite)

interface IProcessogram {
    productionSystem:ProductionSystemTypes,
    specie:SpeciesTypes
    parent?:HTMLElement
}
interface ILevelZeroInfo {
    top?:number
    left?:number
    width?:number
}
const LEVELS = ['--ps','--lf','--ph','--ci','-last-']

const innerLevels = ['','lf','ph','ci']

const MARGIN_LIMIT_X = 200

const MARGIN_LIMIT_Y = 200

const Processogram = ({productionSystem,specie,parent}:IProcessogram) => {

    const {choosen,setChoosen,processogramTreeFromQuery,setProcessogramTreeFromQuery,currentState,generateShareLink,history,setHistory} = useContext(ProcessogramContext)

    const [level,setLevel] = useState(0)    

    const [parentScrollY,setParentScrollY] = useState(0)

    const svgRef = useRef(null)

    const containerRef = useRef<HTMLElement>(null)

    const [levelZeroInfo,setLevelZeroInfo] = useState<ILevelZeroInfo>(null)

    const [firstLoad,setFirstLoad] = useState(false)

    const [idFromCurrentFocusedElement,setIDFromCurrentFocusedElement] = useState('')

    const { setContextMenu } = useContext(ContextMenuContext)

    const {setNeedFixedBody} = useContext(CustomContext)

    useEffect(() => {
        setLevelZeroInfo(containerInfo())
    },[])

    useEffect(()=>{
        if(levelZeroInfo){
            TweenLite.to(containerRef.current,{width:levelZeroInfo.width}).duration(0)
        }
    },[levelZeroInfo])

    useEffect(()=>{
        if(choosen){
            let info = containerInfo()
            setLevelZeroInfo(info)
            setFirstLoad(true)
            setScrollY()
            if(imChoosen(choosen)){   
                levelZeroSelec(info)
            }else{
                hideContainer(info)
            }
            setNeedFixedBody(true)
        }else{
            setNeedFixedBody(false)
            if(firstLoad){
                moveContainerToDefaultPosition()
            }
        }
    },[choosen])

    useEffect(()=>{
        if(level>0){
            document.onclick = toPreviousLevel
        }else{
            document.onclick = null
        }
    },[level])

    useEffect(()=>{
        if(hasHistory()){       
            generateShareLink(history)
            if(processogramTreeFromQuery){
                cameFromSharedLink()
                Router.push({query:{specie}})
            }
        }
    },[history])

    const setScrollY = () => {
        let targetY = parent?.scrollTop || window.scrollY
        
        setParentScrollY(targetY)
    }

    const cameFromSharedLink = () => {
        let elementToZoomId = processogramTreeFromQuery[innerLevels[level]]
        if(elementToZoomId){
            setProcessogramTreeFromQuery(update(processogramTreeFromQuery,{
                $unset:[innerLevels[level]]
            }))
            let elementToZoomIn =  svgRef.current.getElementById(elementToZoomId)
            setTimeout(() => {
                zoomOnElement(elementToZoomIn,LEVELS[level])            
            }, 1500);
        }
    }

    const hasHistory = () => {
        return Object.keys(history).length > 0
    }

    const imChoosen = (choosen:string) => {
        return choosen===svgRef.current.id
    }

    const moveContainerToDefaultPosition = () => {
        let { top,left,width} = levelZeroInfo

        const backContainerToOriginalWidthAndAxisPosition = () => {
            return TweenLite.to(containerRef.current,{transform:'translate(0,0)',width,top,left,display:'block'}).duration(0.5)
        }

        const toTotalOpacity = () => {
            return TweenLite.to(containerRef.current,{opacity:'1'}).duration(0.5)
        }

        const toStaticPosition = () => {
            return TweenLite.to(containerRef.current,{position:'static'}).duration(0)
        }

        const setPageOriginalScrollY = () => {
            let target = parent || window
            target.scrollTo(0,parentScrollY)
        }

        backContainerToOriginalWidthAndAxisPosition()
        .then(toTotalOpacity)
        .then(toStaticPosition)
        .then(setPageOriginalScrollY)
    }

    const hideContainer = ({top,left,width}) => {

        const fixContainerPositionAxis = () => {
            return TweenLite.to(containerRef.current,{top,left}).duration(0)
        }

        const changePositionAttr = () => {
            return TweenLite.to(containerRef.current,{position:'absolute'}).duration(0)
        }
        
        const fadeOut = () => {
            return TweenLite.to(containerRef.current,{opacity:0})
        }

        const setDisplayToNone = () => {
            TweenLite.to(containerRef.current,{display:'none'})
        }

        fixContainerPositionAxis()
        .then(changePositionAttr)
        .then(fadeOut)
        .then(setDisplayToNone)
    }
    

    const withLimits = (screenInfo) => {
        return {
            ...screenInfo,
            width:screenInfo.width - MARGIN_LIMIT_X,
            height:screenInfo.height - MARGIN_LIMIT_Y,
        }
    }

    const screenInfo = () => {
        let {innerWidth,innerHeight} =  window        
        let width,height,top,left = null
        if(parent){
            width = parent.getBoundingClientRect().width
            height = parent.getBoundingClientRect().height
            top = parent.getBoundingClientRect().top
            left = parent.getBoundingClientRect().left            
        }
        console.log(height,top)
        return {
            width:(width || innerWidth),
            height:(height || innerHeight),
            middleX:((width || innerWidth)/2) + (left || 0),
            middleY:((height || innerHeight)/2) + (top || 0)
        }
    }

    const elementInfo = (element:HTMLElement) => {
        let {width,left,height,top} = element.getBoundingClientRect()
        return {
            middleX:((left) + (width/2)),
            middleY:((top) + (height/2)),
            width:width,
            height:height
        }
    }

    const containerInfo = () => {
        let {top,left,width} = containerRef.current.getBoundingClientRect()
        return {top,left,width}
    }

    const currentScale = () => {
        return history[level]?.scale
    }
    
    const currentX = () => {
        return history[level]?.x
    }

    const currentY = () => {
        return history[level]?.y
    }

    const scaleElement = (element:HTMLElement) => {
        let elInfo = elementInfo(element)
        let srInfo = withLimits(screenInfo())
        let scale_value = (srInfo.width/elInfo.width)
        let element_future_height = (scale_value*elInfo.height)
        if(element_future_height > srInfo.height){
            scale_value = (srInfo.height/elInfo.height)
        }
        scale_value += currentScale()
        return scale_value
    }

    const moveX = (element,scale) => {
        let move = currentX() + ((screenInfo().middleX - elementInfo(element).middleX))
        let new_move = (scale*move)/(currentScale() || 1)
        return new_move
    }

    const moveY = (element,scale) => {
        let move = currentY() + ((screenInfo().middleY - elementInfo(element).middleY))
        let new_move = (scale*move)/(currentScale() || 1)
        return new_move
    }

    const levelZeroSelec = ({top,left,width}) => {
        const initialSetup = () => {
            setLevel(1)
            setIDFromCurrentFocusedElement(svgRef.current.id)            
            let {layer_name,fixed_sufix} = getFixedSufixAndLayerName('--ps',svgRef.current)
            setHistory(update(history,{
                [1]:{$set:{
                    x:0,
                    y:0,
                    scale:0,
                    name:layer_name,
                    sufix:fixed_sufix,
                    id:svgRef.current.id
                }}
            }))
        }

        const fixContainerPositionAxis = () => {
            return TweenLite.to(containerRef.current,{top,left}).duration(0)
        }

        const changePositionAttr = () => {
            return TweenLite.to(containerRef.current,{position:'absolute'}).duration(0)
        }

        const transformContainerToFocus = () => {
            TweenLite.to(containerRef.current,{
                width:withLimits(screenInfo()).width,
                top:'50%',
                left:'50%',                
                zIndex:'99',
                translateX:'-50%',
                translateY:'-50%',
            }).duration(0.5)
        }

        initialSetup()
        
        fixContainerPositionAxis()
        .then(changePositionAttr)
        .then(transformContainerToFocus)
    }

    const filterTweenLiteTo = (to) => {
        let value = JSON.parse(JSON.stringify(to))
        let scale = value.scale === 0?1:value.scale
        return {
            x:value.x,
            y:value.y,
            scale:scale
        }
    }

    const zoomOnElement = (element:HTMLElement,sufix:string) => {
        setIDFromCurrentFocusedElement(element.id)
        let scale = scaleElement(element)
        let move_x = moveX(element,scale)
        let move_y = moveY(element,scale)
        let next_level = level+1
        let {layer_name,fixed_sufix} = getFixedSufixAndLayerName(sufix,element)
        let to = {
            x:move_x,
            y:move_y,
            scale:scale,
            name:layer_name,
            sufix:fixed_sufix,
            id:element.id
        }
        let value = filterTweenLiteTo(to)
        TweenLite.to(svgRef.current,value).duration(1)
        setLevel(next_level)
        setHistory(update(history,{
            [next_level]:{$set:to}
        }))        
    }

    const toNextLevel = (target:EventTarget,sufix:string) => {
        if(level<=3){
            let element = getElementByLayerSufix(target,sufix)
            if(element){  
                zoomOnElement(element,sufix)
            }
        }
    }

    const selected = (event:Event) => {
        if(level <5){
            event.stopPropagation()
            clickComeFrom(event.target,{
                inside:()=>{
                    toNextLevel(event.target,LEVELS[level])                    
                },
                outside:()=>{
                    toPreviousLevel()
                }
            })
        }
    }

    const toPreviousLevel = () => {
        let previous_level = level-1

        const backToPreviousLevel = () => {
            let to = filterTweenLiteTo(history[previous_level])
            setIDFromCurrentFocusedElement(history[previous_level].id)
            TweenLite.to(svgRef.current,to).duration(1)
            setHistory(update(history,{
                $unset:[level]
            }))
            setLevel(previous_level)
        }

        const backToFullPage = () => {
            setChoosen(null)
            setContextMenu({
                open:false,
                type:'none'
            })
            setLevel(previous_level)
            setHistory({})
        }

        if(level>1 && level <=4){
            backToPreviousLevel()
        }else if(level==1){
            backToFullPage()
        }
    }

    const choosenProcessogram = (event:Event) => {
        event.stopPropagation()
        setChoosen(svgRef.current.id)
    }

    const clickComeFrom = (element:any,{inside,outside}) => {
        let currentParent = svgRef.current.getElementById(idFromCurrentFocusedElement)
        if(level>1){
            if(currentParent.contains(element)){
                inside()
            }else{
                outside()
            }
        }else{
            if(svgRef.current === element){
                outside()
            }else{
                inside()
            }
        }
    }

    const OpenContextMenu = (event:MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        if(level<4){
            let {target,clientX,clientY} = event
            let element = getElementByLayerSufix(target,LEVELS[level])
            if(element){
                let {layer_name,fixed_sufix} = getFixedSufixAndLayerName(LEVELS[level],element)
                
                let {target} = currentState({
                    ...history,
                    [level+1]:{
                        name:layer_name,
                        sufix:fixed_sufix,
                        id:element.id
                    }
                })
                let svg = {name:layer_name,id:element.id}
                setContextMenu({
                    open:true,
                    x:clientX,
                    y:clientY + window.scrollY,
                    document:target,
                    svg,
                    type:'processogram',
                    specie:specie
                })
            }
        }
    }

    const svgOnClick = (event:Event) => {
        choosen?selected(event):choosenProcessogram(event)
    }

    return (
        <>
            <Container ref={containerRef}>
                <Svg 
                    level={LEVELS[level]}
                    innerRef={svgRef} 
                    src={`/assets/svg/zoo/${specie}/${productionSystem}.svg`}                    
                    g_id={idFromCurrentFocusedElement}
                    onClick={svgOnClick}
                    onContextMenu={OpenContextMenu}
                />                    
            </Container>
        </>
    )
}

export default Processogram