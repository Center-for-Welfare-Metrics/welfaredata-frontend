import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { NavBarContextType } from "./types";

export const NavBarContext = createContext<NavBarContextType | undefined>(
  undefined
);

interface NavBarProviderProps {
  children: ReactNode;
}

const MockDOMRectLoggedIn: DOMRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 78,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: () => ({}),
};

const MockDOMRectPublic: DOMRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 71,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: () => ({}),
};

export const NavBarProvider: React.FC<NavBarProviderProps> = ({ children }) => {
  const [loggedInNavBarRef, setLoggedInNavBarRef] =
    useState<HTMLDivElement | null>(null);
  const [publicNavBarRef, setPublicNavBarRef] = useState<HTMLDivElement | null>(
    null
  );

  const [loggedInNavBarRect, setLoggedInNavBarRect] = useState<DOMRect | null>(
    MockDOMRectLoggedIn
  );
  const [publicNavBarRect, setPublicNavBarRect] = useState<DOMRect | null>(
    MockDOMRectPublic
  );

  useEffect(() => {
    const loggedInObserver = new ResizeObserver(() => {
      if (loggedInNavBarRef) {
        setLoggedInNavBarRect(loggedInNavBarRef.getBoundingClientRect());
      }
    });

    const publicObserver = new ResizeObserver(() => {
      if (publicNavBarRef) {
        setPublicNavBarRect(publicNavBarRef.getBoundingClientRect());
      }
    });

    if (loggedInNavBarRef) {
      loggedInObserver.observe(loggedInNavBarRef);
      setLoggedInNavBarRect(loggedInNavBarRef.getBoundingClientRect());
    }

    if (publicNavBarRef) {
      publicObserver.observe(publicNavBarRef);
      setPublicNavBarRect(publicNavBarRef.getBoundingClientRect());
    }

    return () => {
      loggedInObserver.disconnect();
      publicObserver.disconnect();
    };
  }, [loggedInNavBarRef, publicNavBarRef]);

  const value: NavBarContextType = {
    setLoggedInNavBarRef,
    loggedInNavBarRef,
    setPublicNavBarRef,
    publicNavBarRef,
    loggedInNavBarRect,
    publicNavBarRect,
  };

  return (
    <NavBarContext.Provider value={value}>{children}</NavBarContext.Provider>
  );
};

export const useNavBar = (): NavBarContextType => {
  const context = useContext(NavBarContext);
  if (context === undefined) {
    throw new Error("useNavBar must be used within a NavBarProvider");
  }
  return context;
};
