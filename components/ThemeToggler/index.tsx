import { useTheme } from "next-themes";
import { FlexRow } from "../desing-components/Flex";
import { Moon, Sun } from "react-feather";
import { Switch } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";

export const ThemeToggler = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <FlexRow>
      <Sun size={16} />
      <Switch
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: ThemeColors.gray,
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: ThemeColors.deep_blue,
          },
          "& .MuiSwitch-switchBase": {
            color: "white",
          },
          "& .MuiSwitch-track": {
            backgroundColor: "white",
            border: "1px solid grey",
          },
        }}
        checked={resolvedTheme === "dark"}
        onClick={toggleTheme}
      />
      <Moon size={16} />
    </FlexRow>
  );
};
