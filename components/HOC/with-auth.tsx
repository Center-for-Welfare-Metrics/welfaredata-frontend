import { useContext, useEffect } from 'react'
import Router from 'next/router'
import UserContext from '@/context/user'
import Head from 'next/head'

const withAuth = Page => {
    const Auth = (props) => {
        const {user} = useContext(UserContext)

        useEffect(()=>{
            if(!user){
                Router.push('/')
            }
        },[user])

        if(user){
            return <>
            <Head>
                <title>Welfare Data - Auth Area</title>
            </Head>
            <Page {...props} />
            </>
        }else{
            return <div>Loading...</div>
        }
    }

    if (Page.getInitialProps) {
        Auth.getInitialProps = Page.getInitialProps;
    }

    return Auth
}


export default withAuth