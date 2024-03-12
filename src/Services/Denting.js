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
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Box,
} from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from "./Footer";
import Carousel from './Carousel';
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
    title: `What kind of damages can be repaired on my ${modelName}?`,
    content: `We are equipped to fix any kind of sheet metal damage (dents, dings, tears), paint damage (scratches, scuffs, blemishes, paint chips), and plastic and fiber parts on your ${modelName}. We even do custom car repairs. Our various auto body workshops across ${locationName} use specialized tools and machinery to take care of any denting/painting repairs.`,
  },
  {
    title: 'Do I get any warranty on Denting/Painting car service?',
    content: `Yes, absolutely. With GoCarsmith, you get 2 years of unconditional warranty on paint for your ${modelName}.`,
  },
  {
    title: `Can you match the paint color exactly to my ${modelName}?`,
    content: `We use DU PONT paint over Grade-A primer and specialized color palettes approved by ${modelName}, which offer exceptional color match exactly to your ${modelName}. With GoCarsmith, you can be sure of getting the best denting/painting services in ${locationName}.`,
  },
  {
    title: 'How much time does denting/painting repair take?',
    content: `A single panel on your ${modelName} takes around 24 hours start-to-finish due to the elaborative procedures involved. The process also requires further rubbing, polishing, and buffing. A full car body denting and painting for ${modelName} can take around 7-8 days depending on the repairs required on the car.`,
  },
  {
    title: 'Are the rates mentioned for painting, also includes denting?',
    content: `The prices for denting and painting depend on the extent of the damage and repairs involved. If a body-panel on your ${modelName} has a minor dent, then the painting cost will be included with denting. However, if the dent is extensive, we will provide a quote after thoroughly inspecting the damage.`,
  },
  {
    title: `Can you repair a cracked windshield on my ${BrandName} ${modelName}?`,
    content: `Repairing a cracked windshield on your ${BrandName} ${modelName} depends on three main factors: size, depth, and location. Minor chips and scratches can be repaired but larger, deeper cracks in the glass that extend to the edges of the Windshield require a replacement.`,
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
    name: "Vidya Hegde",
    location: "Bangalore",
    content: `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
  },
  {
    name: "Sachin Joshi",
    location: "Bombay",
    content: 'I am extremely happy with the technical assistance. Billing, invoicing and other payment-related problems were common issues faced by both, the customers and us as well. But from GoCarsmith it has reduced to a lot amount as they offer 24x7 service for solving problems related to bills, some technical errors, garage operation, the management, or even solving customer’s problems.',
  },
  {
    name: "Srinivas Raja",
    location: "Vizag",
    content: `The tyres on my ${modelName} had multiple punctures, so I decided to get them replaced. I booked a tyre replacement from the GoCarsmith app. Booking was easy and hassle-free. I got a call in 30 mins. They also provided a warranty on the tyres I purchased. Great service from GoCarsmith.`,
  },
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content:
      'As summers were approaching, I started my car AC to check if it was working fine and to my surprise, it wasn’t cooling well. Immediately called up Sahil from GoCarsmith. He arranged a pick up from my home, diagnosed and updated me over the phone. The service included a minor AC recharge and I was all set to go. Truly amazing.'
  },
  {
    name: "Sukhvinder Singh",
    location: "Delhi",
    content:
      'Quite unusually, my car was overheating while running the AC. I was so fed up, that I used to switch off the AC during peak summers which was troublesome for me. Gave GoCarsmith a call and all and they narrowed down the problem to a faulty compressor. They replaced the unit with an OEM one and no more sweaty car journeys for me.'
  },
  {
    name: "Abhijeet Bhuyan",
    location: "Kolkata",
    content: 'I am extremely happy with the technical assistance. Billing, invoicing and other payment-related problems were common issues faced by both, the customers and us as well. But from GoCarsmith it has reduced to a lot amount as they offer 24x7 service for solving problems related to bills, some technical errors, garage operation, the management, or even solving customer’s problems.'
  },

];
const Denting = () => {
  const [isLoading,setIsLoading]=useState(false)
  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);
  const getToken = () => {
    return localStorage.getItem('token');
  };
  const [data, setData] = useState([]);


  const [keySpecs, setKeySpecs] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const handleButtonClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
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
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-dent-paint/Types-Of-Car-Scratches-And-Repairs-Explained.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-dent-paint/An-Insight-into-Automotive-Paints-And-Coatings.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-dent-paint/Car-Wrapping-The-Best-Alternative-For-Car-Painting.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-dent-paint/Paint-Protection-Film-(PPF)-All-you-need-to-Know!.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-dent-paint/Car-Coating--Teflon-Vs-Ceramic--Explained.jpeg',
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

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true)
      try {
        const field = 'DentingAndPainting';

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
          setData(response.data.DentingAndPainting);
          setIsLoading(false)
        } 

        // Log the response.data to the console
        console.log('Response Data:', response.data.DentingAndPainting);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, []);
  const [priceLists, setPriceLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const LabelName = "DENTING AND PAINTING";
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
  const frontBumperPaintRef = useRef(null);
  const bonnetPaintRef = useRef(null);
  const rearBumperPaintRef = useRef(null);
  const bootPaintRef = useRef(null);
  const fullBodyDentPaintRef = useRef(null);
  const alloyPaintRef = useRef(null);
  const leftFenderPaintRef = useRef(null);
  const leftFrontDoorPaintRef = useRef(null);
  const leftRearDoorPaintRef = useRef(null);
  const leftQuarterPanelPaintRef = useRef(null);
  const leftRunningBoardPaintRef = useRef(null);
  const rightFenderPaintRef = useRef(null);
  const rightFrontDoorPaintRef = useRef(null);
  const rightRearDoorPaintRef = useRef(null);
  const rightQuarterPanelPaintRef = useRef(null);
  const rightRunningBoardPaintRef = useRef(null);
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
    // Flag to track if scrolling has already occurred within the interval
    let hasScrolled = false;
    let hasAlerted = false;
    // Set a timeout to stop blinking after 5000 milliseconds (adjust as needed)
    const blinkTimeout = setTimeout(() => {
      setBlinking(false);
      // Scroll to the blinking card after the blinking effect stops
      if (!hasScrolled && keyword && typeof keyword === 'string') {
        switch (keyword.toLowerCase()) {
          case 'front bumper paint':
            scrollToBlinkingSpot(frontBumperPaintRef);
            break;
          case 'bonnet paint':
            scrollToBlinkingSpot(bonnetPaintRef);
            break;
          case 'rear bumper paint':
            scrollToBlinkingSpot(rearBumperPaintRef);
            break;
          case 'boot paint':
            scrollToBlinkingSpot(bootPaintRef);
            break;
          case 'full body dent paint':
            scrollToBlinkingSpot(fullBodyDentPaintRef);
            break;
          case 'alloy paint':
            scrollToBlinkingSpot(alloyPaintRef);
            break;
          case 'left fender paint':
            scrollToBlinkingSpot(leftFenderPaintRef);
            break;
          case 'left front door paint':
            scrollToBlinkingSpot(leftFrontDoorPaintRef);
            break;
          case 'left rear door paint':
            scrollToBlinkingSpot(leftRearDoorPaintRef);
            break;
          case 'left quarter panel paint':
            scrollToBlinkingSpot(leftQuarterPanelPaintRef);
            break;
          case 'left running board paint':
            scrollToBlinkingSpot(leftRunningBoardPaintRef);
            break;
          case 'right fender paint':
            scrollToBlinkingSpot(rightFenderPaintRef);
            break;
          case 'right front door paint':
            scrollToBlinkingSpot(rightFrontDoorPaintRef);
            break;
          case 'right rear door paint':
            scrollToBlinkingSpot(rightRearDoorPaintRef);
            break;
          case 'right quarter panel paint':
            scrollToBlinkingSpot(rightQuarterPanelPaintRef);
            break;
          case 'right running board paint':
            scrollToBlinkingSpot(rightRunningBoardPaintRef);
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
          case 'front bumper paint':
            scrollToBlinkingSpot(frontBumperPaintRef);
            break;
          case 'bonnet paint':
            scrollToBlinkingSpot(bonnetPaintRef);
            break;
          case 'rear bumper paint':
            scrollToBlinkingSpot(rearBumperPaintRef);
            break;
          case 'boot paint':
            scrollToBlinkingSpot(bootPaintRef);
            break;
          case 'full body dent paint':
            scrollToBlinkingSpot(fullBodyDentPaintRef);
            break;
          case 'alloy paint':
            scrollToBlinkingSpot(alloyPaintRef);
            break;
          case 'left fender paint':
            scrollToBlinkingSpot(leftFenderPaintRef);
            break;
          case 'left front door paint':
            scrollToBlinkingSpot(leftFrontDoorPaintRef);
            break;
          case 'left rear door paint':
            scrollToBlinkingSpot(leftRearDoorPaintRef);
            break;
          case 'left quarter panel paint':
            scrollToBlinkingSpot(leftQuarterPanelPaintRef);
            break;
          case 'left running board paint':
            scrollToBlinkingSpot(leftRunningBoardPaintRef);
            break;
          case 'right fender paint':
            scrollToBlinkingSpot(rightFenderPaintRef);
            break;
          case 'right front door paint':
            scrollToBlinkingSpot(rightFrontDoorPaintRef);
            break;
          case 'right rear door paint':
            scrollToBlinkingSpot(rightRearDoorPaintRef);
            break;
          case 'right quarter panel paint':
            scrollToBlinkingSpot(rightQuarterPanelPaintRef);
            break;
          case 'right running board paint':
            scrollToBlinkingSpot(rightRunningBoardPaintRef);
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

      {!(data.FRONT_BUMBER_PAINT && data.FRONT_BUMBER_PAINT.price !== null) &&
        !(data.BONNET_PAINT && data.BONNET_PAINT.price !== null) &&
        !(data.REAR_BUMBER_PAINT && data.REAR_BUMBER_PAINT.price !== null) &&
        !(data.BOOT_PAINT && data.BOOT_PAINT.price !== null) &&
        !(data.FULL_BODY_DENT_PAINT && data.FULL_BODY_DENT_PAINT.price !== null) &&
        !(data.ALLOY_PAINT && data.ALLOY_PAINT.price !== null) &&
        !(data.LEFT_FENDER_PAINT && data.LEFT_FENDER_PAINT.price !== null) &&
        !(data.LEFT_FRONT_DOOR_PAINT && data.LEFT_FRONT_DOOR_PAINT.price !== null) &&
        !(data.LEFT_REAR_DOOR_PAINT && data.LEFT_REAR_DOOR_PAINT.price !== null) &&
        !(data.LEFT_QUARTER_PANEL_PAINT && data.LEFT_QUARTER_PANEL_PAINT.price !== null) &&
        !(data.LEFT_RUNNING_BOARD_PAINT && data.LEFT_RUNNING_BOARD_PAINT.price !== null) &&
        !(data.RIGHT_FENDER_PAINT && data.RIGHT_FENDER_PAINT.price !== null) &&
        !(data.RIGHT_FRONT_DOOR_PAINT && data.RIGHT_FRONT_DOOR_PAINT.price !== null) &&
        !(data.RIGHT_REAR_DOOR_PAINT && data.RIGHT_REAR_DOOR_PAINT.price !== null) &&
        !(data.RIGHT_QUARTER_PANEL_PAINT && data.RIGHT_QUARTER_PANEL_PAINT.price !== null) &&
        !(data.RIGHT_RUNNING_BOARD_PAINT && data.RIGHT_RUNNING_BOARD_PAINT.price !== null) && (
          isLoading?  <Spinner animation="border" role="status" 
          style={{position: "fixed",left: "50%",
            
          }} >
        
          <span className="visually-hidden" >Loading...</span>
        
        </Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
          {/* Oops! No Data Found For This Model or Location. */}
        </Typography>
        )}


      <h1 style={{ marginLeft: '80px' }}>Front Side</h1>

      {/* first card */}
      {data.FRONT_BUMBER_PAINT && data.FRONT_BUMBER_PAINT.price !== null ? (
        <Card ref={frontBumperPaintRef} className={addBlinkClass('Front Bumper Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  height="250"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Front%20bumper%20paint%20sq.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Front Bumper Paint
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
                        &#8226;	2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Removal of Minor Dent & Scratches ' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Panel Rubbing & Polishing ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: '	Alignment & Balancing Charges Extra ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Every 5,000 kms or 3 Months ( Recommended )
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 8)}
                {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 9)}  */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.FRONT_BUMBER_PAINT.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FRONT_BUMBER_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.FRONT_BUMBER_PAINT])}
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
      {data.BONNET_PAINT && data.BONNET_PAINT.price !== null ? (
        <Card ref={bonnetPaintRef} className={addBlinkClass('Bonnet Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  height="250"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Bonnet%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Bonnet Paint
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
                        &#8226; 	2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Removal of Minor Dent & Scratches ' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Panel Rubbing & Polishing ' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'AC Filter Cleaning' }, 4)}
                {renderCheckboxListItem({ servicename: 'Cooling Coli Cleaning' }, 5)}  */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Every 10,000 kms or 1 year ( Recommended)
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: '	Condenser Cleaning' }, 8)}
                {renderCheckboxListItem({ servicename: 'Compressor Oil ( Upto 200ml )' }, 9)} */}
                      {/*  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.BONNET_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BONNET_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.BONNET_PAINT])}
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
      <h1 style={{ marginLeft: '80px' }}>Rear Side</h1>
      {data.REAR_BUMBER_PAINT && data.REAR_BUMBER_PAINT.price !== null ? (
        <Card ref={rearBumperPaintRef} className={addBlinkClass('Rear Bumper Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  height="260"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/LHS%20quarter%20panel%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Rear Bumper Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: '			Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '		High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of No / Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.REAR_BUMBER_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.REAR_BUMBER_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.REAR_BUMBER_PAINT])}
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


      {/* Fourth card */}
      {data.BOOT_PAINT && data.BOOT_PAINT.price !== null ? (
        <Card ref={bootPaintRef} className={addBlinkClass('Boot Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  height="260"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Boot%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Boot Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.BOOT_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BOOT_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.BOOT_PAINT])}
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
      {data.FULL_BODY_DENT_PAINT && data.FULL_BODY_DENT_PAINT.price !== null ? (
        <Card ref={fullBodyDentPaintRef} className={addBlinkClass('Full Body Dent Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/RHS%20running%20board%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Full body Dent Paint
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 8 Days
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.FULL_BODY_DENT_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FULL_BODY_DENT_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    onClick={() => addToCart([data.FULL_BODY_DENT_PAINT])}
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
      {data.ALLOY_PAINT && data.ALLOY_PAINT.price !== null ? (
        <Card ref={alloyPaintRef} className={addBlinkClass('Alloy Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/services_icon/wheel-Alloy-Painting-min.png"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Alloy Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.ALLOY_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.ALLOY_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.ALLOY_PAINT])}
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
      {data.LEFT_FENDER_PAINT && data.LEFT_FENDER_PAINT.price !== null ? (
        <Card ref={leftFenderPaintRef} className={addBlinkClass('Left Fender Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/LHS%20running%20board%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Left Fender Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.LEFT_FENDER_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LEFT_FENDER_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.LEFT_FENDER_PAINT])}
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

      {/* EIGHT card */}
      {data.LEFT_FRONT_DOOR_PAINT && data.LEFT_FRONT_DOOR_PAINT.price !== null ? (
        <Card ref={leftFrontDoorPaintRef} className={addBlinkClass('Left Front Door Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/LHS%20front%20door%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Left Front Door Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
        {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.LEFT_FRONT_DOOR_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LEFT_FRONT_DOOR_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.LEFT_FRONT_DOOR_PAINT])}
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

      {/* NINETH card */}
      {data.LEFT_REAR_DOOR_PAINT && data.LEFT_REAR_DOOR_PAINT.price !== null ? (
        <Card ref={leftRearDoorPaintRef} className={addBlinkClass('Left Rear Door Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/LHS%20rear%20door%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Left Rear Door Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
        {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.LEFT_REAR_DOOR_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LEFT_REAR_DOOR_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.LEFT_REAR_DOOR_PAINT])}
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
      {data.LEFT_QUARTER_PANEL_PAINT && data.LEFT_QUARTER_PANEL_PAINT.price !== null ? (
        <Card ref={leftQuarterPanelPaintRef} className={addBlinkClass('Left Quarter Panel Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/LHS%20rear%20door%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Left Quarter Panel Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 4)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 5)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.LEFT_QUARTER_PANEL_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LEFT_QUARTER_PANEL_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.LEFT_QUARTER_PANEL_PAINT])}
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

      {/* eleventh card */}
      {data.LEFT_RUNNING_BOARD_PAINT && data.LEFT_RUNNING_BOARD_PAINT.price !== null ? (
        <Card ref={leftRunningBoardPaintRef} className={addBlinkClass('Left Running Board Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/LHS%20running%20board%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Left Running Board Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 4)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 5)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.LEFT_RUNNING_BOARD_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.LEFT_RUNNING_BOARD_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.LEFT_RUNNING_BOARD_PAINT])}
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

      {/* twelveth card */}
      {data.RIGHT_FENDER_PAINT && data.RIGHT_FENDER_PAINT.price !== null ? (
        <Card ref={rightFenderPaintRef} className={addBlinkClass('Right Fender Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h4" >
              <b>Right Side</b>
            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>

                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/RHS front door paint sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Right Fender Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 4)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 5)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.RIGHT_FENDER_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RIGHT_FENDER_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.RIGHT_FENDER_PAINT])}
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

      {/* thirtheen card */}
      {data.RIGHT_FRONT_DOOR_PAINT && data.RIGHT_FRONT_DOOR_PAINT.price !== null ? (
        <Card ref={rightFrontDoorPaintRef} className={addBlinkClass('Right Front Door Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/RHS front door paint sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Right Front Door Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
        {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.RIGHT_FRONT_DOOR_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RIGHT_FRONT_DOOR_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.RIGHT_FRONT_DOOR_PAINT])}
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
      {data.RIGHT_REAR_DOOR_PAINT && data.RIGHT_REAR_DOOR_PAINT.price !== null ? (
        <Card ref={rightRearDoorPaintRef} className={addBlinkClass('Right Rear Door Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/RHS%20rear%20door%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Right Rear Door Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
        {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.RIGHT_REAR_DOOR_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RIGHT_REAR_DOOR_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.RIGHT_REAR_DOOR_PAINT])}
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

      {/* 15th card */}
      {data.RIGHT_QUARTER_PANEL_PAINT && data.RIGHT_QUARTER_PANEL_PAINT.price !== null ? (
        <Card ref={rightQuarterPanelPaintRef} className={addBlinkClass('Right Quarter Panel Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/RHS%20quarter%20panel%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Right Quarter panel Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
        {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.RIGHT_QUARTER_PANEL_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RIGHT_QUARTER_PANEL_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.RIGHT_QUARTER_PANEL_PAINT])}
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
      {data.RIGHT_RUNNING_BOARD_PAINT && data.RIGHT_RUNNING_BOARD_PAINT.price !== null ? (
        <Card ref={rightRunningBoardPaintRef} className={addBlinkClass('Right Running Board Paint')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/RHS%20running%20board%20paint%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Right Running Board Paint
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
                        &#8226;			2 years Warranty on Paint
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Removal of Minor Dent & Scratches' }, 1)}
                      {renderCheckboxListItem({ servicename: '	High Quality DuPont Paint' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Panel Rubbing & Polishing' }, 3)}
                      {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Condenser Leakage or Less Cooling
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Grade A Primer Applied' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Clear Coat Protective Layer Paint' }, 7)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                      {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
        {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.RIGHT_RUNNING_BOARD_PAINT.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RIGHT_RUNNING_BOARD_PAINT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.RIGHT_RUNNING_BOARD_PAINT])}
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

      <div style={{ padding: '5px' }}>
        <h1 style={{ textAlign: 'center', paddingBottom:"15px"  }}>Customer Quotes</h1>


        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} style={{ width: "300px", height: "200px" }}>
              <Card style={{ height: "380px", margin: "5px" }}>
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
                  <Typography variant="body2" sx={{ paddingTop: 1, fontSize:"16px", textAlign:"justify" }}>
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
        <b>Why Choose GoCarsmith in {locationName} ?</b>
      </Typography>

      <Paper sx={{ padding: '24px', background: "#f5f4f2", }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', }}>
          <b>Scheduled car service in {locationName}</b>
        </Typography>
        <div>
          <ul>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Denting & Painting car servicing is essential for a smooth and trouble-free car ownership experience.</span>
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
            At every GoCarsmith workshop in {locationName}, we employ only the cutting edge in industry-standard car service equipment. From automatic AC gas recharging apparatus, 
            laser automated wheel balancing/alignment machine, OBD2 diagnostic scanner, 
            ECU programming devices, and specialized tools specific to your car.
          </Typography>

          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b>Warranty on car services</b></Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
            When you choose GoCarsmith, you get the GoCarsmith Advantage. Your {BrandName} {modelName} service is assured under our 1000kms/1 month warranty policy anywhere in {locationName}. Now, book with confidence.
          </Typography>
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

export default Denting;