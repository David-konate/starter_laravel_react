import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MessageDialog = ({
  open,
  onClose,
  title,
  message,
  redirection = null,
}) => {
  const navigate = useNavigate();
  const onClick = () => {
    onClose();
    if (redirection) {
      navigate(redirection);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClick} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
