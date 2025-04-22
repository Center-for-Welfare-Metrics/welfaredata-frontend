import { useEffect, useState } from "react";
import _ from "lodash";
import themes from "./schema.json";

// Define theme type based on schema.json structure
export type Theme = typeof themes.default;

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    setTheme(themes.default);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded };
};
