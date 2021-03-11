import { Content,InnerContent } from './full-screen-view-styled'

import { FadedModalBackground } from '@/components/common/modal/modal-styled'
import { DefaultEventComportamentOnContextMenuOpen } from '@/utils/context-menu'

interface IFullScreenView {
    children?:React.ReactNode,
    onClose(evt?:Event):void,
    onContextMenu(evt:MouseEvent):void
}

const FullScreenView = ({children,onClose,onContextMenu}:IFullScreenView) => {


    return (
        <>
            <Content onClick={(e:Event)=>e.stopPropagation()}>
                <InnerContent onContextMenu={(e:Event) => {e.stopPropagation()}}>
                    {children}                    
                </InnerContent>
            </Content>
            <FadedModalBackground onContextMenu={onContextMenu} isOpen={true} onClick={onClose} />
        </>
    )
}


export default FullScreenView