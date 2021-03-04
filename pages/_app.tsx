import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from "styled-components"

import { useTheme } from '../theme/useTheme'
import { GlobalStyles } from '../theme/globalStyle'
import UserContext, { IUser, IUserContext } from '@/context/user'
import ContextMenuContext, { IContextMenu } from '@/context/context-menu'
import authApi from '@/api/auth'
import ContextMenu from '@/components/context-menu/context-menu'
import { Toaster } from 'react-hot-toast';
import CustomGlobalStyles, { ICustomGlobalStyles } from '@/context/custom-global-styles'

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState<IUser>(null)
  const [firstLoad, setFirstLoad] = useState(false)

  const { theme, themeLoaded } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme)

  const [contextMenu, setContextMenu] = useState<IContextMenu>({ open: false, x: 0, y: 0, type: 'none' })
  const [needFixedBody, setNeedFixedBody] = useState(false)

  const customGlobalStyles: ICustomGlobalStyles = { needFixedBody, setNeedFixedBody }

  const contextMenuValues = { contextMenu, setContextMenu }

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded])

  const logOut = () => {
    authApi.logout().then(() => {
      setUser(null)
    })
  }

  const userValue: IUserContext = { user, setUser, logOut }

  const handleCustomContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    let { clientX, clientY } = event
    setContextMenu({
      open: true,
      x: clientX,
      y: clientY + window.scrollY,
      type: 'none'
    })
  }

  const closeCustomContextMenu = (event: MouseEvent) => {
    event.stopPropagation()
    setContextMenu({
      open: false,
      type: 'none'
    })
  }

  useEffect(() => {
    document.oncontextmenu = handleCustomContextMenu
    if (!user) {
      authApi.get_user()
        .then(({ data }) => {
          setUser(data)
        })
        .catch(() => {
          setFirstLoad(true)
        })
    } else {
      setFirstLoad(true)
    }
    return () => {
      document.oncontextmenu = null
    }
  }, [])

  useEffect(() => {
    if (user) {
      setFirstLoad(true)
    }
  }, [user])

  return (firstLoad && themeLoaded) &&
    <ThemeProvider theme={selectedTheme}>
      <Head>
        <script src="https://kit.fontawesome.com/07fc634891.js" crossOrigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;400&display=swap" rel="stylesheet" />
      </Head>
      <CustomGlobalStyles.Provider value={customGlobalStyles}>
        <GlobalStyles needFixedBody={needFixedBody} />
        <UserContext.Provider value={userValue}>
          <Toaster position='top-right' reverseOrder={false} toastOptions={{ duration: 5000 }} />
          <ContextMenuContext.Provider value={contextMenuValues}>
            <Component {...pageProps} />
            {contextMenu.open && <ContextMenu infos={contextMenu} onClose={closeCustomContextMenu} />}
          </ContextMenuContext.Provider>
        </UserContext.Provider>
      </CustomGlobalStyles.Provider>
      <div style={{ position: 'fixed', bottom: 0, right: 0, opacity: '.2' }}>Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </ThemeProvider>

}

export default MyApp
