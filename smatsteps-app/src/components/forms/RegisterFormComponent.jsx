// RegisterFormComponent.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { errorField, validationRegister } from "../../utils/formValidator";
import { vestResolver } from "@hookform/resolvers/vest";

import { getViolationField } from "../../utils";
import { useUserContext } from "../../context/UserProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import MessageDialog from "../message/MessageDialog";

const RegisterFormComponent = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: vestResolver(validationRegister),
  });

  // const onSubmit = (data) => console.log(data)
  const { setUser } = useUserContext();
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("security/register", {
        user_pseudo: data.user_pseudo.trim(),
        user_email: data.user_email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      setUser(response.data.user);
      //recup les meesage back
      setDialogTitle(response.data.status);
      setDialogMessage(response.data.message);
      setOpenDialog(true);
      reset();
    } catch (error) {
      console.log(error);
      //recup les meesage back
      setDialogTitle(error.data.status);
      setDialogMessage(error.data.message);
      setOpenDialog(true);
    }
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      hemm
      <Stack justifyContent="center" alignItems="center">
        <Stack spacing={5} mt={5} width={700} maxWidth="100%">
          {/* <TitleSectionText
            variant="h5"
            alignSelf="center"
            startText="Je crée"
            endText="mon compte"
          /> */}
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
            <TextField
              {...register("user_pseudo")}
              {...errorField(errors?.user_pseudo)}
              label="Pseudo"
              fullWidth
              placeholder="Votre pseudo"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment className="string_count" position="end">
                    {watch("user_pseudo")?.length || 0}/{20}
                  </InputAdornment>
                ),
                inputProps: {
                  maxLength: 20,
                },
              }}
            />
            <TextField
              {...register("user_email")}
              {...errorField(errors?.user_email)}
              fullWidth
              label="Adresse email"
              required
              placeholder="email@email.fr"
              type="email"
            />
            <TextField
              {...register("password")}
              {...errorField(errors?.password)}
              fullWidth
              label="Mot de passe"
              required
              placeholder="6+ caractères requis"
              type="password"
            />
            <TextField
              {...register("confirmPassword")}
              {...errorField(errors?.confirmPassword)}
              fullWidth
              label="Confirmez votre mot de passe"
              required
              placeholder="6+ caractères requis"
              type="password"
            />
            <LoadingButton
              variant="contained"
              loading={isSubmitting}
              type="submit"
            >
              Je m'inscris
            </LoadingButton>
            <MessageDialog
              open={openDialog}
              onClose={handleDialogClose}
              title={dialogTitle}
              message={dialogMessage}
              redirection={-1}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
export default RegisterFormComponent;
