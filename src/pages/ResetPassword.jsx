import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authService";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Joi from "joi-browser";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(""); // 'loading', 'success', or 'error'
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePasswords = () => {
    const schema = Joi.object({
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/)
        .required()
        .label("Password")
        .error(() => {
          return new Error(
            "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, and one number."
          );
        }),
      confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm Password")
        .error(() => {
          return new Error("Passwords do not match.");
        }),
    });

    return schema.validate({ password, confirmPassword });
  };

  const handleResetPassword = async () => {
    const { error } = validatePasswords();
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing reset token.");
      return;
    }

    setStatus("loading");

    try {
      await resetPassword({ token, newPassword: password });
      setStatus("success");
      setMessage("Your password has been successfully reset.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.error?.errorMessage ||
          "Failed to reset the password. Please try again later."
      );
    }
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
          <CircularProgress size={50} color="primary" />
        ) : (
          <Box>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
              Reset Password
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, mb: 3, color: "#757575" }}
            >
              Enter your new password below.
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              onClick={handleResetPassword}
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
              Reset Password
            </Button>
            {status === "success" && (
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                fullWidth
                sx={{
                  mt: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "#2196f3",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Go to Login
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ResetPassword;
