import { SvgIcons } from '@/utils/assets_path'
import { useEffect, useRef, useState } from 'react'
import { Container,Body,Footer,ButtonNavigator,ButtonIcon } from './index-styled'

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

const POSITIONS = {
    'bottom-right':{
        bottom:'2rem',
        right:'2rem',
        top:'initial',
        left:'initial'
    },
    'bottom-left':{
        bottom:'2rem',
        left:'2rem',
        top:'initial',
        right:'initial'
    },
    'top-right':{
        top:'2rem',
        right:'2rem',
        bottom:'initial',
        left:'initial'
    },
    'top-left':{
        top:'2rem',
        left:'2rem',
        bottom:'initial',
        right:'initial'
    }
}

interface IContextMenu{
    position:string
    visible?:boolean
    informations:any,
    figureInfo:any
}

const ContextMenu = ({
    position,
    visible=false,
    informations,
    figureInfo
}:IContextMenu) => {

    const containerRef = useRef<HTMLElement>(null)

    const [stateInformations,setStateInformations] = useState(informations)

    useEffect(()=>{
        if(visible){
            TweenLite.to(containerRef.current,{opacity:1}).delay(0.5).duration(0.5)
        }
    },[visible])

    useEffect(()=>{
        if(visible){
            let to = getPosition(position)
            TweenLite.to(containerRef.current,{opacity:0})
            .duration(0.5)
            .then(()=>{                
                setStateInformations(informations)                
                TweenLite.to(containerRef.current,to).duration(0)
                TweenLite.to(containerRef.current,{opacity:1}).duration(0.5)
            })
        }
    },[informations])

    const getPosition = (position='bottom-right') => {
        return JSON.parse(JSON.stringify(POSITIONS[position]))
    }

    return (
        <Container ref={containerRef} display={visible?'block':'none'}>
            
            <Body>
                {
                    stateInformations?
                    (<>
                        { voca.capitalize(stateInformations.name)}: {stateInformations.description || 'No description'}
                    </>
                    )
                    :
                    (<>
                        No informations. <br/>
                        Name on svg: {figureInfo?.name}
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
    )
}



export default ContextMenu