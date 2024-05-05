import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSocketContext } from "../../app/providers/context/socket.context";
import { useAppDispatch } from "../../app/providers/hooks/redux.hooks";
import { setId, setName as setStateName } from "../../app/providers/redux/features/user.slice";

const Auth: FC = () => {
  const dispatch = useAppDispatch();

  const { socket } = useSocketContext();

  const [errorText, setErrorText] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length < 3) {
      return setErrorText("Name must be longer than 3")
    } else if (name.includes(" ")) {
      return setErrorText("Incorrect name");
    }

    setErrorText("");

    socket.emit("addUser", { name });
  };

  useEffect(() => {
    socket.on("getMe", (data: {id: string; name: string; error?: string}) => {
      if ("error" in data) {
        return setErrorText("Name already in use");
      }

      dispatch(setId(data.id));
      dispatch(setStateName(data.name));
    });
  }, []);

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", mt: 13}}>
      <Typography variant={"h4"}>
        Welcome👋
      </Typography>

      <Box component={"form"} sx={{mt: 1}} onSubmit={handleRegister}>
        <TextField
          label={"Your name here"}
          fullWidth
          variant={"outlined"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          {...(errorText ? { error: true, helperText: errorText } : {})}
        />

        <Button type={"submit"} fullWidth variant={"contained"} sx={{mt: 2}}>Register</Button>
      </Box>
    </Box>
  );
};

export default Auth;