import { useState } from "react"
import { IContentInformation } from "@/utils/processogram"
import { Container, TabIconsContainer, TabIcon,Body} from './menu-tabs-styled'
import DescriptionTab from "./description-tab"

import Svg from 'react-inlinesvg'
import { SvgPath } from "@/utils/assets_path"
import { IInterativeMenuState } from "../interative-menu"
import MediaTab from "./media-tab"
import React from "react"
type tabOptions = 'description' | 'media'

interface IMenutabs{
    content:IContentInformation
    state:IInterativeMenuState
}

const TabIcons = ({TabIconClick,tab}) => {

    return (
        <TabIconsContainer>
            <TabIcon active={tab==='description'} onClick={TabIconClick('description')}>
                    <Svg 
                        src={SvgPath({
                            folder:'icons',
                            file_name:'pencil'
                        })}
                    />
                </TabIcon>
                <TabIcon active={tab==='media'} onClick={TabIconClick('media')}>
                    <Svg 
                        src={
                            SvgPath({
                                folder:'icons',
                                file_name:'media'
                            })
                        }
                    />
                </TabIcon>
        </TabIconsContainer>
    )
}

const TabIconsMemo = React.memo(TabIcons)

const MenuTabs = ({content,state}:IMenutabs) => {

    const [tab,setTab] = useState<tabOptions>('description')

    const BodyTouchStart = (event) => {        
        if(event.currentTarget.scrollTop > 0){
            event.stopPropagation()
        }        
    }

    const TabIconClick = (tab:tabOptions) => (event:Event) =>  {
        if(state==='full'){
            event.stopPropagation()
            setTab(tab)
        }
    }

    return (
        <Container state={state}>
            <TabIconsMemo tab={tab} TabIconClick={TabIconClick} />            
            <Body onTouchStart={BodyTouchStart}>
                {
                    tab==='description' && <DescriptionTab 
                        ref_description={content.ref_description}
                        ref_name={content.ref_name}
                        description={content.description}
                    />
                }
                {
                    tab==='media' && <MediaTab ref_medias={content.ref_medias || []} medias={content.medias || []} />
                }
            </Body>
        </Container>
    )

}




export default MenuTabs