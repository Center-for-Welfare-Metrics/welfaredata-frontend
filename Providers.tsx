import { NavBarProvider } from "@/context/useNavBar/NavBarProvider";
import { Provider } from "jotai";

type ApplicationProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ApplicationProps) => {
  return (
    <Provider>
      <NavBarProvider>{children}</NavBarProvider>
    </Provider>
  );
};
