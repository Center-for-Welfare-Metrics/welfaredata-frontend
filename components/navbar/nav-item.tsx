import {ReactNode} from 'react'
import { JsxEmit } from 'typescript'
import styles from './nav-item.module.scss'


interface INavItem {
    children:ReactNode
    name:string
}

const NavItem = ({children,name}:INavItem) => {
    return (
        <div className={styles.container}>
            <div className={styles.name}>{name}</div>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}


export default NavItem