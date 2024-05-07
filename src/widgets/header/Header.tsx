import React, { FC } from 'react';
import { AppBar, Box, Container, Toolbar, Typography, useTheme } from "@mui/material";
import ToggleTheme from "../../shared/toggleTheme/ToggleTheme";

const Header: FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2
      }}
    >
      <Container maxWidth={"lg"}>
        <Toolbar
          variant={"regular"}
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            backdropFilter: 'blur(45px)',
            borderRadius: "50px",
            bgcolor: theme.palette.secondary.main,
            boxShadow: theme.palette.mode === "light"
              ? "0px 4px 8px " + theme.palette.secondary.dark
              : ""
          })}
        >
          <Box sx={{ml: 2}}>
            <Typography variant={"h5"} color={"text.primary"}>
              Chat
            </Typography>
          </Box>

          <Box sx={{mr: 2}}>
            <ToggleTheme />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;