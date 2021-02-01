import {ReactNode} from 'react'
import {Container,Name,Childrens, Children} from './NavItemStyled'
interface INavItem {
    children:any[]
    name:string
}

const NavItem = ({children,name}:INavItem) => {
    return (
        <Container>
            <Name>{name}</Name>
            <Childrens>
                {
                    children.map((item_children) => (
                        <Children key={item_children.href}>{item_children.name}</Children>
                    ))
                }
            </Childrens>
        </Container>
    )
}


export default NavItem