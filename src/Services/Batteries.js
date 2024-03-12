import Spinner from 'react-bootstrap/Spinner';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Button from "@mui/material/Button";
import Footer from "./Footer";
import { Link, useLocation, } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect, useRef } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Paper from "@mui/material/Paper";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Carousel from "./Carousel";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
} from "@mui/material";


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
    title: "How frequently should I replace my car battery?",
    content:
      " A car battery has a low shelf life and needs replacing every 3 - 4 years. To avoid safety and reliability issues, we recommend replacing the car battery every 3 years.",
  },
  {
    title: "Why should I choose GoCarsmith for my car’s battery?",
    content:
      " GoCarsmith offers you a choice from a wide range of India’s leading car battery brands. We recommend the right battery based on the make and model of your car, along with the manufacturer’s warranty up to 5 years. We also offer free pick up and drop service and free installation on battery purchase.",
  },
  {
    title: "What should I consider when buying a car battery?",
    content:
      "While buying a car’s battery, make sure you consider the battery size, power output, and warranty. The battery size and power output should be of the exact specification for your car. A dealership warranty is a great perk to add to ensure buyer’s peace of mind.",
  },
  {
    title: "What are the different types of batteries available?",
    content:
      " We offer a wide array of brands from Amaron to Exide and many more. Please select your car, and rest assured that you’ll find a selection of batteries to choose from based on the car, charge, and warranty requirements.",
  },
  {
    title: "Do you offer any warranty on a car battery?",
    content:
      "All car batteries that are sold through GoCarsmith come with 3 to 6 years of warranty depending upon the manufacturer. Warranty details are prominently displayed against all the battery models.",
  },
];

const accordionStyles = {
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  background: "#e0e0e0",
  // Add any other styles you want
};

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
    <FontAwesomeIcon icon={faChevronRight} />
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
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);
const renderCheckboxListItem = (label, serviceIndex) => (
  <Typography
    variant="body1"
    gutterBottom
    key={label.servicename}
    style={{ display: "flex", alignItems: "center" }}
  >
    <Checkbox checked style={{ color: "green", marginRight: "8px" }} />
    {label.servicename}
  </Typography>
);
const slides = [
  {
    name: "Manish Kashyap",
    location: "Patna",
    content:
      `I own a 4-year-old ${modelName} which I use strictly for office commuting. The factory-fitted battery lasted good but was needing replacement. I chose GoCarsmith battery replacement service as they offered free doorstep installation. It was very convenient and easy for me. The battery is genuine and comes with dealer warranty.`,
  },
  {
    name: "Vidya Hegde",
    location: "Bangalore",
    content:
      `The battery on my 2012 ${modelName} just died. I usually go to a dealer and pick the battery of my choice. But, this time, I gave GoCarsmith a shot as my friends were very impressed with their services. They had the manufacturer recommended battery in stock (for my 2012 ${modelName}) and I got a free installation which is great!`,
  },
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content:
      `The battery on my ${modelName} recently got discharged. I am using additional auxiliary lights on my car. GoCarsmith helped me find the appropriate battery type, especially for my car. The mechanics were professional and did proper load testing on my car. I am very impressed and I recommend GoCarsmith.`,
  },
  {
    name: " Srikant Panda",
    location: "Bhubaneswar ",
    content:
      "I was preparing my car for a long road trip and the car required a new battery. I needed the battery the next day as I didn't want to risk breaking down in the middle of the road. Called GoCarsmith and ordered the specific battery and got it delivered the next morning. Superb service, I must say!",
  },
  {
    name: "Ankit Saxena",
    location: "Lucknow",
    content:
      "Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone",
  },
];
const Batteries = () => {


  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);

  const getToken = () => {
    return localStorage.getItem('token');
  };
  const [data, setData] = useState([]);

  const [keySpecs, setKeySpecs] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: false,
    centerPadding: '10px',
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const images = [
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-battery-replacement/Why-your-car-battery-is-draining.jpeg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-battery-replacement/Get-the-most-life-out-of-your-car-battery.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-battery-replacement/When-to-get-your-car-battery-replaced.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-battery-replacement/Lithium-ion-battery_-FUTURE-of-Automotive-Batteries.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-battery-replacement/5-Tips-to-Increase-Car-Battery-Life.jpg',
  ];


  const containerStyle = {
    position: 'relative',
    width: '100%',
    margin: 'auto',
  };

  const sliderRef = useRef(null);

  const settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: '10px',
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const carouselNames = [
    'Periodic Services', 'Ac Services & Repair', 'Batteries', 'Tyres & Wheel Care', 'Denting & Painting',
    'Detailing Services', 'Car Spa & Cleaning', 'Car inspections', 'Windshields & Lights', 'Suspension & Fitments',
    'Clutch & Body Parts', 'Insurance Claims', 'SOS Service',
  ];

  const carouselNames1 = [
    'A.S.Rao Nagar', 'Kukatpally', 'Kanchan Bagh', 'Amangal', 'Gachibowli', 'Miyapur',
  ];

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true)
      try {
        const field = 'BatteriesService';

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
            setData(response.data.BatteriesService);
            setIsLoading(false)
          } 

        // Log the response.data to the console
        console.log('Response Data:', response.data.BatteriesService);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, []); console.log();

  const [childLocations, setChildLocations] = useState([]);
  const parentId = localStorage.getItem('parentId')
  useEffect(() => {
    const fetchChildCities = async () => {
      try {
        const response = await fetch(`https://gocarsmithbackend.onrender.com/api/getChildCities/${parentId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.childLocations && data.childLocations.length > 0) {
          // Set the fetched child locations in state
          setChildLocations(data.childLocations);
        } else {
          console.log("No child locations found.");
        }
      } catch (error) {
        console.error("Error fetching child cities:", error.message);
      }
    };
    // Call the fetch function when the component mounts
    fetchChildCities();
  }, [parentId]);
  const [priceLists, setPriceLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const LabelName = "BATTERIES";
      try {
        const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/getpricelist/${location}/${BrandId}/${LabelName}`);

        if (response.status === 200) {
          setPriceLists(response.data.pricelists);
        } else {
          console.error('Failed to fetch priceLists');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [location, BrandId]);
   const navigate=useNavigate()
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  const [cartItems, setCartItems] = useState([]);
 
  const addToCart = async (items) => {
    setCartItems([...cartItems, ...items]);
    if(userId){
      try {
        const response = await fetch('https://gocarsmithbackend.onrender.com/api/AddToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ // Replace with the actual user ID
            userId,
            listOfServices: [...cartItems, ...items], // Send the updated cart to the backend
          }),
        });
  
        if (response.ok) {
         navigate('/cart')
          
        } else {
          console.error('Failed to add items to the cart on the server.');
        }
      } catch (error) {
        console.error('Error adding items to the cart on the server:', error);
      }
    }else{
      navigate("/login")
    }
    
  };
  useEffect(() => {
    const fetchKeySpecs = async () => {
      try {
        const response = await fetch(`https://gocarsmithbackend.onrender.com/api/user/getKeySpecsModel/${modelId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch key specs');
        }

        const data = await response.json();
        setKeySpecs(data.KeySpecs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKeySpecs(modelId);
  }, []);


  const { keyword } = useParams();
  // State to control the blinking effect
  const [isBlinking, setBlinking] = useState(false);
 
  // Function to add conditional class based on keyword match
  const addBlinkClass = (content) => {
    return classNames({
      'blink-class': isBlinking && keyword && content.toLowerCase().includes(keyword.toLowerCase()),
      'green-border': keyword && content.toLowerCase().includes(keyword.toLowerCase()),
    });
  };
  // UseEffect to start blinking when the keyword changes or component mounts
  useEffect(() => {
    // Set blinking to true on the initial page load or reload
    setBlinking(true);
    // Set a timeout to stop blinking after 5000 milliseconds (adjust as needed)
    const blinkTimeout = setTimeout(() => {
      setBlinking(false);
    }, 5000);
    // Cleanup the timeout to avoid memory leaks
    return () => {
      clearTimeout(blinkTimeout);
    };
  }, []);
  const amaron44MonthsWarrantyRef = useRef(null);
  const amaron55MonthsWarrantyRef = useRef(null);
  const amaron66MonthsWarrantyRef = useRef(null);
  const exide44MonthsWarrantyRef = useRef(null);
  const exide55MonthsWarrantyRef = useRef(null);
  const exide66MonthsWarrantyRef = useRef(null);
  const livguard60MonthsWarrantyRef = useRef(null);
  const livguard72MonthsWarrantyRef = useRef(null);
  const alternatorReplacementRef = useRef(null);
  const alternatorRepairRef = useRef(null);


   const scrollToBlinkingSpot = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // else{
    //   window.alert("No perfect Match Found!!")
    // }
  };

  useEffect(() => {
    // Set blinking to true on the initial page load or reload
    setBlinking(true);
  
    // Flags to track if scrolling and alerting have already occurred
    let hasScrolled = false;
    let hasAlerted = false;
  
    // Set interval for blinking effect
    const blinkInterval = setInterval(() => {
      // Scroll to the blinking card while the blinking effect is ongoing
      if (!hasScrolled && keyword && typeof keyword === 'string') {
        switch (keyword.toLowerCase()) {
          case 'amaron (44 months warranty)':
            scrollToBlinkingSpot(amaron44MonthsWarrantyRef);
            break;
          case 'amaron (55 months warranty)':
            scrollToBlinkingSpot(amaron55MonthsWarrantyRef);
            break;
          case 'amaron (66 months warranty)':
            scrollToBlinkingSpot(amaron66MonthsWarrantyRef);
            break;
          case 'exide (44 months warranty)':
            scrollToBlinkingSpot(exide44MonthsWarrantyRef);
            break;
          case 'exide (55 months warranty)':
            scrollToBlinkingSpot(exide55MonthsWarrantyRef);
            break;
          case 'exide (66 months warranty)':
            scrollToBlinkingSpot(exide66MonthsWarrantyRef);
            break;
          case 'livguard (60 months warranty)':
            scrollToBlinkingSpot(livguard60MonthsWarrantyRef);
            break;
          case 'livguard (72 months warranty)':
            scrollToBlinkingSpot(livguard72MonthsWarrantyRef);
            break;
          case 'alternator replacement':
            scrollToBlinkingSpot(alternatorReplacementRef);
            break;
          case 'alternator repair':
            scrollToBlinkingSpot(alternatorRepairRef);
            break;
          default:
            // If no match found and no alert shown, show alert
            if (!hasAlerted) {
              window.alert("No perfect Match Found!!");
              hasAlerted = true; // Update flag to indicate alert has been shown
            }
            break;
        }
        hasScrolled = true; // Update flag to indicate scrolling has occurred
      }
    }, 2000); // Adjust the interval as needed
  
    // Set a timeout to stop blinking after 5000 milliseconds (adjust as needed)
    const blinkTimeout = setTimeout(() => {
      setBlinking(false);
      clearInterval(blinkInterval);
  
      // Scroll to the blinking card after the blinking effect stops
      if (!hasScrolled && keyword && typeof keyword === 'string') {
        switch (keyword.toLowerCase()) {
          case 'amaron (44 months warranty)':
            scrollToBlinkingSpot(amaron44MonthsWarrantyRef);
            break;
          case 'amaron (55 months warranty)':
            scrollToBlinkingSpot(amaron55MonthsWarrantyRef);
            break;
          case 'amaron (66 months warranty)':
            scrollToBlinkingSpot(amaron66MonthsWarrantyRef);
            break;
          case 'exide (44 months warranty)':
            scrollToBlinkingSpot(exide44MonthsWarrantyRef);
            break;
          case 'exide (55 months warranty)':
            scrollToBlinkingSpot(exide55MonthsWarrantyRef);
            break;
          case 'exide (66 months warranty)':
            scrollToBlinkingSpot(exide66MonthsWarrantyRef);
            break;
          case 'livguard (60 months warranty)':
            scrollToBlinkingSpot(livguard60MonthsWarrantyRef);
            break;
          case 'livguard (72 months warranty)':
            scrollToBlinkingSpot(livguard72MonthsWarrantyRef);
            break;
          case 'alternator replacement':
            scrollToBlinkingSpot(alternatorReplacementRef);
            break;
          case 'alternator repair':
            scrollToBlinkingSpot(alternatorRepairRef);
            break;
          default:
            // If no match found and no alert shown, show alert
            if (!hasAlerted) {
              window.alert("No perfect Match Found!!");
              hasAlerted = true; // Update flag to indicate alert has been shown
            }
            break;
        }
      }
    }, 2000);
  
    // Cleanup the timeout and interval to avoid memory leaks
    return () => {
      clearTimeout(blinkTimeout);
      clearInterval(blinkInterval);
    };
  }, [keyword]);


  return (
    <Container style={{ marginTop: '50px' }}>

      {!(data.AMARON_44_MONTHS_WARRANTY && data.AMARON_44_MONTHS_WARRANTY.price !== null) &&
        !(data.AMARON_55_MONTHS_WARRANTY && data.AMARON_55_MONTHS_WARRANTY.price !== null) &&
        !(data.AMARON_66_MONTHS_WARRANTY && data.AMARON_66_MONTHS_WARRANTY.price !== null) &&
        !(data.EXIDE_44_MONTHS_WARRANTY && data.EXIDE_44_MONTHS_WARRANTY.price !== null) &&
        !(data.EXIDE_55_MONTHS_WARRANTY && data.EXIDE_55_MONTHS_WARRANTY.price !== null) &&
        !(data.EXIDE_66_MONTHS_WARRANTY && data.EXIDE_66_MONTHS_WARRANTY.price !== null) &&
        !(data.LIVGUARD_60_MONTHS_WARRANTY && data.LIVGUARD_60_MONTHS_WARRANTY.price !== null) &&
        !(data.LIVGUARD_72_MONTHS_WARRANTY && data.LIVGUARD_72_MONTHS_WARRANTY.price !== null) &&
        !(data.Alternator_Replacement && data.Alternator_Replacement.price !== null) &&
        !(data.Alternator_Repair && data.Alternator_Repair.price !== null) && (
          isLoading?  <Spinner animation="border" role="status" 
  style={{position: "fixed",left: "50%",
    
  }} >

  <span className="visually-hidden" >Loading...</span>

</Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
  {/* Oops! No Data Found For This Model or Location. */}
</Typography> 
        )}


      
      {/* first card */}
      {data.AMARON_44_MONTHS_WARRANTY && data.AMARON_44_MONTHS_WARRANTY.price !== null ? (
        <Card ref={amaron44MonthsWarrantyRef} className={addBlinkClass('Amaron (44 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
              <b>RECOMMENDED</b>
            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Amaron/amaron%20pro%20new-min.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Amaron (44 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 	35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 	44  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.AMARON_44_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.AMARON_44_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.AMARON_44_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/* second card */}
      {data.AMARON_55_MONTHS_WARRANTY && data.AMARON_55_MONTHS_WARRANTY.price !== null ? (
        <Card ref={amaron55MonthsWarrantyRef} className={addBlinkClass('Amaron (55 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>

            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Amaron/amaron%20pro%20new-min.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Amaron (55 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 55  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.AMARON_55_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.AMARON_55_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.AMARON_55_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/* third card */}
      {data.AMARON_66_MONTHS_WARRANTY && data.AMARON_66_MONTHS_WARRANTY.price !== null ? (
        <Card ref={amaron66MonthsWarrantyRef} className={addBlinkClass('Amaron (66 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>

            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Amaron/amaron%20pro%20new-min.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Amaron (66 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 66  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.AMARON_66_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.AMARON_66_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.AMARON_66_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/* fourth card */}
      {data.EXIDE_44_MONTHS_WARRANTY && data.EXIDE_44_MONTHS_WARRANTY.price !== null ? (
        <Card ref={exide44MonthsWarrantyRef} className={addBlinkClass('Exide (44 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
              <b>RECOMMENDED</b>
            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Exide/exide%20mileage%20new-min.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Exide (44 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 44  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.EXIDE_44_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.EXIDE_44_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.EXIDE_44_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/* fifth card */}
      {data.EXIDE_55_MONTHS_WARRANTY && data.EXIDE_55_MONTHS_WARRANTY.price !== null ? (
        <Card ref={exide55MonthsWarrantyRef} className={addBlinkClass('Exide (55 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>

            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Exide/exide%20mileage%20new-min.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Exide (55 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 55  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.EXIDE_55_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.EXIDE_55_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.EXIDE_55_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/* sixth card */}
      {data.EXIDE_66_MONTHS_WARRANTY && data.EXIDE_66_MONTHS_WARRANTY.price !== null ? (
        <Card ref={exide66MonthsWarrantyRef} className={addBlinkClass('Exide (66 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>

            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Exide/exide%20mileage%20new-min.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Exide (66 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 66  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.EXIDE_66_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.EXIDE_66_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.EXIDE_66_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/* seventh card */}
      {data.LIVGUARD_60_MONTHS_WARRANTY && data.LIVGUARD_60_MONTHS_WARRANTY.price !== null ? (
        <Card ref={livguard60MonthsWarrantyRef} className={addBlinkClass('Livguard (60 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
              <b>RECOMMENDED</b>
            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Livguard/Livguard.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Livguard (60 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 60  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.LIVGUARD_60_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LIVGUARD_60_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.LIVGUARD_60_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}



      {/* eighth card */}

      {data.LIVGUARD_72_MONTHS_WARRANTY && data.LIVGUARD_72_MONTHS_WARRANTY.price !== null ? (
        <Card ref={livguard72MonthsWarrantyRef} className={addBlinkClass('Livguard (72 Months Warranty)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>

            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery/Livguard/Livguard.png"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Livguard (72 Months Warranty)
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 4 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 35 Amp Hour
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Rating 4.8 Expert Rating ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                  {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 72  Months Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Of Cost Installation ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Old Battery Price Include' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Available at Doorstep' }, 8)}
                      {/* {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.LIVGUARD_72_MONTHS_WARRANTY.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LIVGUARD_72_MONTHS_WARRANTY.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.LIVGUARD_72_MONTHS_WARRANTY])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}

      {/* Ninth Card */}
      {data.Alternator_Replacement && data.Alternator_Replacement.price !== null ? (
        <Card ref={alternatorReplacementRef} className={addBlinkClass('Alternator Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Alternator%20Replacement/Thumbnail.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Alternator Replacement
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 6 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 1 Month Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Alternator Replacement' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Opening & Fitting of Alternator' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended :  In Case of frequently Discharging Battery
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Alternator Belt Additional' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.Alternator_Replacement.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.Alternator_Replacement.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.Alternator_Replacement])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}

      {/* Tenth Card */}
      {data.Alternator_Repair && data.Alternator_Repair.price !== null ? (
        <Card ref={alternatorRepairRef} className={addBlinkClass('Alternator Repair')}  style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Alternator%20Repair/thumbnail.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Alternator Repair
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 6 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 3 Month Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Alternator Replacement' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Opening & Fitting of Alternator' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended :  In Case of frequently Discharging Battery
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Alternator Belt Additional' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.Alternator_Repair.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.Alternator_Repair.price}/-</b>
                  </h6>
                </Grid>


                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.Alternator_Repair])}
                    >
                      Add to Cart
                    </Button>
                  
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}

      <div style={{ padding: '5px' }}>
        <h1 style={{ textAlign: 'center' , paddingBottom:"15px" }}>Customer Quotes</h1>

        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} style={{ width: "300px", height: "200px" }}>
              <Card style={{ height: "350px", margin: "5px" }}>
                <CardContent style={{ margin: "0px" }}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    {slide.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "gray", textAlgin: "end" }}
                  >
                    {slide.location}
                  </Typography>
                  <Typography variant="body2" sx={{ paddingTop: 1 ,fontSize:"16px",   textAlign:"justify" }}>
                    {slide.content}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}><b>Frequently Asked Questions</b></Typography>
        {accordionData.map((item, index) => (
          <Accordion key={index} style={{ width: '100%', maxWidth: '900px', marginBottom: '15px', ...accordionStyles }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{backgroundColor:"#ffffff" ,padding:"15px"}}>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Related Blogs</h1>
        <div style={containerStyle}>
          <Slider {...settings1} ref={sliderRef}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`slide-${index + 1}`}
                  style={{
                    width: "98%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '20px' }}>
        <b>Why Choose GoCarsmith in {locationName} ?</b>
      </Typography>

      <Paper sx={{ padding: '24px', background: "#f5f4f2" }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', }}>
          <b>Scheduled car service in {locationName}</b>
        </Typography>
        <div>
          <ul>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Battery Replacement is essential for a smooth and trouble-free car ownership experience.</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Crucial components like brake pads, tyres, the engine oil have a finite life-span and need replacement periodically.</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>You can lower your cost of ownership by spending fair on routine maintenance, saving you a lot of time and money.</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>A well-cared car will run and look better in the long run and always hold a higher value.</span>
            </li>
          </ul>
        </div>
        <div className="_1hV59">
          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b>{BrandName} {modelName} {fuelType} services offered</b></Typography>
          <div>You can choose from our top 3 service packages:</div>
          <div className="_1VMvZ">
            <ul>
              <li>
                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}><b>Basic Car Service:</b> All the bare essential services to keep your car up and running.</span>
              </li>
              <li>
                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}><b>Standard Car Service:</b> The most popular service package. Benefits of the basic scheme with additional services.</span>
              </li>
              <li>
                <span sx={{ fontWeight: 'normal', marginTop: '50px' }}><b>Comprehensive Car Service:</b> GoCarsmith's signature package with bumper-to-bumper car servicing.</span>
              </li>
            </ul>
          </div>
          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '50px' }}><b>Industry-rated top-notch equipment</b></Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
            At every GoCarsmith workshop in {locationName},
             we employ only the cutting edge in industry-standard car service equipment. 
             From automatic AC gas recharging apparatus, 
             laser automated wheel balancing/alignment machine, OBD2 diagnostic scanner, 
             ECU programming devices, and specialized tools specific to your car.
          </Typography>

          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b>Warranty on car services</b></Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
            When you choose GoCarsmith, you get the GoCarsmith Advantage. Your {BrandName} {modelName} service is assured under our 1000kms/1 month warranty policy anywhere in {locationName}. Now, book with confidence.
          </Typography>
        </div>
      </Paper>
      <div style={{marginTop:"15px"}}>
        <h1>Price Lists for {locationName} and {BrandName}</h1>
        {priceLists.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ServiceType</TableCell>
                  <TableCell>Price Starts From</TableCell>
                  <TableCell>Saving</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceLists.map((priceList) => (
                  priceList.List.map((entry) => (
                    <TableRow key={entry._id}>
                      <TableCell>{entry.ServiceType}</TableCell>
                      <TableCell>{entry.Price}</TableCell>
                      <TableCell>{entry.Saving}%</TableCell>
                    </TableRow>
                  ))
                ))}

              </TableBody>

            </Table>
          </TableContainer>
        ) : (
          <p>No priceLists found for the specified location and brand.</p>
        )
        }
      </div >


      <h1 style={{padding:"20px 0px 10px 0px"}}>Popular Regions</h1>
      <div style={{ padding: '20px', background: "#f5f4f2", marginBottom: "20px" }}>
        <Slider {...carouselSettings}>
          {childLocations.map((loc, index) => (
            <div key={loc._id} style={{ textAlign: 'center', padding: '20px' }}>
              {loc.name}
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default Batteries;