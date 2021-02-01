import Link from "next/link"
import styles from './nav-item-children.module.scss'
import Router from 'next/router'

interface INavItemChildren{
    href:string
    children:string
}


const NavItemChildren = ({href,children}:INavItemChildren) => {
    return (
        <Link href={href}>
            <a className={`${styles.container} ${Router.pathname.includes(href)?styles.active:''}`}>
                {children}
            </a>
        </Link>
    )
}




export default NavItemChildren