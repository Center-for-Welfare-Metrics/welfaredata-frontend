import { useContext, useEffect, useRef, useState } from 'react'
import { TweenLite, gsap } from 'gsap'
import { Container,Svg } from './processogram-styled'
import ProcessogramContext from '@/context/processogram'
import { getElementByLayerSufix,getFixedSufixAndLayerName } from '@/utils/processogram';
import update from 'immutability-helper'
import ContextMenu from '../context-menu';

gsap.registerPlugin(TweenLite)

interface IProcessogram {
    file_name:string
}

const LEVELS = ['--ps','--lf','--ph','--ci','-last-']

const innerLevels = ['','lf','ph','ci']

const MARGIN_LIMIT_X = 200

const MARGIN_LIMIT_Y = 200

const POSITIONS_BY_LEVEL = {
    1:'bottom-right',
    2:'bottom-left',
    3:'bottom-right',
    4:'top-left'
}

const Processogram = ({file_name}:IProcessogram) => {

    const {choosen,setChoosen,pageScrollY,generateShareLink,processogramTreeFromQuery,setProcessogramTreeFromQuery,getFigureRealInformations} = useContext(ProcessogramContext)

    const [level,setLevel] = useState(0)

    const [history,setHistory] = useState({})

    const svgRef = useRef(null)

    const [contextMenuOpen,setContextMenuOpen] = useState(false)

    const containerRef = useRef<HTMLElement>(null)

    const [levelZeroInfo,setLevelZeroInfo] = useState({top:0,left:0})

    const [firstLoad,setFirstLoad] = useState(false)

    const [idFromCurrentFocusedElement,setIDFromCurrentFocusedElement] = useState('')

    const [figureRealInformations,setFigureRealInformations] = useState(null)

    const [figureSvgInformations,setFigureSvgInformations] = useState(null)

    useEffect(()=>{
        if(choosen){
            let info = containerInfo()
            setLevelZeroInfo(info)
            setFirstLoad(true)
            if(imChoosen(choosen)){                  
                levelZeroSelec(info)                                                 
            }else{
                hideContainer(info)
            }
        }else{
            if(firstLoad){
                moveContainerToDefaultPosition()
            }
        }
    },[choosen])

    useEffect(()=>{
        if(hasHistory()){
            generateShareLink(history)
            captureFigureInformations()
            if(processogramTreeFromQuery){
                cameFromSharedLink()
            }
        }
    },[history])

    const captureFigureInformations = () => {
        let informations = getFigureRealInformations(history)
        setFigureRealInformations(informations)
        setFigureSvgInformations({name:history[level].name})
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
        let { top,left } = levelZeroInfo

        const backContainerToOriginalWidthAndAxisPosition = () => {
            return TweenLite.to(containerRef.current,{top,left,width:'60rem',display:'block',transform:'translate(0,0)'})
        }

        const toTotalOpacity = () => {
            return TweenLite.to(containerRef.current,{opacity:'1'})
        }

        const toStaticPosition = () => {
            return TweenLite.to(containerRef.current,{position:'static'}).duration(0)
        }

        const setPageOriginalScrollY = () => {
            window.scrollTo(0,pageScrollY)
        }

        backContainerToOriginalWidthAndAxisPosition()
        .then(toTotalOpacity)
        .then(toStaticPosition)
        .then(setPageOriginalScrollY)
    }

    const hideContainer = ({top,left}) => {
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
        let {innerWidth,innerHeight} = window
        return {
            width:innerWidth,
            height:innerHeight,
            middleX:(innerWidth/2),
            middleY:(innerHeight/2)
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
        let {top,left} = containerRef.current.getBoundingClientRect()
        return {top,left}
    }

    const currentName = () => {
        return history[level]?.name
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

    const levelZeroSelec = ({top,left}) => {
        const initialSetup = () => {
            setLevel(1)
            setIDFromCurrentFocusedElement(svgRef.current.id)
            setContextMenuOpen(true)
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
            return TweenLite.to(containerRef.current,{position:'fixed'}).duration(0)
        }

        const transformContainerToFocus = () => {
            TweenLite.to(containerRef.current,{
                width:'90%',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                zIndex:'99'
            }).duration(1)
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

    const levelChanger = (target:EventTarget,sufix:string) => {
        let element = getElementByLayerSufix(target,sufix)
        if(element){  
            zoomOnElement(element,sufix)
        }
    }

    const selected = ({target}:React.MouseEvent<SVGElement,MouseEvent>) => {
        if(level<=3){
            levelChanger(target,LEVELS[level])
        }
    }

    const toPreviousLevel = (event:React.MouseEvent<HTMLElement,MouseEvent>) => {
        event.preventDefault()
        let previous_level = level-1

        const backToPreviousLevel = () => {
            let to = filterTweenLiteTo(history[previous_level])
            TweenLite.to(svgRef.current,to).duration(1)
            setHistory(update(history,{
                $unset:[level]
            }))
            setLevel(previous_level)
        }

        const backToFullPage = () => {
            setChoosen(null)
            setContextMenuOpen(false)
            setLevel(previous_level)
            setHistory({})
        }

        if(level>1){
            backToPreviousLevel()
        }else if(level==1){
            backToFullPage()
        }
    }

    const choosenProcessogram = () => {
        setChoosen(svgRef.current.id)
    }

    return (
        <>
            <Container ref={containerRef}>
                <Svg 
                    level={LEVELS[level]}
                    innerRef={svgRef} 
                    src={`/assets/svg/zoo/${file_name}`}
                    onClick={choosen?selected:choosenProcessogram}
                    onContextMenu={toPreviousLevel}
                    g_id={idFromCurrentFocusedElement}
                />                    
            </Container>
            {
                contextMenuOpen && <ContextMenu figureInfo={figureSvgInformations} informations={figureRealInformations} position={POSITIONS_BY_LEVEL[level]} visible={contextMenuOpen} />
            }
        </>
    )
}

export default Processogram