import { createTheme } from "@mui/material";

export const lightTheme = createTheme(({
  palette: {
    mode: "light",
    primary: {
      main: "#2196F3",
      dark: "#1976D2"
    },
    secondary: {
      main: "#F5F5F5",
      dark: "#bebcbc"
    }
  }
}));