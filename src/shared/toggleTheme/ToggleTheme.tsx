import React, { FC, useState } from 'react';
import { useThemeContext } from "../../app/providers/context/theme.context";
import { Box, Button } from "@mui/material";
import { ModeNightRounded, WbSunnyRounded } from "@mui/icons-material";
import { lightTheme } from "../../app/themes/light.theme";
import { darkTheme } from "../../app/themes/dark.theme";

const ToggleTheme: FC = () => {
  const { theme, setTheme } = useThemeContext();

  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(theme === darkTheme ? "dark" : "light");

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "dark" ?  "light" : "dark"));
    setTheme((prev) => (prev === darkTheme ? lightTheme : darkTheme));

  };

  return (
    <Box sx={{maxWidth: "32px"}}>
      <Button
        variant={"text"}
        size={"small"}
        sx={{minWidth: "32px", height: "32px", p: 1}}
        onClick={toggleTheme}
      >
        {currentTheme === "dark" ? (
          <ModeNightRounded fontSize={"small"}/>
        ) : (
          <WbSunnyRounded fontSize={"small"}/>
        )}
      </Button>
    </Box>
  );
};

export default ToggleTheme;