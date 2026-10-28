import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { CssVarsProvider } from "@mui/joy/styles";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import {
  THEME_ID as MATERIAL_THEME_ID,
  ThemeProvider,
} from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./app/MaterialTheme";
import "./css/index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error('Root element "#root" was not found.');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
        <CssVarsProvider>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </CssVarsProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();