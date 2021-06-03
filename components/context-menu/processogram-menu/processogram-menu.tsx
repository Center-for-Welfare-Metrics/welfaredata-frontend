import { Footer,ButtonNavigator,ButtonIcon ,CustomLoader,ShareIcon} from './processogram-menu-styled'

import { SvgPath } from '@/utils/assets_path'
import { useContext, useEffect, useState } from 'react'
import theme from 'theme/schema.json'
import Home from './tabs/home'
import Media from './tabs/media/body'
import ContextMenu from '@/context/context-menu'

import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast'

const map_buttons_navigation = [
    {
        title:'Home',
        key:'home',
        src:SvgPath({file_name:'pencil',folder:'icons'})
    },
    {
        title:'Media',
        key:'media',
        src:SvgPath({file_name:'media',folder:'icons'})
    },
    {
        title:'Charts',
        key:'charts',
        src:SvgPath({file_name:'barchart',folder:'icons'})
    },
    {
        title:'Sources',
        key:'sources',
        src:SvgPath({file_name:'books',folder:'icons'})
    }
]

const ProcessogramMenu = () => {

    const [tab,setTab] = useState('home')
    
    const [copied,setCopied] = useState(0)

    const {contextMenu,temporary,loading} = useContext(ContextMenu)

    useEffect(()=>{
        if(copied){
            toast.success('Copied!')
        }
    },[copied])
    
    return (
        loading?
        (
            <CustomLoader 
                color={theme.default.colors.pink}
                type='ThreeDots'
                height={100}
                width={100}   
            />
        )
        :
        (
            <>  
                <span title='Share'>
                    <CopyToClipboard 
                        text={contextMenu.shareUrl || ''}
                        onCopy={()=>setCopied(copied+1)}
                    >
                        <ShareIcon />
                    </CopyToClipboard>
                </span>
                {
                    contextMenu && (contextMenu.document || temporary)?
                    (
                        <>
                            {tab==='home' && <Home />}
                            {tab==='media' && <Media />}
                        </>
                    )
                    :
                    (
                        <>
                            No informations. <br/>
                            Name on svg: {contextMenu.svg?.name}
                        </>
                    )
                }            
                <Footer>
                    {
                        map_buttons_navigation.map((button_navigator) => (
                            <ButtonNavigator key={button_navigator.title}>
                                <ButtonIcon active={tab===button_navigator.key} onClick={()=>setTab(button_navigator.key)} src={button_navigator.src} title={button_navigator.title} />
                            </ButtonNavigator>
                        ))
                    }                    
                </Footer>
            </>
        )
        
    )

}




export default ProcessogramMenu