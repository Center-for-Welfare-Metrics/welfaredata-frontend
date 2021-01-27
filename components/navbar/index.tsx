import styles from './index.module.scss'
import NavItem from './nav-item'
import NavItemChildren from './nav-item-children'

import UserContext from '@/context/user'
import { useContext } from 'react'

const NavBar = () => {

    const {user,logOut} = useContext(UserContext)

    return (
        <div className={styles.container}>
            <div className={styles.navItems}>
                <NavItem name='data entry'>
                    <NavItemChildren href='/'>simple cohort</NavItemChildren>
                    <NavItemChildren href='/'>multiple cohort</NavItemChildren>
                    <NavItemChildren href='/'>no- or meta-cohort</NavItemChildren>
                    <NavItemChildren href='/'>sources</NavItemChildren>
                </NavItem>
                <NavItem name='processing'>
                    <NavItemChildren href='/'>reports</NavItemChildren>
                    <NavItemChildren href='/'>extraction</NavItemChildren>
                </NavItem>
                <NavItem name='visualization'>
                    <NavItemChildren href='/'>prototyping</NavItemChildren>
                </NavItem>
                <NavItem name='admin'>
                    <NavItemChildren href='/'>user privileges</NavItemChildren>
                    <NavItemChildren href='/'>platform map</NavItemChildren>
                </NavItem>
                <NavItem name='about'>
                    <NavItemChildren href='/'>mission</NavItemChildren>
                    <NavItemChildren href='/'>products</NavItemChildren>
                    <NavItemChildren href='/'>team</NavItemChildren>
                </NavItem>
            </div>
            <div className={styles.userSection}>
                <div className={styles.username}>user: {user.name.split(' ')[0]}</div>
                <div className={styles.logout} onClick={logOut}>logout</div>
            </div>
        </div>
    )
}


export default NavBar