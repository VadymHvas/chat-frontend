import React, { FC, useState } from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography, useTheme } from "@mui/material";
import ToggleTheme from "../../shared/toggleTheme/ToggleTheme";
import { useAppSelector } from "../../app/providers/hooks/redux.hooks";
import Invitations from "../../shared/invitations/Invitations";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const theme = useTheme();

  const { name } = useAppSelector(state => state.user);

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

          {name && (
            <Box>
              <Button variant={"text"} onClick={() => setIsOpen(prev => !prev)}>
                Invitations
              </Button>
            </Box>
          )}

          <Invitations isOpen={isOpen} onClose={() => setIsOpen(false)} />

          <Box sx={{mr: 2}}>
            <ToggleTheme />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;