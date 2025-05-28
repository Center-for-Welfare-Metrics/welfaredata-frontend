import { Skeleton } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";

type Props = {
  width: number;
  height: number;
};

export const CardSkeletonLoading = ({ width, height }: Props) => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        bgcolor: ThemeColors.deep_blue,
        "&::after": {
          background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)`,
        },
      }}
      width={width}
      height={height}
    />
  );
};
