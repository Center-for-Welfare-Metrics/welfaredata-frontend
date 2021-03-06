import { useContext, useEffect, useState } from "react"
import { Container,Body,Tabs, Tab,CustomLoader } from './data-entry-form-styled'
import BasicTab from '@/components/data_entry/form/tabs/basic'
import MediaTab from '@/components/data_entry/form/tabs/media/media'
import { TABS } from "@/utils/consts"
import voca from 'voca'
import DataEntryContext from "@/context/data-entry"

import theme from 'theme/schema.json'

const DataEntryForm = () => {    

    const {currentFieldReference,tab,setTab,onFetch,currentInformations} = useContext(DataEntryContext)

    useEffect(()=>{        
        if(!TABS[currentFieldReference].includes(tab)){
            setTab('basic')
        }
        
    },[currentFieldReference])

    return (
        
        <Container>
            <Body>
                {
                    (!onFetch && currentInformations)?
                    (
                        <>
                            {tab === 'basic' && <BasicTab /> }
                            {tab === 'media' && <MediaTab /> }
                        </>
                    )
                    :
                    (
                        <CustomLoader 
                            color={theme.default.colors.local_pink}
                            type='ThreeDots'
                            height={100}
                            width={100}   
                        />
                    )
                }                
            </Body>
            <Tabs>
                {
                    TABS[currentFieldReference].map((tab_reference) => 
                    <Tab onClick={()=>setTab(tab_reference)} active={tab===tab_reference} key={tab_reference}>
                        {voca.capitalize(tab_reference)}
                    </Tab>)
                }
            </Tabs>
        </Container>
    )
}


export default DataEntryForm