import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Typography,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
    Container,
    Alert,
    FormControl,
    FormHelperText,
    CircularProgress,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signup } from "../api/authService";
import Joi from "joi-browser";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        birthdate: "",
        phoneNumber: "",
        gender: "",
        role: "",
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const emailSchema = Joi.string().email({ tlds: { allow: false } }).required();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";

        const emailValidation = emailSchema.validate(formData.email);
        if (emailValidation.error) {
            newErrors.email = "Invalid email.";
        }

        if (!formData.password.trim()) newErrors.password = "Password is required.";
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/.test(formData.password))
            newErrors.password = "Password must be at least 6 characters long, 1 uppercase, 1 lowercase and 1 digit.";
        if (!formData.birthdate) newErrors.birthdate = "Birthdate is required.";
        if (!formData.phoneNumber.trim())
            newErrors.phoneNumber = "Phone Number is required.";
        else if (!/^\+?[0-9]{7,15}$/.test(formData.phoneNumber))
            newErrors.phoneNumber = "Enter a valid phone number.";
        if (!formData.gender) newErrors.gender = "Gender is required.";
        if (!formData.role) newErrors.role = "Role is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const errorMessages = {
        DUPLICATE_EMAIL: "This email is already registered. Please try another.",
        DUPLICATE_PHONE: "This phone number is already registered. Please try another.",
        MISSING_FIELDS: "Please fill in all required fields.",
        DEFAULT: "An unexpected error occurred. Please try again later.",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await signup(formData);
            setSuccessMessage("Account created successfully! Please check your email to verify.");
            setErrorMessage("");
            setFormData({
                fullName: "",
                email: "",
                password: "",
                birthdate: "",
                phoneNumber: "",
                gender: "",
                role: "",
            });
        } catch (error) {
            console.log(error);
            const errorMessage = errorMessages[error.response.data.error.errorCode] || errorMessages.DEFAULT;
            setErrorMessage(errorMessage);
            setSuccessMessage("");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
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
                    <Box component="form" noValidate onSubmit={handleSubmit} style={{ width: "100%", marginTop: "0.1rem" }}>
                        {successMessage && (
                            <>
                                <Alert severity="success" style={{ marginBottom: "0.5rem" }}>
                                    {successMessage}
                                </Alert>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate('/login')}
                                    style={{ textTransform: "none", marginTop: "1rem" }}
                                >
                                    Back to Login
                                </Button>
                            </>
                        )}
                        {errorMessage && (
                            <Alert severity="error" style={{ marginBottom: "0.5rem" }}>
                                {errorMessage}
                            </Alert>
                        )}
                        {!successMessage && (
                            <>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Full Name"
                                    type="text"
                                    margin="dense"
                                    variant="outlined"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName}
                                    style={{ marginBottom: "0.5rem" }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Email Address"
                                    type="email"
                                    margin="dense"
                                    variant="outlined"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    style={{ marginBottom: "0.5rem" }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Password"
                                    type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                                    margin="dense"
                                    variant="outlined"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    style={{ marginBottom: "0.5rem" }}
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
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Birthdate"
                                    type="date"
                                    margin="dense"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                    error={!!errors.birthdate}
                                    helperText={errors.birthdate}
                                    style={{ marginBottom: "0.5rem" }}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Phone Number"
                                    type="tel"
                                    margin="dense"
                                    variant="outlined"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    style={{ marginBottom: "0.5rem" }}
                                />

                                <FormControl
                                    component="fieldset"
                                    error={!!errors.gender}
                                    style={{ marginBottom: "0.5rem" }}
                                >
                                    <Typography style={{ marginRight: "1rem", fontSize: "0.9rem" }} fontWeight="bold">
                                        Gender:
                                    </Typography>
                                    <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                                        <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                                        <FormControlLabel value="Other" control={<Radio size="small" />} label="Other" />
                                    </RadioGroup>
                                    {!!errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                                </FormControl>

                                <FormControl
                                    component="fieldset"
                                    error={!!errors.role}
                                    style={{ marginBottom: "0.5rem", marginLeft: "5rem" }}
                                >
                                    <Typography style={{ marginRight: "1rem", fontSize: "0.9rem" }} fontWeight="bold">
                                        Sign up as:
                                    </Typography>
                                    <RadioGroup row name="role" value={formData.role} onChange={handleChange}>
                                        <FormControlLabel value="Student" control={<Radio size="small" />} label="Student" />
                                        <FormControlLabel value="Instructor" control={<Radio size="small" />} label="Instructor" />
                                    </RadioGroup>
                                    {!!errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                                </FormControl>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        textTransform: "none",
                                        marginTop: "1rem",
                                        backgroundColor: "#6C63FF",
                                    }}
                                    disabled={loading} // Disable during loading
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Sign up"}
                                </Button>
                            </>
                        )}
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
