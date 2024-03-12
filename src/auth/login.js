
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from "axios";

function LoginCard() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    // Basic email and password validation
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError("Password is required");
      return;
    }
    try {
      const response = await axios.post(
        "https://gocarsmithbackend.onrender.com/api/user/signin",
        { email, password }
      );
      if (response.status === 200) {
        // Successfully signed in
        console.log("User signed in successfully");
         // Clear localStorage except location, parentId, and locationName
         const location = localStorage.getItem("location");
         const parentId = localStorage.getItem("parentId");
         const locationName = localStorage.getItem("locationName");
         localStorage.clear();
         localStorage.setItem("location", location);
         localStorage.setItem("parentId", parentId);
         localStorage.setItem("locationName", locationName);
   
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        console.log(localStorage);
        
        // You can redirect the user or perform any other action here
        navigate("/");
        window.location.reload(false);
      } else {
        // Failed to sign in
        console.error("Failed to sign in");
        setSnackbarMessage("Failed to sign in. Please try again.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data &&
        error.response.data.error === "Incorrect password"
      ) {
        setPasswordError("Incorrect password");
        setSnackbarMessage("Incorrect password. Please try again.");
        setSnackbarOpen(true);
      } else {
        // Handle other errors or set a generic error message
        setPasswordError("An error occurred. Please try again.");
        setSnackbarMessage("Invalid Details. Please try again.");
        setSnackbarOpen(true);
      }
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{display:"flex", alginItem :"center", justifyContent :"center"}}>
        <CssBaseline />
        
        <Grid
          item
          md={4}
          component={Paper}
          elevation={0}
          square
          sx={{ textAlign: "center", }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ paddingBottom: 5, mt: 4 }}
            >
              <strong>Sign In</strong>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ width: "100%",  }}
                error={emailError}
                helperText={emailError ? "Email is required" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                sx={{ width: "100%", paddingBottom: 2 }}
                error={!!passwordError}
                helperText={
                  passwordError !== ""
                    ? "Password is required "
                    : passwordError === false
                    ? "Incorrect password. "
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={handlePasswordVisibilityToggle}
                      edge="end"
                    >
                      {showPassword ? <BsEyeFill /> : <RiEyeCloseLine />}
                    </IconButton>
                  ),
                }}
              />
              <Grid container>
                <Grid item>
                  <Link
                    href="/Forgotpassword"
                    variant="body2"
                    style={{ color: "black", paddingBottom: 2 }}
                  >
                    <p style={{ textAlign: "center" }}>Forgot password?</p>
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "black",
                  padding: 2,
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Log In
              </Button>
              <div style={{marginTop:"20px", display:"flex", alginItem:"center", justifyContent:"space-between"}}>
              <Typography variant="body1">Create New Account? </Typography>
              <Link to="/VerifyEmail">
              <Typography variant="body1" sx={{cursor:"pointer"}}>Sign Up</Typography>
              </Link>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}
export default LoginCard;




