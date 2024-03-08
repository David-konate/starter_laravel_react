import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
