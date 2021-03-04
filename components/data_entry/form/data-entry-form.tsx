import { TabTypes } from "@/utils/enum_types"
import { useContext, useEffect, useState } from "react"
import { Container,Body,Tabs, Tab } from './data-entry-form-styled'
import BasicTab from '@/components/data_entry/form/tabs/basic'
import MediaTab from '@/components/data_entry/form/tabs/media'
import { TABS } from "@/utils/consts"
import voca from 'voca'
import DataEntryContext from "@/context/data-entry"

const DataEntryForm = () => {

    const [currentTab,setTab] = useState<TabTypes>('basic')

    const {currentFieldReference} = useContext(DataEntryContext)

    useEffect(()=>{
        if(!TABS[currentFieldReference].includes(currentTab)){
            setTab('basic')
        }
    },[currentFieldReference])

    return (
        
        <Container>
            <Body>
                {currentTab === 'basic' && <BasicTab /> }
                {currentTab === 'media' && <MediaTab /> }
            </Body>
            <Tabs>
                {
                    TABS[currentFieldReference].map((tab) => 
                    <Tab onClick={()=>setTab(tab)} active={currentTab===tab} key={tab}>
                        {voca.capitalize(tab)}
                    </Tab>)
                }
            </Tabs>
        </Container>
    )
}


export default DataEntryForm