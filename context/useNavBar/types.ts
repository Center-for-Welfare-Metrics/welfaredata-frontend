export type NavBarContextType = {
  loggedInNavBarRef: React.RefObject<HTMLDivElement | null>;
  publicNavBarRef: React.RefObject<HTMLDivElement | null>;
  loggedInNavBarRect: DOMRect | null;
  publicNavBarRect: DOMRect | null;
};
