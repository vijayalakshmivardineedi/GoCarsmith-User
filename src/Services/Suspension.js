
import Spinner from 'react-bootstrap/Spinner';


 
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Paper from "@mui/material/Paper";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Carousel from "./Carousel";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";

// const locationName = localStorage.getItem("locationName");
// const location = localStorage.getItem("location");
// const modelId = localStorage.getItem("modelId");
// const fuelType = localStorage.getItem("fuelType");
// const BrandId = localStorage.getItem("BrandId");
// const BrandName = localStorage.getItem("BrandName");
// const modelName = localStorage.getItem("modelname");


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
    title: "Does GoCarsmith offers warranty on a Horn Replacement?",
    content:
      "Yes, you get a 1-Month Network warranty on the Horn Replacement, which can be availed at any GoCarsmith service centre near you.",
  },
  {
    title: `I feel a tight steering wheel in my ${BrandName} ${modelName} ? What car service does GoCarsmith recommend?`,
    content:
      "One of the main reasons for tight steering might be a faulty or worn-out steering rack. GoCarsmith suggests opting for a Steering Rack Repair Service in such instances.",
  },
  {
    title: `What is included in the Suspension & Fitments Service for ${BrandName} ${modelName} at GoCarsmith?`,
    content:
      "Suspension & Fitments Services includes the Front Shock Absorber Replacement, Rear Shock Absorber Replacement, Engine Mounting Replacement, Horn Replacement, EPS Module Repair, Steering Rack Repair and much more.",
  },
  {
    title:
      "Does GoCarsmith use authentic spare parts for Horn Replacement Service?",
    content:
      "GoCarsmith uses 100% genuine OEM/OES spare parts for all the replacement services. We perform the Relay/Coupler fault check, Wiring Malfunction Check and Opening & Fitting of the Bumper to provide you with a seamless service.",
  },
  {
    title: `I am feeling a bumpy ride on my ${BrandName} ${modelName} . What Service does GoCarsmith recommend?`,
    content:
      "The bumpy ride happens because of the faulty suspension. GoCarsmith suggests the Suspension Services, which includes Front Shock Absorber Replacement and Rear Shock Absorber Replacement. The complete suspension care will help you get your car back in good condition.",
  },
  {
    title:
      "If I cannot deliver my car to the service centre myself, can GoCarsmith help me here?",
    content:
      "Yes, GoCarsmith offers a Free Doorstep Pickup & Drop Service. Don’t worry! The experts will reach out to you at your preferred time.",
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
    content: `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`,
  },
  {
    name: "Vidya Hegde",
    location: "Bangalore",
    content: `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
  },
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content: `I had my ${modelName} ${BrandName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
  },

  {
    name: "Sachin Joshi",
    location: "Bombay",
    content:
      "Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone",
  },
  {
    name: "Srinivas Raja",
    location: "Vizag",
    content: `I thought of getting my ${modelName} Celerio serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.`,
  },
  {
    name: "Abhijeet Bhuyan",
    location: "Kolkata",
    content:
      "Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality. ",
  },
];
const Suspension = () => {
  const locations = useLocation();
  const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);

  const [childLocations, setChildLocations] = useState([]);
  const parentId = localStorage.getItem("parentId");
  useEffect(() => {
    const fetchChildCities = async () => {
      try {
        const response = await fetch(
          `https://gocarsmithbackend.onrender.com/api/getChildCities/${parentId}`
        );
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
  //console.log(location, modelId, fuelType)
  const [modelName, setModelName] = useState("");

  useEffect(() => {
    // Retrieve the modelName from local storage
    const storedModelName = localStorage.getItem("modelName");

    // Update the state with the retrieved modelName
    setModelName(storedModelName);
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };
  const [data, setData] = useState([]);
  const [keySpecs, setKeySpecs] = useState([]);

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
    width: "100%",
    margin: "auto",
  };

  const sliderRef = useRef(null);

  const settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "10px",
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
        const field = "SuspensionAndFitness";

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
          setData(response.data.SuspensionAndFitness);
          setIsLoading(false)
        }

        // Log the response.data to the console
        console.log("Response Data:", response.data.SuspensionAndFitness);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, []);
  console.log();
  const [priceLists, setPriceLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const LabelName = "Suspension";
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/getpricelist/${location}/${BrandId}/${LabelName}`
        );

        if (response.status === 200) {
          setPriceLists(response.data.pricelists);
        } else {
          console.error("Failed to fetch priceLists");
        }
      } catch (error) {
        console.error("Error:", error);
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
        const response = await fetch(
          `https://gocarsmithbackend.onrender.com/api/user/getKeySpecsModel/${modelId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch key specs");
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


  // Function to render checkbox list items
  

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

  const epsModuleRepairRef = useRef(null);
  const steeringRackRepairRef = useRef(null);
  const frontShockAbsorberReplacementRef = useRef(null);
  const rearShockAbsorberReplacementRef = useRef(null);
  const suspensionLowerArmReplacementRef = useRef(null);
  const linkRodReplacementRef = useRef(null);
  const tieRodEndReplacementRef = useRef(null);
  const completeSuspensionInspectionRef = useRef(null);
  const frontShockerMountReplacementRef = useRef(null);
  const frontAxleRepairRef = useRef(null);
  const silencerRepairRef = useRef(null);
  const radiatorReplacementRef = useRef(null);
  const gearboxMountingReplacementRef = useRef(null);
  const engineMountingReplacementRef = useRef(null);
  const fuelPumpReplacementRef = useRef(null);
  const radiatorFanMotorReplacementRef = useRef(null);
  const waterPumpReplacementRef = useRef(null);
  const ecmRepairRef = useRef(null);
  const dickeyShockerReplacementRef = useRef(null);
  const premiumTopWashRef = useRef(null);
  const mudFlapsRef = useRef(null);
  const doorLatchReplacementRef = useRef(null);
  const powerWindowRepairRef = useRef(null);





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
          case 'eps module repair':
            scrollToBlinkingSpot(epsModuleRepairRef);
            break;
          case 'steering rack repair':
            scrollToBlinkingSpot(steeringRackRepairRef);
            break;
          case 'front shock absorber replacement':
            scrollToBlinkingSpot(frontShockAbsorberReplacementRef);
            break;
          case 'rear shock absorber replacement':
            scrollToBlinkingSpot(rearShockAbsorberReplacementRef);
            break;
          case 'suspension lower arm replacement':
            scrollToBlinkingSpot(suspensionLowerArmReplacementRef);
            break;
          case 'link rod replacement':
            scrollToBlinkingSpot(linkRodReplacementRef);
            break;
          case 'tie rod end replacement':
            scrollToBlinkingSpot(tieRodEndReplacementRef);
            break;
          case 'complete suspension inspection':
            scrollToBlinkingSpot(completeSuspensionInspectionRef);
            break;
          case 'front shocker mount replacement':
            scrollToBlinkingSpot(frontShockerMountReplacementRef);
            break;
          case 'front axle repair':
            scrollToBlinkingSpot(frontAxleRepairRef);
            break;
          case 'silencer repair':
            scrollToBlinkingSpot(silencerRepairRef);
            break;
          case 'radiator replacement':
            scrollToBlinkingSpot(radiatorReplacementRef);
            break;
          case 'gearbox mounting replacement':
            scrollToBlinkingSpot(gearboxMountingReplacementRef);
            break;
          case 'engine mounting replacement':
            scrollToBlinkingSpot(engineMountingReplacementRef);
            break;
          case 'fuel pump replacement':
            scrollToBlinkingSpot(fuelPumpReplacementRef);
            break;
          case 'radiator fan motor replacement':
            scrollToBlinkingSpot(radiatorFanMotorReplacementRef);
            break;
          case 'water pump replacement':
            scrollToBlinkingSpot(waterPumpReplacementRef);
            break;
          case 'ecm repair':
            scrollToBlinkingSpot(ecmRepairRef);
            break;
          case 'dickey shocker replacement':
            scrollToBlinkingSpot(dickeyShockerReplacementRef);
            break;
          case 'premium top wash':
            scrollToBlinkingSpot(premiumTopWashRef);
            break;
          case 'mud flaps':
            scrollToBlinkingSpot(mudFlapsRef);
            break;
          case 'door latch replacement':
            scrollToBlinkingSpot(doorLatchReplacementRef);
            break;
          case 'power window repair':
            scrollToBlinkingSpot(powerWindowRepairRef);
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
          case 'eps module repair':
            scrollToBlinkingSpot(epsModuleRepairRef);
            break;
          case 'steering rack repair':
            scrollToBlinkingSpot(steeringRackRepairRef);
            break;
          case 'front shock absorber replacement':
            scrollToBlinkingSpot(frontShockAbsorberReplacementRef);
            break;
          case 'rear shock absorber replacement':
            scrollToBlinkingSpot(rearShockAbsorberReplacementRef);
            break;
          case 'suspension lower arm replacement':
            scrollToBlinkingSpot(suspensionLowerArmReplacementRef);
            break;
          case 'link rod replacement':
            scrollToBlinkingSpot(linkRodReplacementRef);
            break;
          case 'tie rod end replacement':
            scrollToBlinkingSpot(tieRodEndReplacementRef);
            break;
          case 'complete suspension inspection':
            scrollToBlinkingSpot(completeSuspensionInspectionRef);
            break;
          case 'front shocker mount replacement':
            scrollToBlinkingSpot(frontShockerMountReplacementRef);
            break;
          case 'front axle repair':
            scrollToBlinkingSpot(frontAxleRepairRef);
            break;
          case 'silencer repair':
            scrollToBlinkingSpot(silencerRepairRef);
            break;
          case 'radiator replacement':
            scrollToBlinkingSpot(radiatorReplacementRef);
            break;
          case 'gearbox mounting replacement':
            scrollToBlinkingSpot(gearboxMountingReplacementRef);
            break;
          case 'engine mounting replacement':
            scrollToBlinkingSpot(engineMountingReplacementRef);
            break;
          case 'fuel pump replacement':
            scrollToBlinkingSpot(fuelPumpReplacementRef);
            break;
          case 'radiator fan motor replacement':
            scrollToBlinkingSpot(radiatorFanMotorReplacementRef);
            break;
          case 'water pump replacement':
            scrollToBlinkingSpot(waterPumpReplacementRef);
            break;
          case 'ecm repair':
            scrollToBlinkingSpot(ecmRepairRef);
            break;
          case 'dickey shocker replacement':
            scrollToBlinkingSpot(dickeyShockerReplacementRef);
            break;
          case 'premium top wash':
            scrollToBlinkingSpot(premiumTopWashRef);
            break;
          case 'mud flaps':
            scrollToBlinkingSpot(mudFlapsRef);
            break;
          case 'door latch replacement':
            scrollToBlinkingSpot(doorLatchReplacementRef);
            break;
          case 'power window repair':
            scrollToBlinkingSpot(powerWindowRepairRef);
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
    <>
      <Container style={{ marginTop: "50px" }}>

        {!(data.ESP_MODULE_REPAIR && data.ESP_MODULE_REPAIR.price !== null) &&
          !(data.STEERING_RACK_REPAIR && data.STEERING_RACK_REPAIR.price !== null) &&
          !(data.FRONT_SHOCK_ABSORBER_REPLACEMENT && data.FRONT_SHOCK_ABSORBER_REPLACEMENT.price !== null) &&
          !(data.REAR_SHOCK_ABSORBER_REPLACEMENT && data.REAR_SHOCK_ABSORBER_REPLACEMENT.price !== null) &&
          !(data.SUSPENSION_LOWER_ARM_REPLACEMENT && data.SUSPENSION_LOWER_ARM_REPLACEMENT.price !== null) &&
          !(data.LINK_ROD_REPLACEMENT && data.LINK_ROD_REPLACEMENT.price !== null) &&
          !(data.TIE_ROAD_END_REPLACEMENT && data.TIE_ROAD_END_REPLACEMENT.price !== null) &&
          !(data.COMPLETE_SUSPENSION_INSPECTION && data.COMPLETE_SUSPENSION_INSPECTION.price !== null) &&
          !(data.FRONT_SHOCKER_MOUNT_REPLACEMENT && data.FRONT_SHOCKER_MOUNT_REPLACEMENT.price !== null) &&
          !(data.FRONT_AXLE_REPAIR && data.FRONT_AXLE_REPAIR.price !== null) &&
          !(data.SILENCER_REPAIR && data.SILENCER_REPAIR.price !== null) &&
          !(data.RADIATOR_REPLACEMENT && data.RADIATOR_REPLACEMENT.price !== null) &&
          !(data.GEAR_BOX_MOUNTING_REPLACEMENT && data.GEAR_BOX_MOUNTING_REPLACEMENT.price !== null) &&
          !(data.ENGINE_MOUNTING_REPLACEMENT && data.ENGINE_MOUNTING_REPLACEMENT.price !== null) &&
          !(data.RADIATOR_FAN_MOTOR_REPLACEMENT && data.RADIATOR_FAN_MOTOR_REPLACEMENT.price !== null) &&
          !(data.FUEL_PUMP_REPLACEMENT && data.FUEL_PUMP_REPLACEMENT.price !== null) &&
          !(data.WATER_PUMP_REPLACEMENT && data.WATER_PUMP_REPLACEMENT.price !== null) &&
          !(data.ECM_REPAIR && data.ECM_REPAIR.price !== null) &&
          !(data.PREMIUM_TOP_WASH && data.PREMIUM_TOP_WASH.price !== null) &&
          !(data.DICKEY_SHOCKER_REPLACEMENT && data.DICKEY_SHOCKER_REPLACEMENT.price !== null) &&
          !(data.MUD_FLAPS && data.MUD_FLAPS.price !== null) &&
          !(data.DOOR_LATCH_REPLACEMENT && data.DOOR_LATCH_REPLACEMENT.price !== null) &&
          !(data.POWER_WINDOW_REPAIR && data.POWER_WINDOW_REPAIR.price !== null) &&
          !(data.NOISES_WITH_CAR_SUSPENSION_STEERING && data.NOISES_WITH_CAR_SUSPENSION_STEERING.price !== null) &&
          !(data.FAULTY_ELECTRICALS && data.FAULTY_ELECTRICALS.price !== null) && (


            isLoading?  <Spinner animation="border" role="status" 
            style={{position: "fixed",left: "50%",
              
            }} >
          
            <span className="visually-hidden" >Loading...</span>
          
          </Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
            {/* Oops! No Data Found For This Model or Location. */}
          </Typography>
          )}
        <h1 style={{ marginLeft: "80px" }}>Steering</h1>
        {/* first card */}
        {data.ESP_MODULE_REPAIR && data.ESP_MODULE_REPAIR.price !== null ? (
          <Card ref={epsModuleRepairRef} className={addBlinkClass('EPS Module Repair')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/EPS%20Module%20Repair/Thumbnail.jpg"
                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      EPS Module Repair
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 Hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "EPS Module Repair" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Torque Sensor Additional if Needed" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Hard Steering
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          3
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Steering Rack, Steering Motor Additional if Needed",
                          },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.ESP_MODULE_REPAIR.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.ESP_MODULE_REPAIR.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.ESP_MODULE_REPAIR])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Second card */}
        {data.STEERING_RACK_REPAIR &&
          data.STEERING_RACK_REPAIR.price !== null ? (
          <Card ref={steeringRackRepairRef} className={addBlinkClass('Steering Rack Repair')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>New</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="200"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Steering%20Rack%20Repair/thumbnail.jpg"
                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Steering Rack Repair
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 8 Hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Steering Rack Repair" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Steering Rod Resurfacing" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Calibration and Pinion Cost Addtional ( If Needed)",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Hard Steering
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Steering Bush Kit, Lathe Work, Wheel Alignment Included",
                          },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.STEERING_RACK_REPAIR.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.STEERING_RACK_REPAIR.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.STEERING_RACK_REPAIR])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Third card */}
        {data.FRONT_SHOCK_ABSORBER_REPLACEMENT &&
          data.FRONT_SHOCK_ABSORBER_REPLACEMENT.price !== null ? (
          <Card ref={frontShockAbsorberReplacementRef} className={addBlinkClass('Front Shock Absorber Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>FREE CAR WASH</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="300"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/front_shokerthumbnail%20(1).jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Front Shock Absorber Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Shocker Strut / Damper OES Replacement ( Single Unit )",
                          },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Shocker Mount, Shocker Coil Spring Additional Charges",
                          },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Airmatic Shock Absorber Cost Additional ( If Applicable )",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Free Pickup and Drop
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Opening & Fitting of Front Shock Absorber",
                          },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.FRONT_SHOCK_ABSORBER_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.FRONT_SHOCK_ABSORBER_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.FRONT_SHOCK_ABSORBER_REPLACEMENT])
                        }
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
        {data.REAR_SHOCK_ABSORBER_REPLACEMENT &&
          data.REAR_SHOCK_ABSORBER_REPLACEMENT.price !== null ? (
          <Card ref={rearShockAbsorberReplacementRef} className={addBlinkClass('Rear Shock Absorber Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>LABOUR INCLUDED</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="320"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/RearshockThumbnail%20(1).jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Rear Shock Absorber Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Shocker Strut / Damper OES Replacement ( Single Unit )",
                          },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Shocker Mount, Shocker Coil Spring Additional Charges",
                          },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Airmatic Shock Absorber Cost Additional ( If Applicable )",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Free Pickup and Drop
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Opening & Fitting of Front Shock Absorber",
                          },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.REAR_SHOCK_ABSORBER_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.REAR_SHOCK_ABSORBER_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.REAR_SHOCK_ABSORBER_REPLACEMENT])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Fifth card */}
        {data.SUSPENSION_LOWER_ARM_REPLACEMENT &&
          data.SUSPENSION_LOWER_ARM_REPLACEMENT.price !== null ? (
          <Card ref={suspensionLowerArmReplacementRef} className={addBlinkClass('Suspension Lower Arm Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>SPARE PART PRICE ONLY</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="300"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Suspension%20Lower%20Arm%20Replacement/Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Suspension Lower Arm Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Cost Only" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Complete Suspension Inspection" },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Suspension Lower Arm Replacement" },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case Loose Steering Wheel
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Wheel Alignment Cost Additional" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.SUSPENSION_LOWER_ARM_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.SUSPENSION_LOWER_ARM_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.SUSPENSION_LOWER_ARM_REPLACEMENT])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Sixth card */}
        {data.LINK_ROD_REPLACEMENT &&
          data.LINK_ROD_REPLACEMENT.price !== null ? (
          <Card ref={linkRodReplacementRef} className={addBlinkClass('Link Rod Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>SPARE PART PRICE ONLY</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="300"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Link%20Road%20Replacement/Thumbanil.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Link Rod Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Cost Only" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Complete Suspension Inspection" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename: "Link Rod Replacement (OES Single Unit)",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case Loose Steering Wheel
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Wheel Alignment Cost Additional" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.LINK_ROD_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.LINK_ROD_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.LINK_ROD_REPLACEMENT])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Seventh card */}
        {data.TIE_ROAD_END_REPLACEMENT &&
          data.TIE_ROAD_END_REPLACEMENT.price !== null ? (
          <Card ref={tieRodEndReplacementRef} className={addBlinkClass('Tie Rod End Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>SPARE PART PRICE ONLY</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="300"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Tie%20Rod%20End%20Replacement/Thumbanil.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Tie Rod End Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Cost Only" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Tie Rod End Replacement (OES)" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Camber Bolt & Wheel Alignment Cost Additional",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Vibrarion in the
                          Steering Wheel
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Complete Suspension Inspection" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.TIE_ROAD_END_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.TIE_ROAD_END_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.TIE_ROAD_END_REPLACEMENT])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Eighth card */}
        {data.COMPLETE_SUSPENSION_INSPECTION &&
          data.COMPLETE_SUSPENSION_INSPECTION.price !== null ? (
          <Card ref={completeSuspensionInspectionRef} className={addBlinkClass('Complete Suspension Inspection')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJSsg6umgWFODYMGK2T7p7WgMwD72PZWKuQ5x8TmCyggODWh__VCVDR5XYEKtF_bwKkps&usqp=CAU"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Complete Suspension Inspection Suspension
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 4 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 25 Points Check List
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Front Shocker Check" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Shocker Mount Check" },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Jumping Rod Bush Check" },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; On Suspension Noise ( Recommended )
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Rear Shocker Check" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Link Rod Inspection" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.COMPLETE_SUSPENSION_INSPECTION.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.COMPLETE_SUSPENSION_INSPECTION.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.COMPLETE_SUSPENSION_INSPECTION])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/*Nineth card */}
        {data.FRONT_SHOCKER_MOUNT_REPLACEMENT &&
          data.FRONT_SHOCKER_MOUNT_REPLACEMENT.price !== null ? (
          <Card ref={frontShockerMountReplacementRef} className={addBlinkClass('Front Shocker Mount Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>LABOUR INCLUDED</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="300"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Front%20Shocker%20Mount%20Replacement/Thumbanil.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Front Shocker Mount Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Front Shocker Mount Replacement (OES Single Unit)",
                          },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Shocker Mount Bearing, Cap Cost Additional",
                          },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Wheel Alignment Cost Addtional" },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Excessive Noise /
                          Vibration from Suspension
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Opening & Fitting of Front Shocker Mount",
                          },
                          4
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Airmatic Shock Absorber Mount Cost Additional",
                          },
                          5
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          6
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.FRONT_SHOCKER_MOUNT_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.FRONT_SHOCKER_MOUNT_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.FRONT_SHOCKER_MOUNT_REPLACEMENT])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Tenth card */}
        {data.FRONT_AXLE_REPAIR && data.FRONT_AXLE_REPAIR.price !== null ? (
          <Card ref={frontAxleRepairRef} className={addBlinkClass('Front Axle Repair')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Front%20Axle%20Repair/Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Front Axle Repair
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Noise Coming from
                          Suspension
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Front Axle Repair ( Single Unit )" },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Includes Replacement of Axle Bearings & Boot",
                          },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting of Front Axle" },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Excessive Noise /
                          Vibration from Suspension
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Wheel Bearing Cost Additional ( If Required )",
                          },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.FRONT_AXLE_REPAIR.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.FRONT_AXLE_REPAIR.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.FRONT_AXLE_REPAIR])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Eleven card */}
        {data.SILENCER_REPAIR && data.SILENCER_REPAIR.price !== null ? (
          <Card ref={silencerRepairRef} className={addBlinkClass('Silencer Repair')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Silencer%20Repair/thumbnail.jpg"
                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Silencer Repair
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 Hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Silencer making Loud
                          Roaring Noise
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Underbody Silencer Inspection" },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Sensors, Catalytic Convertor Cost Additional (If Applicable)",
                          },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Repair & Welding of Faulty Silencer" },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Hanger, Clamp Cost Additional" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.SILENCER_REPAIR.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.SILENCER_REPAIR.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.SILENCER_REPAIR])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Twevle card */}
        {data.RADIATOR_REPLACEMENT &&
          data.RADIATOR_REPLACEMENT.price !== null ? (
          <Card ref={radiatorReplacementRef} className={addBlinkClass('Radiator Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>SPARE PART PRICE ONLY</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="250"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Radiator%20Replacement%20Replacement_/thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Radiator Replacement Suspension
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Price Only" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Radiator Replacement (OES)" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Radiator Hoses, Thermostat Valves Cost Additional ",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Noise from Engine
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Coolant Cost Additional" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.RADIATOR_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.RADIATOR_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.RADIATOR_REPLACEMENT])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Thirteen card */}
        {data.GEAR_BOX_MOUNTING_REPLACEMENT &&
          data.GEAR_BOX_MOUNTING_REPLACEMENT.price !== null ? (
          <Card ref={gearboxMountingReplacementRef} className={addBlinkClass('Gearbox Mounting Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>SPARE PART PRICE ONLY</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="250"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Gear%20Box%20Mounting%20Replacement/Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Gear Box Mounting Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Single Unit Only" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Gear Box Mounting Replacement (OES)" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Noise from Engine
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Price Only" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.GEAR_BOX_MOUNTING_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.GEAR_BOX_MOUNTING_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.GEAR_BOX_MOUNTING_REPLACEMENT])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Fourteen card */}
        {data.ENGINE_MOUNTING_REPLACEMENT &&
          data.ENGINE_MOUNTING_REPLACEMENT.price !== null ? (
          <Card ref={engineMountingReplacementRef} className={addBlinkClass('Engine Mounting Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>SPARE PART PRICE ONLY</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="250"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Engine%20Mounting%20Replacement/Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Engine Mounting Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Engine Mounting Replacement (OES)" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Single Unit Only" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Noise from Engine
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Cost Only" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.ENGINE_MOUNTING_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.ENGINE_MOUNTING_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.ENGINE_MOUNTING_REPLACEMENT])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Fifteen card */}
        {data.RADIATOR_FAN_MOTOR_REPLACEMENT &&
          data.RADIATOR_FAN_MOTOR_REPLACEMENT.price !== null ? (
          <Card ref={radiatorFanMotorReplacementRef} className={addBlinkClass('Radiator Fan Motor Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Radiator%20Fan%20Motor%20Replacement/Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Radiator Fan Motor Replacement Suspension
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Radiator Fan Motor Replacement (OES)" },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Coolant and Radiator Flush Cost Addtional",
                          },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Engine Overheating
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Opening & Fitting of Radiator Fan Motor",
                          },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.RADIATOR_FAN_MOTOR_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.RADIATOR_FAN_MOTOR_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.RADIATOR_FAN_MOTOR_REPLACEMENT])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Sixteen card */}
        {data.FUEL_PUMP_REPLACEMENT &&
          data.FUEL_PUMP_REPLACEMENT.price !== null ? (
          <Card ref={fuelPumpReplacementRef} className={addBlinkClass('Fuel Pump Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Fuel%20Replacement%20Pump/thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Fuel Pump Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Fuel Pump Assy Replacement" },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Fuel Line & Injectors Cleaning Cost Additional (If Needed)",
                          },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Engine Overheating
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Cost Only" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "OES Spare Part Cost Only " },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.FUEL_PUMP_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.FUEL_PUMP_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.FUEL_PUMP_REPLACEMENT])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}


        {/* Seventeen card */}
        {data.WATER_PUMP_REPLACEMENT &&
          data.WATER_PUMP_REPLACEMENT.price !== null ? (
          <Card ref={waterPumpReplacementRef} className={addBlinkClass('Water Pump Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Water%20Pump%20Replacement/Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Water Pump Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Water Pump Replacement (OES)" },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Coolant and Radiator Flush Cost Addtional",
                          },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Engine Overheating
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Spare Part Cost Only" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.WATER_PUMP_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.WATER_PUMP_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.WATER_PUMP_REPLACEMENT])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Eighteen card */}
        {data.ECM_REPAIR && data.ECM_REPAIR.price !== null ? (
          <Card ref={ecmRepairRef} className={addBlinkClass('ECM Repair')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/ECM%20Repair/Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      ECM Repair
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 8 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        <br />
                        {renderCheckboxListItem({ servicename: "ECM Repair" }, 1)}
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fiiting of ECM" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Repairing of Electrical Circuits with Diodes & Capacitor",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Car Not Starting
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Circuit Board & Programming Cost Additional",
                          },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.ECM_REPAIR.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.ECM_REPAIR.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.ECM_REPAIR])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* ninteen card */}
        {data.PREMIUM_TOP_WASH && data.PREMIUM_TOP_WASH.price !== null ? (
          <Card ref={premiumTopWashRef} className={addBlinkClass('Premium Top Wash')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Foam_Wash_Thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Premium Top Wash Suspension
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Revitalize Your Ride in Just 1 Hour
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Applicable on Walk-in Only
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Exterior Top Wash" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Hand Drying" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Preserving Paint & Finish
                        </Typography>
                        {renderCheckboxListItem({ servicename: "Rinsing" }, 3)}
                        {renderCheckboxListItem(
                          { servicename: "Tyre external wash" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.PREMIUM_TOP_WASH.price + 150}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.PREMIUM_TOP_WASH.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.PREMIUM_TOP_WASH])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* Twenty  card */}
        {data.DICKEY_SHOCKER_REPLACEMENT &&
          data.DICKEY_SHOCKER_REPLACEMENT.price !== null ? (
          <Card ref={dickeyShockerReplacementRef} className={addBlinkClass('Dickey Shocker Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4VAFkRLHZlpo7CAzn2yMFuBezILF-G-Lhg&usqp=CAU"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Dickey Shocker Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 2 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month warranty
                        </Typography>
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Dickey Shocker OES Replacement (Set of 2) ",
                          },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Boot/Trunk Hinges Additional" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting Dickey Shocker " },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.DICKEY_SHOCKER_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.DICKEY_SHOCKER_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() =>
                          addToCart([data.DICKEY_SHOCKER_REPLACEMENT])
                        }
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* 21 card */}
        {data.MUD_FLAPS && data.MUD_FLAPS.price !== null ? (
          <Card ref={mudFlapsRef} className={addBlinkClass('Mud Flaps')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/Mud%20Flaps.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Mud Flaps
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 2 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty on Fitting
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Mud Flaps Set of 4" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Protects Car Underbody" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Excellent Durability
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Prevents Soil Accumulation" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Easy Fitment" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.MUD_FLAPS.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.MUD_FLAPS.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.MUD_FLAPS])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* 22 card */}
        {data.DOOR_LATCH_REPLACEMENT &&
          data.DOOR_LATCH_REPLACEMENT.price !== null ? (
          <Card ref={doorLatchReplacementRef} className={addBlinkClass('Door Latch Replacement') } style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Inner%20Door%20handle%20Latch/Thumbnail%20Interior%20Door%20Latch%20Replacement.jpeg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Door Latch Replacement
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Inner Door Latch Mechanism Part Replacement",
                          },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "OES Spare Part Cost Only" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Outside Door Handle Cost Additional (If Needed)",
                          },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended: In Case of Door Not Opening
                        </Typography>
                        {renderCheckboxListItem(
                          {
                            servicename: "Paint/Trim Cost Additional (If Needed)",
                          },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.DOOR_LATCH_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.DOOR_LATCH_REPLACEMENT.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.DOOR_LATCH_REPLACEMENT])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}


        {/* 23 card */}
        {data.POWER_WINDOW_REPAIR && data.POWER_WINDOW_REPAIR.price !== null ? (
          <Card ref={powerWindowRepairRef} className={addBlinkClass('Power Window Repair')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    height="290"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Power%20Window%20Repair/thumbnail.jpg"
                     style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "270px" }}
                    >
                      Power Window Repair
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 6 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month Warranty
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Power Window Mechanism Repair" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Power Window Motor Cost Additional" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended: In Case of Door Not Working
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Power Window Switch Cost Additional" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add to Cart Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span
                        className="text-gray"
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                          marginLeft: "100px",
                          color: "gray",
                        }}
                      >
                        ₹ {data.POWER_WINDOW_REPAIR.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>
                        ₹ {data.POWER_WINDOW_REPAIR.price}/-
                      </b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{
                          fontSize: "16px",
                          border: "3px solid red",
                          fontWeight: "700",
                        }}
                        onClick={() => addToCart([data.POWER_WINDOW_REPAIR])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}



        {/* 24 card */}
        {data.NOISES_WITH_CAR_SUSPENSION_STEERING &&
          data.NOISES_WITH_CAR_SUSPENSION_STEERING.price !== null ? (
           
            <Card
              style={{
                maxWidth: "1000px",
                height: "auto",
                margin: "auto",
                padding:"20px"
              }}
            >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="200"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/CUSTOM%20SERVICES/Noises%20With%20Car%20Suspension%20_%20Steering.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              <Grid item sm={8}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ marginRight: "270px" }}
                  >
                    Noises with Car Suspension & Steering
                  </Typography>
                  <Button style={{ color: "gray" }}>
                    <ScheduleIcon />
                    Takes 6 Hours
                  </Button>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Noise Coming from
                        Suspension
                      </Typography>
                      {renderCheckboxListItem(
                        { servicename: "Steering System Inspection" },
                        1
                      )}
                      {renderCheckboxListItem(
                        { servicename: "25 Points Check-List" },
                        2
                      )}
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      {renderCheckboxListItem(
                        { servicename: "Free Pickup & Drop" },
                        3
                      )}
                      {renderCheckboxListItem(
                        { servicename: "Complete Suspension Inspection" },
                        4
                      )}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span
                      className="text-gray"
                      style={{
                        textDecoration: "line-through",
                        fontSize: "18px",
                        marginLeft: "100px",
                        color: "gray",
                      }}
                    >
                      ₹ {data.NOISES_WITH_CAR_SUSPENSION_STEERING.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: "25px", color: "black" }}>
                      ₹ {data.NOISES_WITH_CAR_SUSPENSION_STEERING.price}/-
                    </b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button
                      variant="outlined"
                      color="error"
                      style={{
                        fontSize: "16px",
                        border: "3px solid red",
                        fontWeight: "700",
                      }}
                      onClick={() =>
                        addToCart([data.NOISES_WITH_CAR_SUSPENSION_STEERING])
                      }
                    >
                      Add to Cart
                    </Button>
                 
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ) : null}


        {/* 25 card */}
        {data.FAULTY_ELECTRICALS && data.FAULTY_ELECTRICALS.price !== null ? (
          
           <Card
             style={{
               maxWidth: "1000px",
               height: "auto",
               margin: "auto",
               padding:"20px"
             }}
           >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="200"
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/CUSTOM%20SERVICES/Faulty%20Electricals.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              <Grid item sm={8}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ marginRight: "270px" }}
                  >
                    Faulty Electricals
                  </Typography>
                  <Button style={{ color: "gray" }}>
                    <ScheduleIcon />
                    Takes 8 Hours
                  </Button>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended : In Case of Electrical
                        Malfunctioning
                      </Typography>
                      {renderCheckboxListItem(
                        { servicename: "Full Car Scanning" },
                        1
                      )}
                      {renderCheckboxListItem(
                        { servicename: "Detailed Health Card" },
                        2
                      )}
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <br />
                      <br />
                      {renderCheckboxListItem(
                        { servicename: "Free Pickup & Drop" },
                        3
                      )}
                      {renderCheckboxListItem(
                        { servicename: "25 Points Check-List" },
                        4
                      )}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span
                      className="text-gray"
                      style={{
                        textDecoration: "line-through",
                        fontSize: "18px",
                        marginLeft: "100px",
                        color: "gray",
                      }}
                    >
                      ₹ {data.FAULTY_ELECTRICALS.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: "25px", color: "black" }}>
                      ₹ {data.FAULTY_ELECTRICALS.price}/-
                    </b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                 
                    <Button
                      variant="outlined"
                      color="error"
                      style={{
                        fontSize: "16px",
                        border: "3px solid red",
                        fontWeight: "700",
                      }}
                      onClick={() => addToCart([data.FAULTY_ELECTRICALS])}
                    >
                      Add to Cart
                    </Button>
                 
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ) : null}

        <div style={{ padding: "5px" }}>
          <h1 style={{ textAlign: "center", paddingBottom:"15px"  }}>
            Customer Quotes
          </h1>
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
                    <Typography variant="body2" sx={{ paddingTop: 1 ,fontSize:"16px",  textAlign:"justify" }}>
                      {slide.content}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            <b>Frequently Asked Questions</b>
          </Typography>
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
        <Typography
          variant="h4"
          sx={{ textAlign: "left", marginBottom: "20px" }}
        >
          <b>
            Why Choose GoCarsmith In {locationName}
          </b>
        </Typography>

        <Paper sx={{ padding: "24px", background: "#f5f4f2" }}>
          <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            <b>Suspension & Fitments Services Offered</b>
          </Typography>
          <p>
            GoCarsmith in {locationName} provides a bunch of Suspension &
            Fitment Services for your {BrandName} {modelName} to make sure that
            your car remains in the best condition.
          </p>
          <div className="_1hV59">
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              <b>Suspension & Fitments Services Inclusions</b>
            </Typography>
            <p>The Suspension & Fitments Services include:</p>
            <div className="_1VMvZ">
              <ul>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Front Shock Absorber Replacement Service
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Rear Shock Absorber Replacement Service
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    Mud Flaps Service
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Horn Replacement Service
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    EPS Module Repair
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    Steering Rack Repair
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Engine Mounting Replacement
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Fuel Pump Replacement
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    Starter Motor Repair
                  </span>
                </li>
              </ul>
            </div>
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              <b>
                Common Problems with {BrandName} {modelName}
              </b>
            </Typography>
            <div className="_1VMvZ">
              <ul>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    <b>Faulty Steering System</b> A faulty steering system can
                    increase the chances of major accidents, malfunctions and
                    other mishappenings. The symptoms are the stiff steering
                    wheel, loose steering wheel, noises while turning, steering
                    wheel vibration while cornering and many more. If you see
                    any of the symptoms mentioned above, visit the nearby car
                    service centre.
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    <b>Suspension Issues</b> Are you feeling a bumpy ride in
                    your {BrandName} {modelName} while travelling or realising
                    the wheel alignment is wrong? If yes, then the poor
                    suspension can be an issue. Suspension is one of the most
                    important components in the car. It helps keep your car
                    stable and makes your travel smooth and comfortable. If you
                    feel a bump while driving or realise that one side of the
                    car is bending more than the other, then visit the car
                    service centre for your car service.
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    <b>Bad Horn</b> While using the car regularly, a faulty horn
                    can be a big problem. Horn issues can arise because of a
                    faulty relay or a wiring malfunctioning. Visit the car
                    workshop immediately for the Horn Replacement.
                  </span>
                </li>
              </ul>
            </div>
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              <b>
                {BrandName} {modelName} Suspension & Fitments Services Explained
              </b>
            </Typography>
            <div className="_1VMvZ">
              <ul>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    <b>Shock Absorber Replacement</b> Are you feeling noisy
                    suspension? GoCarsmith uses the best car shocker, so you
                    won’t feel bumpy rides anymore. GoCarsmith recommend a Front
                    Shock Absorber Replacement Service & Rear Shock Absorber
                    Replacement Service. Under this service, we include Shocker
                    Strut/Damper OES Replacement, Shocker Mount, and Shocker
                    Coil Spring (Additional Charges).
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    <b>Mud Flaps</b> We at GoCarsmith offer 100% Genuine OEM/OES
                    spare parts for your {BrandName} {modelName} and offer a 1
                    Month Warranty on Fitting. Book your appointment at any
                    GoCarsmith car workshop and save 40%.
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    <b>Horn Replacement</b> Get the Horn Replacement done for
                    your {BrandName} {modelName} at a 40% lesser price than
                    other local car garages. Our technicians check Faulty
                    Relay/Coupler, Wiring Malfunctioning, and much more.
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    <b>EPS Module Repair</b> GoCarsmith offers EPS Module Repair
                    to give you a better steer handling experience in your{" "}
                    {BrandName} {modelName} . We, at GoCarsmith, recommend this
                    car service in the case of Hard Steering and EPS Light On.
                    This service includes a Steering Rack, Steering Motor
                    (Additional if Needed) and Doorstep Free Pickup & Drop.
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    <b>Steering Rack Repair</b> GoCarsmith makes sure to service
                    your {BrandName} {modelName} steering and give you a quality
                    ride. We at GoCarsmith, recommend this service in the case
                    of Hard Steering and Steering Fluid Leakage. Under this
                    service, we include Steering Rack Repair, Steering Bush Kit,
                    Lathe Work, Wheel Alignment Included, Steering Rod
                    Resurfacing, Calibration and Pinion Cost (Additional, If
                    Needed) and Doorstep Free Pickup & Drop.
                  </span>
                </li>
              </ul>
            </div>
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              <b>
                Post Car Suspension & Fitments Service Tips For {BrandName}{" "}
                {modelName}
              </b>
            </Typography>
            <div className="_1VMvZ">
              <ul>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    <b>Inspect the Shocker & Strut</b> After getting your car
                    suspension repaired, the best way to keep your suspension in
                    good condition is to check the Shocker or Strut. If you feel
                    the Shocker or Strut is leaking, then it is important to get
                    it replaced at your nearest car service centre.
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    <b>Inspect Wheel Alignment</b> Checking the wheel alignment
                    is the most important thing to do after the suspension
                    repair. If the wheels are not aligned, it can put a lot of
                    force on the suspension.
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    <b>Check the Power Steering System</b> A Power Steering
                    Vehicle needs a regular check-up, and its power steering
                    fluid must be checked regularly. The owner has to make sure
                    that it is always clean; otherwise, it will cause problems
                    to the steering wheel, suspension and other components of
                    the vehicle.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Paper>
        <h1 style={{padding:"20px 0px 10px 0px"}}> Popular Regions </h1>
        <div style={{ padding: "20px", background: "#f5f4f2", marginBottom: "20px" }}>
          <Slider  {...carouselSettings} >
            {childLocations.map((loc, index) => (
              <div
                key={loc._id}
                style={{ textAlign: "center", padding: "20px"  }}
              >
                {loc.name}
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </>
  );
};

export default Suspension;