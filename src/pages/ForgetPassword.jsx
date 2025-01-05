// src/pages/ForgetPassword.js
import React, { useState } from "react";
import { requestPasswordReset } from "../api/authService";
import {
    Box,
    Typography,
    Button,
    Paper,
    CircularProgress,
    TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Joi from "joi-browser";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordReset = async () => {
        const schema = Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .label("Email");

        // Validate the email
        const { error } = Joi.validate(email, schema);

        if (error) {
            setStatus("error");
            setMessage("Please enter a valid email.");
            return;
        }

        setStatus("loading");

        try {
            await requestPasswordReset({ email });
            setStatus("success");
            setMessage("A password reset link has been sent to your email address.");
        } catch (error) {
            console.log(error)
            setStatus("error");
            setMessage("Failed to send password reset email. Please try again later.");
        }
    }


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
                    <CircularProgress size={50} color="primary" />
                ) : (
                    <Box>
                        <EmailIcon sx={{ fontSize: 60, color: "#2196f3" }} />
                        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                            Forgot Password
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ mt: 1, mb: 3, color: "#757575" }}
                        >
                            Enter your email address to receive a password reset link.
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        {status === "error" && (
                            <Typography
                                variant="body2"
                                sx={{ color: "#f44336", mb: 2, fontWeight: "bold" }}
                            >
                                {message}
                            </Typography>
                        )}
                        {status === "success" && (
                            <Typography
                                variant="body2"
                                sx={{ color: "#4caf50", mb: 2, fontWeight: "bold" }}
                            >
                                {message}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            onClick={handlePasswordReset}
                            fullWidth
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
                            Send Reset Link
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ForgetPassword;
