
import Spinner from 'react-bootstrap/Spinner';



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Button from '@mui/material/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import Footer from "./Footer";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from './Carousel';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

// const locationName = localStorage.getItem('locationName');
// const location = localStorage.getItem('location');
// const modelId = localStorage.getItem('modelId');
// const fuelType = localStorage.getItem('fuelType');
// const BrandId = localStorage.getItem('BrandId')
// const BrandName = localStorage.getItem('BrandName')
// const modelName = localStorage.getItem("modelName");


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
        title: "What is GoCarsmith's SOS Assistance Service?",
        content: 'Your car can be troublesome at times, leading to unexpected breakdowns. GoCarsmith range of SOS emergency services like Battery Jumpstart, Wheel Lift & Tow, Fluid Leakage Assist etc., to help you and your car get back on the road in no time.',
    },
    {
        title: "What are the charges for GoCarsmith's SOS Assistance Services?",
        content: 'The base charges for GoCarsmith SOS Services start at ₹500, which are calculated on 3 factors, viz vehicles type (Hatchback, Sedan, SUV, etc.), mode of towing opted or applicable (Flatbed or Wheel Lift), and the distance between your location and the nearest workshop.',
    },
    {
        title: "What is the response time for GoCarsmith's SOS Assistance?",
        content: 'GoCarsmith is to your rescue! Our Service Buddy takes around 3-5 minutes to cater to your request. However, the time to reach you can vary between 30 mins to 2 hours, depending on your location.',
    },
    {
        title: 'Are the Services mentioned under SOS different from the usual offerings?',
        content: 'Services mentioned as a part of SOS are offered strictly for critical emergency situations that require rapid resolution and support. These services are based on common emergency scenarios to provide quick support to the customers.',
    },
];

const accordionStyles = {
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    background: '#e0e0e0',
    // Add any other styles you want
};

const CustomNextArrow = ({ onClick }) => (
    <div
        style={{
            position: 'absolute',
            top: '50%',
            right: '-20px', // Adjust the distance from the right edge
            transform: 'translateY(-50%)',
            cursor: 'pointer',
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
            position: 'absolute',
            top: '50%',
            left: '-20px', // Adjust the distance from the left edge
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            zIndex: 1, // Ensure the arrow is above the images
        }}
        onClick={onClick}
    >
        <FontAwesomeIcon icon={faChevronLeft} />
    </div>
);
const renderCheckboxListItem = (label, serviceIndex) => (
    <Typography variant="body1" gutterBottom key={label.servicename} style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked style={{ color: 'green', marginRight: '8px' }} />
        {label.servicename}
    </Typography>
);
const slides = [
    {
        name: "Sachin Joshi",
        location: "Bombay",
        content: `Thanks, GoCarsmith, for helping me out in an emergency. I was delaying my car service, and one day I noticed Fluid Leakage from my ${modelName} car. Booked a Car Fluid Leakage Service for my car immediately under GoCarsmith SOS Service. They were very quick to help me during that time. Great Service!`,
    },
    {
        name: "Vidya Hegde",
        location: "Bangalore",
        content:
            `GoCarsmith is simply amazing. My ${modelName} car got stuck , and I was clueless about what to do. Someone near me recommended to take GoCarsmith SOS Service, and to my surprise, they responded within 10 minutes. They took my car to a garage near me and provided a great service. Thanks for saving me and my car!`
    },
    {
        name: "Srinivas Raja",
        location: "Vizag",
        content:
            `I can vouch for GoCarsmith. They are great with emergency service . I recently had Brake Failure in my ${modelName} car and needed quick assistance. I realised my brake pedal was free, and I could not drive. I immediately took the GoCarsmith SOS Service, and they assisted me very well. Thanks to them for being my saviour for me in this situation. Great service!`
    },
    {
        name: "Abhijeet Bhuyan",
        location: "Kolkata",
        content: `GoCarsmith  is amazing. I was on my way to the office and suddenly had battery issues in my ${modelName} car. I called GoCarsmith for their SOS Service, and they suggested getting a Battery Jumpstart Service. I totally enjoyed the Hassle-free process, and my car is working fine after 4 hours of service. Highly recommended!`,
    },
    {
        name: "Kasturi Nagarajan",
        location: "Chennai",
        content: `Yes, GoCarsmith provide free doorstep pickup and drop with all  services. The also ensure that our experience is completely contactless considering the need of the hour.`,
    },
];

const Sos = () => {
    const locations = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on route change
    }, [locations.pathname]);

    const getToken = () => {
        return localStorage.getItem('token');
    };
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading]=useState(false)
    const [keySpecs, setKeySpecs] = useState([]);
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
        'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Automotive-Engine-Oils-A-Definitive-Guide.jpg',
        'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Engine-Oil-Grades-Explained.jpeg',
        'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/A-Comprehensive-Guide-To-Dashboard-Warning-Lights.jpg',
        'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Bad-Habits-that-will-destroy-the-Clutch.jpeg',
        'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Carburettor-Vs-Fuel-Injection-System.jpg',
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
        'Rao Nagar', 'Kukatpallu', 'Kanchan Bagh', 'Amangal', 'Gachibowli', 'Miyapur',
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
                const field = 'SOS_Services';
                

                const response = await axios.get(
                    `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                if(response.status===200){
                    setData(response.data.SOS_Services);
                    setIsLoading(false)
                  } 

                // Log the response.data to the console
                console.log('Response Data:', response.data.SOS_Services);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, []);

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
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const userId = user?._id;
    const [cartItems, setCartItems] = useState([]);

    const navigate=useNavigate()
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
    const batteryJumpstartRef = useRef(null);
    const carEngineScanningRef = useRef(null);
    const carFluidLeakageRef = useRef(null);
    const wheelLiftTowRef = useRef(null);
    const carSelfStarterIssueRef = useRef(null);
    const flatBedTowRef = useRef(null);
    const clutchBreakdownRef = useRef(null);
    const carFloodingRef = useRef(null);
    const insuranceAccidentRef = useRef(null);
    const brakeFailureRef = useRef(null);
    const criticalDashboardLightRef = useRef(null);
    const wrongFuelEmergencyRef = useRef(null);
    const scrollToBlinkingSpot = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // else{
        //     window.alert("No perfect Match Found!!")
        //   }
    };
    useEffect(() => {
        // Set blinking to true on the initial page load or reload
        setBlinking(true);
        // Flag to track if scrolling has already occurred within the interval
        let hasScrolled = false;
        let hasAlerted = false;
        // Set a timeout to stop blinking after 5000 milliseconds (adjust as needed)
        const blinkTimeout = setTimeout(() => {
          setBlinking(false);
          // Scroll to the blinking card after the blinking effect stops
          if (!hasScrolled && keyword && typeof keyword === 'string') {
            switch (keyword.toLowerCase()) {
                case 'battery jumpstart':
                    scrollToBlinkingSpot(batteryJumpstartRef);
                    break;
                case 'car engine scanning':
                    scrollToBlinkingSpot(carEngineScanningRef);
                    break;
                case 'car fluid leakage':
                    scrollToBlinkingSpot(carFluidLeakageRef);
                    break;
                case 'wheel-lift tow ( 20 kms )':
                    scrollToBlinkingSpot(wheelLiftTowRef);
                    break;
                case 'car self starter issue':
                    scrollToBlinkingSpot(carSelfStarterIssueRef);
                    break;
                case 'flat-bed tow ( 20 kms )':
                    scrollToBlinkingSpot(flatBedTowRef);
                    break;
                case 'clutch breakdown':
                    scrollToBlinkingSpot(clutchBreakdownRef);
                    break;
                case 'car flooding':
                    scrollToBlinkingSpot(carFloodingRef);
                    break;
                case 'insurance accident':
                    scrollToBlinkingSpot(insuranceAccidentRef);
                    break;
                case 'brake failure':
                    scrollToBlinkingSpot(brakeFailureRef);
                    break;
                case 'critical dashboard light':
                    scrollToBlinkingSpot(criticalDashboardLightRef);
                    break;
                case 'wrong fuel emergency':
                    scrollToBlinkingSpot(wrongFuelEmergencyRef);
                    break;
              default:
                if (!hasAlerted) {
                  window.alert("No perfect Match Found!");
                  hasAlerted = true; // Update flag to indicate alert has been shown
                }
                break;
            }
          }
        }, 2000);
        // Set interval for blinking effect
        const blinkInterval = setInterval(() => {
          // Scroll to the blinking card while the blinking effect is ongoing
          if (!hasScrolled && keyword && typeof keyword === 'string') {
            switch (keyword.toLowerCase()) {
                case 'battery jumpstart':
                    scrollToBlinkingSpot(batteryJumpstartRef);
                    break;
                case 'car engine scanning':
                    scrollToBlinkingSpot(carEngineScanningRef);
                    break;
                case 'car fluid leakage':
                    scrollToBlinkingSpot(carFluidLeakageRef);
                    break;
                case 'wheel-lift tow ( 20 kms )':
                    scrollToBlinkingSpot(wheelLiftTowRef);
                    break;
                case 'car self starter issue':
                    scrollToBlinkingSpot(carSelfStarterIssueRef);
                    break;
                case 'flat-bed tow ( 20 kms )':
                    scrollToBlinkingSpot(flatBedTowRef);
                    break;
                case 'clutch breakdown':
                    scrollToBlinkingSpot(clutchBreakdownRef);
                    break;
                case 'car flooding':
                    scrollToBlinkingSpot(carFloodingRef);
                    break;
                case 'insurance accident':
                    scrollToBlinkingSpot(insuranceAccidentRef);
                    break;
                case 'brake failure':
                    scrollToBlinkingSpot(brakeFailureRef);
                    break;
                case 'critical dashboard light':
                    scrollToBlinkingSpot(criticalDashboardLightRef);
                    break;
                case 'wrong fuel emergency':
                    scrollToBlinkingSpot(wrongFuelEmergencyRef);
                    break;
                default:
                  // If no match found and no alert shown, show alert
                  if (!hasAlerted) {
                    window.alert("No perfect Match Found!!!");
                    hasAlerted = true; // Update flag to indicate alert has been shown
                  }
                  break;
                }
                hasScrolled = true;
              }
        }, 2000); // Adjust the interval as needed
        // Cleanup the timeout and interval to avoid memory leaks
        return () => {
          clearTimeout(blinkTimeout);
          clearInterval(blinkInterval);
        };
      }, [keyword]);

    return (<>
        <Container style={{ marginTop: '50px' }}>

            {!(data.BATTERY_JUMPSTART && data.BATTERY_JUMPSTART.price !== null) &&
                !(data.CAR_ENGINE_SCANNING && data.CAR_ENGINE_SCANNING.price !== null) &&
                !(data.CAR_FLUID_LEAKAGE && data.CAR_FLUID_LEAKAGE.price !== null) &&
                !(data.WHEEL_LIFT_TOW_20_KMS && data.WHEEL_LIFT_TOW_20_KMS.price !== null) &&
                !(data.CAR_SELF_STARTER_ISSUE && data.CAR_SELF_STARTER_ISSUE.price !== null) &&
                !(data.FLAT_BED_TOW_20KM && data.FLAT_BED_TOW_20KM.price !== null) &&
                !(data.CLUTCH_BREAKDOWN && data.CLUTCH_BREAKDOWN.price !== null) &&
                !(data.CAR_FLOODING && data.CAR_FLOODING.price !== null) &&
                !(data.INSURANCE_ACCIDENT && data.INSURANCE_ACCIDENT.price !== null) &&
                !(data.BRAKE_FAILURE && data.BRAKE_FAILURE.price !== null) &&
                !(data.CRITICAL_DASHBOARD_LIGHT && data.CRITICAL_DASHBOARD_LIGHT.price !== null) &&
                !(data.WRONG_FUEL_EMERGENCY && data.WRONG_FUEL_EMERGENCY.price !== null) && (
                    isLoading? <div style={{marginBottom:"50px"}}>
                        <Spinner animation="border" role="status" 
                    style={{
                        position: "fixed",
                        left: "50%",
                      }} 
                    >
                  
                    <span className="visually-hidden" style={{paddingBottom:"50px"}} >Loading...</span>
                  
                  </Spinner>
                    </div>  :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
                    {/* Oops! No Data Found For This Model or Location. */}
                  </Typography>
                )}

            {/* first card */}
            {data.BATTERY_JUMPSTART && data.BATTERY_JUMPSTART.price !== null ? (
                <Card ref={batteryJumpstartRef} className={addBlinkClass('Battery Jumpstart')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="260"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Battery-Jump-Start.png"
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Battery Jumpstart
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
                                                &#8226; Available at Doorstep
                                            </Typography>

                                        </CardContent>
                                        {renderCheckboxListItem({ servicename: 'Car Battery Check' }, 1)}
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br /><br />
                                            {renderCheckboxListItem({ servicename: 'Battery Jumpstart ' }, 6)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.BATTERY_JUMPSTART.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BATTERY_JUMPSTART.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.BATTERY_JUMPSTART])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* second card */}
            {data.CAR_ENGINE_SCANNING && data.CAR_ENGINE_SCANNING.price !== null ? (
                <Card ref={carEngineScanningRef} className={addBlinkClass('Car Engine Scanning')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="270"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Car-Engine-Scanning.png" 
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Car Engine Scanning
                                    </Typography>
                                    <Button style={{ color: 'gray' }}>
                                        <ScheduleIcon />Takes 8 hours
                                    </Button>
                                </div>
                                {/* Third Container */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Available at Doorstep
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Electrical Scanning' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Error code deletion' }, 2)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Scanner Report Provided
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Sensor reset' }, 3)}
                                            {renderCheckboxListItem({ servicename: 'Inspection of exaust smoke' }, 4)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CAR_ENGINE_SCANNING.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_ENGINE_SCANNING.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.CAR_ENGINE_SCANNING])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            {/* third card */}
            {data.CAR_FLUID_LEAKAGE && data.CAR_FLUID_LEAKAGE.price !== null ? (
                <Card ref={carFluidLeakageRef} className={addBlinkClass('Car Fluid Leakage')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="280"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Car-Fluid-Leakage.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Car Fluid Leakage
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
                                                &#8226;  50 Points Check
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Car Battery Check' }, 1)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Detailed Health Card
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Battery Jumpstart' }, 2)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CAR_FLUID_LEAKAGE.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_FLUID_LEAKAGE.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.CAR_FLUID_LEAKAGE])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* Fourth card */}
            {data.WHEEL_LIFT_TOW_20_KMS && data.WHEEL_LIFT_TOW_20_KMS.price !== null ? (
                <Card ref={wheelLiftTowRef} className={addBlinkClass('Wheel-Lift Tow 20 Kms')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Wheel-Lift-Towing.png"  
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Wheel-Lift Tow ( 20 Kms )
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
                                                &#8226; Available at Doorstep
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Flat Bled Towing ' }, 1)}
                                            {renderCheckboxListItem({ servicename: '	Up to 10 kms ' }, 2)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Wheel Lift Towing ' }, 3)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.WHEEL_LIFT_TOW_20_KMS.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.WHEEL_LIFT_TOW_20_KMS.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.WHEEL_LIFT_TOW_20_KMS])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* fifth card */}
            {data.CAR_SELF_STARTER_ISSUE && data.CAR_SELF_STARTER_ISSUE.price !== null ? (
                <Card ref={carSelfStarterIssueRef} className={addBlinkClass('Car Self Starter Issue')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Car-Self-Starter-Issue.png"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Car Self Starter Issue
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
                                                &#8226; Available at Doorstep
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Critical System Points Check ' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Car Battery Check' }, 2)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Underbody Inspection' }, 3)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CAR_SELF_STARTER_ISSUE.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_SELF_STARTER_ISSUE.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.CAR_SELF_STARTER_ISSUE])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            {/* sixth card */}
            {data.FLAT_BED_TOW_20KM && data.FLAT_BED_TOW_20KM.price !== null ? (
                <Card ref={flatBedTowRef} className={addBlinkClass('Flat-Bed Tow 20 Kms')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Flat-Bed-Towing.png" 
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}/>
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" gutterBottom style={{ marginRight: '270px' }}>
                                        Flat-Bed Tow ( 20 Kms )
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
                                                &#8226; Available at Doorstep
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Flat Bed Towing' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Wheel Lift Towing' }, 2)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Upto 10 Kms' }, 3)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.FLAT_BED_TOW_20KM.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FLAT_BED_TOW_20KM.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.FLAT_BED_TOW_20KM])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            {/* seventh card */}
            {data.CLUTCH_BREAKDOWN && data.CLUTCH_BREAKDOWN.price !== null ? (
                <Card ref={clutchBreakdownRef} className={addBlinkClass('Clutch Breakdown')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/sos/Clutch-Breakdown.png"
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Clutch Breakdown
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
                                                &#8226; Stucked Gear
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'In Case of Stucked Gear' }, 1)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'In Case of Clutch Pedal Free' }, 2)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CLUTCH_BREAKDOWN.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CLUTCH_BREAKDOWN.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.CLUTCH_BREAKDOWN])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* Eighth card */}
            {data.CAR_FLOODING && data.CAR_FLOODING.price !== null ? (
                <Card ref={carFloodingRef} className={addBlinkClass('Car Flooding')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/sos/Car-Flooding.png"
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Car Flooding
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
                                                &#8226; Assistance in case of car not Starting
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Assistance in Case of car Stuck in Floods' }, 1)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Assistance in Case of car Stuck in Floods
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Assistance in case of car not Starting' }, 2)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CAR_FLOODING.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_FLOODING.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.CAR_FLOODING])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            {/* Nineth card */}
            {data.INSURANCE_ACCIDENT && data.INSURANCE_ACCIDENT.price !== null ? (
                <Card ref={insuranceAccidentRef} className={addBlinkClass('Insurance Accident')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/sos/Insurance-Accident.png"
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Insurance Accident
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
                                                &#8226; Assistance in case of car not Starting
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Assistance in Case of car Stuck in Floods' }, 1)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Assistance in Case of car Stuck in Floods
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Assistance in case of car not Starting' }, 2)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.INSURANCE_ACCIDENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.INSURANCE_ACCIDENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.INSURANCE_ACCIDENT])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            {/* Tenth card */}
            {data.BRAKE_FAILURE && data.BRAKE_FAILURE.price !== null ? (
                <Card ref={brakeFailureRef} className={addBlinkClass('Brake Failure')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/sos/Brake-Failure.png"
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Brake Failure
                                    </Typography>
                                </div>
                                {/* Third Container */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; In case of Brake Fail
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'In case of Brake Fail' }, 1)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; In Case of Brake Pedal Free
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'In Case of Brake Pedal Free' }, 2)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.BRAKE_FAILURE.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BRAKE_FAILURE.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.BRAKE_FAILURE])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            {/* Eleventh card */}
            {data.CRITICAL_DASHBOARD_LIGHT && data.CRITICAL_DASHBOARD_LIGHT.price !== null ? (
                <Card ref={criticalDashboardLightRef} className={addBlinkClass('Critical Dashboard Light')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/sos/Critical-Dashboard-Light.png"
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Critical Dashboard Light
                                    </Typography>
                                </div>
                                {/* Third Container */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; In Case of Dashboard warming Light
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'In Case of Dashboard warming Light ' }, 1)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; In case of Electrical Malfunctions
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'In case of Electrical Malfunctions' }, 2)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CRITICAL_DASHBOARD_LIGHT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CRITICAL_DASHBOARD_LIGHT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.CRITICAL_DASHBOARD_LIGHT])}
                                        >
                                            Add TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            {/*Twelveth card */}
            {data.WRONG_FUEL_EMERGENCY && data.WRONG_FUEL_EMERGENCY.price !== null ? (
                <Card style={{
                    maxWidth: "1000px",
                    height: "auto",
                    margin: "auto",
                    padding:"20px",
                  }}
                >
                        <Grid container spacing={2}>
                            {/* First Container */}
                            <Grid item xs={12} sm={4}>
                                <CardMedia
                                    component="img"
                                    alt="Car Image"
                                    height="250"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/sos/Wrong-Fuel-Emergency.png"
                                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Wrong Fuel Emergency
                                    </Typography>
                                </div>
                                {/* Third Container */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; In case of Wrong Fuel In Fuel tank
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'In case of Wrong Fuel In Fuel tank' }, 1)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; In Case of Car Fuel Mixture
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'In Case of Car Fuel Mixture' }, 2)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.WRONG_FUEL_EMERGENCY.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.WRONG_FUEL_EMERGENCY.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                   
                                        <Button variant="outlined" color="error"
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                            onClick={() => addToCart([data.WRONG_FUEL_EMERGENCY])}
                                        >

                                            ADD TO CART
                                        </Button>
                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
            ) : null}

            <div style={{ padding: '5px' }}>
                <h1 style={{ textAlign: 'center', paddingBottom:"15px"  }}>Customer Quotes </h1>
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
                                    <Typography variant="body2" sx={{ paddingTop: 1 ,fontSize:"16px", textAlign:"justify" }}>
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


            <div style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Related Blogs</h1>
                <div style={containerStyle}>
                    <Slider {...settings1} ref={sliderRef}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`slide-${index + 1}`} style={{
                                    width: '98%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '15px',
                                }} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '10px' }}>
                <b>Why Choose GoCarsmith In {locationName}</b>
            </Typography>

            <Paper sx={{ padding: '5px', background: "#f5f4f2", }}>
                <p>Who wants to get stuck in an emergency with their {BrandName} {modelName} ? Well, no one. However, these situations are sometimes unavoidable, like car fluid leakage, clutch breakdown or brake failure. GoCarsmith provides SOS Services for {BrandName} {modelName} in {locationName} to get you out of these emergencies. With GoCarsmith SOS Services, you get quick support and rapid resolution for emergency scenarios to get you and your car on the road shortly.</p>
                <Typography variant="h6" sx={{ marginBottom: '16px', }}>
                    <b>Services listed under GoCarsmith SOS Service Category</b>
                </Typography>
                <div>
                    <ul>
                        <li>
                            <span sx={{ fontWeight: 'normal' }}>Battery Jumpstart Service for {BrandName} {modelName} {fuelType} in {locationName}.</span>
                        </li>
                        <li>
                            <span sx={{ fontWeight: 'normal' }}>Car Engine Scanning Service for {BrandName} {modelName} {fuelType} in {locationName}.</span>
                        </li>
                        <li>
                            <span sx={{ fontWeight: 'normal' }}>Car Fluid Leakage Service for {BrandName} {modelName} {fuelType} in {locationName}.</span>
                        </li>
                        <li>
                            <span sx={{ fontWeight: 'normal' }}>Clutch Breakdown Service for {BrandName} {modelName} {fuelType} in {locationName}.</span>
                        </li>
                    </ul>
                </div>
                <div className="_1hV59">
                    <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b>SOS Services available for {BrandName} {modelName} {fuelType} in {locationName}</b></Typography>
                    <div className="_1VMvZ">
                        <ul>
                            <li>
                                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}><b>Battery Jumpstart Service: </b> GoCarsmith assists you with Battery Jumpstart Service in {locationName} by certified Battery Technicians for {BrandName} {modelName} {fuelType} at your location.</span>
                            </li>
                            <li>
                                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}><b>Car Engine Scanning Service: </b> Under this service, we offer engine scanning using an OEM-Approved Scanner, compatible with every model of {BrandName} {modelName} {fuelType}.</span>
                            </li>
                            <li>
                                <span sx={{ fontWeight: 'normal', marginTop: '50px' }}><b>Car Fluid Leakage Service: </b> Worried about car fluid leakage? We are here to assist you with Fluid Leakage detection and instant health diagnosis in no time.</span>
                            </li>
                            <li>
                                <span sx={{ fontWeight: 'normal', marginTop: '50px' }}><b>Car Self Starter Service: </b> Having Car Self Starter Issues? Get expert starter Motor Inspection with a Battery Health Inspection facility for {BrandName} {modelName} {fuelType} in {locationName}.</span>
                            </li>
                        </ul>
                    </div>
                    <Typography variant="h7" sx={{ textAlign: 'left', marginTop: '70px' }}><b>Benefits of selecting GoCarsmith SOS Service for {BrandName} {modelName} {fuelType} in {locationName}</b></Typography>
                    <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
                        We understand the need of having professional assistance during emergencies. Hence, the GoCarsmith SOS Services consist of services that require prompt action, such as Battery Jumpstart Service, Car Engine Scanning Service, Car Fluid Leakage Service, Clutch Breakdown Service, Car Flooding Service, Brake Failure Service, Wrong Fuel Emergency Service for {BrandName} {modelName} at well-equipped GoCarsmith car garages in {locationName}.
                    </Typography>
                    <div className="_1VMvZ">
                        <ul>
                            <li>
                                <b>Quick Response Time: </b>The average response time under GoCarsmith SOS Services for {BrandName} {modelName} {fuelType} is less than 10 minutes. We understand the need for a quick solution to the Emergency solutions. Hence, we ensure to assist you with all SOS services in {locationName} and provide a solution in no time.
                            </li>
                            <li>
                                <b>Dedicated Service Buddy: </b> A dedicated Service Buddy will assist you with all your car requirements under emergencies. They will keep you updated throughout the process and help you with any issues.
                            </li>
                            <li>
                                <b>Estimate for Repair and Replacement: </b>The Service Buddy will provide you with an estimate for repair or replacement for the visible damage. However, the estimate may vary depending on internal damages after inspection.
                            </li>
                            <li>
                                <b>Professional Service at your doorstep: </b>GoCarsmith assists you with the best and affordable SOS Services at your location in {locationName} for your {BrandName} {modelName} at affordable rates to ensure you get expert service during emergencies.
                            </li>
                        </ul>
                    </div>

                </div>
            </Paper>


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
    </>
    );
};

export default Sos;