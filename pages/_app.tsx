import './styles.scss'
import Head from 'next/head'
import UserContext from '../context/user'
import { useEffect, useState } from 'react'
import authApi from '../api/auth'

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
          5rem
        </Head>
        {/* <div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
}

export default MyApp
