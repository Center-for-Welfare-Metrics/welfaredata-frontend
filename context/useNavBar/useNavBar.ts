import { useContext } from "react";
import { NavBarContextType } from "./types";
import { NavBarContext } from "./NavBarProvider";

export const useNavBar = (): NavBarContextType => {
  const context = useContext<NavBarContextType | undefined>(NavBarContext);

  if (context === undefined) {
    throw new Error("useNavBar must be used within a NavBarProvider");
  }

  return context;
};
