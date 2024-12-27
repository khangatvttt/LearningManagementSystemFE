import React from "react";
import {
    Grid,
    Typography,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Box,
    Container,
} from "@mui/material";

const SignUpPage = () => {
    return (
        <Container
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                margin: 0,
                padding: 0,
                overflow: "hidden",
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
                        alignItems: "center",
                        padding: "1rem",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                        Sign up new account
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                        Please enter your information
                    </Typography>
                    <Box component="form" noValidate style={{ width: "100%", marginTop: "1rem" }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            type="text"
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Birthdate"
                            type="date"
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            type="tel"
                            margin="dense"
                            variant="outlined"
                        />

                        {/* Gender Options */}
                        <Box display="flex" alignItems="center" style={{ marginTop: "0.5rem" }}>
                            <Typography style={{ marginRight: "1rem", fontSize: "0.9rem" }} fontWeight="bold">Gender:</Typography>
                            <RadioGroup row name="gender">
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Box>
                        {/* Role Options */}
                        <Box display="flex" alignItems="center" style={{ marginTop: "0.5rem" }}>
                            <Typography style={{ marginRight: "1rem", fontSize: "0.9rem" }} fontWeight="bold">Sign up as:</Typography>
                            <RadioGroup row name="role">
                                <FormControlLabel value="student" control={<Radio />} label="Student" />
                                <FormControlLabel value="instructor" control={<Radio />} label="Instructor" />
                            </RadioGroup>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{
                                textTransform: "none",
                                marginTop: "1rem",
                                backgroundColor: "#6C63FF",
                            }}
                        >
                            Sign up
                        </Button>
                    </Box>
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

export default SignUpPage;
