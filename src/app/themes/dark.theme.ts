import { createTheme } from "@mui/material";

export const darkTheme = createTheme(({
  palette: {
    mode: "dark",
    primary: {
      main: "#7302e0",
      dark: "#6601c7"
    },
    secondary: {
      main: "#1f1f1f",
      dark: "#2a2929"
    }
  }
}));