import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
const cardStyle = {
  marginBottom: "16px",
};
const cardStyle1 = {
  marginTop: "10px",
  marginBottom: "16px",
  height: "435px",
};
const YourComponent = () => {
  const imageStyle = {
    width: "30%",
    height: "auto",
    marginRight: "16px", // Add margin to separate image from text
  };
  const imageStyle1 = {
    width: "100%",
    height: "350%",
    marginRight: "20px", // Add margin to separate image from text
  };
  return (
    <Container
      maxWidth="xl"
      style={{ marginTop: "20px", textAlign: "center", marginBottom: "20px" }}
    >
      <h1>Leave us a Message!</h1>
      <Grid container spacing={2}>
        {/* Left side - Helpline Numbers and Email */}
        <Grid item xs={12} md={6}>
          <Card style={cardStyle}>
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsB1i9KtkqXOd9fkNXbOnKuUxjgRSGLZHzwpkZktMN7Wvyol1cqajDpTc0lYaO-ikZ0bw&usqp=CAU"
                alt="Helpline"
                style={imageStyle}
              />
              <div style={{ marginLeft: "100px" }}>
                <Typography variant="h6">Helpline Number</Typography>
                <Typography variant="body1">
                  <a style={{color:"black",textDecoration:"none"}} href="tel:08913576079">08913576079</a>
                </Typography>
              </div>
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSUTVxdcC4Eia3O6f7rc_0JL0EApn5opIyOeu6nNviGOnGMd55Y"
                alt="Helpline"
                style={imageStyle}
              />
              <div style={{ marginLeft: "100px" }}>
                <Typography variant="h6">Email</Typography>
                <Typography variant="body1">
                  <a style={{color:"black",textDecoration:"none"}} href="mailto:support@gocarsmith.com">
                    support@gocarsmith.com
                  </a>
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Right side - Corporate Office Address */}
        <Grid item xs={12} md={6}>
          <Card style={cardStyle1}>
            <CardContent sx={{ textAlign: "Left" }}>
            <Typography variant="h6">Navi Mumbai, Maharashtra</Typography>
        <Typography variant="body1">Knowledge Park</Typography>
        <Typography variant="body1">2nd floor Building No 3 Plot No 1 I.T.5, MIDC</Typography>
        <Typography variant="body1">Maharashtra 400708</Typography>
              <img
                src="https://img.freepik.com/free-vector/truck-car-service-garage_1150-43165.jpg"
                alt="Helpline"
                style={imageStyle1}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default YourComponent;