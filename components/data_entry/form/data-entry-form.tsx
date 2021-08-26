import { useContext, useEffect, useState } from "react"
import { Container,Body,Tabs, Tab,CustomLoader, FetchingDiv,FetchingTitle } from './data-entry-form-styled'
import BasicTab from '@/components/data_entry/form/tabs/basic'
import MediaTab from '@/components/data_entry/form/tabs/media/media'
import { CommonTabs } from "@/utils/consts"
import voca from 'voca'
import DataEntryContext from "@/context/data-entry"
import { Title } from "@/components/data_entry/form/tabs/tab-commons-styled"
import theme from 'theme/schema.json'
import { TabTypes } from '@/utils/enum_types'

const DataEntryForm = () => {    

    const [tab,setTab] = useState<TabTypes>('description')

    const {contentInformation,specie,onFetch} = useContext(DataEntryContext)

    return (        
        <Container>
            <Body load={false}>                
                {
                    
                    <>
                        <Title>{voca.capitalize(contentInformation?.levelName || 'species')} : {voca.capitalize(contentInformation?.ref_name || specie._id)}</Title>
                        {tab === 'description' && <BasicTab /> }
                        {tab === 'media' && <MediaTab /> }
                        <FetchingDiv style={{display:onFetch?'block':'none'}}>
                            <FetchingTitle>Fetching "x". Please Wait</FetchingTitle>
                            <CustomLoader 
                                color={theme.default.colors.blue}
                                type='ThreeDots'
                                height={100}
                                width={100}   
                            />
                        </FetchingDiv>
                    </>
                    
                }                
            </Body>
            <Tabs>
                {
                    CommonTabs.map((this_tab) => 
                    <Tab onClick={()=>setTab(this_tab)} active={this_tab===tab} key={this_tab}>
                        {voca.capitalize(this_tab)}
                    </Tab>)
                }
            </Tabs>
        </Container>
    )
}


export default DataEntryForm