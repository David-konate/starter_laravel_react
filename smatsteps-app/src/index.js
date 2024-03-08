// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ThemeProvider as MainThemeProvider } from "./context/ThemeContext";
import CustomThemeProvider from "./context/ThemeProvider";
import { BASE_URL_API } from "./utils";
import moment from "moment";
import "moment/locale/fr";
import App from "./App";
import "./App.scss";
import { UserProvider } from "./context/UserProvider";
import { FilterProvider } from "./context/FilterProvider";

moment.locale("fr");

axios.defaults.baseURL = BASE_URL_API;
axios.defaults.withCredentials = true;

const TOKEN = localStorage.getItem("token");

if (TOKEN) {
  axios.defaults.headers["Authorization"] = `Bearer ${TOKEN}`;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <MainThemeProvider>
    <BrowserRouter>
      <CustomThemeProvider>
        <FilterProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </FilterProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </MainThemeProvider>
);
