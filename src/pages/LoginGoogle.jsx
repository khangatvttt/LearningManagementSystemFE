import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleLoginGoogleCallback } from "../api/authService.js";
import { CircularProgress, Box, Typography } from "@mui/material";



const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const forwardToBackend = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const queryObject = Object.fromEntries(params.entries());
        await handleLoginGoogleCallback(queryObject)
        navigate("/dashboard"); 
      } catch (error) {
        console.error("Error forwarding to backend:", error);
        alert("Something went wrong. Please try again later")
        navigate("/login");
      }
    };

    forwardToBackend();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <CircularProgress color="primary" size={40} style={{ marginBottom: "1rem" }} />
      <Typography variant="h6" color="textSecondary">
        Redirecting...
      </Typography>
    </Box>
  );
};

export default GoogleCallback;
