import { createTheme } from "@mui/material";
import { cyan } from "@mui/material/colors";

export const darkTheme = createTheme(({
  palette: {
    mode: "dark",
    primary: {
      main: cyan[400],
      dark: cyan[600],
    },
    secondary: {
      main: "#1f1f1f",
      dark: "#2a2929"
    }
  }
}));