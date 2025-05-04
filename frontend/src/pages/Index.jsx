import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Index = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Your Blank App
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Start building your amazing project here!
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;
