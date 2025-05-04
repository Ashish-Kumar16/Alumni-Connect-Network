import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Ensure this is recognized as used in the render method
// import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
