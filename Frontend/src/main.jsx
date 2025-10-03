// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx"; // Make sure this is imported

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* AuthProvider must wrap the App component */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
