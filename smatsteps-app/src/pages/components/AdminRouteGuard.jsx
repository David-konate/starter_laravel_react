import React from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useUserContext } from "../../context/UserProvider";

const AdminRouteGuard = ({ element }) => {
  const { user, authentification } = useUserContext();

  if (!user) {
    // Si l'utilisateur n'est pas encore disponible, effectuez l'authentification et renvoyez une boîte de chargement
    return <Navigate to="/login" />;
  }

  // Vérifiez si l'utilisateur a un rôle d'administrateur
  if (!user || user.role !== "admin") {
    // Redirigez l'utilisateur vers une page d'erreur ou une page non autorisée
    return (
      <Box textAlign="center" marginTop="20px">
        <Typography variant="h6" color="error">
          Accès non autorisé. Veuillez vous connecter en tant qu'administrateur.
        </Typography>
        <Navigate to="/login" />
      </Box>
    );
  }

  return element;
};

export default AdminRouteGuard;
