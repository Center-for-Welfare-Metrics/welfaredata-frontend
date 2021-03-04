import NavItem from './nav-item'
import React from 'react'
import UserContext from '@/context/user'
import { useContext } from 'react'
import { Containter, LogOut, NavItems, UserName, UserSection } from './index-styled'

const NavMap : any[] = require('./nav-map.json')

const NavBar = () => {

    const {user,logOut} = useContext(UserContext)

    return (
        <Containter>
            <NavItems>
                {
                    NavMap.map((nav_item) => (
                        <NavItem prefix={nav_item.prefix} name={nav_item.name} key={nav_item.prefix}>
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


export default React.memo(NavBar)