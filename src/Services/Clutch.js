import Spinner from 'react-bootstrap/Spinner';



import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Paper from "@mui/material/Paper";
import Footer from "./Footer";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Carousel from "./Carousel";
import { Link, useLocation } from 'react-router-dom';

// const locationName = localStorage.getItem('locationName');
//   const location = localStorage.getItem('location');
//   const modelId =  localStorage.getItem('modelId');
//   const fuelType = localStorage.getItem('fuelType');
//   const BrandId = localStorage.getItem('BrandId')
//   const BrandName = localStorage.getItem('BrandName')
//   const modelName = localStorage.getItem('modelName')


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
        title: "What kind of car glass does GoCarsmith use for replacement?",
        content:
            `At GoCarsmith ${locationName}, we use only ARAI certified glasses for your ${modelName} glass replacement service to provide you with the best-in-class glass replacement.`,
    },
    {
        title: "What all is included in a Windshield replacement service?",
        content:
            `The Windshield replacement service at GoCarsmith ${locationName} includes replacing the cracked/broken windshield with a new ARAI approved windshield using the best sealant and adhesives available across all GoCarsmith workshops.`,
    },
    {
        title: "How long does it take to replace a windshield?",
        content:
            `We strive to deliver our best in the least possible time. However, it may take upto 6 hours to carry out the windshield replacement process in order to ensure the quality and endurance of the new glass on your ${modelName}.`,
    },
    {
        title: "Does the glass replacement service come with a warranty?",
        content:
            `All the glass fitments done at GoCarsmith ${locationName} come with a standard fitment warranty of 1 month. No questions asked.`,
    },
    {
        title: "I can’t visit the workshop to drop my car. Can GoCarsmith help?",
        content:
            "Yes, we provide free doorstep pickup and drop with all our services. We ensure that your experience is completely contactless considering the need of the hour.",
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
        name: "Sukhvinder Singh",
        location: "Delhi",
        content:
            `I thought of getting my ${BrandName} ${modelName} serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.`,
    },
    {
        name: "Vidya Hegde",
        location: "Bangalore",
        content:
            `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
    },
    {
        name: "Sachin Joshi",
        location: "Bombay",
        content:
            `I had my ${BrandName} ${modelName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
    },
    {
        name: "Srinivas Raja",
        location: "Vizag",
        content:
            `I own a modified ${BrandName} ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`,
    },
    {
        name: "Abhijeet Bhuyan",
        location: "Kolkata",
        content:
            "Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone",
    },
    {
        name: "Kasturi Nagarajan",
        location: "Chennai",
        content:
            "Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality. ",
    },
];
const Clutch = () => {
    const locations = useLocation();
     const [isLoading,setIsLoading]=useState(false)
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on route change
    }, [locations.pathname]);
    const [keySpecs, setKeySpecs] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    };
    const [data, setData] = useState([]);
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

    const settings = {
        dots: false,
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
        "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Avoid%20Car%20Insurance%20Claim%20Rejection.png",
        "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Insurance%20Questions%20by%20Car%20Owners.png",
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/A-Comprehensive-Guide-To-Dashboard-Warning-Lights.jpg",
        "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Automotive%20Lighting%20Systems%20.png",
        "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Car%20Hazard%20Lights.png",
        "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Cars%20with%20Stock%20LED%20Headlights.png",
    ];

    const containerStyle = {
        position: "relative",
        width: "80%",
        margin: "auto",
    };

    const sliderRef = useRef(null);

    const settings1 = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };
    const carouselNames = [
        "Periodic Services",
        "Ac Services & Repair",
        "Batteries",
        "Tyres & Wheel Care",
        "Denting & Painting",
        "Detailing Services",
        "Car Spa & Cleaning",
        "Car inspections",
        "Windshields & Lights",
        "Suspension & Fitments",
        "Clutch & Body Parts",
        "Insurance Claims",
        "SOS Service",
    ];

    const carouselNames1 = [
        "A.S.Rao Nagar",
        "Kukatpally",
        "Kanchan Bagh",
        "Amangal",
        "Gachibowli",
        "Miyapur",
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
                const field = 'ClutchBodyParts';

                const response = await axios.get(
                    `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );
                if(response.status===200){
                    setData(response.data.ClutchBodyParts);
                    setIsLoading(false)
                  } 
                

                // Log the response.data to the console
                console.log('Response Data:', response.data.ClutchBodyParts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, []);

    const [priceLists, setPriceLists] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            const LabelName = "CLUTCH AND BODY";
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
    const clutchSetReplacementRef = useRef(null);
    const clutchBearingReplacementRef = useRef(null);
    const flywheelReplacementRef = useRef(null);
    const flywheelTurningRef = useRef(null);
    const clutchOverhaulRef = useRef(null);
    const frontBumperReplacementRef = useRef(null);
    const rearBumperReplacementRef = useRef(null);
    const bonnetReplacementRef = useRef(null);
    const bootReplacementRef = useRef(null);
    const fenderReplacementRef = useRef(null);
    const rightFrontDoorReplacementRef = useRef(null);
    const rightRearDoorReplacementRef = useRef(null);
    const leftFrontDoorReplacementRef = useRef(null);
    const leftRearDoorReplacementRef = useRef(null);
    const clutchTransmissionTroublesRef = useRef(null);
    const absIssueRef = useRef(null);
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
                case 'clutch set replacement':
                    scrollToBlinkingSpot(clutchSetReplacementRef);
                    break;
                case 'clutch bearing replacement':
                    scrollToBlinkingSpot(clutchBearingReplacementRef);
                    break;
                case 'flywheel replacement':
                    scrollToBlinkingSpot(flywheelReplacementRef);
                    break;
                case 'flywheel turning':
                    scrollToBlinkingSpot(flywheelTurningRef);
                    break;
                case 'clutch overhaul':
                    scrollToBlinkingSpot(clutchOverhaulRef);
                    break;
                case 'front bumper replacement':
                    scrollToBlinkingSpot(frontBumperReplacementRef);
                    break;
                case 'rear bumper replacement':
                    scrollToBlinkingSpot(rearBumperReplacementRef);
                    break;
                case 'bonnet replacement':
                    scrollToBlinkingSpot(bonnetReplacementRef);
                    break;
                case 'boot replacement':
                    scrollToBlinkingSpot(bootReplacementRef);
                    break;
                case 'fender replacement':
                    scrollToBlinkingSpot(fenderReplacementRef);
                    break;
                case 'right front door replacement':
                    scrollToBlinkingSpot(rightFrontDoorReplacementRef);
                    break;
                case 'right rear door replacement':
                    scrollToBlinkingSpot(rightRearDoorReplacementRef);
                    break;
                case 'left front door replacement':
                    scrollToBlinkingSpot(leftFrontDoorReplacementRef);
                    break;
                case 'left rear door replacement':
                    scrollToBlinkingSpot(leftRearDoorReplacementRef);
                    break;
                case 'clutch & transmission troubles':
                    scrollToBlinkingSpot(clutchTransmissionTroublesRef);
                    break;
                case 'abs issue':
                    scrollToBlinkingSpot(absIssueRef);
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
                case 'clutch set replacement':
                    scrollToBlinkingSpot(clutchSetReplacementRef);
                    break;
                case 'clutch bearing replacement':
                    scrollToBlinkingSpot(clutchBearingReplacementRef);
                    break;
                case 'flywheel replacement':
                    scrollToBlinkingSpot(flywheelReplacementRef);
                    break;
                case 'flywheel turning':
                    scrollToBlinkingSpot(flywheelTurningRef);
                    break;
                case 'clutch overhaul':
                    scrollToBlinkingSpot(clutchOverhaulRef);
                    break;
                case 'front bumper replacement':
                    scrollToBlinkingSpot(frontBumperReplacementRef);
                    break;
                case 'rear bumper replacement':
                    scrollToBlinkingSpot(rearBumperReplacementRef);
                    break;
                case 'bonnet replacement':
                    scrollToBlinkingSpot(bonnetReplacementRef);
                    break;
                case 'boot replacement':
                    scrollToBlinkingSpot(bootReplacementRef);
                    break;
                case 'fender replacement':
                    scrollToBlinkingSpot(fenderReplacementRef);
                    break;
                case 'right front door replacement':
                    scrollToBlinkingSpot(rightFrontDoorReplacementRef);
                    break;
                case 'right rear door replacement':
                    scrollToBlinkingSpot(rightRearDoorReplacementRef);
                    break;
                case 'left front door replacement':
                    scrollToBlinkingSpot(leftFrontDoorReplacementRef);
                    break;
                case 'left rear door replacement':
                    scrollToBlinkingSpot(leftRearDoorReplacementRef);
                    break;
                case 'clutch & transmission troubles':
                    scrollToBlinkingSpot(clutchTransmissionTroublesRef);
                    break;
                case 'abs issue':
                    scrollToBlinkingSpot(absIssueRef);
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

      
    return (
        <Container style={{ marginTop: '50px' }}>

            {!(data.CLUTCH_SET_REPLACEMENT && data.CLUTCH_SET_REPLACEMENT.price !== null) &&
                !(data.CLUTCH_BEARING_REPLACEMENT && data.CLUTCH_BEARING_REPLACEMENT.price !== null) &&
                !(data.FLYWHEEL_REPLACEMENT && data.FLYWHEEL_REPLACEMENT.price !== null) &&
                !(data.FLYWHEEL_TURNING && data.FLYWHEEL_TURNING.price !== null) &&
                !(data.CLUTCH_OVERHAUL && data.CLUTCH_OVERHAUL.price !== null) &&
                !(data.FRONT_BUMBER_REPLACEMENT && data.FRONT_BUMBER_REPLACEMENT.price !== null) &&
                !(data.REAR_BUMPER_REPLACEMENT && data.REAR_BUMPER_REPLACEMENT.price !== null) &&
                !(data.BONNET_REPLACEMENT && data.BONNET_REPLACEMENT.price !== null) &&
                !(data.BOOT_REPLACEMENT && data.BOOT_REPLACEMENT.price !== null) &&
                !(data.FENDER_REPLACEMENT && data.FENDER_REPLACEMENT.price !== null) &&
                !(data.RIGHT_FRONT_DOOR_REPLACEMENT && data.RIGHT_FRONT_DOOR_REPLACEMENT.price !== null) &&
                !(data.RIGHT_REAR_DOOR_REPLACEMENT && data.RIGHT_REAR_DOOR_REPLACEMENT.pricee !== null) &&
                !(data.LEFT_FRONT_DOOR_REPLACEMENT && data.LEFT_FRONT_DOOR_REPLACEMENT.price !== null) &&
                !(data.LEFT_REAR_DOOR_REPLACEMENT && data.LEFT_REAR_DOOR_REPLACEMENT.price !== null) &&
                !(data.CLUTCH_TRANSMISSION_TROUBLES && data.CLUTCH_TRANSMISSION_TROUBLES.price !== null) &&
                !(data.ABS_ISSUE && data.ABS_ISSUE.price !== null) && (
                   
 isLoading?  <Spinner animation="border" role="status" 
 style={{position: "fixed",left: "50%",
   
 }} >

 <span className="visually-hidden" >Loading...</span>

</Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
 {/* Oops! No Data Found For This Model or Location. */}
</Typography>
                )}


            <h1 style={{ marginLeft: '80px' }}>Clutch</h1>
            {/* first card */}
            {data.CLUTCH_SET_REPLACEMENT && data.CLUTCH_SET_REPLACEMENT.price !== null ? (
                <Card ref={clutchSetReplacementRef} className={addBlinkClass('Clutch Set Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
                <Card
                  style={{
                    maxWidth: "1000px",
                    height: "auto",
                    margin: "auto",
                    padding:"20px"
                  }}
                >
                        <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
                            <b>FREE 50 POINT INSPECTION</b>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <CardMedia
                                    component="img"
                                    alt="Car Image"
                                    height="300"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Clutch%20Service/Thumbnail.jpg"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Clutch Set Replacement
                                    </Typography>
                                    <Button style={{ color: 'gray' }}>
                                        <ScheduleIcon />Takes 6 Hours
                                    </Button>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended : In Case of Electrical Malfunctioning
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Clutch Set OES (Clutch Plate + Pressure Plate) Replacement' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Clutch Set' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Clutch Cable / Wire, Release Bearing / Clutch Cylinder, Flywheel, Slave Cylinder in Add Ons' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; 1 Month warranty
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Clutch Oil, Gear Oil Cost Additional' }, 4)}
                                            {renderCheckboxListItem({ servicename: 'Automatic Transmission Clutch rates may vary' }, 5)}
                                            {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 5)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CLUTCH_SET_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CLUTCH_SET_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.CLUTCH_SET_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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
            {data.CLUTCH_BEARING_REPLACEMENT && data.CLUTCH_BEARING_REPLACEMENT.price !== null ? (
                <Card ref={clutchBearingReplacementRef} className={addBlinkClass('Clutch Bearing Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Clutch%20Bearing%20OES%20Replacement/Thumbnail.jpg" 
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Clutch Bearing Replacement
                                    </Typography>
                                    <Button style={{ color: 'gray' }}>
                                        <ScheduleIcon />Takes 6 Hours
                                    </Button>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended : In Case of Electrical Malfunctioning
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Clutch Bearing OES Replacement' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Spare Part Price Only' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Clutch Set, Clutch Cable / Wire, Clutch Cylinder, Flywheel, Hydraulic Bearing in Add Ons' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; 1 Month warranty
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Clutch Oil, Gear Oil Cost Additional' }, 4)}
                                            {renderCheckboxListItem({ servicename: 'Automatic Transmission Clutch rates may vary' }, 5)}
                                            {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 5)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CLUTCH_BEARING_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CLUTCH_BEARING_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.CLUTCH_BEARING_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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
            {data.FLYWHEEL_REPLACEMENT && data.FLYWHEEL_REPLACEMENT.price !== null ? (
                <Card ref={flywheelReplacementRef} className={addBlinkClass('Flywheel Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/flywheelThumbnail%20(1).jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Flywheel Replacement
                                    </Typography>
                                    <Button style={{ color: 'gray' }}>
                                        <ScheduleIcon />Takes 8 Hours
                                    </Button>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended : In Case of Electrical Malfunctioning
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Flywheel OES Replacement' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Spare Part Price Only' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Clutch Set, Clutch Bearing, Clutch Cable / Wire, Clutch Cylinder, Slave Cylinder in Add Ons' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; 1 Month warranty
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Clutch Oil, Gear Oil  Additional' }, 4)}
                                            {renderCheckboxListItem({ servicename: 'Automatic Transmission Clutch rates may vary' }, 5)}
                                            {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 5)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.FLYWHEEL_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FLYWHEEL_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.FLYWHEEL_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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
            {data.FLYWHEEL_TURNING && data.FLYWHEEL_TURNING.price !== null ? (
                <Card ref={flywheelTurningRef} className={addBlinkClass('Flywheel Turning')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Flywheel%20turning/Thumbanil.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Flywheel Turning
                                    </Typography>
                                    <Button style={{ color: 'gray' }}>
                                        <ScheduleIcon />Takes 6 Hours
                                    </Button>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended : In Case of Electrical Malfunctioning
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Resurfacing of Flywheel' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Inspection of Clutch System' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Clutch Plate, Pressure Plate, Clutch Bearing & Clutch Cable Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; 1 Month warranty
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Flywheel Cost Additional' }, 4)}
                                            {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 5)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.FLYWHEEL_TURNING.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FLYWHEEL_TURNING.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.FLYWHEEL_TURNING])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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
            {data.CLUTCH_OVERHAUL && data.CLUTCH_OVERHAUL.price !== null ? (
                <Card ref={clutchOverhaulRef} className={addBlinkClass('Clutch Overhaul')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
                <Card
                  style={{
                    maxWidth: "1000px",
                    height: "auto",
                    margin: "auto",
                    padding:"20px"
                  }}
                >
                        <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
                            <b>FREE CAR WASH</b>
                        </Typography>
                        <Grid container spacing={2}>
                            {/* First Container */}
                            <Grid item xs={12} sm={4}>
                                <CardMedia
                                    component="img"
                                    alt="Car Image"
                                    height="200"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Overhaul%20Services/Clutch%20Overhaul/clutch%20overhaul.jpg"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Clutch Overhaul
                                    </Typography>
                                    <Button style={{ color: 'gray' }}>
                                        <ScheduleIcon />Takes 8 Hours
                                    </Button>
                                </div>
                                {/* Third Container */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; 1 Month Warranty on Labour
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Pressure Plate' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting + Inspection Of Below Items' }, 2)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Clutch Plate' }, 3)}
                                            {renderCheckboxListItem({ servicename: 'Release Bearing' }, 4)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.CLUTCH_OVERHAUL.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CLUTCH_OVERHAUL.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.CLUTCH_OVERHAUL])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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
            {data.FRONT_BUMBER_REPLACEMENT && data.FRONT_BUMBER_REPLACEMENT.price !== null ? (
                <Card ref={frontBumperReplacementRef} className={addBlinkClass('Front Bumper Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Front%20Bumper/Front%20Bumper.png"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Front Bumper Replacement
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
                                                &#8226; 1 Month Warranty on Fitting
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Front Bumper' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Addtional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; For Broken / Cracked Bumper ( Recommended )
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Front Bumper Replacement (Black Colour)' }, 4)}
                                            {renderCheckboxListItem({ servicename: 'Brackets, Grills, Cladding Additional' }, 5)}
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.FRONT_BUMBER_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FRONT_BUMBER_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.FRONT_BUMBER_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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
            {data.REAR_BUMPER_REPLACEMENT && data.REAR_BUMPER_REPLACEMENT.price !== null ? (
                <Card ref={rearBumperReplacementRef} className={addBlinkClass('Rear Bumper Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Rear%20Bumper/Rear%20Bumper%20Replacement%20Sq.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Rear Bumper Replacement
                                    </Typography>
                                    <Button style={{ color: 'gray' }}>
                                        <ScheduleIcon />Takes 24 hours
                                    </Button>
                                </div>
                                {/* Third Container */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; 1 Month Warranty on Fitting
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Front Bumper' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Addtional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; For Broken / Cracked Bumper ( Recommended )
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Rear Bumper Replacement (Black Colour)' }, 3)}
                                            {renderCheckboxListItem({ servicename: 'Brackets, Grills, Cladding Additional' }, 4)}

                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Price and Add to Cart Container */}
                            <Grid container>
                                <Grid item xs={12} sm={10}>
                                    <h6 className="text-success">
                                        <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                            ₹ {data.REAR_BUMPER_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.REAR_BUMPER_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.REAR_BUMPER_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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
            {data.BONNET_REPLACEMENT && data.BONNET_REPLACEMENT.price !== null ? (
                <Card ref={bonnetReplacementRef} className={addBlinkClass('Bonnet Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/Bonnet%20Replacement/Thumbnail.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Bonnet Replacement
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
                                                &#8226; Recommended: In Case Corroded Bonnet
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Bonnet Replacement' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Bonnet' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Hinges, Stay Rod / Shocker, Lock Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended: In Case Broken / Damaged Bonnet
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Additional' }, 3)}
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
                                            ₹ {data.BONNET_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BONNET_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.BONNET_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* ninth card */}
            {data.BOOT_REPLACEMENT && data.BOOT_REPLACEMENT.price !== null ? (
                <Card ref={bootReplacementRef} className={addBlinkClass('Boot Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/Boot%20replacement/Thumbnail.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Boot Replacement
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
                                                &#8226; Recommended: In Case Corroded Fender
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Fender Replacement' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Fender' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Fender Lining, Indicator, Hinge / Support Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended: In Case Broken / Damaged Fender
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Additional' }, 3)}
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
                                            ₹ {data.BOOT_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BOOT_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.BOOT_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* tenth card */}
            {data.FENDER_REPLACEMENT && data.FENDER_REPLACEMENT.price !== null ? (
                <Card ref={fenderReplacementRef} className={addBlinkClass('Fender Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/Fender%20Replacement/Thumbnail.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Fender Replacement
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
                                                &#8226; Recommended: In Case Corroded Fender
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Fender Replacement' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Fender' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Fender Lining, Indicator, Hinge / Support Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended: In Case Broken / Damaged Fender
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Additional' }, 3)}
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
                                            ₹ {data.FENDER_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FENDER_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.FENDER_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* 11th card */}
            {data.RIGHT_FRONT_DOOR_REPLACEMENT && data.RIGHT_FRONT_DOOR_REPLACEMENT.price !== null ? (
                <Card ref={rightFrontDoorReplacementRef} className={addBlinkClass('Right Front Door Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/Right%20Front%20Door%20Replacement/Thumbnail.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Right Front Door Replacement
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
                                                &#8226; Recommended: In Case Corroded Door
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Right Front Door Replacement (Single Unit)' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Right Front Door Replacement' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Hinges, Weatherstrip, Handle, Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended: In Case Broken / Damaged Door
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Trim, Lock, Window Glass & Channel Cost Additional' }, 3)}
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Additional' }, 4)}
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
                                            ₹ {data.RIGHT_FRONT_DOOR_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RIGHT_FRONT_DOOR_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.RIGHT_FRONT_DOOR_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* 12th card */}
            {data.RIGHT_REAR_DOOR_REPLACEMENT && data.RIGHT_REAR_DOOR_REPLACEMENT.price !== null ? (
                <Card ref={rightRearDoorReplacementRef} className={addBlinkClass('Right Rear Door Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/Right%20Rear%20Door%20Replacement/Thumbnail.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Right Rear Door Replacement
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
                                                &#8226; Recommended: In Case Corroded Door
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Right Rear Door Replacement (Single Unit)' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Right Rear Door Replacement' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Hinges, Weatherstrip, Handle, Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended: In Case Broken / Damaged Door
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Trim, Lock, Window Glass & Channel Cost Additional' }, 3)}
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Additional' }, 4)}
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
                                            ₹ {data.RIGHT_REAR_DOOR_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RIGHT_REAR_DOOR_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.RIGHT_REAR_DOOR_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* 13th card */}
            {data.LEFT_FRONT_DOOR_REPLACEMENT && data.LEFT_FRONT_DOOR_REPLACEMENT.price !== null ? (
                <Card ref={leftFrontDoorReplacementRef} className={addBlinkClass('Left Front Door Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/Left%20Front%20Door%20Replacement/Thumbnail.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Left Front Door Replacement
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
                                                &#8226; Recommended: In Case Corroded Door
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Left Front Door Replacement (Single Unit)' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Left Front Door' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Hinges, Weatherstrip, Handle, Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended: In Case Broken / Damaged Door
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Trim, Lock, Window Glass & Channel Cost Additional' }, 3)}
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Additional' }, 4)}
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
                                            ₹ {data.LEFT_FRONT_DOOR_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LEFT_FRONT_DOOR_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.LEFT_FRONT_DOOR_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* 14th card */}
            {data.LEFT_REAR_DOOR_REPLACEMENT && data.LEFT_REAR_DOOR_REPLACEMENT.price !== null ? (
                <Card ref={leftRearDoorReplacementRef} className={addBlinkClass('Left Rear Door Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/Left%20Rear%20Door%20Replacement/Thumbnail.png"
                                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                                        Left Rear Door Replacement
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
                                                &#8226; Recommended: In Case Corroded Door
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: 'Left Rear Door Replacement (Single Unit)' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Opening & Fitting of Left Rear Door' }, 2)}
                                            {renderCheckboxListItem({ servicename: 'Hinges, Weatherstrip, Handle, Cost Additional' }, 3)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom>
                                                &#8226; Recommended: In Case Broken / Damaged Door
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Trim, Lock, Window Glass & Channel Cost Additional' }, 3)}
                                            {renderCheckboxListItem({ servicename: 'Paint Cost Additional' }, 4)}
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
                                            ₹ {data.LEFT_REAR_DOOR_REPLACEMENT.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LEFT_REAR_DOOR_REPLACEMENT.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.LEFT_REAR_DOOR_REPLACEMENT])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginRight: '750px', marginTop: '20px' }}>
                <b>Custom Issues</b>
            </Typography>

            {/* 15th card */}
            {data.CLUTCH_TRANSMISSION_TROUBLES && data.CLUTCH_TRANSMISSION_TROUBLES.price !== null ? (
                <Card ref={clutchTransmissionTroublesRef} className={addBlinkClass('Clutch & Transmission Troubles')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="220"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/CUSTOM%20SERVICES/Clutch%20_%20Transmission%20Troubles.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        Clutch & Transmission Troubles
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
                                                &#8226;  Recommended : In Case of Hard Clutch
                                            </Typography>
                                            <br />
                                            {renderCheckboxListItem({ servicename: '25 Points Check-Lis' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Clutch & Gear Box Inspection' }, 2)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br /><br />
                                            {renderCheckboxListItem({ servicename: 'Physical Car Diagnosis' }, 3)}
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
                                            ₹ {data.CLUTCH_TRANSMISSION_TROUBLES.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CLUTCH_TRANSMISSION_TROUBLES.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.CLUTCH_TRANSMISSION_TROUBLES])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}


            {/* 16th card */}
            {data.ABS_ISSUE && data.ABS_ISSUE.price !== null ? (
                <Card ref={absIssueRef} className={addBlinkClass('ABS Issue')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                    height="200"
                                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/CUSTOM%20SERVICES/ABS%20Issue.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                />
                            </Grid>
                            {/* Second Container */}
                            <Grid item sm={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                        ABS Issue
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
                                                &#8226; Recommended : In Case of ABS Dashboard Light
                                            </Typography>
                                            {renderCheckboxListItem({ servicename: 'Full Car Scanning' }, 1)}
                                            {renderCheckboxListItem({ servicename: 'Brake Electrical System Inspection' }, 2)}
                                        </CardContent>
                                    </Grid>
                                    {/* Fourth Container */}
                                    <Grid item xs={12} sm={6}>
                                        <CardContent>
                                            <br /><br />
                                            {renderCheckboxListItem({ servicename: '25 Points Check-List' }, 3)}
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
                                            ₹ {data.ABS_ISSUE.price + 500}/-
                                        </span>
                                        &nbsp;&nbsp;
                                        <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.ABS_ISSUE.price}/-</b>
                                    </h6>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    
                                        <Button variant="outlined" color="error"
                                            onClick={() => addToCart([data.ABS_ISSUE])}
                                            style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Card>
            ) : null}

            <div style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center', paddingBottom:"15px"  }}>Customer Quotes</h1>
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
            <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '20px' }}>
                <b>Why Choose GoCarsmith In {locationName}</b>
            </Typography>

            <Paper sx={{ padding: '24px', background: "#f5f4f2", }}>
                <Typography variant="h6" sx={{ marginBottom: '16px', }}>
                    <b>Light & Fitment Services in {locationName}</b>
                </Typography>
                <p>Headlight Replacement and Taillight Replacement Services offered by GoCarsmith {locationName} enable you to get your {modelName} headlights and taillights replaced without facing any hassle. Get OEM/OES developed headlight/taillight assemblies for your {modelName} with GoCarsmith {locationName}.</p>
                <div className="_1hV59">
                    <Typography variant="h7" sx={{ textAlign: 'left', marginTop: '20px' }}><b>Light & Fitment Services Inclusions:</b></Typography>
                    <p>We offer light replacement services for all cars of any make and model at GoCarsmith {locationName}. The light replacement service includes:</p>
                    <div className="_1VMvZ">
                        <ul>
                            <li>
                                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}>Headlight Replacement Service</span>
                            </li>
                            <li>
                                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}>Tail Light Replacement Service</span>
                            </li>
                            <li>
                                <span sx={{ fontWeight: 'normal', marginTop: '50px' }}>Horn Replacement Service</span>
                            </li>
                        </ul>
                    </div>
                    <Typography variant="h7" sx={{ textAlign: 'left', marginTop: '20px' }}><b>Specialised Tools & Equipment</b></Typography>
                    <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
                        All the GoCarsmith workshops across {locationName} have specialised tools and modern equipment which ensure that the headlight, taillight or the horn on your {modelName} is fitted well in place and functions completely. Our trained mechanics also ensure that the front or the rear bumper is fitted back well if they need to be opened to carry out the light replacement service.
                    </Typography>
                    <Typography variant="h7" sx={{ textAlign: 'left', marginTop: '30px' }}><b>Warranty on Light & Fitment Services</b></Typography>
                    <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
                        All the headlight/taillight replacement services at GoCarsmith {locationName} come with a 1-month warranty on fitting.
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

export default Clutch;