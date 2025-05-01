import { Skeleton } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";
import { ProductionModuleCardSize } from "./const";

export const ProductionModuleCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        bgcolor: ThemeColors.deep_blue,
      }}
      width={ProductionModuleCardSize.width}
      height={ProductionModuleCardSize.height}
    />
  );
};
