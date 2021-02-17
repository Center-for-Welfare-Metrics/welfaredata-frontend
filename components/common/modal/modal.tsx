import { Container, FadedModalBackground } from './modal-styled'

interface IModal {
    onClose(evt?:Event):void
    isOpen:boolean
}

const Modal = ({onClose,isOpen}:IModal) => {
    return (
        isOpen &&
        <>
            <Container>

            </Container>
            <FadedModalBackground onClick={onClose} />
        </>
    )
}


export default Modal