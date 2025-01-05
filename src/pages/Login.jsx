import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login, getLoginGoogleLink } from "../api/authService.js";
import Joi from "joi-browser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const result = schema.validate({ email });
    if (result.error) {
      setEmailError("Invalid email, please check again.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await login({ email, password });
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setSnackbarMessage(error.response?.data?.error?.message || "Something went wrong, please try again later");
        setSnackbarOpen(true);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await getLoginGoogleLink();
      window.location.href = response.loginUrl;
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to fetch Google login link. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        margin: 0,
        padding: 0,
      }}
      maxWidth={false}
    >
      <Grid container style={{ flexGrow: 1 }}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 2rem",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Welcome to Learn Sphere
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Login to your account
          </Typography>
          <Box
            component="form"
            noValidate
            style={{ marginTop: "0.3rem" }}
            onSubmit={handleLogin}
          >
            <TextField
              fullWidth
              label="Email address"
              type="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              style={{ margin: "0.8rem 0" }}
            >
              <Link href="/forget-password" underline="hover" style={{ fontSize: "0.9rem" }}>
                Forgot password?
              </Link>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              style={{
                textTransform: "none",
                marginBottom: "1rem",
                backgroundColor: "#6C63FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign in"
              )}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                  alt="Google"
                  style={{ width: 20 }}
                />
              }
              style={{ textTransform: "none" }}
              onClick={handleGoogleLogin} // Add the event handler
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign in with Google"
              )}
            </Button>
          </Box>
          <Typography variant="body2" style={{ textAlign: "center", marginTop: "1rem" }}>
            Don't have an account?{" "}
            <Link href="/signup" underline="hover" color="primary">
              Sign up
            </Link>
          </Typography>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            backgroundColor: "#6C63FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1673697239909-e11521d1ba94?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbmluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>

      {/* Snackbar for error message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
