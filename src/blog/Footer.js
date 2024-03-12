import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000000', color: '#fff', padding: '5px', textAlign: 'center' }}>
      <Container>
        <Grid container className="footer-content" spacing={4} justifyContent="space-between" textAlign="justify">
          {/* First Column */}
          <Grid item lg={6} md={12} sm={12}>
            <Typography variant="h4" style={{ fontSize: '24px', cursor: 'pointer', transition: 'color 0.3s' }} hover={{ color: '#ff91a5' }}>GoCarsmith</Typography>
            <Typography variant="body1" style={{ transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              The Gocarsmith Blog is your #1 source for the latest automobile news, car news, latest car spy shots, bike news,
              auto news, car maintenance DIYs, tips and tricks, and much more. Click the bell icon to get subscribed and never miss any post.
            </Typography>
            <div className="social-icons" style={{ marginTop: '20px' }}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook style={{ marginRight: '10px', color: '#fff', fontSize: '24px', transition: 'color 0.3s' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter style={{ marginRight: '10px', color: '#fff', fontSize: '24px', transition: 'color 0.3s' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram style={{ marginRight: '10px', color: '#fff', fontSize: '24px', transition: 'color 0.3s' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaYoutube style={{ marginRight: '10px', color: '#fff', fontSize: '24px', transition: 'color 0.3s' }} />
              </a>
              <a href="mailto:Gocarsmithblog@gocarsmith.in" target="_blank" rel="noopener noreferrer">
                <FaEnvelope style={{ marginRight: '10px', color: '#fff', fontSize: '24px', transition: 'color 0.3s' }} />
              </a>
              <Typography variant="body1" style={{ transition: 'color 0.3s' }} hover={{ color: '#ff91a5' }}>gocarsmithblog@gocarsmith.in</Typography>
            </div>
          </Grid>

          {/* Second Column */}
          <Grid item lg={6} md={12} sm={12}>
            <Typography variant="h6" className="latest-news" style={{ fontSize: '24px', cursor: 'pointer', transition: 'color 0.3s' }} hover={{ color: '#ff91a5' }}>
              <b>Latest News</b>
            </Typography>
            <Typography variant="body1" className="Footer-links" style={{ transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              10 Best Used Cars Under 1 Lakh | Budget Car Ownership
            </Typography>
            <Typography variant="body1" className="Footer-links" style={{ transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              10 Best Used Cars under ₹2Lakhs - Sedan Edition
            </Typography>
            <Typography variant="body1" className="Footer-links" style={{ transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              10 Cars in India with the Best Suspension Setup for Typical Indian Roads
            </Typography>
            <Typography variant="body1" className="Footer-links" style={{ transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              All the Car Segments in India Explained (A, B, C, D)
            </Typography>
            <Typography variant="body1" className="Footer-links" style={{ transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              10 Best Second Hand Used Cars under 50k | Desperate Motoring
            </Typography>
            <Typography variant="body1" className="Footer-links" style={{ transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              10 Most Googled CNG Car Questions, Answered!
            </Typography>
          </Grid>
        </Grid>
        <hr style={{ marginTop: '20px', borderColor: '#fff' }} />
        <Grid container>
          <Grid item lg={6} md={12} sm={12} className="line_f">
            <Typography variant="body2" style={{ fontSize: '12px', textAlign: 'left', fontWeight: 800, color: '#fff', transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              © The GoCarsmith Blog | Brought to you with by GoCarsmith 2022 | All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item lg={1} md={3} sm={4} className="line_f">
            <Typography variant="body2" style={{ fontSize: '12px', textAlign: 'left', fontWeight: 800, color: '#fff', transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>THE TEAM</Typography>
          </Grid>
          <Grid item lg={1} md={3} sm={4} className="line_f">
            <Typography variant="body2" style={{ fontSize: '12px', textAlign: 'left', fontWeight: 800, color: '#fff', transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>CONTACT US</Typography>
          </Grid>
          <Grid item lg={1} md={3} sm={4} className="line_f">
            <Typography variant="body2" style={{ fontSize: '12px', textAlign: 'left', fontWeight: 800, color: '#fff', transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              ABOUT US
            </Typography>
          </Grid>
          <Grid item lg={1} md={3} sm={4} className="line_f">
            <Typography variant="body2" style={{ fontSize: '12px', textAlign: 'left', fontWeight: 800, color: '#fff', transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              JOIN US
            </Typography>
          </Grid>
          <Grid item lg={2} md={3} sm={4} className="line_f">
            <Typography variant="body2" style={{ fontSize: '12px', textAlign: 'left', fontWeight: 800, color: '#fff', transition: 'color 0.3s', cursor: 'pointer' }} hover={{ color: '#ff91a5' }}>
              PARTNER WITH US
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
