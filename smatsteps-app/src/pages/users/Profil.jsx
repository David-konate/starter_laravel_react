import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserProvider";
import {
  CircularProgress,
  Typography,
  Paper,
  Container,
  Box,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useNavigate } from "react-router-dom";
import { displayImage } from "../../utils";
import moment from "moment";

const Profil = () => {
  const { authentification, user } = useUserContext();
  const [isBusy, setIsBusy] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }

      await authentification();
    } catch (error) {
      console.error(error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {isBusy ? (
        <CircularProgress />
      ) : (
        <Container>
          {user ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid var(--primary-color)",
                  padding: 5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box className="img-profil">
                    <img
                      src={displayImage(user.userImage)}
                      alt={"image : " + user.userImage}
                      loading="lazy"
                    />
                  </Box>
                  <Typography variant="h2" mt={2}>
                    {user.user_pseudo}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <CalendarMonthIcon
                      sx={{ fontSize: "1.5rem", marginRight: "8px" }}
                    />
                    <Typography sx={{ ml: 1 }}>
                      Membre depuis le {moment(user.created_at).format("LL")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography variant="body1">Aucun utilisateur connecté</Typography>
          )}
        </Container>
      )}
    </Paper>
  );
};

export default Profil;
