// CustomThemeProvider.jsx
import React from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "./ThemeContext";

const CustomThemeProvider = ({ children }) => {
  const { theme } = useTheme();

  const themeConfig = createTheme({
    typography: {
      fontFamily: "Baloo, sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: () => ({
          a: {
            textDecoration: "none",
          },
        }),
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontFamily: "Bangers, sans-serif",
          },
          h2: {
            fontFamily: "Bangers, sans-serif",
          },
          h3: {
            fontFamily: "Bangers, sans-serif",
          },
        },
      },
    },
    palette: {
      mode: theme,
      primary: {
        main: "#f3f3f3",
      },
    },
  });

  return <MuiThemeProvider theme={themeConfig}>{children}</MuiThemeProvider>;
};

export default CustomThemeProvider;
