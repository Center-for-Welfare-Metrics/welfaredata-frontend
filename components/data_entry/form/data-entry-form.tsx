import { useContext, useEffect, useState } from "react"
import { Container,Body,Tabs, Tab,CustomLoader } from './data-entry-form-styled'
import BasicTab from '@/components/data_entry/form/tabs/basic'
import MediaTab from '@/components/data_entry/form/tabs/media/media'
import { CommonTabs, TABS } from "@/utils/consts"
import voca from 'voca'
import DataEntryContext from "@/context/data-entry"
import { Title } from "@/components/data_entry/form/tabs/tab-commons-styled"
import theme from 'theme/schema.json'
import { TabTypes } from '@/utils/enum_types'

const DataEntryForm = () => {    

    const [tab,setTab] = useState<TabTypes>('description')

    return (
        
        <Container>
            <Body load={false}>                
                {
                    true?
                    (
                        <>
                            <Title>Título</Title>
                            {tab === 'description' && <BasicTab /> }
                            {tab === 'media' && <MediaTab /> }
                        </>
                    )
                    :
                    (
                        <CustomLoader 
                            color={theme.default.colors.pink}
                            type='ThreeDots'
                            height={100}
                            width={100}   
                        />
                    )
                }                
            </Body>
            <Tabs>
                {
                    CommonTabs.map((tab) => 
                    <Tab onClick={()=>setTab(tab)} active={tab===tab} key={tab}>
                        {voca.capitalize(tab)}
                    </Tab>)
                }
            </Tabs>
        </Container>
    )
}


export default DataEntryForm