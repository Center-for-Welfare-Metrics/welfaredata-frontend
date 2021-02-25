import Modal,{IModal} from '@/components/common/modal'
import { StyleTypes } from '@/utils/consts'
import { DangerButton, DefaultButton } from '../buttons/default-button-styled'
import { Container, SubTitle, Title,ActionButtons } from './dialog-styled'

interface IDialog extends IModal{
    type:StyleTypes
    onConfirm():void
    title:string
    subtitle:string
    confirmText:string
}

const Dialog = ({isOpen,onClose,clear,type,onConfirm,title,subtitle,confirmText}:IDialog) => {
    return (        
        <Modal type={type} isOpen={isOpen} onClose={onClose} clear={clear}>
            <Container type={type}>
                <Title>{title}</Title>
                <SubTitle>{subtitle}</SubTitle>
                <ActionButtons>
                    <DangerButton onClick={onConfirm}>{confirmText}</DangerButton>
                    <DefaultButton onClick={onClose}>Cancel</DefaultButton>
                </ActionButtons>
            </Container>
        </Modal>
    )

}




export default Dialog