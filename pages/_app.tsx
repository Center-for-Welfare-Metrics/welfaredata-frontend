import { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { useTheme } from "../theme/useTheme";
import { GlobalStyles } from "../theme/globalStyle";
import UserContext, { IUser, IUserContext } from "@/context/user";
import ContextMenuContext, { IContextMenu } from "@/context/context-menu";
import authApi from "queries/auth";
import ContextMenu from "@/components/context-menu/context-menu";
import { Toaster } from "react-hot-toast";
import "react-image-gallery/styles/css/image-gallery.css";
import "theme/fast.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState<IUser>(null);
  const [firstLoad, setFirstLoad] = useState(false);

  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const [contextMenu, setContextMenu] = useState<IContextMenu>({
    open: false,
    x: 0,
    y: 0,
    type: "none",
    position: "mouse-oriented",
  });

  const [loading, setLoading] = useState(false);

  const [temporary, setTemporary] = useState<any>(null);

  const contextMenuValues = {
    contextMenu,
    setContextMenu,
    loading,
    setLoading,
    temporary,
    setTemporary,
  };

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  const logOut = () => {
    authApi.logout().then(() => {
      setUser(null);
    });
  };

  const userValue: IUserContext = { user, setUser, logOut };

  const handleCustomContextMenu = (event: MouseEvent) => {
    // event.preventDefault();
    let match = window.matchMedia("(hover)").matches;
    if (match) {
      let { clientX, clientY } = event;
      // setContextMenu({
      //   open: true,
      //   x: clientX,
      //   y: clientY + window.scrollY,
      //   type: "none",
      //   position: "mouse-oriented",
      // });
    }
  };

  const closeCustomContextMenu = (event: MouseEvent) => {
    event.stopPropagation();
    setContextMenu({
      open: false,
      type: "none",
      position: "mouse-oriented",
    });
  };

  useEffect(() => {
    document.oncontextmenu = handleCustomContextMenu;
    if (!user) {
      authApi
        .get_user()
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          setFirstLoad(true);
        });
    } else {
      setFirstLoad(true);
    }
    return () => {
      document.oncontextmenu = null;
    };
  }, []);

  useEffect(() => {
    if (user) {
      setFirstLoad(true);
    }
  }, [user]);

  return (
    firstLoad &&
    themeLoaded && (
      <ThemeProvider theme={selectedTheme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <script
            src="https://kit.fontawesome.com/07fc634891.js"
            crossOrigin="anonymous"
          ></script>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;400&display=swap"
            rel="stylesheet"
          />
        </Head>

        <GlobalStyles />
        <UserContext.Provider value={userValue}>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{ duration: 5000 }}
          />
          <ContextMenuContext.Provider value={contextMenuValues}>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
            <ContextMenu
              isOpen={contextMenu.open}
              onClose={closeCustomContextMenu}
            />
          </ContextMenuContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    )
  );
}

export default MyApp;
