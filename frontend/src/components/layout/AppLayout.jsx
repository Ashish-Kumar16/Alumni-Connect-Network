import React from "react";
import Navbar from "./Navbar";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import Box from "@mui/material/Box";

function AppLayout({ children, requireAuth = true }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Check if user is authenticated
  const authenticated = isAuthenticated || getCurrentUser() !== null;

  if (requireAuth && !authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

export default AppLayout;
