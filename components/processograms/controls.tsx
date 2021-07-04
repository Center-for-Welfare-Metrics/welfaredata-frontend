import { SvgPath } from '@/utils/assets_path'
import { useEffect } from 'react'
import { Container,ToLeft,ToRight } from './controls-styled'
import { getElementViewBox } from './processogram-helpers'

import SVG from 'react-inlinesvg'
interface IProcessogramControls{
    element:Element
    onChange(change):void
}

const ProcessogramControls = ({
    element,
    onChange,
}:IProcessogramControls) => {

    const elementRect = element.getBoundingClientRect()

    useEffect(()=>{        
        document.onkeydown = handleKeyDown
    },[])

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

        return previous_sibling
    }

    const getNextSiblingFrom = (element:Element) => {
        let previous_sibling = element.previousElementSibling as any

        return previous_sibling
    }

    return (
        <Container style={{
            top:elementRect.top,
            width:elementRect.width,
            height:elementRect.height,
        }}>
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
        </Container>
    )
}


export default ProcessogramControls