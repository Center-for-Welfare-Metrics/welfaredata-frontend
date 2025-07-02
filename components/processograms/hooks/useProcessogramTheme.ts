import { getCurrentTheme } from "@/utils/processogram-theme";
import { useTheme } from "next-themes";
import { useMemo } from "react";

type Props = {
  element: {
    svg_url_dark?: string;
    svg_url_light?: string;
  };
};

export const useProcessogramTheme = ({ element }: Props) => {
  const { resolvedTheme } = useTheme();

  const currentTheme: "dark" | "light" = useMemo(() => {
    return getCurrentTheme({
      element,
      theme: resolvedTheme,
    });
  }, [resolvedTheme, element]);

  return {
    currentTheme,
  };
};
