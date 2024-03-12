// AuthPage.js

import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // You may need to install react-router-dom

const AuthPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Welcome to Your App</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="contained" color="primary">
                Sign In
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/newuser" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="outlined" color="primary">
                Create New Account
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AuthPage;
