import { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { Provider } from "jotai";
import { Theme, useTheme } from "../theme/useTheme";
import { GlobalStyles } from "../theme/globalStyle";
import UserContext, { IUser, IUserContext } from "@/context/user";
import authApi from "queries/auth";
import { Toaster } from "react-hot-toast";
import "theme/fast.css";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Modals } from "modals";
import { GeneralAddButton } from "@/components/GeneralAddButton";

type ApplicationProps = {
  children: React.ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [firstLoad, setFirstLoad] = useState(false);

  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const { pathname } = useRouter();

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  const logOut = () => {
    authApi.logout().then(() => {
      setUser(null);
    });
  };

  const userValue: IUserContext = { user, setUser, logOut };

  useEffect(() => {
    if (!user) {
      if (pathname !== "/processograms/[specie]" && pathname !== "/") {
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
    } else {
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFirstLoad(true);
    }
  }, [user]);

  if (!firstLoad) return null;

  if (!selectedTheme) return null;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        {children}
        <Modals />
        {user && <GeneralAddButton />}
      </UserContext.Provider>
    </ThemeProvider>
  );
};

function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: {
    dehydratedState: any;
  };
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (count, error: any) => {
              const status = error?.response?.status;
              if (status === 404) return false;

              if (count >= 2) return false;

              return true;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Application>
          <Component {...pageProps} />
        </Application>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
