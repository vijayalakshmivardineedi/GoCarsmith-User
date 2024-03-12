import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ContentBox = ({ children }) => (
  <div style={{ marginTop: '16px' }}>{children}</div>
);

const VerifyEmail = () => {
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [backendResponse, setBackendResponse] = useState('');
  const navigate = useNavigate();

  const handleContinueButtonClick = async () => {
    try {
      const response = await fetch("https://gocarsmithbackend.onrender.com/api/user/generateAndSendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setBackendResponse(responseData.message);

      if (responseData.message !== "User already registered. Please sign in.") {
        setShowAdditionalInput(true);
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
      setBackendResponse(error.message);
    }
  };

  const handleVerifyButtonClick = async () => {
    try {
      const response = await fetch("https://gocarsmithbackend.onrender.com/api/user/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.user.role === 'user') {
          console.error('Users should log in through the user interface.');
          return;
        }
  
        // Assuming data.user.email is the verified email
        localStorage.setItem('verifiedEmail', data.user.email);
  
        setIsVerificationSuccess(true);
        navigate('/Signup');
      } else {
        console.error('Failed to verify OTP');
        setBackendResponse('Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setBackendResponse(error.message);
    }
  };
  

   const handleResendButtonClick = async () => {
    setShowAdditionalInput(false);
    setOtp('');
    setIsVerificationSuccess(false);
    setBackendResponse('');
    handleContinueButtonClick();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
    <Card
      style={{
       margin:"30px",
       width:"30%",
       boxShadow: "none", 
      
      }}
    >
      <CardContent>
        <Typography variant="h4">
          <strong>Verify Your Email For Signup</strong>
        </Typography>
        <p>Enter your Email to Continue</p>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          style={{ width: '100%', marginBottom:"10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {showAdditionalInput && (
          <TextField
            label="OTP"
            variant="outlined"
            style={{ width: '100%', marginBottom:"10px" }}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        <ContentBox>
          {backendResponse && (
            <div style={{ marginTop: '1rem', color: 'red' }}>
              {backendResponse}
            </div>
          )}
          {showAdditionalInput && !isVerificationSuccess && (
            <>
              <Button
                variant="contained"
                style={{
                  marginTop: '2rem',
                  width: '480px',
                  padding: '20px',
                  fontSize: '20px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                }}
                onClick={handleVerifyButtonClick}
              >
                Verify
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: '2rem',
                  width: '480px',
                  padding: '20px',
                  fontSize: '20px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                }}
                onClick={handleResendButtonClick}
              >
                Resend
              </Button>
            </>
          )}
          {!showAdditionalInput && (
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "black",
                padding: 2,
                fontWeight: 700,
                fontSize: 15,
                marginTop:"20px"
              }}
              onClick={handleContinueButtonClick}
            >
              Continue
            </Button>
          )}
        </ContentBox>
      </CardContent>
    </Card>
    </div>
  );
};

export default VerifyEmail;

