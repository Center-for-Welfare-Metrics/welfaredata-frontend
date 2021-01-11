import { useEffect, useState } from 'react'
import Head from 'next/head'
import UserContext from '@/context/user'
import authApi from '@/api/auth'
import './styles.scss'

function MyApp({ Component, pageProps }) {

  const [user,setUser] = useState(null)
  const [firstLoad,setFirstLoad] = useState(false)

  const logOut = () => {
    authApi.logout().then(() => {
      setUser(null)
    })
  }

  const userValue = {user,setUser,logOut}

  useEffect(()=>{
    if(!user){
      authApi.get_user()
      .then(({data})=>{
        setUser(data)
      })
      .catch(()=>{
        setFirstLoad(true)
      })
    }else{
      setFirstLoad(true)
    }
  },[])

  useEffect(()=>{
    if(user){
      setFirstLoad(true)
    }
  },[user])

  return firstLoad && <>
      <UserContext.Provider value={userValue}>
        <Head>
          <script src="https://kit.fontawesome.com/07fc634891.js" crossOrigin="anonymous"></script>
        </Head>
        <Component {...pageProps} />
        <div style={{position:'fixed',bottom:0,right:0,opacity:'.2'}}>Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </UserContext.Provider>
    </>
}

export default MyApp
