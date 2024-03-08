// LoginFormComponent.js

import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import MessageDialog from "../message/MessageDialog";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";

const LoginFormComponent = () => {
  const { setUser, authentification } = useUserContext();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await axios.post("/security/login", formData);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      await authentification();
      setDialogTitle(response.status);
      setDialogMessage(response.data.message);
      setOpenDialog(true);
      navigate(-1);
    } catch (error) {
      setDialogTitle(error.status);
      setDialogMessage(error.data.message);
      setOpenDialog(true);

      // Ajoutez ici une logique pour gérer les erreurs côté client
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user_pseudo"
            label="Pseudo"
            name="user_pseudo"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ color: "var(--color-text)", mt: 3, mb: 2 }}
          >
            Connexion
          </Button>
        </Box>
      </Box>
      <MessageDialog
        open={openDialog}
        onClose={handleDialogClose}
        title={dialogTitle}
        message={dialogMessage}
      />
    </Container>
  );
};

export default LoginFormComponent;
