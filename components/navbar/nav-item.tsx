import Link from 'next/link'
import {Container,Name,Childrens, Children} from './nav-item-styled'
import Router from 'next/router'

interface INavItem {
    children:any[]
    name:string,
    prefix:string
}

const NavItem = ({children,name,prefix}:INavItem) => {

    const sort_children = (a,b) => {
        if(Router.pathname.includes(prefix)){
            let full_url_a = prefix+a.href
            let full_url_b = prefix+b.href
            if(Router.pathname.includes(full_url_a)){
                return -1
            }else if(Router.pathname.includes(full_url_b)){
                return 1
            }
        }
        return 1
    }

    return (
        <Container>
            <Name active={Router.pathname.startsWith(Router.basePath + prefix)}>{name}</Name>
            <Childrens>
                {
                    children.sort(sort_children).map((item_children) => (
                        <Link passHref={true} key={item_children.href} href={prefix+item_children.href}>
                            <Children active={Router.pathname.includes(prefix+item_children.href)} >{item_children.name}</Children>
                        </Link>
                    ))
                }
            </Childrens>
        </Container>
    )
}


export default NavItem