import { SvgPath } from '@/utils/assets_path'
import { useEffect, useRef, useState } from 'react'
import { Container,Body,AttentionBody,Footer,ButtonNavigator,ButtonIcon,FullBackground,CustomLoader } from './context-menu-styled'
import { Options, Option,OptionText,OptionIcon } from './context-menu-options-styled'
import { IContextMenu } from '@/context/context-menu'
import voca from 'voca'

import { TweenLite, gsap } from 'gsap'
import { needSetInformations, showOnScreen } from '@/utils/processogram'
import processogramApi from '@/api/processogram'
import theme from 'theme/schema.json'
gsap.registerPlugin(TweenLite)

const map_buttons_navigation = [
    {
        title:'Charts',
        src:SvgPath({file_name:'barchart',folder:'icons'})
    },
    {
        title:'Media',
        src:SvgPath({file_name:'media',folder:'icons'})
    },
    {
        title:'Sources',
        src:SvgPath({file_name:'books',folder:'icons'})
    },
    {
        title:'Feedback',
        src:SvgPath({file_name:'pencil',folder:'icons'})
    }
]

interface IContextMenuComponent{
    infos?:IContextMenu
    onClose(event:Event):void
}

const ContextMenu = ({
    infos=null,
    onClose
}:IContextMenuComponent) => {

    const containerRef = useRef<HTMLElement>(null)

    const [temporary,setTemporary] = useState<any>(null)

    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        if(infos.open){
            openContextMenu()
            if(!infos.document){
                if(infos.type === 'processogram'){
                    let {field,name} = needSetInformations(infos.svg?.id)
                    setLoading(true)
                    processogramApi.getOneReference(field,{
                        name:name,
                        specie:infos.specie
                    }).then(({data}) => {
                        setLoading(false)
                        setTemporary(data)
                    }).catch(()=>{
                        setLoading(false)
                    })
                }   
            }
        }
    },[infos])

    const screenInfo = () => {
        let {innerHeight,innerWidth} = window

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
            return TweenLite.to(containerRef.current,{left:infos.x,top:infos.y}).duration(0)
        }

        const checkIfContextMenuIsOverFlowingScreen = () => {

            const isOverFlowingOnAxis = (axis,size,screenSize) => {
                return (axis+size) > screenSize
            }

            let elInfo = elementInfo()
            let scInfo = screenInfo()
            let translate = {x:'0',y:'0'}
            if(isOverFlowingOnAxis(infos.x,elInfo.width,scInfo.width)){
                translate.x = '-100%'
            }
            if(isOverFlowingOnAxis(infos.y,elInfo.height,scInfo.heihgt + window.scrollY)){
                translate.y = '-100%'
            }

            return TweenLite.to(containerRef.current,{transform:`translate(${translate.x},${translate.y})`}).duration(0)
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
        if(infos.type === 'options'){
            onClose(e)
        }else{
            console.log(e)
            e.stopPropagation()
        }
    }

    const getPossibleFieldReference = () => {
        let {field} = needSetInformations(infos.svg?.id)

        return field
    }

    return (
        <>
            <FullBackground onContextMenu={innerContextMenu} onClick={onClose} />
            <Container type={infos.type} onContextMenu={innerContextMenu} onClick={innerOnClick} ref={containerRef}>
                {
                    infos.type === 'processogram' && 
                    <Body>
                        {
                            loading?
                            (
                                <CustomLoader 
                                    color={theme.default.colors.local_pink}
                                    type='ThreeDots'
                                    height={100}
                                    width={100}   
                                />
                            )
                            :
                            (
                                infos && (infos.document || temporary)?
                                (<>
                                    { voca.capitalize(showOnScreen('name',(infos.document || temporary),getPossibleFieldReference()))}: {showOnScreen('description',(infos.document || temporary),getPossibleFieldReference()) || 'No description'}
                                </>
                                )
                                :
                                (
                                <>
                                    No informations. <br/>
                                    Name on svg: {infos.svg?.name}
                                </>
                                )
                            )
                        }                        
                    </Body>
                }                
                {
                    infos.type === 'processogram' && 
                    <Footer>
                    {
                        map_buttons_navigation.map((button_navigator) => (
                            <ButtonNavigator key={button_navigator.title}>
                                <ButtonIcon src={button_navigator.src} title={button_navigator.title} />
                            </ButtonNavigator>
                        ))
                    }                    
                    </Footer>
                }
                {
                    infos.type === 'options' && 
                    <Options>
                        {infos.options?.map(({text,onClick,icon,type})=>
                            <Option type={type} onClick={()=>onClick(infos.optionTarget)} key={text}>
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
                    infos.type === 'none' &&
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