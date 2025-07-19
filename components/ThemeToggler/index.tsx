import { useTheme } from "next-themes";
import { FlexRow } from "../desing-components/Flex";
import { Moon, Sun } from "react-feather";
import { Switch } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";
import styled from "styled-components";
import { media } from "styles/media";

export const ThemeToggler = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const setDarkTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme("dark");
  };

  const setLightTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme("light");
  };

  return (
    <FlexRow gap={0}>
      <IconWrapper onClick={setLightTheme}>
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
            "&:hover": {
              backgroundColor: ThemeColors.grey_200,
            },
          },
          "& .MuiSwitch-track": {
            backgroundColor: "white",
            border: `1px solid ${ThemeColors.grey_600}`,
          },
        }}
        checked={resolvedTheme === "dark"}
        onClick={toggleTheme}
      />
      <IconWrapper onClick={setDarkTheme}>
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

  ${media.up.medium`
      padding: 0;
    `}
`;
