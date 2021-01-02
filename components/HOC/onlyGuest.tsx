import { useContext, useEffect } from 'react'
import UserContext from '../../context/user'
import Router from 'next/router'

const onlyGuest = Page => {

    const Guest = (props) => {
        const {user} = useContext(UserContext)

        useEffect(()=>{
            if(user){
                Router.push('/home')
            }
        },[user])

        if(user){
            return <div>Loading...</div>
        }else{
            return <Page {...props} />
        }
    }

    return Guest
}


export default onlyGuest