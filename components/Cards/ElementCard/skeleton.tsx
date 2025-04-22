import { Skeleton } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";
import { ElementCardSize } from "./const";

export const ElementCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        bgcolor: ThemeColors.deep_blue,
      }}
      width={ElementCardSize.width}
      height={ElementCardSize.height}
    />
  );
};
