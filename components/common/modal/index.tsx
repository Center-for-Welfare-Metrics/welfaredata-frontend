import { useEffect, useState } from 'react'
import { Container, FadedModalBackground } from './modal-styled'

export interface IModal {
    onClose(evt?:Event):void
    isOpen:boolean
    children?:React.ReactNode
    clear?():void
}

const Modal = ({onClose,isOpen,children,clear}:IModal) => {

    const [internalOpen,setInternalOpen] = useState(false)

    const [fadeOpen,setFadeOpen] = useState(false)

    useEffect(()=>{
        if(isOpen){
            setInternalOpen(true)
            setTimeout(() => {
                setFadeOpen(true)
            }, 50);
        }else{
            setFadeOpen(false)
            setTimeout(() => {
                setInternalOpen(false)
            }, 500);
        }
    },[isOpen])

    useEffect(()=>{
        if(!internalOpen){
            if(clear)clear()
        }
    },[internalOpen])

    return (
        internalOpen &&
        <>
            <Container isOpen={fadeOpen}>
                {children}
            </Container>
            <FadedModalBackground isOpen={fadeOpen} onClick={onClose} />
        </>
    )
}


export default Modal