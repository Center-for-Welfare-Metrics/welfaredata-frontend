import { Content,InnerContent } from './full-screen-view-styled'

import { FadedModalBackground } from '@/components/common/modal/modal-styled'

interface IFullScreenView {
    children?:React.ReactNode,
    onClose(evt?:Event):void
}

const FullScreenView = ({children,onClose}:IFullScreenView) => {


    return (
        <>
            <Content onClick={(e:Event)=>e.stopPropagation()}>
                <InnerContent onContextMenu={(e:Event) => {e.stopPropagation()}}>
                    {children}                    
                </InnerContent>
            </Content>
            <FadedModalBackground isOpen={true} onClick={onClose} />
        </>
    )
}


export default FullScreenView