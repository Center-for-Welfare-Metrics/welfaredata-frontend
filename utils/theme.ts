import { ThemeColors } from "theme/globalStyle";

export type StyleTypes =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "default";

export interface IColorType {
  type: StyleTypes;
}

export const GetColorType = ({ type }: IColorType) => {
  switch (type) {
    case "primary":
      return ThemeColors.blue;
    case "success":
      return ThemeColors.green;
    case "danger":
      return ThemeColors.red;
    case "warning":
      return ThemeColors.yellow;
    case "default":
      return ThemeColors.deep_blue;
    default:
      return ThemeColors.white;
  }
};
