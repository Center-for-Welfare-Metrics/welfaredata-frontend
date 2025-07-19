export type NavBarContextType = {
  loggedInNavBarRef: HTMLDivElement | null;
  publicNavBarRef: HTMLDivElement | null;
  setLoggedInNavBarRef: (ref: HTMLDivElement | null) => void;
  setPublicNavBarRef: (ref: HTMLDivElement | null) => void;
  loggedInNavBarRect: DOMRect | null;
  publicNavBarRect: DOMRect | null;
};
