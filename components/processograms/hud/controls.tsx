import { SvgPath } from '@/utils/assets_path'
import { useEffect } from 'react'
import { ToLeft,ToRight } from './controls-styled'
import { getElementViewBox } from '../processogram-helpers'

import SVG from 'react-inlinesvg'
import { useContext } from 'react'
import HudContext from '@/context/hud-context'
import { getNextSiblingFrom, getPreviousSiblingFrom } from '@/utils/processogram'
import useGesture from '@/utils/gestures'


const HudControls = () => {

    const { element,onChange } = useContext(HudContext)        

    
    useEffect(()=>{        
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    },[])
    
    const gesture = useGesture(['to-left','to-right'])
    
    useEffect(()=>{
        if(gesture){
            if(gesture.gesture === 'to-left'){
                toPreviousSibling(gesture.target)
            }else if(gesture.gesture === 'to-right'){
                toNextSibling(gesture.target)
            }
        }
    },[gesture])    
    
    const handleKeyDown = (event:KeyboardEvent) => {
        const Action = {
            ArrowLeft:toPreviousSibling,
            ArrowRight:toNextSibling
        }
        try {
            Action[event.key](event)
        } catch (error) {
            
        }        
    }

    const toPreviousSibling = (event:Event) => {
        event.stopPropagation()        
        let previous_sibling = getPreviousSiblingFrom(element)
        if(previous_sibling){
            let viewBox = getElementViewBox(previous_sibling)
            onChange({
                viewBox,
                currentDomID:previous_sibling.id
            })            
        }        
    }

    const toNextSibling = (event:Event) => {
        event.stopPropagation()
        let next_sibling = getNextSiblingFrom(element)       
        if(next_sibling){
            let viewBox = getElementViewBox(next_sibling)  
            onChange({
                viewBox,
                currentDomID:next_sibling.id
            })        
        }
    }

    return (
        <>
             {getNextSiblingFrom(element) && 
                <ToRight onClick={toNextSibling}>
                    <SVG 
                        src={SvgPath({file_name:'right-arrow',folder:'minimal-icons'})}
                    />
                </ToRight>                
            }
            {getPreviousSiblingFrom(element) && 
            <ToLeft onClick={toPreviousSibling}>
                <SVG
                    src={SvgPath({file_name:'right-arrow',folder:'minimal-icons'})}
                />
            </ToLeft>    
            }
        </>
    )
}


export default HudControls