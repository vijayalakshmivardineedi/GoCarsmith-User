import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Button,
  Grid,
  CardMedia,
  CardContent,
  Card,
  IconButton,
  Container,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate, Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";
import Reviews from "./Reviews";
import { useTheme } from "@mui/material/styles";
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { styled } from "@mui/system";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import Modal from "../components/StickyBox/Modal";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Col from "react-bootstrap/Col";
import { Style, Icon } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const userString1 = localStorage.getItem("user");
const user = JSON.parse(userString1);
const userId = user?._id;
const userString = localStorage.getItem("userCars");
const userCars = JSON.parse(userString);
const usermodelId = userCars?.[0]?.modelId;
const usermodelName = userCars?.[0]?.modelName;
const userfuelType = userCars?.[0]?.fuelType;
const userBrandId = userCars?.[0]?.BrandId;
const userBrandName = userCars?.[0]?.brandName;
const currentModelId = localStorage.getItem("modelId");
const currentfuelType = localStorage.getItem("fuelType");
const currentBrandId = localStorage.getItem("BrandId");
const currentBrandName = localStorage.getItem("BrandName");
const currentmodelName = localStorage.getItem('modelName')
const modelId = currentModelId || usermodelId;
const fuelType = currentfuelType || userfuelType;
const BrandId = currentBrandId || userBrandId;
const BrandName = currentBrandName || userBrandName;
const modelName = currentmodelName || usermodelName;
const locationName = localStorage.getItem("locationName");
const location = localStorage.getItem("location");

const accordionData = [
  {
    title: "Why should I choose GoCarsmith Car Services?",
    content:
      "GoCarsmith offers up to 49% savings on car services when compared to authorized car service centres. Moreover, the deals, discount and offers help you even more!",
  },
  {
    title: "How is GoCarsmith Different from other Car Services Workshops?",
    content:
      "GoCarsmith  offers a wide range of car services through a network of over 200+ workshops spread across 10+ cities in India. With a variety of best deals and discounts on the cars services, GoCarsmith ensures that you save up to 10% on your car services.",
  },
  {
    title: "On what car services can I apply the GoCarsmith  Coupon Code?",
    content:
      "You can apply GoCarsmith coupon code on a variety of car services. However, most of the offers are applicable to a wide range of services available while some of the Offers can be applied on specific services.",
  },
  {
    title: "Where should I apply the Coupon code to avail GoCarsmith Offers?",
    content:
      "While placing order for a car services, enter the GoCarsmith Coupon Code in the Apply Coupon bar in the Checkout section and get huge savings.",
  },
  {
    title: "What is the GoCarsmith referral Program?",
    content:
      "With GoCarsmith  Referral Program, you can earn ₹1000 GoCarsmith  Money by sharing your referral code with your friends. Moreover, your friend also earns Upto ₹1000 GoApp Money on completing their first car services",
  },
  {
    title: "Are there any day-specific deals by GoCarsmith?",
    content:
      "Yes, we have Throttle Tuesdays and Supersaver Wednesdays. You can save extra ₹100 over existing discount",
  },
];
const accordionStyles = {
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  background: "#E0E0E0",
  position: "relative"
  // Add any other styles you want
};

const CardCardCard = ({ imageSrc, title }) => {
  return (
    <Grid item xs={12} sm={4} md={4}>
      <CardMedia
        component="img"
        alt={title}
        height="250" // Adjust the height as needed
        width="100%" // Adjust the width as needed
        image={imageSrc}
      />
    </Grid>
  );
};

const CardWithImage = ({ imageSrc, title, link }) => {
  return (
    <Grid item md={12}>
      <Card sx={{ margin: "30px", cursor: "pointer" }}>
        <Link to={link}>
          <CardMedia
            component="img"
            alt={title}
            height="220"
            image={imageSrc}
          />
        </Link>
      </Card>
    </Grid>
  );
};
const CardWithImage1 = ({ imageSrc, title, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={3} onClick={onClick}>
      <CardMedia component="img" alt={title} height="250" image={imageSrc} />
    </Grid>
  );
};


const Home = () => {
  const [isBoxVisible, setBoxVisible] = useState(false);
  const handleIconClick = () => {
    setBoxVisible((prevVisible) => !prevVisible);
  };
  const cardData = [
    {
      title: "5000+",
      description: "Car Services",
    },
    {
      title: "1000+",
      description: "Happy Customers",
    },
    {
      title: "4.7*",
      description: "Average Ratings",
    },
    {
      title: "20+",
      description: "Touch Points in India",
    },
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
    width: "800px",
    marginBottom: 8,
    background: "#e0e0e0",
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "our-services",
        "curated-custom-service",
        "monsoon-mist",
        "how-go-mechanic-works",
        "rating-and-reviews",
        "frequently-asked-questions",
        "go-mechanic-service-guide",
        "price-list",
      ];
      const scrollPosition = window.scrollY;
      let currentIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (
          section &&
          section.offsetTop <= scrollPosition + window.innerHeight / 2
        ) {
          currentIndex = i;
        }
      }
      setActiveIndex(currentIndex);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % 8;
    setActiveIndex(nextIndex);
    scrollToSection(nextIndex);
  };
  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + 8) % 8;
    setActiveIndex(prevIndex);
    scrollToSection(prevIndex);
  };
  const handleTabChange = (event, newValue) => {
    setActiveIndex(newValue);
    scrollToSection(newValue);
  };
  const scrollToSection = (index) => {
    const sectionName = [
      "our-services",
      "curated-custom-service",
      "monsoon-mist",
      "how-go-mechanic-works",
      "rating-and-reviews",
      "frequently-asked-questions",
      "go-mechanic-service-guide",
      "price-list",
    ][index];
    const section = document.getElementById(sectionName);
    if (section) {
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      const offset = (windowHeight - sectionHeight) / 2;
      window.scrollTo({
        top: section.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Periodic Service",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEdkryYwhi4PipQhjCNe9hhmHs1pmuMIS72CL0wNoSlwtiKktARAsf2rfZB177s2GpMn0&usqp=CAU",
      link: "/Periodic",
    },
    {
      id: 2,
      name: "AC Service & Repair",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKCK4e4mOTiJf3wJYa2thJwtoBDO3sYWIdBQ&usqp=CAU",
      link: "/AcRepair",
    },
    {
      id: 3,
      name: "Batteries",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStjI7ZbSUzDlkFCyEouD1Id5GzpCEb18IIig&usqp=CAU",
      link: "/Batteries",
    },
    {
      id: 4,
      name: "Tyres & Wheel Care",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9kIhZFN07fgIxIyZ8nDlSC3_GdZLTdHml1HQz-9uJs0eXd5lkl0hnGTF9_tDBRgpFeE&usqp=CAU",
      link: "/Tyres",
    },
    {
      id: 5,
      name: "Denting & Painting",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyxa_gKpZ8QwcvALu2fzyxH618HtD-nE8TMg&usqp=CAU",
      link: "/Denting",
    },
    {
      id: 6,
      name: "Detailing Services",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFERRcWSMNGRJu4R6Bvckmvh9UC4c09JQklcnzwlevAQRxN-biLgIfo5I2vgHj4pNgJM&usqp=CAU",
      link: "/Detailing",
    },
    {
      id: 7,
      name: "Car Spa & Cleaning",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKt2ro5fVx9Wea-DFJCc6Fi5KBNWo91dsnww&usqp=CAU",
      link: "/CarCleaning",
    },
    {
      id: 8,
      name: "Car Inspections",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm4SBHmz7j2YpDQQIxJ5Y8IF_XhcFgTOvQRKGzops-4zsekz0qIAtPU9XUws7q-tCeciI&usqp=CAU",
      link: "/CarInspections",
    },
    {
      id: 9,
      name: "Windshields & Lights",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ni5fUhu3o_Tdr0_2C1MZT1UZSIm9LVF1y7Ey2bNXyywFdvGf-OVkkiN8dSts4P3CqOY&usqp=CAU",
      link: "/WindShields",
    },
    {
      id: 10,
      name: "Suspension & Fitments",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlis_eFNQ-EP2egPuQh1gX2VSEjyjdQVvxzp3qp0FNdde_XpPn-IbnLUr6HQ5YvsAuM1E&usqp=CAU",
      link: "/Suspension",
    },
    {
      id: 11,
      name: "Clutch & Body Parts",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtze9OLgFvTGSRs1bXO0hYQdplFPtP7V3MTA&usqp=CAU",
      link: "/Clutch",
    },
    {
      id: 12,
      name: "Insurance Claims",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJU0tImOP1wZrK_Gp2lGHRhI1qcxc91NyFg&usqp=CAU",
      link: "/Insurance",
    },
  ]);

  const Card = ({ name, image }) => (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "6px",
        textAlign: "center",
        width: "250px",
        height: "200px",
        fontSize: "10px",
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
      }}
    >
      <img src={image} alt={name} style={{ maxWidth: "50%" }} />
      <Typography variant="h5">{name}</Typography>
    </div>
  );

  const tabStyles = (index) => ({
    fontSize: index === activeIndex ? "16px" : "14px",
    fontWeight: index === activeIndex ? "800" : "600",
    color: index === activeIndex ? "#FF0000" : "black",
  });

  const imageInfo = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzIfP-5tzKBvCS1qrH7wzbMwX0TERpkrqPRw&usqp=CAU",
      name: "Batteries",
      link: "/Batteries",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEeZzODEs0VRn8H8TM8eOLWlX6VusJg4Vc426QnLuZRKbcTA3sZdF1LhPde7yoexAg3vQ&usqp=CAU",
      name: "Clutch",
      link: "/Clutch",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9-3hJhSTQirvgNHgdRxXUP8gaSBJl3TWEaw&usqp=CAU",
      name: "Brakes",
      link: "/Periodic",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7KStXWzBF1N8_lO_XJnTW7mOAGiaPwicWA&usqp=CAU",
      name: "AC Parts",
      link: "/AcRepair",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrkFjkGhDlV67XeklDG2_SNIcyikLN0iRfw&usqp=CAU",
      name: "Tyres",
      link: "/Tyres",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxKE83G6CP7IrMA9-9G8Cklxaq1LvuRFg_NwEgr_fkvlGzujzTjfVfKqo480XO0Fr81jY&usqp=CAU",
      name: "Steering",
      link: "/Suspension",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE8PTp0dCbqCZvVd8V3ea0J4i26blipM3xUbDlm9nkHvSjKv2vDpnJlMeJ-4gJAABs41M&usqp=CAU",
      name: "Suspension",
      link: "/Suspension",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqc6L8jsEEmzQSQp4IUTYO2Czkscrd_K1Hik3k7eNuqtCm4b3JVZxzkdcSezwHo56MAA&usqp=CAU",
      name: "GoConnect 2.0",
      link: "/Clutch",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSghcngHd5JuOgaKWtGDn1LSTVRYKeew1Z8WMvClKjoILsMPSivoHA04UlBwVwz3EiSIk4&usqp=CAU",
      name: "Lights",
      link: "/WindShields",
    },
    {
      url: "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/car_parts_icons/glasses/xxhdpi.png",
      name: "Glass",

      link: "/Clutch",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJ3CYHD4sGoSTsl6OemdI4aQKdGrZI9M-M2_2ShLJstC8lmM6ln3YRNj8KsTviMPEGkU&usqp=CAU",
      name: "Body Parts",
      link: "/Clutch",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF1rQmdydIHUj12aIS80xiDHScbsqCnjOnfw&usqp=CAU",
      name: "Side Mirror",
      link: "/WindShields",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUQnBu6f_RV3bdVXveYTBE2fd-uoq-cTZhAGlcrJfTE2igFSeDzuSc5Xg7-0hu8bgEYcI&usqp=CAU",
      name: "Car Detailing",
      link: "/Detailing",
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext1 = () => {
    setActiveStep((prevStep) => (prevStep + 1) % imageInfo.length);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const test = () => {
      // Check if userCars is not present in localStorage
      if (!localStorage.getItem('userCars')) {
        // Set BoxVisible to true if userCars is not present
        setBoxVisible(true);
        console.log("stickyboxopen");
      } else {
        // Toggle BoxVisible based on the previous state
        setBoxVisible((prevVisible) => !prevVisible);
      }
    }
    test()
  }, [])
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageClick = () => {
    console.log("pop click")
    setIsPopupOpen(true);
  };
  useEffect(() => {
    const test = () => {
      // Check if userCars is not present in localStorage
      if (!localStorage.getItem('userCars')) {
        // Set BoxVisible to true if userCars is not present
        setBoxVisible(true);
        console.log("stickyboxopen");
      } else {
        // Toggle BoxVisible based on the previous state
        setBoxVisible((prevVisible) => !prevVisible);
      }
    }
    test()
  }, [])
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleMenuItemClick = (option) => {
    // Handle the click action, if needed
    console.log(`Clicked on ${option.label}`);
    handleClose();
  };


  const options = [
    { label: "Profile", link: "/profile" },
    { label: "GoApp Money", link: "/GoMoney" },
    { label: "OrderHistory", link: "/Orderhistory" },
    { label: "Health Card", link: "/HealthCard" },
    { label: "My Cars", link: "/MyCars" },
    { label: "Manage Address", link: "/ManageAddress" },
  ];

  const handleCardClick = (card) => {
    // Check if required values are present in local storage
    const requiredValues = [
      "BrandName",
      "modelName",
      "fuelType",
      "location",
    ];
    // Check if any of the user-related values are present
    const userValuesPresent = [usermodelId, usermodelName, userfuelType, userBrandId, userBrandName].some((value) => value);
    if (requiredValues.every((value) => localStorage.getItem(value)) || userValuesPresent) {
      // All required values are present, navigate to the page
      navigate(card.link);
    } else {
      // Display alert when values are missing
      window.alert("Please select Brand, Model, Fuel and Location.");
    }
  };
  const userValuesPresent = userId;

  const handleCardClick1 = (card) => {
    if (userValuesPresent) {
      // All required user-related values are present, navigate to the page
      navigate(card.link);
      window.location.reload();
    } else {
      // Display alert when user-related values are missing
      window.alert("Please Login...");
    }
  };

  const handleCardClick2 = (card) => {
    if (userValuesPresent) {
      // All required user-related values are present, navigate to the page
      navigate(card.link);
    } else {
      // Display alert when user-related values are missing
      window.alert("Please Login...");
    }
  };

  return (

    <div style={{ textAlign: "center" }}>

      <img
        src="https://img.freepik.com/premium-photo/crop-unrecognizable-businessman-showing-thumb-up-gesture-while-standing-with-auto-mechanic-with-wrench-hand-near-broken-car-garage_251859-2169.jpg?w=826"
        alt="Cover"
        style={{ width: "100%", height: "700px" }}
      />
      <div>

        <Box
          position="sticky"
          top={0}
          zIndex={1}
          sx={{
            background: "white",
            padding: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "50px",

            }}
          >

            <FaAngleLeft
              color="primary"
              size={30}
              onClick={handlePrev}
              style={{ cursor: "pointer" }}
            />

            <Tabs
              value={activeIndex}
              onChange={handleTabChange}
              TabIndicatorProps={{ style: { display: "none" } }}
            >
              <Tab label="Our Services" sx={tabStyles(0)} />
              <Tab label="Curated Custom Service" sx={tabStyles(1)} />
              <Tab label="Monsoon Mist" sx={tabStyles(2)} />
              <Tab label="How GoCarsmith Works?" sx={tabStyles(3)} />
              <Tab label="Rating and Reviews" sx={tabStyles(4)} />
              <Tab label="Frequently Asked Questions" sx={tabStyles(5)} />
              <Tab label="GoCarsmith Service Guide" sx={tabStyles(6)} />
              <Tab label="Price List" sx={tabStyles(7)} />
            </Tabs>
            <FaAngleRight
              color="primary"
              size={30}
              onClick={handleNext}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Box>

        <Box>
          <div
            id="our-services"
            style={{ height: "750px", width: "100%", margin: "20px 10px 50px 0px", alignItems: "center" }}
          >
            <h1 margin="20px">Our Services</h1>
            <Grid
              container
              spacing={2}
              style={{
                width: "90%",
                marginLeft: "70px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cards.map((card) => (
                <Grid
                  key={card.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  onClick={() => handleCardClick(card)}
                  sx={{ cursor: "pointer" }}
                >
                  <Card name={card.name} image={card.image} />
                </Grid>
              ))}
            </Grid>
          </div>
          <div
            style={{
              margin: "50px 0px 40px 50px",
              height: "410px",
              width: "450px"
            }}
          >
            <h1 style={{
              margin: "20px", display: "flex", paddingLeft: "10px",
              justifyContent: "start",
            }}>Miles Membership</h1>

            <div style={{
              display: "flex",
              justifyContent: "start", cursor: "pointer", marginLeft: "35px"
            }}> <img
                src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Website/Warranty/miles.png"
                alt="miles"
                onClick={() => handleCardClick2({ link: "/membership" })}
              />
            </div>

          </div>
          <div id="curated-custom-service" style={{ margin: "50px" }}>
            <h1 style={{ margin: "20px" }}>Curated Custom Services</h1>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              {imageInfo.map((card, index) => (
                <div
                  key={index}
                  square
                  style={{ display: "inline-block", marginRight: "50px" }}
                  onClick={() => handleCardClick(card)}
                >
                  <img
                    src={card.url}
                    alt={card.name}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "60%",
                      maxHeight: "100%",
                      cursor: "pointer",
                    }}
                    onClick={handleNext1}
                  />
                  <Typography variant="caption" align="center" paragraph>
                    <Typography
                      variant="caption"
                      align="center"
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      {card.name}
                    </Typography>
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <div id="monsoon-mist">
            <h1>Monsoon Mist</h1>
            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div onClick={() => handleCardClick({ link: "/Denting" })}>
                <CardWithImage
                  imageSrc="https://gomechprod.blob.core.windows.net/retail-carousel/indianewperformance_banner10prob00.jpg%3Fv%3D1701168280.901539?version=1701168282.273009"
                  title="Denting"
                />
              </div>
              <div onClick={() => handleCardClick({ link: "/CarCleaning" })}>
                <CardWithImage
                  imageSrc="https://gomechprod.blob.core.windows.net/retail-carousel/indianewperformance_banner10prob01.jpg%3Fv%3D1701168217.603626?version=1701168218.98249"
                  title="Car Cleaning"
                />
              </div>
              <div onClick={() => handleCardClick({ link: "/Periodic" })}>
                <CardWithImage
                  imageSrc="https://gomechprod.blob.core.windows.net/retail-carousel/indianewperformance_banner10prob03.jpg%3Fv%3D1701168176.882829?version=1701168178.21381"
                  title="Periodic"
                />
              </div>
              <div onClick={() => handleCardClick({ link: "/CarCleaning" })}>
                <CardWithImage
                  imageSrc="https://gomechprod.blob.core.windows.net/retail-carousel/indianewperformance_banner10prob02.jpg%3Fv%3D1701168235.838224?version=1701168237.21907"
                  title="Car Cleaning"
                />
              </div>
            </Grid>
            </div>
            <h1>Choose the Workshop Near You</h1>
            <Grid container spacing={2} sx={{ width: "100%", padding: "40px" }}>
              <CardWithImage1 imageSrc="https://storage.googleapis.com/workshop_docs/staging/608/608_ihero.jpg" />
              <CardWithImage1 imageSrc="https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/car-service_0.jpg" />
              <CardWithImage1 imageSrc="https://lh5.googleusercontent.com/p/AF1QipNxbYSkcmYdVoLR-v8aPau8NMgkE_oLVdzhZxj4" />
              <CardWithImage1
                imageSrc="https://cdni.autocarindia.com/ExtraImages/20210513053005_Renault_Duster_service.jpg"
                onClick={handleImageClick}
              />
            </Grid>
            {/* {isPopupOpen && ( */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <div id="map" style={{ width: '100%', height: '700px' }}>
              </div>
            </Box>
            {/* )} */}
          
          
            <h1>GoCarsmith Guarantee</h1>
            <Grid
              container
              spacing={3}
              style={{ height: "150px", marginBottom: "60px" }}
            >
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                style={{
                  display: "flex",
                  height: "100%",
                }}
              >
                <Paper
                  style={{
                    backgroundColor: "#F4F8FF",
                    padding: "20px",
                    margin: "30px",
                  }}
                >
                  <Typography variant="h6">Free Pickup Drop</Typography>
                </Paper>
                <Paper
                  style={{
                    backgroundColor: "#FFFFE9",
                    padding: "20px",
                    margin: "30px",
                  }}
                >
                  <Typography variant="h6">Genuine Parts</Typography>
                </Paper>
                <Paper
                  style={{
                    backgroundColor: "#FCF5FE",
                    padding: "20px",
                    margin: "30px",
                  }}
                >
                  <Typography variant="h6">30 Days Warranty</Typography>
                </Paper>
                <Paper
                  style={{
                    backgroundColor: "#F6FFF5",
                    padding: "20px",
                    margin: "30px",
                  }}
                >
                  <Typography variant="h6">Affordable Prices</Typography>
                </Paper>
              </Grid>
            </Grid>
            <div id="how-go-mechanic-works">
            <Container>
              <h1 style={{ marginBottom: "25px" }}>How GoCarsmith Works?</h1>
              <Grid container spacing={5}>
                {/* Left side with numbers 1, 2, 3, 4 */}
                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "40px",
                      border: "1px solid #ccc",
                      backgroundColor: "#e8e6df",
                      padding: "0px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    1
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "#e8e6df",
                      padding: "0px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    2
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "#e8e6df",
                      padding: "0px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    3
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "#e8e6df",
                      padding: "0px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    4
                  </Typography>
                </Grid>
                {/* Center content */}
                <Grid item xs={12} sm={6}>
                  <div>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "10px" }}
                    >
                      <b>Select The Perfect Car Service</b>
                    </Typography>
                    <p style={{ paddingLeft: "15px" }}>From GoCarsmith board portfolio of Services</p>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "30px" }}
                    >
                      <b>Schedule Free Doorstep Pick-up</b>
                    </Typography>
                    <p style={{ paddingLeft: "15px" }}>We offer free pick up and drop for all service booked</p>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "40px" }}
                    >
                      <b>Track Your Car Service Real-Time</b>
                    </Typography>
                    <p style={{ paddingLeft: "15px" }}>We Will take care of everything from here!</p>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "45px" }}
                    >
                      <b>Earn While We Service</b>
                    </Typography>
                    <p style={{ paddingLeft: "15px" }}>
                      Spread the word! You get Rs.750. Your friends get Rs.750!
                    </p>
                  </div>
                </Grid>
                {/* Right side with an image */}
                <Grid item xs={12} sm={3}>
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/Select-The-Perfect-Car-Service.png"
                    alt="Your Alt Text"
                    style={{ width: "80%", height: "auto" }}
                  />
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/Schedule-Free-Doorstep-Pick-up.png"
                    alt="Your Alt Text"
                    style={{ width: "80%", height: "auto" }}
                  />
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/track-your-car-service-real-time.png"
                    alt="Your Alt Text"
                    style={{ width: "80%", height: "auto" }}
                  />
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/Earn-While-We-Service.png"
                    alt="Your Alt Text"
                    style={{ width: "80%", height: "auto" }}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
          <div id="rating-and-reviews">
            <h1>Rating and Reviews</h1>
            <Grid container spacing={3} style={{ marginBottom: "30px" }}>
              {cardData.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <CardContent>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Grid>
              ))}
            </Grid>
            
            </div>
            <div>

            <Reviews />

            </div>
           
           
          
          <div style={{ zIndex: 1, }} id="frequently-asked-questions">
            <Typography variant="h4" style={{ marginBottom: "10px", fontWeight: "700" }}>
              Frequently Asked Questions
            </Typography>

            <div
              style={{
                marginTop: "60px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {accordionData.map((item, index) => (
                <Accordion
                  key={index}
                  style={{
                    width: "100%",
                    maxWidth: "900px",
                    marginBottom: "15px",

                    ...accordionStyles,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Typography>{item.title}</Typography>
                  </AccordionSummary>

                  <AccordionDetails >
                    <Typography style={{ backgroundColor: "#ffffff", padding: "10px", textAlign: "justify" }}>{item.content}</Typography>
                  </AccordionDetails>

                </Accordion>
              ))}
            </div>
          </div>
          <div
            id="go-mechanic-service-guide"
            style={{ height: "auto", margin: "100px" }}
          >
            <h1 style={{ marginBottom: "10px" }}>Original Spare Parts</h1>
            <Grid container spacing={4}>
              <CardCardCard imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsbfxh6qiTtDHAcwclr0JatPSc-0lu6qwgg&usqp=CAU" />
              <CardCardCard imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-lwXI5s04BSd7OwfZWqShgpnqikQ6YmM_HfCfr_jB7h2JPL1PhYCczh6WfDzH2N88JkQ&usqp=CAU" />
              <CardCardCard imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbttEpq2XOGAe0d0WyPIRXmyzzMu8oi6dKAtXOsAKS6z3Keepx0H5JYuDKMoeuu8eD-9k&usqp=CAU" />
              <CardCardCard imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSohmx2g9vA_bOHAiGu4PQPmBpHG93Bw3Blfw&usqp=CAU" />
              <CardCardCard imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0el-SXqLNXJRaki3F2F71dpPMkQgoq-Cq2Mi1CN9PF7pUycWQuvMHaCkFlwe7fCxv70&usqp=CAU" />
              <CardCardCard imageSrc="https://i0.wp.com/arksglobal.co.uk/wp-content/uploads/2023/06/Textar.jpg?resize=500%2C500&ssl=1" />
            </Grid>
            <Container style={{ width: "100%" }}>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "30px",
                  marginTop: "50px",
                  textAlign: "center",
                  marginLeft: "20px",
                }}
              >
                <b>Why Choose GoCarsmith in {locationName}?</b>
              </Typography>
              <Paper sx={{ padding: "24px", backgroundColor: "#F5F4F2" }}>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "16px", textAlign: "left", }}
                >
                  <b>Scheduled car service in {locationName}</b>
                </Typography>
                <div>
                  <ul style={{ textAlign: "left" }}>
                    <li>
                      Periodic car servicing is essential for a smooth and
                      trouble-free car ownership experience.
                    </li>
                    <li>
                      Crucial components like brake pads, tyres, the engine oil
                      have a finite life-span and need replacement periodically.
                    </li>
                    <li>
                      You can lower your cost of ownership by spending fair on
                      routine maintenance, saving you a lot of time and money.
                    </li>
                    <li>
                      A well-cared car will run and look better in the long run
                      and always hold a higher value.
                    </li>
                  </ul>
                </div>
                <div className="_1hV59">
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "left", marginTop: "20px" }}
                  >
                    <b>{BrandName} {modelName} {fuelType} Services Offered</b>
                  </Typography>
                  <div style={{ textAlign: "left" }}>
                    You can choose from our top 3 service packages:
                  </div>
                  <div className="_1VMvZ">
                    <ul style={{ textAlign: "left" }}>
                      <li>
                        <b>Basic Car Service:</b> All the bare essential
                        services to keep your car up and running.
                      </li>
                      <li>
                        <b>Standard Car Service:</b> The most popular service
                        package. Benefits of the basic scheme with additional
                        services.
                      </li>
                      <li>
                        <b>Comprehensive Car Service:</b> GoCarsmith's signature
                        package with bumper-to-bumper car servicing.
                      </li>
                    </ul>
                  </div>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "left", marginTop: "50px" }}
                  >
                    <b>Industry Rated Top Notch Equipment</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "left", marginTop: "5px" }}
                  >
                    At every GoCarsmith workshop in {locationName}, we employ
                    only the cutting edge in industry-standard car service
                    equipment. From automatic AC gas recharging apparatus, laser
                    automated wheel balancing / alignment machine, OBD2 diagnostic
                    scanner, ECU programming devices, and specialized tools
                    specific to your car.
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "left", marginTop: "20px" }}
                  >
                    <b>Warranty on car services</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "left", marginTop: "5px" }}
                  >
                    When you choose GoCarsmith, you get the GoCarsmith
                    Advantage. Your {BrandName} {modelName} service is assured under
                    our 1000kms/1 month warranty policy anywhere in
                    {locationName}. Now, book with confidence.
                  </Typography>
                </div>
              </Paper>
            </Container>
          </div>
          <div id="price-list" style={{ height: "60vh", marginBottom: "20px" }}>
            <div
              style={{
                maxWidth: "1200px",
                margin: "auto",
                padding: "20px",
              }}
            >

              <Typography
                variant="h4"
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  paddingBottom: "20px",
                }}
              >
                <b>Car Services Price List in {locationName}, India 2023</b>
              </Typography>

              <TableContainer
                component={Paper}
                style={{ tableContainer: { marginBottom: "20px" } }}
              >
                <Table style={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        Services Type
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        Price Starts From (₹)
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        Savings
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style={{ backgroundColor: "#f5f4f2" }}>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        Car Inspection/Diagnostics
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        499
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        15%
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ backgroundColor: "#f5f4f2" }}>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        Inspection
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        499
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        25%
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ backgroundColor: "#f5f4f2" }}>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        Door Glass Replacement
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        850
                      </TableCell>
                      <TableCell
                        style={{ border: "2px solid #c7c6c5", width: "200px" }}
                      >
                        30%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Box>
        {/* Icon button for chat */}
        <IconButton
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            cursor: "pointer",
            backgroundColor: "#D3D3D3",
            zIndex: 2, // Set a higher zIndex value}}
          }}
          onClick={handleIconClick}
        >
          <TimeToLeaveIcon sx={{ fontSize: "60px", color: "red", cursor: "pointer" }} />
        </IconButton>
        {isBoxVisible && (
          <div
            style={{
              position: "fixed",
              bottom: 50,
              right: 16,
              cursor: "pointer",
              zIndex: 3, // Set a higher zIndex value
            }}
          >
            <Modal onClose={() => setBoxVisible(false)} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
