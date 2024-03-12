import React from 'react';
import { Container, Grid, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';

const About = () => {
  return (
    <Container maxWidth="xl" style={{ marginTop: '50px', height:'50vh'}}>
      <Grid>
        <Typography variant="h3" ><b>About Us</b></Typography>
        <Typography variant="h6" ><br />
          GoCarsmith aims to be the best of both worlds - Reliable and Cost-effective Car Services
        </Typography><br />
        <Typography variant="body2" style={{textAlign:"justify",fontSize:"15px"}}>
          Car Servicing, Car repairs, and Car Cleaning - we are your one-stop solution for all things cars.
        </Typography><br />
        <Typography variant="body2" style={{textAlign:"justify",fontSize:"15px"}}>
          A GoCarsmith is a network of technology-enabled car service centers, offering a seamless car service experience at the convenience of a tap. With our highly skilled technicians, manufacturer recommended procedures, and the promise of genuine spare parts, we are your best bet.
        </Typography><br />
        <Typography variant="body2" style={{textAlign:"justify",fontSize:"15px"}}>
          Stay in the comforts of your home or office and make the most of our complimentary pick-up and drop-in service. Count on us to be your personal car care expert, advisor, and car mechanic.
        </Typography><br />
      </Grid>
    </Container >
  );
};

export default About;