import React from 'react'
import HudContext from "@/context/hud-context"
import ProcessogramContext from "@/context/processogram"
import { IContentInformation, getCollectionInformationsByCoolFormat } from "@/utils/processogram"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { TweenLite, gsap } from 'gsap'
gsap.registerPlugin(TweenLite)
import {Container,Title,Description} from './interative-menu-styled'
import { useRef } from 'react'
import voca from 'voca'

const HudInterativeMenu = () => {

    const {stackCoolFormat} = useContext(HudContext)

    const { collection } = useContext(ProcessogramContext)

    const [content,setContent] = useState<IContentInformation>(null)

    const [state,setState] = useState<'minimized'|'full'|'hide'>('minimized')

    const ref = useRef<HTMLDivElement>(null)

    useEffect(()=>{        
        setContent(getCollectionInformationsByCoolFormat(stackCoolFormat,collection))
    },[stackCoolFormat])   

    useEffect(()=>{
        if(ref.current){
            if(state==='minimized'){
                TweenLite.to(ref.current,{width:'100%',translateY:'90%'}).duration(.5)
            }else if(state==='hide'){
                TweenLite.to(ref.current,{width:'5rem'}).duration(.5)
            }else if(state==='full'){
                TweenLite.to(ref.current,{width:'100%',translateY:0}).duration(.5)
            }
        }
    },[state])

    useEffect(()=>{

        console.log(content)

    },[content])

    const onClick = (event:Event) => {   
        event.stopPropagation()
        if(state==='minimized'){    
            setState('full')
        }else{
            setState('minimized')
        }
    }

    

    return (
        content &&
        <Container ref={ref} onClick={onClick} state={state}>            
            <Title>{ voca.titleCase(content.ref_name)}</Title>
            <Description>               
                    {content.ref_description + (content.description || '')}                
            </Description>            
        </Container>        
    )
    
}



export default React.memo(HudInterativeMenu)