import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {


  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: localStorage.getItem('verifiedEmail'),
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });


  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [backendResponse, setBackendResponse] = useState('');
  const [missingFields, setMissingFields] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 10000); // 10 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for missing fields
    const missingFieldsList = Object.keys(formData).filter((key) => !formData[key]);
    if (missingFieldsList.length > 0) {
      setMissingFields(missingFieldsList);
      handleSnackbarOpen(); // Open Snackbar for missing fields
      return;
    }
    try {
      const response = await fetch('https://gocarsmithbackend.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setBackendResponse(responseData.message);

      if (responseData.message !== 'User already registered') {
        // Navigate to another route after successful submission
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
      setSignupErrorMessage(error.message);
    }

  };
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={0} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom textAlign="center" >
            <strong>Sign Up</strong>
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              margin="normal"
              variant="outlined"
              disabled
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            {signupErrorMessage && (
              <div style={{ marginTop: '1rem', color: 'red' }}>{signupErrorMessage}</div>
            )}
            {backendResponse && (
              <div style={{ marginTop: '1rem', color: 'green' }}>{backendResponse}</div>
            )}

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
                Sign Up
              </Button>
          </form>
        </Paper>
        {/* Snackbar for missing fields */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={10000} // 10 seconds
          onClose={handleSnackbarClose}
          message={`Please fill in the following fields: ${missingFields.join(', ')}`}
        />
      </Grid>
    </Grid>
  );
};

export default Signup;