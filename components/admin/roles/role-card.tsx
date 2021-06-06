import ContextMenu from '@/context/context-menu'
import { IRole } from '@/context/roles'
import { DefaultEventComportamentOnContextMenuOpen } from '@/utils/context-menu'
import { useContext } from 'react'
import {Container,RoleDescription,RoleName} from './role-card-styled'

interface IRoleCard {
    role:IRole
    onClick(role:IRole):void
    onDelete(role:IRole):void
}

const RoleCard = ({role,onClick,onDelete}:IRoleCard) => {

    const {setContextMenu} = useContext(ContextMenu)

    const click = (event:Event) => {
        onClick(role)
    }

    const onContextMenu = (event:MouseEvent) => {
        let { clientX,clientY } = event
        DefaultEventComportamentOnContextMenuOpen(event)
        setContextMenu({
            open:true,
            type:'options',
            x:clientX,
            y:clientY,
            position: 'mouse-oriented',
            options:[
                {
                    text:'Open',
                    icon:'push-pin',
                    onClick:()=>onClick(role),
                    type:'primary',
                },
                {
                    text:'Delete',
                    icon:'eliminar',
                    onClick:()=>onDelete(role),
                    type:'danger'
                }
            ],
            optionTarget:role
        })
    }

    return (
        <Container onContextMenu={onContextMenu} onClick={click}>
            <RoleName>{role.name}</RoleName>
            <RoleDescription>{role.description}</RoleDescription>
        </Container>
    )
}


export default RoleCard