import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

interface Props {
  text: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const InviteSnackbar: FC<Props> = ({text, isOpen, setIsOpen}) => {

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };

  const action = (
    <IconButton
      size={"small"}
      color={"inherit"}
      onClick={handleClose}
    >
      <Close fontSize={"small"}/>
    </IconButton>
  )

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={`@${text} invited you to chat`}
      action={action}
    />
  );
};

export default InviteSnackbar;