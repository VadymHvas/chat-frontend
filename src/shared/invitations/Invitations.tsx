import React, { FC } from 'react';
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { useAppSelector } from "../../app/providers/hooks/redux.hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Invitations: FC<Props> = ({isOpen, onClose}) => {
  const { invitations } = useAppSelector(state => state.user);

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Invitations</DialogTitle>

      <List sx={{pt: 1}}>
        {Array.from(invitations).map((invitation: string) => (
          <ListItem key={invitation}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  @
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={invitation} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default Invitations;