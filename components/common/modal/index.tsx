import { StyleTypes } from '@/utils/enum_types'
import { useEffect, useState } from 'react'
import { Container, FadedModalBackground } from './modal-styled'
import React from 'react'

export interface IModal {
    onClose(evt?:Event):void
    isOpen:boolean
    children?:React.ReactNode
    clear?():void
    type?:StyleTypes
}

const Modal = ({onClose,isOpen,children,clear,type='primary'}:IModal) => {

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
            <Container type={type} isOpen={fadeOpen}>
                {children}
            </Container>
            <FadedModalBackground isOpen={fadeOpen} onClick={onClose} />
        </>
    )
}


export default Modal