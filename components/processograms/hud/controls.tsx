import { SvgPath } from '@/utils/assets_path'
import { useEffect } from 'react'
import { ToLeft,ToRight } from './controls-styled'
import { getElementViewBox } from '../processogram-helpers'

import SVG from 'react-inlinesvg'
import { useContext } from 'react'
import HudContext from '@/context/hud-context'
import { normalizeElementNameByGivingID } from '@/utils/processogram'

const HudControls = () => {

    const { element,onChange } = useContext(HudContext)        

    let initial_touch_position_x = 0 

    useEffect(()=>{        
        document.onkeydown = handleKeyDown
        document.ontouchstart = touchStart
        document.ontouchend = touchEnd
        return () => {
            document.ontouchstart = null
            document.ontouchend = null
        }
    },[])

    const touchStart = (event:TouchEvent) => {
        initial_touch_position_x = event.changedTouches[0].clientX
    }

    const touchEnd = (event:TouchEvent) => {
        let final_touch_position_x = event.changedTouches[0].clientX
        let drag_size = final_touch_position_x - initial_touch_position_x
        
        if(Math.abs(drag_size)>50){   
            event.stopPropagation()         
            if(drag_size>0){
                toPreviousSibling(event)
            }else{
                toNextSibling(event)                
            }
        }
    }
    
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
                innerCurrent:previous_sibling.id
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
                innerCurrent:next_sibling.id
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