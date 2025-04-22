import { Skeleton } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";
import { SpecieCardSize } from "./const";

export const SpecieCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        bgcolor: ThemeColors.deep_blue,
      }}
      width={SpecieCardSize.width}
      height={SpecieCardSize.height}
    />
  );
};
