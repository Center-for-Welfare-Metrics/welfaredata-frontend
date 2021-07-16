import React from 'react'
import HudContext from "@/context/hud-context"
import ProcessogramContext from "@/context/processogram"
import { IContentInformation, getCollectionInformationsByCoolFormat } from "@/utils/processogram"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"

import { Container,Minimize,Share} from './interative-menu-styled'
import Svg from 'react-inlinesvg'
import useGesture from '@/utils/gestures'
import MenuTabs from './menu-tabs/menu-tabs'
import { SvgPath } from '@/utils/assets_path'
import toast from 'react-hot-toast'
import {CopyToClipboard} from 'react-copy-to-clipboard';

export type IInterativeMenuState = 'minimized'|'full'|'hide'

const HudInterativeMenu = () => {

    const { stackCoolFormat,shareString } = useContext(HudContext)

    const { collection } = useContext(ProcessogramContext)

    const [content,setContent] = useState<IContentInformation>(null)

    const [state,setState] = useState<IInterativeMenuState>('minimized')    

    const [renderTime,setRenderTime] = useState(false)

    const gesture = useGesture(['to-up','to-down'])

    useEffect(()=>{
        if(gesture){
            if(gesture.gesture === 'to-up'){
                setState('full')
            }else if(gesture.gesture === 'to-down'){
                setState('minimized')
            }
        }
    },[gesture])  

    useEffect(()=>{        
        setContent(getCollectionInformationsByCoolFormat(stackCoolFormat,collection))
    },[stackCoolFormat])

    useEffect(()=>{        
        window.addEventListener('keydown', handleKeyDown)
        setTimeout(() => {
            setRenderTime(true)
        }, 500);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }        
    },[])
    

    const handleKeyDown = (event:KeyboardEvent) => {        
        const Action = {
            ArrowUp:()=>setState('full'),
            ArrowDown:()=>setState('minimized')
        }
        try {
            Action[event.key](event)
        } catch (error) {
            
        }        
    }    

    const onClick = (event:Event) => {   
        event.stopPropagation()
        let userSelection = window.getSelection().toString()
        
        if(state==='minimized'){    
            setState('full')
        }else{
            if(userSelection.length ===0){
                setState('minimized')
            }
        }        
    }

    const [copied,setCopied] = useState(0)

    useEffect(()=>{
        if(copied){
            toast.success('Link Copied! Share with your friends!')
        }
    },[copied])
    

    return (
        renderTime && content !== null &&
        <Container onContextMenu={(e)=>e.stopPropagation()} onClick={onClick} state={state}>
            <MenuTabs state={state} content={content} />
            <Minimize state={state}>
                <Svg 
                    src={SvgPath({folder:'minimal-icons',file_name:'maximizer'})}
                />
            </Minimize>
            <CopyToClipboard 
                text={shareString || ''}
                onCopy={()=>{setCopied(copied+1)}}                
            >
                <Share />
            </CopyToClipboard>
        </Container>       
    )
    
}



export default React.memo(HudInterativeMenu)