import { useTheme } from "next-themes";
import { FlexRow } from "../desing-components/Flex";
import { Moon, Sun } from "react-feather";
import { Switch } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";
import styled from "styled-components";

export const ThemeToggler = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <FlexRow gap={0}>
      <IconWrapper onClick={() => setTheme("light")}>
        <Sun size={16} />
      </IconWrapper>
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
      <IconWrapper onClick={() => setTheme("dark")}>
        <Moon size={16} />
      </IconWrapper>
    </FlexRow>
  );
};

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: ${ThemeColors.grey_200};
  }
`;
