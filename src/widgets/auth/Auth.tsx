import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useSocketContext } from "../../app/providers/context/socket.context";
import { useAppDispatch } from "../../app/providers/hooks/redux.hooks";
import { setId, setName as setStateName } from "../../app/providers/redux/features/user.slice";

const Auth: FC = () => {
  const dispatch = useAppDispatch();

  const { socket } = useSocketContext();

  const [labelText, setLabelText] = useState<string>("Your name here");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 25) {
      setError(true);
      return setLabelText("Name must be longer than 3 and shorter than 25")
    } else if (name.includes(" ")) {
      setError(true);
      return setLabelText("Incorrect name");
    }

    setError(false);
    setLabelText("Your name here");

    socket.emit("addUser", { name });
  };

  useEffect(() => {
    socket.on("getMe", (data: {id: string; name: string; error?: string}) => {
      if ("error" in data) {
        setError(true);
        return setLabelText("Name already in use");
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
          label={labelText}
          fullWidth
          value={name}
          variant={"outlined"}
          onChange={(e) => setName(e.target.value)}
          {...(error ? { error: true } : {})}
          autoComplete={"off"}
        />

        <Button type={"submit"} fullWidth variant={"contained"} sx={{mt: 2}}>Register</Button>
      </Box>
    </Box>
  );
};

export default Auth;