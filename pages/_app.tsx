import { useEffect, useState } from "react";
import Head from "next/head";
import { GlobalStyles } from "../theme/globalStyle";
import UserContext, { IUser, IUserContext } from "@/context/user";
import authApi from "queries/auth";
import { Toaster } from "react-hot-toast";
import "theme/fast.css";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Modals } from "modals";
import { ThemeProvider } from "next-themes";
import { PublicNavbarNavigation } from "@/components/PublicNavbarNavigation";
import { useWhereIs } from "@/utils/hooks/useWhereIs";
import { Providers } from "../Providers";

type ApplicationProps = {
  children: React.ReactNode;
};

const Application = ({ children }: ApplicationProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [firstLoad, setFirstLoad] = useState(false);

  const { pathname } = useRouter();

  const { isExactPath, pathStartsWith } = useWhereIs();

  const logOut = () => {
    authApi.logout().then(() => {
      setUser(null);
    });
  };

  const shouldHidePublicNavBar = () => {
    if (isExactPath("/login")) return true;

    if (isExactPath("/register")) return true;

    if (pathStartsWith("/admin")) return true;

    return false;
  };

  const userValue: IUserContext = { user, setUser, logOut };

  useEffect(() => {
    if (!user) {
      if (
        pathname.startsWith("/admin") ||
        pathname === "/login" ||
        pathname === "/register"
      ) {
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

  return (
    <ThemeProvider>
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
        {!shouldHidePublicNavBar() && <PublicNavbarNavigation />}
        {children}
        <Modals />
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
      <Providers>
        <Application>
          <Component {...pageProps} />
        </Application>
      </Providers>
    </QueryClientProvider>
  );
}

export default MyApp;
