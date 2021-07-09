import React from 'react'
import HudContext from '@/context/hud-context'
import { ICoolFormat, translateStackToCoolFormat } from '@/utils/processogram'
import HudControls from './controls'
import HudTreeControl from './hud-tree-control'
import { Container } from './hud-styled'
import { useEffect } from 'react'
import { useState } from 'react'
import HudInterativeMenu from './interative-menu'

interface IProcessogramHud{
    element:Element
    onChange(change):void
    level:number
    stack:string[],
    isMoving:boolean
}

const ProcessogramHud = ({
    element,
    onChange,
    level,
    stack,
    isMoving
}:IProcessogramHud) => {

    const elementRect = element.getBoundingClientRect()

    const [stackCoolFormat,setStackCoolFormat] = useState<ICoolFormat[]>([])

    const [interativeMenuDelay,setInterativeMenuDelay] = useState(false)

    useEffect(()=>{        
        setTimeout(() => {
            setInterativeMenuDelay(true)
        }, 700);
    },[])

    useEffect(()=>{
        setStackCoolFormat(translateStackToCoolFormat(stack))        
    },[stack])

    return (
        <HudContext.Provider value={{element,onChange,stackCoolFormat}}>
            {
                !isMoving &&
                <Container style={{
                    top:elementRect.top,
                    width:elementRect.width,
                    height:elementRect.height,
                    left:elementRect.left
                }}>
                    {level>=3 && <HudControls />}                
                </Container>
            }
            <HudTreeControl />
            {
                interativeMenuDelay &&
                <HudInterativeMenu />          
            }
        </HudContext.Provider>
    )
}


export default React.memo(ProcessogramHud)