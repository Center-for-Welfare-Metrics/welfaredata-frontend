import { CustomLoader,Title,Description } from './home-styled'

import voca from 'voca'
import { Body } from '../processogram-menu-styled'
import ContextMenuContext from '@/context/context-menu'
import { useContext, useEffect } from 'react'

import { needSetInformations,showLocalInformations,showOnScreen, showReferenceInformation } from '@/utils/processogram'


const Home = () => {

    const {contextMenu,temporary} = useContext(ContextMenuContext)

    const getPossibleFieldReference = () => {
        let {field} = needSetInformations(contextMenu.svg?.id)

        return field
    }

    return (
        <Body>            
            <Title>
                {voca.capitalize(showOnScreen('name',(contextMenu.document || temporary),getPossibleFieldReference()))}
            </Title>
            <Description>
                {showReferenceInformation('description',(contextMenu.document || temporary),getPossibleFieldReference())}
                <br />
                {showLocalInformations(contextMenu.document || temporary,'description')}                        
            </Description>                                    
        </Body>
    )
}


export default Home