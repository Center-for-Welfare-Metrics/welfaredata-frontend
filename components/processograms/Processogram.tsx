import { useContext, useEffect, useRef, useState } from 'react'
import { TweenLite, gsap } from 'gsap'
import { Container,Svg } from './processogramStyled'
import ProcessogramContext from '@/context/processogram'
import { getElementByLayerSufix } from '@/utils/processogram';
import update from 'immutability-helper'

gsap.registerPlugin(TweenLite)

interface IProcessogram {
    file_name:string
}

const LEVELS = ['--ps','--lf','--ph','--ci']

const MARGIN_LIMIT_X = 200

const MARGIN_LIMIT_Y = 200

const Processogram = ({file_name}:IProcessogram) => {

    const {choosen,setChoosen} = useContext(ProcessogramContext)

    const [level,setLevel] = useState(0)

    const [history,setHistory] = useState({1:{x:0,y:0,scale:0}})

    const svgRef = useRef(null)

    const containerRef = useRef<HTMLElement>(null)

    useEffect(()=>{
        if(choosen){
            if(choosen===file_name){
                levelZeroSelec()
            }else{
                TweenLite.to(containerRef.current,{
                    opacity:'0'
                }).then(()=>{
                    TweenLite.to(containerRef.current,{
                        display:'none'
                    })
                })
            }
        }else{
            TweenLite.to(containerRef.current,{
                display:'block',
                width:'60rem',
                position:'static',
                transform:'translate(0,0)'
            }).then(()=>{
                TweenLite.to(containerRef.current,{
                    opacity:'1'
                })
            })
        }
    },[choosen])

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

    const currentScale = () => {
        return history[level].scale
    }
    
    const currentX = () => {
        return history[level].x
    }

    const currentY = () => {
        return history[level].y
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

    const levelZeroSelec = () => {
        setLevel(1)
        let {top,left} = containerRef.current.getBoundingClientRect()
        TweenLite.fromTo(containerRef.current,{
            top,left
        },{
            width:'90%',
            position:'fixed',
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)',
            zIndex:'999'
        })
    }

    const zoomOnElement = (element:HTMLElement) => {
        let scale = scaleElement(element)
        let move_x = moveX(element,scale)
        let move_y = moveY(element,scale)
        if(true){
            let next_level = level+1
            let to = {
                x:move_x,
                y:move_y,
                scale:scale
            }
            setHistory(update(history,{
                [next_level]:{$set:to}
            }))
            setLevel(next_level)
            let value = JSON.parse(JSON.stringify(to))
            TweenLite.to(svgRef.current,value)
        }
    }

    const levelChanger = (target:EventTarget,sufix:string) => {
        let element = getElementByLayerSufix(target,sufix)
        if(element){  
            zoomOnElement(element)
        }
    }

    const selected = ({target}:React.MouseEvent<SVGElement,MouseEvent>) => {
        if(level<=3){
            levelChanger(target,LEVELS[level])
        }
    }

    const contextMenu = (event:React.MouseEvent<HTMLElement,MouseEvent>) => {
        event.preventDefault()
        let previous_level = level-1
        if(level>1){
            let to = JSON.parse(JSON.stringify(history[previous_level]))
            to.scale = to.scale === 0?1:to.scale
            TweenLite.to(svgRef.current,to)
            setLevel(previous_level)
        }else if(level==1){
            setChoosen(null)
            setLevel(previous_level)
        }
    }

    return (
        <Container ref={containerRef}>
            <Svg 
                level={LEVELS[level]}
                innerRef={svgRef} 
                src={`/assets/svg/zoo/${file_name}`}
                onClick={choosen?selected:()=>setChoosen(file_name)}
                onContextMenu={contextMenu}
            />     
        </Container>
    )
}


export default Processogram