import axios from "axios";

import {
  Typography,
  AppBar,
  Container,
  Box,
  Toolbar,
  Switch,
  Hidden,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material/";
import { NavLink, useNavigate } from "react-router-dom";
import {
  firstLetterUppercase,
  links,
  linksLogged,
  linksUnlogged,
} from "../utils";
import MenuIcon from "@mui/icons-material/Menu";

import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";
import { useUserContext } from "../context/UserProvider"; // Importez le hook
import { sizeWidth } from "@mui/system";
import React from "react";

function NavBar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useUserContext(); // Utilisez le hook useUserContext pour obtenir l'état d'authentification
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    console.log("logout");
    try {
      await axios.post(
        "/security/logout",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Réinitialiser l'utilisateur à null
      setUser(null);

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ top: 0 }}>
        <Container maxWidth={"xl"}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerOpen}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Hidden smDown>
              <Logo />
              <Box
                className="Box"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  height: "100%",
                  width: "70%",
                }}
              >
                {links.map((link) => (
                  <NavLink
                    className="navbar_link"
                    key={link.label}
                    to={link.path}
                  >
                    {firstLetterUppercase(link.label)}
                  </NavLink>
                ))}
                {user ? (
                  <Typography
                    sx={{ fontSize: "0.8rem" }}
                    className="navbar_link"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                ) : (
                  <NavLink className="navbar_link" to={"/login"}>
                    Login
                  </NavLink>
                )}
              </Box>
            </Hidden>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Switch
                checked={theme === "dark"}
                onChange={toggleTheme}
                inputProps={{ "aria-label": "toggle theme" }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          {links.map((link) => (
            <NavLink className="navbar_link" key={link.label} to={link.path}>
              {firstLetterUppercase(link.label)}
            </NavLink>
          ))}
          {user ? (
            <Typography
              sx={{ fontSize: "0.8rem" }}
              className="navbar_link"
              onClick={handleLogout}
            >
              Logout
            </Typography>
          ) : (
            <NavLink className="navbar_link" to={"/login"}>
              Login
            </NavLink>
          )}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default NavBar;
