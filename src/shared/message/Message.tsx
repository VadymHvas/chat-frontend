import React, { FC } from 'react';
import { Box, Theme, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "../../app/providers/hooks/redux.hooks";

interface Props {
  message: string;
  name: string;
}

const Message: FC<Props> = ({message, name}) => {
  const username = useAppSelector(state => state.user.name);

  const theme = useTheme();

  const messageStyles = {
    width: "fit-content", maxWidth: 400, padding: "5px 9px",
    marginTop: "10px", wordWrap: "break-word",
    overflowWrap: "break-word", borderRadius: "2px 10px 10px 10px",
    bgcolor: username === name ? theme.palette.primary.dark : theme.palette.secondary.dark,
    color: theme.palette.mode === "light" && username === name ? "#fff" : "",
  };

  return (
    <Box sx={messageStyles}>
      {!(username === name) && (
        <>
          <Typography component={"span"} sx={{fontSize: "15px", fontWeight: 600}}>@{name}</Typography><br/>
        </>
      )}
      <Typography component={"span"}>
        {message}
      </Typography>
    </Box>
  );
};

export default Message;