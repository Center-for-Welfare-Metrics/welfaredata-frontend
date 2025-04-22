import { createContext } from "react";

export interface ICustomGlobalStyles {
  needFixedBody: boolean;
  setNeedFixedBody(needFixedBody: boolean): void;
}

const CustomGlobalStyles = createContext<ICustomGlobalStyles>({
  needFixedBody: false,
  setNeedFixedBody: () => {},
});

export default CustomGlobalStyles;
