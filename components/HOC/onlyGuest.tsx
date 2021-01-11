import { useContext, useEffect } from 'react'
import Router from 'next/router'
import UserContext from '@/context/user'

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