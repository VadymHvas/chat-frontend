import React, { useEffect } from 'react';
import { io } from "socket.io-client";
import { useThemeContext } from "./providers/context/theme.context";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Auth from "../widgets/auth/Auth";
import Header from "../widgets/header/Header";
import { useAppSelector } from "./providers/hooks/redux.hooks";
import { useSocketContext } from "./providers/context/socket.context";

function App() {
  const { id, name } = useAppSelector(state => state.user);
  const { theme } = useThemeContext();
  const { socket } = useSocketContext();

  return (
    <Container maxWidth={"lg"}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header />

        {!id && <Auth />}
      </ThemeProvider>
    </Container>
  );
}

export default App;
