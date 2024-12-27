import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
  Container
} from "@mui/material";

const LoginPage = () => {
  return (
    <Container style={{ height: "100vh", width: "100vw", display: "flex", margin: 0, padding: 0}} maxWidth={false}>
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
          <Box component="form" noValidate style={{ marginTop: "0.3rem" }}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
            />
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              style={{ margin: "0.8rem 0" }}
            >
              <Link href="#" underline="hover" style={{ fontSize: "0.9rem" }}>
                Forgot password?
              </Link>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{
                textTransform: "none",
                marginBottom: "1rem",
                backgroundColor: "#6C63FF",
              }}
            >
              Sign in
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
            >
              Sign in with Google
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
    </Container>
  );
};

export default LoginPage;
