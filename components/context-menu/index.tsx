import { SvgIcons } from '@/utils/assets_path'
import { useEffect, useRef, useState } from 'react'
import { Container,Body,AttentionBody,Footer,ButtonNavigator,ButtonIcon,FullBackground } from './index-styled'

import voca from 'voca'

import { TweenLite, gsap } from 'gsap'

gsap.registerPlugin(TweenLite)

const map_buttons_navigation = [
    {
        title:'Charts',
        src:SvgIcons('barchart')
    },
    {
        title:'Media',
        src:SvgIcons('media')
    },
    {
        title:'Sources',
        src:SvgIcons('books')
    },
    {
        title:'Feedback',
        src:SvgIcons('pencil')
    }
]

interface IContextMenu{
    infos?:any
    onClose(event:Event):void
    attention?:boolean
}

const ContextMenu = ({
    infos=null,
    onClose,
    attention=false
}:IContextMenu) => {

    const containerRef = useRef<HTMLElement>(null)

    useEffect(()=>{
        if(infos.open){
            openContextMenu()           
        }
    },[infos])

    const screenInfo = () => {
        let {innerHeight,innerWidth} = window

        return {
            width:innerWidth,
            heihgt:innerHeight
        }
    }

    const elementInfo = () => {
        let {width,height} = containerRef.current.getBoundingClientRect()

        return {width,height}
    }

    const openContextMenu = () => {
        const setAxisPosition = () => {
            return TweenLite.to(containerRef.current,{left:infos.x,top:infos.y}).duration(0)
        }

        const checkIfContextMenuIsOverFlowingScreen = () => {

            const isOverFlowingOnAxis = (axis,size,screenSize) => {
                return (axis+size) > screenSize
            }

            let elInfo = elementInfo()
            let scInfo = screenInfo()
            let translate = {x:'0',y:'0'}
            if(isOverFlowingOnAxis(infos.x,elInfo.width,scInfo.width)){
                translate.x = '-100%'
            }
            if(isOverFlowingOnAxis(infos.y,elInfo.height,scInfo.heihgt)){
                translate.y = '-100%'
            }

            return TweenLite.to(containerRef.current,{transform:`translate(${translate.x},${translate.y})`}).duration(0)
        }

        const turnContextMenuVisible = () => {
            return TweenLite.to(containerRef.current,{opacity:1}).duration(0)
        }

        setAxisPosition()
        .then(checkIfContextMenuIsOverFlowingScreen)
        .then(turnContextMenuVisible)
    }

    const innerContextMenu = (e:Event) => {
        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <>
            <FullBackground onContextMenu={innerContextMenu} onClick={onClose} />
            <Container onContextMenu={innerContextMenu} onClick={(e:Event)=>e.stopPropagation()} ref={containerRef}>
                {
                    !attention?
                    <Body>
                        {infos && infos.document?
                        (<>
                            { voca.capitalize(infos.document.name)}: {infos.document.description || 'No description'}
                        </>
                        )
                        :
                        (
                        <>
                            No informations. <br/>
                            Name on svg: {infos.svg?.name}
                        </>
                        )}
                    </Body>
                    :
                    <AttentionBody>
                        <>
                            if you perform this action on a element of the processogram, you will be able to obtain more information, links to bibliography, videos - and even provide us with feedback about that element!
                        </>
                    </AttentionBody>
                }
                {
                    !attention && 
                    <Footer>
                    {
                        map_buttons_navigation.map((button_navigator) => (
                            <ButtonNavigator key={button_navigator.title}>
                                <ButtonIcon src={button_navigator.src} title={button_navigator.title} />
                            </ButtonNavigator>
                        ))
                    }                    
                    </Footer>
                }                            
            </Container>
        </>
    )
}



export default ContextMenu