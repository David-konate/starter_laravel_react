import React from "react";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { linksAcceuil } from "../utils";
import Logo from "../components/Logo";
import CardAcceuil from "../components/cards/CardAcceuil";
const Home = () => {
  const [isBusy, setIsBusy] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsBusy(false);
  }, []);

  return isBusy ? (
    <Container>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Container>
  ) : (
    <Container>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          backgroundImage: "url(/images/cantaopaysage2.jpg)",
          backgroundSize: "cover",
          filter: "blur(5px) brightness(1)",
          zIndex: -1,
        }}
      />

      <Box
        mt={5}
        sx={{
          maxWidth: "100%", // Choisir la largeur maximale souhaitée
        }}
      >
        <Typography
          component={"h1"}
          color={"vaar(--text-color)"}
          mt={5}
          className="textAcceuil"
          variant="h3"
        >
          Bienvenue ! <br></br>
        </Typography>
      </Box>

      <Grid container mt={10} spacing={3} justifyContent={"center"}>
        {linksAcceuil.map((link, index) => (
          <Grid item key={index} md={3} xs={12}>
            <Link
              to={link.path}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <CardAcceuil label={link.label} path={link.path} src={link.src} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
