import { Skeleton } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";
import { ProcessogramCardSize } from "./const";

export const ProcessogramCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        bgcolor: ThemeColors.deep_blue,
      }}
      width={ProcessogramCardSize.width}
      height={ProcessogramCardSize.height}
    />
  );
};
