import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

  // <ThemeProvider theme={theme}>
  //   <CssBaseline /> {/* Optional: to apply Material UI base styles */}
  //   <Dashboard /> {/* Your dashboard component */}
  // </ThemeProvider>
);
