import { DangerButton, SuccessButton,WarningButton } from "@/components/common/buttons/default-button-styled"
import Modal,{IModal} from "@/components/common/modal"
import { ActionButtons } from "@/components/common/modal/modal-styled"
import { IRole } from "@/context/roles"
import { FormEvent, useContext, useEffect, useState } from "react"
import PermissionBox from "./permission-box"
import { TitleInput, DescriptionInput,Container, HelperText, PermissionsSection } from "./role-modal-styled"
import { Ican } from '@/context/roles'
import update from 'immutability-helper'
import PrivilegesContext from "@/context/privileges_context"

interface IRoleModal extends IModal {
    role?:IRole,
    onSuccess(role:IRole):void
}

const RoleModal = ({isOpen,onClose,clear,role,onSuccess}:IRoleModal) => {

    const [name,setName] = useState('')

    const [_id,setId] = useState(undefined)

    const [description,setDescription] = useState('')

    const [can,setCan] = useState<Ican>({create:[],delete:[],read:[],update:[]})
    
    const {onFetch} = useContext(PrivilegesContext)

    useEffect(()=>{
        if(role){
            setName(role.name)
            setCan(role.can)
            setId(role._id)
            setDescription(role.description)
        }
    },[role])

    const localClear = () => {
        setName('')
        setDescription('')
        setCan({create:[],delete:[],read:[],update:[]})
        setId(undefined)
        clear()
    }    

    const hasRole = () => {
        return _id !== undefined
    }

    const onGrantedAddition = (permission:'read'|'create'|'update'|'delete') => (granted:string) => {
        setCan(update(can,{
            [permission]:{$push:[granted]}
        }))
    }

    const onGrantedRemove = (permission:'read'|'create'|'update'|'delete') => (granted:string) => {
        let indexOfGrantedToRemove = can[permission].indexOf(granted)

        setCan(update(can,{
            [permission]:{$splice:[[indexOfGrantedToRemove,1]]}
        }))
    }

    const submitForm = (event:FormEvent) => {
        event.preventDefault()
        onSuccess({name,description,can,_id})
    }

    return (
        <Modal overflowY='hidden' isOpen={isOpen} onClose={onClose} clear={localClear}>
            <form method='POST' onSubmit={submitForm}>
                <Container>
                    <TitleInput 
                        name='name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder='Role name'
                        autoComplete='off'
                        autoFocus={!hasRole()}
                        required
                    />
                    <DescriptionInput 
                        name='description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        placeholder='Add a brief description of this role here'
                        required
                    />
                    <HelperText>
                        Users with this role will be able to:
                    </HelperText>
                    <PermissionsSection>
                        <PermissionBox onRemoveClick={onGrantedRemove('read')} onAddClick={onGrantedAddition('read')} granted={can.read} type='Read' />
                        <PermissionBox onRemoveClick={onGrantedRemove('create')} onAddClick={onGrantedAddition('create')} granted={can.create} type='Create' />
                        <PermissionBox onRemoveClick={onGrantedRemove('update')} onAddClick={onGrantedAddition('update')} granted={can.update} type='Update' />
                        <PermissionBox onRemoveClick={onGrantedRemove('delete')} onAddClick={onGrantedAddition('delete')} granted={can.delete} type='Delete' />
                    </PermissionsSection>
                    <ActionButtons>
                        <DangerButton type='button' onClick={onClose}>Cancel</DangerButton>
                        {
                            hasRole()?
                            (<WarningButton disabled={onFetch} load={onFetch} type='submit'>Update Role</WarningButton>)
                            :
                            (<SuccessButton disabled={onFetch} load={onFetch} type='submit'>Create Role</SuccessButton>)
                        }                        
                    </ActionButtons>
                </Container>
            </form>
        </Modal>
    )
}



export default RoleModal