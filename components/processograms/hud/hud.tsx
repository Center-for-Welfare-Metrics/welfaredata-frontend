import React, { useRef } from 'react'
import HudContext from '@/context/hud-context'
import { getLevelNameByGivingID, ICoolFormat, normalizeElementNameByGivingID, translateStackToCoolFormat } from '@/utils/processogram'
import HudControls from './controls'
import HudTreeControl from './hud-tree-control'
import { Container } from './hud-styled'
import { useEffect } from 'react'
import { useState } from 'react'
import HudInterativeMenu from './interative-menu/interative-menu'
import { ImainState } from '@/context/processogram'

import update from 'immutability-helper'

interface IProcessogramHud{
    element:Element
    onChange(change:ImainState):void
    level:number
    stack:string[],
    isMoving:boolean
    shareString:string
    onHover:string
}

const ProcessogramHud = ({
    element,
    onChange,
    level,
    stack,
    isMoving,
    shareString,
    onHover
}:IProcessogramHud) => {

    const elementRect = element.getBoundingClientRect()

    const [stackCoolFormat,setStackCoolFormat] = useState<ICoolFormat[]>([])    

    const delay = useRef(null)

    useEffect(()=>{
        setStackCoolFormat(translateStackToCoolFormat(stack))        
    },[stack])

    useEffect(()=>{
        if(stack.length>0){       
            clearTimeout(delay.current)
            delay.current = setTimeout(() => {
                if(onHover){
                    if(level<3){
                        let x : ICoolFormat = {
                            domID:onHover,
                            elementName:normalizeElementNameByGivingID(onHover),
                            levelName:getLevelNameByGivingID(onHover),
                            level:level+1
                        }
                        setStackCoolFormat(update(stackCoolFormat,{
                            [level+1]:{$set:x}
                        }))
                    }
                }else{
                    setStackCoolFormat(translateStackToCoolFormat(stack))  
                }
            }, 100);
        }
    },[onHover])

    return (
        <HudContext.Provider value={{element,onChange,stackCoolFormat,shareString}}>
            {
                !isMoving &&
                <Container style={{
                    top:elementRect.top,
                    width:elementRect.width,
                    height:elementRect.height,
                    left:elementRect.left
                }}>
                    {level>=2 && <HudControls />}                
                </Container>
            }
            <HudTreeControl />                            
            <HudInterativeMenu />
        </HudContext.Provider>
    )
}


export default React.memo(ProcessogramHud)