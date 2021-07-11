import { SvgPath } from '@/utils/assets_path'
import { useEffect } from 'react'
import { ToLeft,ToRight } from './controls-styled'
import { getElementViewBox } from '../processogram-helpers'

import SVG from 'react-inlinesvg'
import { useContext } from 'react'
import HudContext from '@/context/hud-context'
import { normalizeElementNameByGivingID } from '@/utils/processogram'
import useGesture from '@/utils/gestures'



const HudControls = () => {

    const { element,onChange } = useContext(HudContext)        

    
    useEffect(()=>{        
        document.onkeydown = handleKeyDown
        return () => {
            document.onkeydown = null
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

    const getPreviousSiblingFrom = (element:Element) => {
        let previous_sibling = element.nextElementSibling as any

        let siblingElementName = normalizeElementNameByGivingID(previous_sibling?.id)
        let elementName = normalizeElementNameByGivingID(element.id)

        if(siblingElementName===elementName) return getNextSiblingFrom(previous_sibling)

        return previous_sibling
    }

    const getNextSiblingFrom = (element:Element) => {
        let next_sibling = element.previousElementSibling as any

        let siblingElementName = normalizeElementNameByGivingID(next_sibling?.id)
        let elementName = normalizeElementNameByGivingID(element.id)

        if(siblingElementName===elementName) return getNextSiblingFrom(next_sibling)

        return next_sibling
    }

    return (
        <>
             {getNextSiblingFrom(element) && 
                <ToRight  onClick={toNextSibling}>
                    <SVG 
                        src={SvgPath({file_name:'right-arrow',folder:'minimal-icons'})}
                    />
                </ToRight>
                
            }
            {getPreviousSiblingFrom(element) && 
            <ToLeft  onClick={toPreviousSibling}>
                <SVG
                    src={SvgPath({file_name:'right-arrow',folder:'minimal-icons'})}
                />
            </ToLeft>    
            }
        </>
    )
}


export default HudControls