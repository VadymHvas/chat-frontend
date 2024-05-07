import React, { FC, FormEvent, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemAvatar, ListItemButton,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import { useSocketContext } from "../../app/providers/context/socket.context";
import { useAppDispatch, useAppSelector } from "../../app/providers/hooks/redux.hooks";
import { setOnlineUsers } from "../../app/providers/redux/features/user.slice";
import { setMessages } from "../../app/providers/redux/features/chat.slice";
import Message from "../../shared/message/Message";

const Main: FC = () => {
  const { socket } = useSocketContext();
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.user.name);
  const { onlineUsers } = useAppSelector(state => state.user);
  const { messages } = useAppSelector(state => state.chat);

  const [labelText, setLabelText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const handleJoin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.includes(" ") || name.length < 3) {
      setError(true);
      return setLabelText("Incorrect name");
    }

    setError(false);
    setLabelText("");
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message === "")
      return;

    socket.emit("sendMessage", {message, name: username});

    setMessage("");
  };

  useEffect(() => {
    socket.on("getUsers", (data: {users: string[]}) => {
      dispatch(setOnlineUsers(data.users.filter((user: string) => user !== username)));
    });
  }, []);

  useEffect(() => {
    socket.on("getMessage", (data: {name: string; message: string}) => {
      dispatch(setMessages(data));
    });
  }, []);

  return (
    <Container sx={{mt: 13}}>
      <Box id={"intro"} sx={{textAlign: "center", py: 6}}>
        <Box>
          <Typography variant={"h3"} sx={{fontWeight: 600}}>
            Join and start
            <Typography component={"span"} variant={"h3"} sx={(theme) => ({
              color: "primary.dark",
              fontWeight: 600
            })}> chat</Typography>ting!
          </Typography>

          <Typography
            textAlign={"center"}
            color={"text.secondary"}
          >
            Below, enter the name of the user with whom you want to start chatting
          </Typography>
        </Box>

        <Box
          id="join-room-form"
          component={"form"}
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "5px",
            mt: 3
          }}
          onSubmit={handleJoin}
        >
          <TextField
            variant={"outlined"}
            label={labelText}
            size={"small"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            {...(error ? { error: true } : {})}
          />

          <Button
            variant={"contained"}
            type={"submit"}
            sx={(theme) => ({
              bgcolor: theme.palette.primary.dark
            })}
          >Invite</Button>
        </Box>
      </Box>

      <Box
        id={"online-users"}
        sx={(theme) => ({
          bgcolor: theme.palette.secondary.main,
          boxShadow: theme.palette.mode === "light"
            ? "0px 4px 8px " + theme.palette.secondary.dark
            : "",
          borderRadius: "8px",
          py: 2,
          px: 4,
          mt: 8,
        })}
      >
        <Box sx={{textAlign: "center"}}>
          <Typography variant={"h5"}>
            Online users
          </Typography>
        </Box>

        <List sx={{width: "100%"}}>
          {onlineUsers.map((user: string) => (
            <ListItem key={user}>
              <ListItemButton sx={{borderRadius: "8px", bgcolor: "background.paper"}}>
                <ListItemAvatar>
                  <Avatar>
                    @
                  </Avatar>
                </ListItemAvatar>

                  <ListItemText primary={user} secondary={"Click to invite"} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        id={"shared-chat"}
        sx={(theme) => ({
          bgcolor: theme.palette.secondary.main,
          boxShadow: theme.palette.mode === "light"
            ? "0px 4px 8px " + theme.palette.secondary.dark
            : "",
          borderRadius: "8px",
          py: 2,
          px: 4,
          my: 4,
          position: "relative"
        })}
      >
        <Typography variant={"h5"} sx={{textAlign: "center"}}>
          Shared chat
        </Typography>

        <Box
          id="messages"
          sx={{
            overflowY: "scroll",
            height: "calc(100vh - 360px)",
            padding: "10px 15px",
            mb: 10
          }}
        >
          {messages.map(msg => (
            <Message message={msg.message} name={msg.name} key={msg.name} />
          ))}
        </Box>

        <Box
          component={"form"}
          sx={{
            position: "absolute",
            top: "85%",
            width: "93%",
            display: "flex",
            gap: 1
          }}
          onSubmit={handleSendMessage}
        >
          <TextField
            variant={"filled"}
            label={"Message here"}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />

          <Button type={"submit"} variant={"outlined"} {...(message === "" ? { disabled: true } : {})}>Send</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Main;