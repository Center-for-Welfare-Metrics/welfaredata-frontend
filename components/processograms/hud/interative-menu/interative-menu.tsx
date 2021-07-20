import React from 'react'
import HudContext from "@/context/hud-context"
import ProcessogramContext from "@/context/processogram"
import { IContentInformation, getCollectionInformationsByCoolFormat, ICoolFormat } from "@/utils/processogram"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"

import { Container,Minimize,Share,CopyTo} from './interative-menu-styled'
import Svg from 'react-inlinesvg'
import useGesture from '@/utils/gestures'
import MenuTabs from './menu-tabs/menu-tabs'
import { SvgPath } from '@/utils/assets_path'
import toast from 'react-hot-toast'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { createContext } from 'react'
import { ISpecie } from '../../processogram-list'

export type IInterativeMenuState = 'minimized'|'full'|'hide'

export interface IInterativeMenu {
    stackCoolFormat:ICoolFormat[]
    shareString:string
    specie:ISpecie
}

export const InterativeMenuContext = createContext<IInterativeMenu>(null)

const InterativeMenu = ({
    stackCoolFormat,
    shareString,
    specie
}) => {    

    const { collection } = useContext(ProcessogramContext)

    const [ content,setContent ] = useState<IContentInformation>(null)

    const [ state,setState ] = useState<IInterativeMenuState>('minimized')

    const [ renderTime,setRenderTime ] = useState(false)

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
       let content =  getCollectionInformationsByCoolFormat(stackCoolFormat,collection)
       setContent(content)
       if(content===null){
           setContent(specie)
       }
    },[stackCoolFormat])

    useEffect(()=>{                
        setTimeout(() => {
            setRenderTime(true)
        }, 500);        
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
        <InterativeMenuContext.Provider value={{shareString,stackCoolFormat,specie}}>
            <Container onContextMenu={(e)=>e.stopPropagation()} onClick={onClick} state={state}>
                <MenuTabs state={state} content={content} />
                <Minimize state={state}>
                    <Svg 
                        src={SvgPath({folder:'minimal-icons',file_name:'maximizer'})}
                    />
                </Minimize>
                <CopyTo onClick={(e)=>e.stopPropagation()}>
                    <CopyToClipboard 
                        text={shareString || ''}
                        onCopy={()=>{setCopied(copied+1)}}                
                    >
                        <Share />
                    </CopyToClipboard>
                </CopyTo>
            </Container>     
        </InterativeMenuContext.Provider>
    )
    
}



export default React.memo(InterativeMenu)