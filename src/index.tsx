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
import ContextProvider from "./app/context/ContextProvider";

const container = document.getElementById("root");

// STEP 2: Find the HTML mount point where the React application will appear.
if (!container) {
  throw new Error('Root element "#root" was not found.');
}

// Create the React 18 root before rendering the application tree.
const root = createRoot(container);

// STEP 3: Provide Redux, Material/Joy themes, and routing to every screen.
root.render(
  <React.StrictMode>
    {/* Redux Provider makes the shared store available to components. */}
    <Provider store={store}>
      <ContextProvider>
<ThemeProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
        <CssVarsProvider>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </CssVarsProvider>
      </ThemeProvider>
      </ContextProvider>
      {/* Theme providers and router wrap the complete application. */}
      
    </Provider>
  </React.StrictMode>
);

// Collect optional performance metrics after the app has been mounted.
reportWebVitals();
