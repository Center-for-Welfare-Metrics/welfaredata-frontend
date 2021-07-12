import React from 'react'
import HudContext from "@/context/hud-context"
import ProcessogramContext from "@/context/processogram"
import { IContentInformation, getCollectionInformationsByCoolFormat } from "@/utils/processogram"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"

import {Container} from './interative-menu-styled'
import { useRef } from 'react'
import useGesture from '@/utils/gestures'
import MenuTabs from './menu-tabs/menu-tabs'

export type IInterativeMenuState = 'minimized'|'full'|'hide'

const HudInterativeMenu = () => {

    const {stackCoolFormat} = useContext(HudContext)

    const { collection } = useContext(ProcessogramContext)

    const [content,setContent] = useState<IContentInformation>(null)

    const [state,setState] = useState<IInterativeMenuState>('minimized')    

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


    const onClick = (event:Event) => {   
        event.stopPropagation()
        if(state==='minimized'){    
            setState('full')
        }else{
            setState('minimized')
        }
    }

    

    return (
        content !== null &&
        <Container onClick={onClick} state={state}>
            <MenuTabs state={state} content={content} />
        </Container>        
    )
    
}



export default React.memo(HudInterativeMenu)