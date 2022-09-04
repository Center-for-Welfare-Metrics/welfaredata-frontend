import { useState } from "react"
import { IContentInformation } from "@/utils/processogram"
import { Container, TabIconsContainer, TabIcon,Body, TabIconSizeFix} from './menu-tabs-styled'
import DescriptionTab from "./description-tab"

import Svg from 'react-inlinesvg'
import { SvgPath } from "@/utils/assets_path"
import { IInterativeMenuState } from "../interative-menu"
import MediaTab from "./media-tab"
import React from "react"
import { useEffect } from "react"
import FeedbackTab from "./feedback-tab"
type tabOptions = 'description' | 'media'|'feedback'



const TabIcons = ({TabIconClick,tab,hasMedia,state}) => {

    return (
        <TabIconsContainer state={state}>
            <TabIconSizeFix state={state} active={tab==='description'} onClick={TabIconClick('description')}>
                <Svg 
                    src={SvgPath({
                        folder:'icons',
                        file_name:'information'
                    })}
                />
            </TabIconSizeFix>
            { hasMedia && 
                <TabIcon state={state} active={tab==='media'} onClick={TabIconClick('media')}>
                    <Svg 
                        src={
                            SvgPath({
                                folder:'icons',
                                file_name:'media-outline'
                            })
                        }
                    />
                </TabIcon>
            }
            <TabIcon state={state} active={tab==='feedback'} onClick={TabIconClick('feedback')}>
                <Svg 
                    src={
                        SvgPath({
                            folder:'icons',
                            file_name:'feedback'
                        })
                    }
                />
            </TabIcon>
        </TabIconsContainer>
    )
}

const TabIconsMemo = React.memo(TabIcons)

interface IMenutabs{
    content:IContentInformation
    state:IInterativeMenuState
}

const MenuTabs = ({content,state}:IMenutabs) => {

    const [tab,setTab] = useState<tabOptions>('description')

    useEffect(()=>{
        if(tab==='media'){
            if(mediasCount()===0){
                setTab('description')
            }
        }
    },[content])

    useEffect(() => {
        if(state==='minimized'){
            setTab('description')
        }
    },[state])

    const BodyTouchStart = (event) => {        
        if(event.currentTarget.scrollTop > 0){
            event.stopPropagation()
        }        
    }

    const TabIconClick = (tab:tabOptions) => (event:Event) =>  {
        if(state==='full'){
            event.stopPropagation()
            setTab(tab)
        }else if(state==='minimized'){
            setTab(tab)
        }
    }

    const mediasCount = () => {
        let ref = (content.ref_medias || [])
        let local = (content.medias || [])
        let total = [...ref,...local]

        return total.length
    }

    return (
        <Container state={state}>
            <TabIconsMemo state={state} hasMedia={mediasCount()>0} tab={tab} TabIconClick={TabIconClick} />
            <Body tab={tab} onClick={(e)=>e.stopPropagation()} onTouchStart={BodyTouchStart}>
                {
                    tab==='description' && 
                    <DescriptionTab 
                        ref_description={content.ref_description}
                        ref_name={content.ref_alternative_name || content.ref_name}
                        description={content.description}
                        levelName={content.levelName}
                        _id={content._id}
                    />
                }
                {
                    tab==='media' && 
                    <MediaTab 
                        ref_medias={content.ref_medias || []} 
                        medias={content.medias || []} 
                    />
                }
                {
                    tab==='feedback' && 
                    <FeedbackTab />
                }
            </Body>
        </Container>
    )

}




export default MenuTabs