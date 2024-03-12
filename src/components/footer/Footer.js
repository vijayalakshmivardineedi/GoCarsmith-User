import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { styled } from "@mui/system";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";
const RootPaper = styled(Paper)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px", // Adjusted padding to reduce spacing
  background: "#1E1E1E",
  color: "white",
  borderTop: "2px solid #ccc",
  width: "auto",
});
const AddressContainer = styled("div")({
  textAlign: "left",
  marginBottom: "10px", // Adjusted margin bottom to reduce gap between AddressContainer and ContactContainer
});
const ContactContainer = styled("div")({
  textAlign: "Left",
  marginBottom: "10px", // Adjusted margin bottom to reduce gap between ContactContainer and InfoContainer
});
const InfoContainer = styled("div")({
  textAlign: "left",
  marginBottom: "10px", // Adjusted margin bottom to reduce gap between InfoContainer and SocialMediaContainer
});
const SocialMediaContainer = styled("div")({
  marginTop: "20px",
  padding: "15px",
});
const SocialMediaIcon = styled("span")({
  marginRight: "25px",
  fontSize: "24px",
});
const IconContainer = styled("span")({
  marginRight: "10px",
});
const Footer = () => {
  return (
    <RootPaper
      elevation={0}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: "#1E1E1E",
        color: "white",
        borderTop: "2px solid #ccc",
        width: "auto",
        marginTop:"20px",
        
      }}
    >
      <AddressContainer style={{ textAlign: "left", marginBottom: "10px" }}>
        <h1 >GoCarsmith</h1>
        <Typography variant="h6">Navi Mumbai, Maharashtra</Typography>
        <Typography variant="body1">Knowledge Park</Typography>
        <Typography variant="body1">2nd floor Building No 3 Plot No 1 I.T.5, MIDC</Typography>
        <Typography variant="body1">Maharashtra 400708</Typography>
        <SocialMediaContainer style={{ marginTop: "20px", padding: "15px" }}>
          
          <SocialMediaIcon>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" style={{color:"#fff"}}> 
            <FaFacebook />
            </a>
          </SocialMediaIcon>
          
          <SocialMediaIcon>
          <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noreferrer" style={{color:"#fff"}}>
            <FaInstagram />
            </a>
          </SocialMediaIcon>
          <SocialMediaIcon>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer" style={{color:"#fff"}}>
            <FaWhatsapp />
            </a>
          </SocialMediaIcon>
          <SocialMediaIcon>
          <a href="https://twitter.com/i/flow/login" target="_blank" rel="noreferrer" style={{color:"#fff"}}>
            <TiSocialTwitter />
            </a>
          </SocialMediaIcon>
          <SocialMediaIcon>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" style={{color:"#fff"}}>
            <TiSocialYoutube />
            </a>
          </SocialMediaIcon>
        </SocialMediaContainer>
      </AddressContainer>
      <ContactContainer style={{ marginBottom: "10px" }}>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "5px", fontSize: "16px" }}
        >
          <IconContainer>
            <EmailIcon sx={{ fontSize: 20 }} />
          </IconContainer>
          Email
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "5px", fontSize: "16px" }}
        >
          <IconContainer>
            <CallIcon sx={{ fontSize: 20 }} />
          </IconContainer>
          Phone number
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "5px", fontSize: "16px" }}
        >
          <IconContainer>
            <CalendarTodayIcon sx={{ fontSize: 20 }} />
          </IconContainer>
          Working Days
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "5px", fontSize: "16px" }}
        >
          <IconContainer>
            <AccessTimeIcon sx={{ fontSize: 20 }} />
          </IconContainer>
          Working Hours
        </Typography>
      </ContactContainer>
      <InfoContainer>
        <Typography variant="subtitle1" style={{  marginTop: "5px",fontSize: "16px" , color:"white" }}>
        <a style={{color:"white",textDecoration:"none"}} href="mailto:support@gocarsmith.com">
                    support@gocarsmith.com
                  </a>
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "5px", fontSize: "16px" , color:"white"}}
        >
          <a style={{color:"white",textDecoration:"none"}} href="tel:08913576079">08913576079</a>
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "5px", fontSize: "16px" }}
        >
          Monday - Sunday
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginTop: "5px", fontSize: "16px" }}
        >
          7:00AM - 9:00PM(IST)
        </Typography>
      </InfoContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/FooterPage/playstore.png"
          alt="Your Alt Text"
          style={{ width: "150px" }}
        />
        <img
          src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/FooterPage/appstore.png"
          alt="Your Second Alt Text"
          style={{ width: "150px", marginTop: "10px" }}
        />
        <p style={{ marginTop: "90px" }}>
          © 2023-2024 TruQuest Infotech
        </p>
      </div>
    </RootPaper>
  );

};
export default Footer;