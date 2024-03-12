import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import QRCode from "qrcode.react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HealthCard = () => {
  const [cartDetails, setCardDetails] = useState([]);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  const [dataStatus, setDataStatus] = useState(false);

  const getHealthCard = async () => {
    try {
      const response = await axios.get(
        `https://gocarsmithbackend.onrender.com/api/getHealthCardDetails/${userId}`
      );

      if (response.data !== null) {
        setCardDetails(response.data);

        setDataStatus(true);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    getHealthCard();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      {dataStatus ? (
        <div style={{margin:"10px"}}>
          <Typography variant="h3" sx={{magin:"20px", display:"flex", justifyContent:'center',paddingBottom:"25px", fontWeight:"600"}}>Health Card</Typography>
          <div
            style={{
              display: "flex",
              justifyContent:"center",
              alignItems: "center",
             
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "10px",
                width: "50%",
                backgroundColor: "#D3D3D3",
                boxShadow: "none",
               
              }}
            >
              <Typography
                variant="h6"
                align="left"
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://seeklogo.com/images/N/national-health-authority-logo-8A35B1DD02-seeklogo.com.png"
                  alt="National Health Authority"
                  style={{ width: "200px", height: "100px", maxWidth: "100%" }}
                />
                <Grid
                  item
                  xs={6}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <QRCode
                    value="https://your-health-card-url.com"
                    size={120}
                    style={{ marginLeft: "70px" }}
                  />
                </Grid>
              </Typography>
              <Card style={{ height: "auto",width:"auto", padding: "10px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} container>
                      <Grid item>
                        <Avatar
                          src={`https://gocarsmithbackend.onrender.com${cartDetails.CoverPhoto}`}
                          alt=  {cartDetails.holderName}
                          style={{
                            width: "150px",
                            height: "180px",
                            marginRight: "20px",
                          }}
                        />
                      </Grid>
                      <Grid item sm container direction="column" spacing={3}>
                        <Grid item sm >
                          <Typography gutterBottom variant="h5">
                            {cartDetails.holderName}
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            <b> Health ID:</b> {cartDetails.policyNumber}
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            <b>Address: </b> {cartDetails.address}
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            <b> Date of Birth: </b> {new Date(cartDetails.DOB).toLocaleDateString()}
                          </Typography>

                          <Typography variant="body1" color="textSecondary">
                            <b> Gender:</b> {cartDetails.gender}
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            <b> Mobile Number: </b> {cartDetails.contactNumber}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </div>
        </div>
      ) : (
        <div style={{height:"70vh"}}>
        <div style={{display:"flex", justifyContent:"space-between", padding:"20px"}}>
          

          <Typography variant="h4">Apply For Health Insurance</Typography>
          <Button
            onClick={() => navigate("/createCard")}
            style={{
              backgroundColor: "black",
              fontWeight: 700,
              fontSize: 20,
              fontWeight:"700",
              color:"white",
            }}
          >
            Apply Health card
          </Button>
        </div>
        </div>
      )}
    </div>
  );
};
export default HealthCard;
