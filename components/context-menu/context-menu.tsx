import { SvgPath } from '@/utils/assets_path'
import { useContext, useEffect, useRef, useState } from 'react'
import { Container,AttentionBody,FullBackground } from './context-menu-styled'
import { Options, Option,OptionText,OptionIcon } from './context-menu-options-styled'

import { TweenLite, gsap } from 'gsap'
import { needSetInformations } from '@/utils/processogram'
import processogramApi from '@/api/processogram'

import ProcessogramMenu from '@/components/context-menu/processogram-menu/processogram-menu'

import ContextMenuContext from '@/context/context-menu'

gsap.registerPlugin(TweenLite)


interface IContextMenuComponent{
    onClose(event:Event):void
}

const ContextMenu = ({
    onClose
}:IContextMenuComponent) => {

    const containerRef = useRef<HTMLElement>(null) 

    const {contextMenu,setLoading,setTemporary} = useContext(ContextMenuContext)

    useEffect(()=>{
        if(contextMenu.open){
            openContextMenu()
            if(!contextMenu.document){
                if(contextMenu.type === 'processogram'){
                    let {field,name} = needSetInformations(contextMenu.svg?.id)
                    setLoading(true)
                    processogramApi.getOneReference(field,{
                        name:name,
                        specie:contextMenu.specie
                    }).then(({data}) => {
                        setLoading(false)
                        setTemporary(data)
                    }).catch(()=>{
                        setLoading(false)
                    })
                }   
            }
        }
    },[contextMenu])

    const screenInfo = () => {
        let {innerHeight,innerWidth} = window
        console.log(innerHeight)
        return {
            width:innerWidth,
            heihgt:innerHeight
        }
    }

    const elementInfo = () => {
        let {width,height} = containerRef.current.getBoundingClientRect()

        return {width,height}
    }

    const openContextMenu = () => {
        const setAxisPosition = () => {
            return TweenLite.to(containerRef.current,{left:contextMenu.x,top:contextMenu.y}).duration(0)
        }

        const checkIfContextMenuIsOverFlowingScreen = () => {

            const isOverFlowingOnAxis = (axis,size,screenSize) => {
                return (axis+size) > screenSize
            }

            let elInfo = elementInfo()
            let scInfo = screenInfo()
            let translate = {x:'0',y:'0'}
            if(isOverFlowingOnAxis(contextMenu.x,elInfo.width,scInfo.width)){
                translate.x = '-100%'
            }
            console.log(contextMenu.y,elInfo.height)
            if(isOverFlowingOnAxis(contextMenu.y,elInfo.height,scInfo.heihgt + window.scrollY)){
                translate.y = '-100%'
            }

            return TweenLite.to(containerRef.current,{translateX:translate.x,translateY:translate.y}).duration(0)
        }

        const turnContextMenuVisible = () => {
            return TweenLite.to(containerRef.current,{opacity:1}).duration(0)
        }

        setAxisPosition()
        .then(checkIfContextMenuIsOverFlowingScreen)
        .then(turnContextMenuVisible)
    }

    const innerContextMenu = (e:Event) => {
        e.stopPropagation()
        e.preventDefault()
    }

    const innerOnClick = (e:Event) => {
        if(contextMenu.type === 'options'){
            onClose(e)
        }else{            
            e.stopPropagation()
        }
    }

    return (
        <>
            <FullBackground onContextMenu={innerContextMenu} onClick={onClose} />
            <Container type={contextMenu.type} onContextMenu={innerContextMenu} onClick={innerOnClick} ref={containerRef}>
                {
                    contextMenu.type === 'processogram' && 
                    <ProcessogramMenu />
                }                
                {
                    contextMenu.type === 'options' && 
                    <Options>
                        {contextMenu.options?.map(({text,onClick,icon,type})=>
                            <Option type={type} onClick={()=>onClick(contextMenu.optionTarget)} key={text}>
                                <OptionIcon
                                    src={SvgPath({file_name:icon,folder:'minimal-icons'})} 
                                /> 
                                <OptionText>
                                    {text}
                                </OptionText>
                            </Option>
                        )}
                    </Options>
                }       
                {
                    contextMenu.type === 'none' &&
                    <AttentionBody>
                        <>
                            if you perform this action on a element of the processogram, you will be able to obtain more information, links to bibliography, videos - and even provide us with feedback about that element!
                        </>
                    </AttentionBody>
                }                     
            </Container>
        </>
    )
}



export default ContextMenu