import Link from "next/link"
import styles from './nav-item-children.module.scss'


interface INavItemChildren{
    href:string
    children:string
}


const NavItemChildren = ({href,children}:INavItemChildren) => {
    return (
        <Link href={href}>
            <a className={styles.container}>
                {children}
            </a>
        </Link>
    )
}




export default NavItemChildren