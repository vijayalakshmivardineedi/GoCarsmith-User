import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, TextField, Container, Icon, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Card, CardContent, Avatar } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import Slider from "react-slick";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Partners = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const isCarWorkshopSelected = selectedButton === "carWorkshop";

  const imageURL =
    "https://img.freepik.com/free-photo/male-mechanic-working-shop-car_23-2150169955.jpg?w=740&t=st=1701677769~exp=1701678369~hmac=fd96f9c53b3341e2d98683ef453ea3b0d980b18322ee8d04068a8b0579145c1a";
  const Background = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${imageURL})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  });

  const slides = [
    {
      place: "GoCarsmith Car Care Garge - Miyapur, Hyderabad",
      name: "Atul Khatana",
      content:
        "Many customers used to come and demand 100% genuine parts for their cars. There is a high circulation for duplicate parts in the market. But after getting a partnership with GoCarsmith this thing has reduced dramatically as they provide us 100% genuine OEM along with a warranty. This has also increased customer satisfaction.",
    },
    {
      place: "GoCarsmith Wheelscart  - Vijayanagar, Bangalore",
      name: "Arjun Kapoor",
      content:
        "My garage was going at a sustainable pace. But there wasn’t much growth in the business, but a partnership with GoCarsmith proved to be really beneficial for me. Despite the global recession, my garage maintained a good pace. The incentives earned are pretty good, something I may not have achieved independently.",
    },
    {
      place: "GoCarsmith Car Mechanic Garge - Aadheri West, Mumbai",
      name: "Rahul Sharma",
      content:
        "Good marketing means good business, this is something I learned from GoCarsmith. My workshop now gained brand status in the area. All because of the marketing strategies of GoCarsmith. They offer digital promotion and even social media marketing which turned out to be very effective in my local region.",
    },
    {
      place: "GoCarsmith Car24 Garge - A.S.Rao, Hyderabad",
      name: "Aisha Patel",
      content:
        "The kind of technical assistance GoCarsmith gives to its partner workshops is amazing. They even created an app which made the management of the garage at the ease of the clicks. The app features weekly/monthly status for the work done. Along with a proper directory for spare parts and full-time service assistance.",
    },
    {
      place: "Jyothi Car Care Garge - Gajuwaka, Vizag",
      name: "Jagadish Kumar",
      content:
        "I realised the value of what marketing can do to someone’s business when I partnered with GoCarsmith. They provide an amazing promotional campaign with digital outreach and brand awareness. Honestly, they provide very unique marketing solutions to their partners.",
    },
    {
      place: "GoCarsmith City Car Care - Kirti Nagar,, Delhi",
      name: "Abhijeet Bhuyan",
      content:
        "I am extremely happy with the technical assistance. Billing, invoicing and other payment-related problems were common issues faced by both, the customers and us as well. But from GoCarsmith it has reduced to a lot amount as they offer 24x7 service for solving problems related to bills, some technical errors, garage operation, the management, or even solving customer’s problems.",
    },
    {
      place: "GoCarsmith City Car Care Garge - Madhurawada, Vizag",
      name: "Srikant Naidu",
      content:
        "My garage was going at a sustainable pace. But there wasn’t much growth in the business, but a partnership with GoCarsmith proved to be really beneficial for me. Despite the global recession, my garage maintained a good pace. The incentives earned are pretty good, something I may not have achieved independently.",
    },
    {
      place: "GoCarsmith Manish Car Service Garge - Nayapalli, Bhubaneswar",
      name: "Ankit Malhotra",
      content:
        "Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality. Their guaranteed and 100% original OEM helped me to gain confidence among the customers as they get value for their money by getting top-class service and original products.",
    },
  ];

  const CustomNextArrow = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "-20px", // Adjust the distance from the right edge
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 1, // Ensure the arrow is above the images
      }}
      onClick={onClick}
    >
      <ChevronRightIcon />
    </div>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "-20px", // Adjust the distance from the left edge
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 1, // Ensure the arrow is above the images
      }}
      onClick={onClick}
    >
      <ChevronLeftIcon />
    </div>
  );

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: false,
    centerPadding: "10px",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const images = [
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Partner/PartnerWorkshops/IMG-20200210-WA0002.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Partner/PartnerWorkshops/IMG-20200210-WA0031.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Partner/PartnerWorkshops/IMG-20200210-WA0034.jpg",
    "https://content.jdmagicbox.com/comp/sawantwadi/u2/9999p2363.2363.210921225928.g3u2/catalogue/nextgen-banda-sawantwadi-gtxwzsakdq.jpg",
  ];

  const imageStyle = {
    width: "90%",
    height: "300px",
    borderRadius: "15px",
  };

  const containerStyle = {
    position: "relative",
    width: "80%",
    margin: "auto",
  };

  const sliderRef = useRef(null);

  const settings1 = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    locality: "",
    workshopName: "",
    email: "",
    workshopDetails: "", // Add workshopDetails field to the state
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set workshopDetails based on the selectedButton
    if (isCarWorkshopSelected) {
        formData.workshopDetails = "Car Workshop";
    } else {
        formData.workshopDetails = "Spare Parts Retailer";
    }

    try {
        const response = await axios.post(
            "https://gocarsmithbackend.onrender.com/api/serviceCenter/requestAsPatner",
            formData
        );
        if(response){

          window.alert("Request sent successfully!");
          setFormData({
            name: "",
            mobileNumber: "",
            locality: "",
            workshopName: "",
            email: "",
            workshopDetails: "", // Add workshopDetails field to the state
        });
        }
        // Display success message
        
    } catch (error) {
        console.error("Error sending request:", error);
    }
};


  return (
    <div>
      <Paper
        style={{
          background: `url(${"https://img.freepik.com/free-photo/male-mechanic-working-shop-car_23-2150169955.jpg?w=740&t=st=1701677769~exp=1701678369~hmac=fd96f9c53b3341e2d98683ef453ea3b0d980b18322ee8d04068a8b0579145c1a"}) center / cover no-repeat`,
          height: "100vh",
          display: "flex",
          flexDirection: "column", // Added flexDirection to make it a column layout
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            paddingTop:"25px"
          }}
        >
          <EmailIcon style={{ marginLeft: "20px", }} />
          <a href="mailto:partners@gocarsmith.in" style={{ marginLeft: "8px", textDecoration: "none", color: "inherit" }}>
  <h4>partners@gocarsmith.in</h4>
</a>

          <PhoneIcon style={{ marginLeft: "20px" }} />
          <a href="tel:08913576079" style={{ marginLeft: "8px", textDecoration: "none", color: "inherit" }}>
  <h4>08913576079</h4>
</a>

        </div>
        <Box
          style={{
            display: "flex",
            marginTop: "auto", // Push the content to the bottom
          }}
        >
          <div>
            <Typography
              variant="h2"
              style={{
                color: "white",
                marginLeft: "20px",
                marginTop: "200px",
                fontWeight: "700",
              }}
            >
              Are You a Workshop Owner?
            </Typography>
            <Typography
              variant="h5"
              sx={{ marginLeft: "20px", color: "#fff", width:"80%", marginTop:"10px" }}
            >
              Join India's fastest growing Car Services Network get more
              customers with seamless customer support and Inventory management
            </Typography>
          </div>
          <Container
            component="main"
            maxWidth="xs"
            style={{
              marginBottom: "150px",
              backgroundColor: "white",
              marginRight: "30px",
            }}
          >
            <br />
            <Grid container spacing={-2}>
              <Typography variant="h5" style={{ marginLeft: "20px" }}>
                Become a GoCarsmith Partners*
              </Typography>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{
                marginTop: "3px",
              }}
            >
              <Grid item xs={12} md={6}>
              <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    borderColor: "#f55b49",
                    backgroundColor: "white",
                    color: "#f55b49", // Set the color to orange
                    "&:hover": {
                      backgroundColor: "#dcedc8",
                      color: "#f55b49", // Set the hover color to orange
                    },
                  }}
                  onClick={() => handleButtonClick("carWorkshop")}
                >
                  <LocalShippingIcon sx={{ marginRight: 1 }} style={{ color: "#f55b49" }} />
                  Car Workshop
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
              <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{
                    borderColor: "#f55b49",
                    backgroundColor: "white",
                    color: "#f55b49",
                    "&:hover": {
                      backgroundColor: "#dcedc8",
                      color: "black",
                    },
                  }}
                  onClick={() => handleButtonClick("sparesRetailer")}
                >
                  <BuildIcon style={{ color: "#f55b49" }} />
                  Spares Retailer
                </Button>
              </Grid>
            </Grid>

            {/* Render content based on the selected button */}
            {isCarWorkshopSelected ? (
              <>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Contact Person Name"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Mobile Number"
                    type="tel"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Locality"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Retail Shop Name"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="workshopName"
                    value={formData.workshopName}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Email"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    style={{ marginTop: "20px" }}
                  >
                    REQUEST
                  </Button>
                  <br />
                  <br />
                </form>
              </>
            ) : (
              <Container
                component="main"
                maxWidth="xs"
                style={{ backgroundColor: "white" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Contact Person Name"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Mobile Number"
                        type="tel"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Locality"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="locality"
                        value={formData.locality}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Workshop Name"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="workshopName"
                        value={formData.workshopName}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Email"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                      >
                        REQUEST
                      </Button>
                      <br />
                      <br />
                    </form>
                  </Grid>
                </Grid>
              </Container>
            )}
          </Container>
        </Box>
      </Paper>
      <div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Join GoCarsmith & Grow Your Business</h1>
          <p>
            Boost your car repair and car spares/accessories business by opting
            for the GoCarsmith Partnership program.
          </p>

          <Grid container spacing={3}>
            {/* Container 1 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h3" style={{ color: "#f55b49" }}>
                  <b>20+</b>
                </Typography>
                <Typography variant="subtitle1">
                  Partners already on board
                </Typography>
              </div>
            </Grid>

            {/* Container 2 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h3" style={{ color: "#f55b49" }}>
                  <b>50 Lakh</b>
                </Typography>
                <Typography variant="subtitle1">
                  Paid out to partners in 2023
                </Typography>
              </div>
            </Grid>

            {/* Container 3 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h3" style={{ color: "#f55b49" }}>
                  <b>200+</b>
                </Typography>
                <Typography variant="subtitle1">
                  Services delivered each month
                </Typography>
              </div>
            </Grid>
          </Grid>
          <hr
            style={{ border: "2px solid red", width: "15%", marginTop: "10px" }}
          />
        </div>

        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Are You a Workshop Owner?</h1>
          <p>Join us and get customers, get support and earn more!</p>
          <Grid container spacing={3}>
            {/* Container 1 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <GroupIcon style={{ color: "#f55b49", fontSize: "4rem" }} />
                <Typography variant="h5" style={{ color: "#f55b49" }}>
                  <b>Get Customers</b>
                </Typography>
                <Typography variant="subtitle1">
                  Get more customers at your Workshop.
                </Typography>
              </div>
            </Grid>

            {/* Container 2 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <BuildIcon style={{ color: "#f55b49", fontSize: "4rem" }} />
                <Typography variant="h5" style={{ color: "#f55b49" }}>
                  <b>Get Support</b>
                </Typography>
                <Typography variant="subtitle1">
                  Get spares consumables and operations support.
                </Typography>
              </div>
            </Grid>

            {/* Container 3 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <SchoolIcon style={{ color: "#f55b49", fontSize: "4rem" }} />
                <Typography variant="h5" style={{ color: "#f55b49" }}>
                  <b>Earn More</b>
                </Typography>
                <Typography variant="subtitle1">
                  Earn greater revenue and profits.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <hr
            style={{ border: "2px solid red", width: "15%", marginTop: "10px" }}
          />
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Exclusive perks for GoCarsmith Accessories/Spares Partners</h1>
          <p>Signup today and enjoy these exclusive benefits</p>
          <Grid container spacing={3}>
            {/* Container 1 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <MonetizationOnIcon
                  style={{ color: "#f55b49", fontSize: "4rem" }}
                />
                <Typography variant="h5" style={{ color: "#f55b49" }}>
                  <b>Competitive Pricing</b>
                </Typography>
                <Typography variant="subtitle1">
                  Get nationwide best pricing & discount on bulk procurement
                </Typography>
              </div>
            </Grid>

            {/* Container 2 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <SettingsIcon style={{ color: "#f55b49", fontSize: "4rem" }} />
                <Typography variant="h5" style={{ color: "#f55b49" }}>
                  <b>Genuine Spare Parts</b>
                </Typography>
                <Typography variant="subtitle1">
                  We use only OEM/OES spare parts
                </Typography>
              </div>
            </Grid>

            {/* Container 3 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <LocalShippingIcon
                  style={{ color: "#f55b49", fontSize: "4rem" }}
                />
                <Typography variant="h5" style={{ color: "#f55b49" }}>
                  <b>Easy Shipping</b>
                </Typography>
                <Typography variant="subtitle1">
                  Get last-mile shipping solutions
                </Typography>
              </div>
            </Grid>
          </Grid>
          <hr
            style={{ border: "2px solid red", width: "15%", marginTop: "10px" }}
          />
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Steps To Partner with GoCarsmith</h1>
          <p>Onboarding with GoCarsmith is a simple 3-step process.</p>

          <Grid container spacing={3}>
            {/* Container 1 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <img
                  src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Partner/Group%208495%402x.png"
                  alt=" Alt Text"
                  style={{ width: "300px", height: "250px" }}
                />
                <Typography variant="h4" style={{ color: "#f55b49" }}>
                  <b>Step 1</b>
                </Typography>
                <Typography variant="subtitle1">
                  Enter your details and we will get back to you to discuss your
                  business needs
                </Typography>
              </div>
            </Grid>

            {/* Container 2 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <img
                  src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Partner/Group%208539%402x.png"
                  alt=" Alt Text"
                  style={{ width: "300px", height: "250px" }}
                />
                <Typography variant="h4" style={{ color: "#f55b49" }}>
                  <b>Step 2</b>
                </Typography>
                <Typography variant="subtitle1">
                  Signup with GoCarsmith using the link recived after the
                  conversation
                </Typography>
              </div>
            </Grid>

            {/* Container 3 */}
            <Grid item xs={12} sm={4}>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <img
                  src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Partner/Group%208314%402x.png"
                  alt=" Alt Text"
                  style={{ width: "300px", height: "250px" }}
                />
                <Typography variant="h4" style={{ color: "#f55b49" }}>
                  <b>Step 3</b>
                </Typography>
                <Typography variant="subtitle1">
                  Onboard GoCarsmith technology suite for hassle-free operations
                </Typography>
              </div>
            </Grid>
          </Grid>
          <hr
            style={{ border: "2px solid red", width: "15%", marginTop: "10px" }}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>GoCarsmith Happy Partners </h1>
          <p style={{ textAlign: "center" }}>
            Hear it from the Workshop Owners themselves!
          </p>

          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} style={{ width: "410px", height: "220px" }}>
                <Card style={{ height: "450px", margin: "10px" }}>
                  <CardContent style={{ margin: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {slide.avatar ? (
                        <Avatar
                          alt={slide.name}
                          src={slide.avatar}
                          style={{ width: "100px", height: "100px" }} // Adjust the size as needed
                        />
                      ) : (
                        <Avatar
                          style={{
                            width: "70px",
                            height: "80px",
                            fontSize: "36px", 
                            margin:"-15px 0px 10px 0px"
                            // Adjust the font size as needed
                          }}
                        >
                          {slide.name.charAt(0)}
                        </Avatar>
                      )}
                    </div>
                    <Typography variant="body2" style={{textAlign:"justify" }}>{slide.content}</Typography>
                    <hr />
                    <div
                      style={{
                        margin: "10px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold", marginLeft: "10px" }}
                      >
                        {slide.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ marginLeft: "10px" }}
                      >
                        {slide.place}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
        <div style={{ padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Our Partner Workshop</h1>
          <p style={{ textAlign: "center" }}>
            Here's a sneak peek into the GoCarsmith Partner Workshop!
          </p>

          <div style={containerStyle}>
            <Slider {...settings1} ref={sliderRef}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`slide-${index + 1}`}
                    style={imageStyle}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;