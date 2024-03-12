import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Avatar,

  CardMedia,
  Chip,
  IconButton,
} from "@mui/material"; import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

const Membership = () => {
  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);
  const modelName = localStorage.getItem("modelName");
  const BrandName = localStorage.getItem("BrandName");
  const [checked, setChecked] = React.useState(true);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([{
    name: "Mile Membership",
    price: 1250
  }]);
  const userString1 = localStorage.getItem("user");
  const user = JSON.parse(userString1);
  const userId = user?._id;

  // Check if any of the user-related values are present


  const addToCart = async () => {
    setCartItems([...cartItems]);

    try {
      const response = await fetch('https://gocarsmithbackend.onrender.com/api/AddToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Replace with the actual user ID
          userId,
          listOfServices: [...cartItems], // Send the updated cart to the backend
        }),
      });
      if (response.ok) {
        console.log('Items added to the cart on the server successfully.');
        navigate("/cart")
      } else {
        console.error('Failed to add items to the cart on the server.');
      }
    } catch (error) {
      console.error('Error adding items to the cart on the server:', error);
    }
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [isRedVisible, setIsRedVisible] = useState(true);

  useEffect(() => {
    // Set up a timer to toggle between red and white text every 2 seconds
    const timer = setInterval(() => {
      setIsRedVisible((prev) => !prev);
    }, 2000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);
  const [status, setStatus] = useState(false)
  useEffect(() => {
    const getCartExistedItems = async () => {
      const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/getUserCartBy/${userId}`)
      if (response.status === 200) {
        response.data.map((items) => (
          items.listOfServices.map((isItems) => {
            if (isItems.name === "Mile Membership") {
              setStatus(true)
            }
          })

        ))

      }
    }
    getCartExistedItems()
  }, [userId])



  const cardData = [
    {
      id: 1,
      category: "Periodic Services",
      cards: [
        {
          title: "Comprehensive Service",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZX1M9v1wRID6VCuXN7LiFIluSEVvCw_n_gQ&usqp=CAU",
        },
        {
          title: "Standard Service",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrjykjbCJR0JvdkroJwpphcJ9rZ3dHShRLUFBOVqglHB7HGVWQQEfizxHvf9bv1dpihtU&usqp=CAU",
        },
        {
          title: "Brake Maintenance",
          image:
            "https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Brake%20maintaince.jpg",
        },
        {
          title: "Rear Brake Shoe",
          image:
            "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/BrakePads/Brake%20Shoe%20Thumbnail.jpg",
        },
      ],
    },
    {
      id: 2,
      category: "Clutch & Body Parts",
      cards: [
        {
          title: "Fog light",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUBYgOJ-WUTlq9iOQBK9TaUyQRENMZHAFndA&usqp=CAU",
        },
        {
          title: "Clutch Overhaul",
          image:
            "	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/amc_photos/Clutch%20Overhaul.jpg",
        },
        {
          title: "Clutch set Replacement",
          image:
            "	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/amc_photos/Clutch%20Set%20Replacement.jpg",
        },
        {
          title: "Clutch Bearing Replacement",
          image:
            "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/amc_photos/Clutch%20Bearing%20Replacement.jpg",
        },
      ],
    },
    {
      id: 3,
      category: "Cleaning & Detailing",
      cards: [
        {
          title: "Deep All Round Spa",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCJJ85w3Orxm3ACMC85XdhTo9Aru1LnGrROgCZ0d074nmdKQNF2Atsuh3D0onPGRimG7I&usqp=CAU",
        },
        {
          title: "Silencer Coating",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgPGpkFqNaKXBkKa7p8a-4TmugBCKxllaj9A&usqp=CAU",
        },
        {
          title: "PPF - Paint Protection Film",
          image:
            "https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/PPF.jpg",
        },
        {
          title: "Car Interior Spa",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkjaemTLCklwIYbsRY2ODRPGUV8L5ifxogQau3ll_f4KTYWPoTot3z_SAKAyP0C6v6yEE&usqp=CAU",
        },
      ],
    },
    {
      id: 4,
      category: "Denting & Painting",
      cards: [
        {
          title: "Right Fender Light",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjtNS2FjK-vSvuuZigqgD7RaXRvewdanwwA&usqp=CAU",

        },
        {
          title: "Left Fender Light",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYtM97wwJzzGNtcNfomazveThVuwVwuVKHw&usqp=CAU",
        },
        {
          title: "Right Front Door Paint",
          image:
            "https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/LHS%20Fender%20paint%20sq.jpg",
        },
        {
          title: "Full Body Dent Paint",
          image:
            "https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/RHS%20front%20door%20paint%20sq.jpg",
        },
      ],
    },
    {
      id: 5,
      category: "AC Service & Repair",
      cards: [
        {
          title: "High Performance AC Service",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs-ma6lSzZyWUscwMOSBjSeJzPQs64OzOOLw&usqp=CAU",
        },
        {
          title: "Cooling Coil Replacement",
          image:
            "https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Cooling%20coil%20replacement.jpg",
        },
        {
          title: "Condenser Replacement",
          image:
            "https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Condenser%20replacement%20.jpg",
        },
        {
          title: "Regular AC Service",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR16VPXe_Wn-U5IF9yx8krLRv6rgMPOVz3RQQ&usqp=CAU",
        },
      ],
    },
  ];

  const customerExperiences = [
    {
      name: "Anila Mehta",
      savedAmount: "20,000",
      numberOfServices: 3,
    },
    {
      name: "Negi Asha",
      savedAmount: "15,000",
      numberOfServices: 2,
    },
    {
      name: "Naveen kumar",
      savedAmount: "5,000",
      numberOfServices: 3,
    },
    {
      name: "Anjana Nagarajan",
      savedAmount: "25,000",
      numberOfServices: 6,
    },
    {
      name: "Himanshu",
      savedAmount: "10,000",
      numberOfServices: 3,
    },
    {
      name: "Monith Shetty",
      savedAmount: "15,000",
      numberOfServices: 2,
    },
    // Add more customer experiences as needed
  ];

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={
        <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "#fff" }} />
      }
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));
  const [expanded, setExpanded] = React.useState("panel1");

  const handleFaq = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1' }}>
        <Paper style={{ backgroundColor: "#16191b", padding: 2, borderRadius: "0px" }}>

          <Paper style={{ backgroundColor: "#292c2e", borderRadius: "8px" }}>
            <Paper
              style={{
                padding: "20px",
                margin: "20px",
                textAlign: "center",
                backgroundColor: "#393c3e",
                borderRadius: "30px",
              }}
            >

              <Typography variant="h1" color={"white"}>
                Annual Membership
              </Typography>
            </Paper>
            <div>
              <Typography
                variant="h4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Save Upto 24600 /-
              </Typography>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#a9a9a9",
                }}
              >
                Anually on {BrandName} {modelName}
              </Typography>
            </div>
            <Grid container lg={12} marginTop={2}>
              <Grid items lg={1}></Grid>
              <Grid items lg={2}>
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/miles_lights_section_new/sos.png"
                  alt="mileslights"
                />
              </Grid>
              <Grid items lg={2}>
                <img
                  src="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Website/Miles_Vector.png"
                  alt="jdh"
                />
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/miles_lights_section_new/offer.png"
                  alt="mileslights"
                />
              </Grid>
              <Grid items lg={2}>
                <img
                  src="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Website/Miles_Vector.png"
                  alt="jdh"
                />
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/miles_lights_section_new/validity.png"
                  alt="mileslights"
                />
              </Grid>
              <Grid items lg={2}>
                <img
                  src="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Website/Miles_Vector.png"
                  alt="jdh"
                />
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/lighted_section_changes_new/workshop.png"
                  alt="mileslights"
                />
              </Grid>
              <Grid items lg={2}>
                <img
                  src="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Website/Miles_Vector.png"
                  alt="jdh"
                />
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/miles_lights_section_new/support.png"
                  alt="mileslights"
                />
              </Grid>
            </Grid>
            <Grid items lg={1}></Grid>
          </Paper>
          <Typography
            variant="body1"
            style={{
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            9540 users have joined Miles last Month
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Card style={{ width: "70%", borderRadius: "20px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    color: "#000",
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  2 Free SOS with Membership
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: "#000",
                  }}
                >
                  Emergency Assistance at Doorstep
                </Typography>
              </CardContent>
              <CardContent style={{ paddingTop: 1, textAlign: "center" }}>
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/miscellaneous/Miles-banner-1.png"
                  alt="Membership Image"
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                />
              </CardContent>
            </Card>
          </div>
          (
          <Paper style={{ backgroundColor: "#292c2e", marginTop: 20 }}>
            <Grid
              container
              lg={12}
              marginLeft={2}
              margin={"10px"}
              paddingBottom={5}
            >
              {cardData.map((data) => (
                <Grid key={data.id} item lg={6} padding={3}>
                  <Card
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      backgroundColor: "#212426",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        marginLeft: "20px",
                        paddingTop: "20px",
                      }}
                    >
                      {data.category}
                    </Typography>
                    <CardContent>
                      <Grid container lg={12} spacing={2}>
                        {data.cards.map((card, index) => (
                          <Grid
                            key={index}
                            item
                            md={5}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor:
                                index % 2 === 0 ? "#36393b" : "#fffffe",
                              padding: 2,
                              margin: 2,
                              borderRadius: "20px",
                              
                            }}
                          >
                            <img
                              height="100"
                              src={card.image}
                              alt={card.title}
                              style={{ borderRadius: "20px" }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                color: index % 2 === 0 ? "#fffffe" : "#212426",
                                marginLeft: "10px",
                              }}
                            >
                              {card.title}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
          <div>
            <Paper style={{ backgroundColor: "#292c2e", marginTop: 20 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  marginLeft: "20px",
                  paddingTop: "30px",
                }}
              >
                Discounts on custom Fitments
              </Typography>
              <Grid
                container
                lg={12}
                marginLeft={2}
                margin={"10px"}
                paddingBottom={5}
              >
                <Grid items lg={2}>
                  <Card sx={{ maxWidth: 200, borderRadius: "8px" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk3Jpn34VsDkAfCpt0xyzNfD2lF3KEBCWnsA&usqp=CAU"
                      alt="battery"
                      sx={{ padding: 1, borderRadius: "20px" }}
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ marginLeft: 2 }}
                    >
                      Battery Replacement
                    </Typography>
                    <Chip
                      label="GET 10% OFF"
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: "#3a9b14",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 1,
                      }}
                    />
                  </Card>
                </Grid>
                <Grid items lg={2}>
                  <Card sx={{ maxWidth: 200, borderRadius: "8px" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/amc_photos/Clutch%20Set%20Replacement.jpg"
                      alt="battery"
                      sx={{ padding: 1, borderRadius: "20px" }}
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ marginLeft: 2 }}
                    >
                      Clutch Set Replacement
                    </Typography>
                    <Chip
                      label="GET 10% OFF"
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: "#3a9b14",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 1,
                      }}
                    />
                  </Card>
                </Grid>
                <Grid items lg={2}>
                  {" "}
                  <Card sx={{ maxWidth: 200, borderRadius: "8px" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxYzv5RTqhX66gtiZo-Kzbq51KX0kOOSFIDA&usqp=CAU"
                      alt="battery"
                      sx={{ padding: 1, borderRadius: "20px" }}
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ marginLeft: 2 }}
                    >
                      Radiator Replacement
                    </Typography>
                    <Chip
                      label="GET 15% OFF"
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: "#3a9b14",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 1,
                      }}
                    />
                  </Card>
                </Grid>
                <Grid items lg={2}>
                  {" "}
                  <Card sx={{ maxWidth: 200, borderRadius: "8px" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwG26LSiQhwi52ORfpKW8RToPRnhucMmfK8Ay9R4K8SfWGKRSy6H6775xRs-qIZB9MAjg&usqp=CAU"
                      alt="battery"
                      sx={{ padding: 1, borderRadius: "20px" }}
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ marginLeft: 2 }}
                    >
                      Front WindShield Replacement
                    </Typography>
                    <Chip
                      label="GET 10% OFF"
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: "#3a9b14",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 1,
                      }}
                    />
                  </Card>
                </Grid>
                <Grid items lg={2}>
                  {" "}
                  <Card sx={{ maxWidth: 200, borderRadius: "8px" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-pAVdlBgmGZZBCZu5OBF6BvbwdqSwaEcQXQ&usqp=CAU"
                      alt="battery"
                      sx={{ padding: 1, borderRadius: "20px" }}
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ marginLeft: 2 }}
                    >
                      Complete Wheel Care
                    </Typography>
                    <Chip
                      label="GET 10% OFF"
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: "#3a9b14",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 1,
                      }}
                    />
                  </Card>
                </Grid>
                <Grid items lg={2}>
                  {" "}
                  <Card sx={{ maxWidth: 200, borderRadius: "8px" }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Car%20Insurance_Square.jpg"
                      alt="battery"
                      sx={{ padding: 1, borderRadius: "20px" }}
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ marginLeft: 2 }}
                    >
                      Insurance Claim Inspection
                    </Typography>

                    <Chip
                      label="NO FILE CHARGE"
                      sx={{
                        marginLeft: "10px",
                        backgroundColor: "#3a9b14",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 1,
                      }}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <Paper
            style={{
              padding: "20px",
              margin: "20px",
              backgroundColor: "#393c3e",
              borderRadius: "30px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                marginLeft: "20px",
              }}
            >
              1000+ Users Are Saving BIG!
            </Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Grid container spacing={2}>
              {customerExperiences.map((experience, index) => (
                <Grid item key={index} md={2}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={experience.name}
                      src={`https://i.pravatar.cc/150?u=${experience.name}`}
                      sx={{
                        width: 75,
                        height: 75,
                        marginRight: "20px",
                      }}
                    />
                    <div style={{ textAlign: "left" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          marginTop: 1,
                        }}
                      >
                        {experience.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          marginTop: 1,
                        }}
                      >
                        Saved {experience.savedAmount}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          marginTop: 1,
                        }}
                      >
                        on {experience.numberOfServices} Services
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Paper>
          <Paper
            style={{
              padding: "20px",
              margin: "20px",
              backgroundColor: "#393c3e",
              borderRadius: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  marginLeft: "20px",
                }}
              >
                100% Money Back Guarantee
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: 3, color: "#a9a9a9" }}>
                If you save less than the membership price, we refund you the
                difference
              </Typography>
            </div>
            <div>
              <img
                src="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Website/Guarantee.png"
                alt="odf"
                style={{ width: "60px", height: "auto" }}
              />
            </div>
          </Paper>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Your image with inline styles */}
            <img
              src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Cart/payprice.gif"
              alt="kasj"
              style={{
                maxWidth: "15%", // Ensure the image doesn't exceed its container
              }}
            />
            <div>
              <Typography
                variant="h4"
                style={{
                  marginLeft: 9,
                  fontWeight: 700,
                  color: isRedVisible ? "#f1554e" : "transparent",
                  opacity: isRedVisible ? 1 : 0,
                  transition: "opacity 1.5s ease-in-out", // Smooth opacity transition
                }}
              >
                You Save Upto <FaRupeeSign />
                26400
              </Typography>

              <Typography
                variant="h4"
                style={{
                  marginLeft: 9,
                  fontWeight: 700,
                  color: isRedVisible ? "transparent" : "#fffffe",
                  opacity: isRedVisible ? 0 : 1,
                  transition: "opacity 1.5s ease-in-out", // Smooth opacity transition
                }}
              >
                You Pay <FaRupeeSign />
                999
              </Typography>
            </div>
          </div>
          <Paper
            style={{
              padding: "20px",
              margin: "20px",
              backgroundColor: "#393c3e",
              borderRadius: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    marginLeft: "20px",
                  }}
                >
                  Frequestly Asked Questions
                </Typography>
                <IconButton sx={{ color: "white" }}>
                  <ArrowForwardIosSharpIcon />
                </IconButton>
              </div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleFaq("panel1")}
                sx={{
                  backgroundColor: "#36393b",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>
                    Why should i choose GoCarsmith Membership?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    GoCarsmith Membership is a custom plan of your car's anuual
                    maintenance.You get high-quality car services with discounts of
                    upto 50%. You also get two SOS services applicable only at
                    GoCarsmith Workshop at no extra cost.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleFaq("panel2")}
                sx={{
                  backgroundColor: "#36393b",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>
                    How many times can i avail a particular service uder GoCarsmith
                    Membership?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    You can avail GoCarsmith Membership services as many times as
                    you want.There are no restrictions on availing multiple services
                    under membership plan.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleFaq("panel3")}
                sx={{
                  backgroundColor: "#36393b",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>
                    How much discount can I avail for each service under the
                    GoCarsmith Membership?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    The discount applied on each service depends on your car and
                    service you choose (mention for each service).On a variety of
                    services,You can get a discount ranging from 10% all the way up
                    to 50%.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleFaq("panel4")}
                sx={{
                  backgroundColor: "#36393b",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Typography>
                    What is the validity & Cancellation Policy of GoCarsmith
                    Membership?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    GoCarsmith Membership validity varies as per your car.For a
                    hutchbrake, sedan, and premium sedan, the validity is 12 months
                    whereas for SUV, premium SUV and luxury cars the validity is 15
                    months.Please note that you can cancel your Membership
                    Subscription, and no refund will be initiated after you have
                    opted for any service/offer under Membership.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel5"}
                onChange={handleFaq("panel5")}
                sx={{
                  backgroundColor: "#36393b",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  aria-controls="panel5d-content"
                  id="panel5d-header"
                >
                  <Typography>
                    Can I order a single GoCarsmith Membership Subscription for my
                    multiple cars?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    GoCarsmith Membership can be availed for one car at a time. So
                    if you own more than one car, you will have to purchase
                    GoCarsmith Membership for each,seperately.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Paper>
          <Paper
            style={{
              padding: "20px",
              margin: "20px",
              backgroundColor: "#393c3e",
              borderRadius: "30px",
              display: "flex",
              justifyContent: "space-between",
              position: "sticky",
              bottom: "0",
              zIndex: "1000",
            }}
          >
            <div>
              <Typography variant="h5" style={{ color: "#fffffe", fontWeight: "700" }}><FaRupeeSign />1350</Typography>
              <Typography variant="h5" style={{ color: "#fffffe", fontWeight: "700" }}>Validity: 12 Months</Typography>
            </div>
            <div>
              {status ? <Button onClick={() => navigate('/cart')} style={{ color: "#fffffe", backgroundColor: "#e73c33", fontSize: "18px", borderRadius: "8px", fontWeight: "600" }}>
                <ShoppingCartIcon />View Cart</Button> : <Button onClick={addToCart} style={{ color: "#fffffe", backgroundColor: "#e73c33", fontSize: "18px", borderRadius: "8px", fontWeight: "600" }}>
                <ShoppingCartIcon />Add To Cart</Button>}

            </div>
          </Paper>
        </Paper>
      </div>
    </div>
  );
};

export default Membership;