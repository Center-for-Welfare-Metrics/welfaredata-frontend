import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from "styled-components"

import {useTheme} from '../theme/useTheme'
import { GlobalStyles } from '../theme/globalStyle'
import UserContext,{IUser,IUserContext} from '@/context/user'
import authApi from '@/api/auth'

function MyApp({ Component, pageProps }) {

  const [user,setUser] = useState<IUser>(null)
  const [firstLoad,setFirstLoad] = useState(false)

  const {theme,themeLoaded} = useTheme()
  const [selectedTheme,setSelectedTheme] = useState(theme)

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded])

  const logOut = () => {
    authApi.logout().then(() => {
      setUser(null)
    })
  }

  const userValue : IUserContext = {user,setUser,logOut}

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

  return (firstLoad && themeLoaded) && 
  <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
      <UserContext.Provider value={userValue}>
        <Head>
          <script src="https://kit.fontawesome.com/07fc634891.js" crossOrigin="anonymous"></script>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;400&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
        <div style={{position:'fixed',bottom:0,right:0,opacity:'.2'}}>Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </UserContext.Provider>
    </ThemeProvider>
    
}

export default MyApp
