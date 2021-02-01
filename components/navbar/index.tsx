import NavItem from './NavItem'
import NavItemChildren from './nav-item-children'

import UserContext from '@/context/user'
import { useContext } from 'react'
import { Containter, LogOut, NavItems, UserName, UserSection } from './IndexStyle'

const NavMap : any[] = require('./nav-map.json')

const NavBar = () => {

    const {user,logOut} = useContext(UserContext)

    return (
        <Containter>
            <NavItems>
                {
                    NavMap.map((nav_item) => (
                        <NavItem name={nav_item.name} key={nav_item.prefix}>
                            {nav_item.childrens}
                        </NavItem>
                    ))
                }
            </NavItems>
            <UserSection>
                <UserName>user: {user.name.split(' ')[0]}</UserName>
                <LogOut onClick={logOut}>logout</LogOut>
            </UserSection>
        </Containter>
    )
}


export default NavBar