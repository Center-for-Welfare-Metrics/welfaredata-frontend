import { StyleTypes } from "@/components/common/dialog/dialog";

export interface IColorType {
  theme: any;
  type: StyleTypes;
}

export const GetColorType = ({ theme, type }: IColorType) => {
  switch (type) {
    case "primary":
      return theme.colors.blue;
    case "success":
      return theme.colors.green;
    case "danger":
      return theme.colors.red;
    case "warning":
      return theme.colors.yellow;
    case "default":
      return theme.colors.deep_blue;
    default:
      return theme.colors.white;
  }
};
