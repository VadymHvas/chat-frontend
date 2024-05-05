import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";
import { Theme } from "@mui/material";
import { darkTheme } from "../../themes/dark.theme";

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("There is no theme context.");

  return context;
}

export const ThemeContextProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};