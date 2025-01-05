// src/pages/VerifyEmail.js
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/authService";
import {
    Box,
    Typography,
    Button,
    Paper,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmailToken = async () => {
            const params = new URLSearchParams(location.search);
            const queryObject = Object.fromEntries(params.entries());

            const errorMessages = {
                TOKEN_EXPIRED: "This verify code is expired, please try again.",
                VERIFIED_EMAIL: "This email have been verified before. Please login to use.",
                DEFAULT: "An error occurred while verifying your email."
            };

            if (queryObject.token) {
                try {
                    await verifyEmail(queryObject);
                    setStatus("success");
                    setMessage("You have successfully verified your account.");
                } catch (error) {
                    console.log(error)
                    setStatus("error");
                    const errorMessage = errorMessages[error.response.data.error.errorCode] || errorMessages.DEFAULT
                    setMessage(errorMessage);
                }
            } else {
                setStatus("error");
                setMessage("Verification token is missing.");
            }
        };

        verifyEmailToken();
    }, [searchParams]);


    const handleNavigateToLogin = () => {
        navigate("/login"); // Redirect to login page
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#E3F2FD",
                padding: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: 400,
                    padding: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                }}
            >
                {status === "loading" ? (
                    <Box>
                        <CircularProgress size={50} color="primary" />
                    </Box>
                ) : (
                    <Box>
                        {status === "success" ? (
                            <CheckCircleIcon sx={{ fontSize: 60, color: "#4caf50" }} />
                        ) : (
                            <ErrorIcon sx={{ fontSize: 60, color: "#f44336" }} />
                        )}
                        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                            {status === "success" ? "Verified!" : "Verification Failed"}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "#757575" }}>
                            {message}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleNavigateToLogin}
                            sx={{
                                backgroundColor: "#2196f3",
                                color: "#ffffff",
                                borderRadius: 8,
                                textTransform: "none",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#1976d2",
                                },
                            }}
                        >
                            Go to Login
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default VerifyEmail;
