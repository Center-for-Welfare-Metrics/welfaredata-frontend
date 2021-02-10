import { SvgIcons } from '@/utils/assets_path'
import { useEffect, useRef, useState } from 'react'
import { Container,Body,Footer,ButtonNavigator,ButtonIcon,FullBackground } from './index-styled'

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
    infos:any,
    onClose(event:Event):void
}

const ContextMenu = ({
    infos,
    onClose
}:IContextMenu) => {

    const containerRef = useRef<HTMLElement>(null)


    useEffect(()=>{
        if(infos.open){
            TweenLite.to(containerRef.current,{left:infos.x,top:infos.y}).duration(0)
            .then(()=>{
                TweenLite.to(containerRef.current,{opacity:1}).duration(0)
            })            
        }
    },[infos])

    return (
        <>
            <FullBackground onClick={onClose} />
            <Container ref={containerRef}>
                <Body>
                    {
                        infos && infos.document?
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
                        )
                    }
                </Body>            
                <Footer>
                    {
                        map_buttons_navigation.map((button_navigator) => (
                            <ButtonNavigator key={button_navigator.title}>
                                <ButtonIcon src={button_navigator.src} title={button_navigator.title} />
                            </ButtonNavigator>
                        ))
                    }
                    
                </Footer>
            </Container>
        </>
    )
}



export default ContextMenu