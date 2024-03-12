import Spinner from 'react-bootstrap/Spinner';
import React, { useState, useEffect, useRef, useLayoutEffect  } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import axios from "axios";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const userString = localStorage.getItem("userCars");
const userCars = JSON.parse(userString);
const usermodelId = userCars?.[0]?.modelId;
const usermodelName= userCars?.[0]?.modelName;
const userfuelType = userCars?.[0]?.fuelType;
const userBrandId = userCars?.[0]?.BrandId;
const userBrandName = userCars?.[0]?.brandName;
const currentModelId = localStorage.getItem("modelId");
const currentfuelType = localStorage.getItem("fuelType");
const currentBrandId = localStorage.getItem("BrandId");
const currentBrandName = localStorage.getItem("BrandName");
const currentmodelName = localStorage.getItem('modelName')
const modelId = currentModelId  || usermodelId;
const fuelType = currentfuelType  || userfuelType;
const BrandId = currentBrandId || userBrandId;
const BrandName = currentBrandName || userBrandName;
const modelName = currentmodelName || usermodelName;
const locationName = localStorage.getItem("locationName");
const location = localStorage.getItem("location");

const accordionData = [
  {
    title: "When should I get the AC system on my car recharged?",
    content:
      "Ideally, you should get the AC on your car serviced at least once a year or when you feel that the AC is not cooling as it used to. If you start noticing the AC isn’t reaching the optimum cooling temperature, have your system inspected. In most situations, the car is diagnosed with low or leaking AC gas.",
  },
  {
    title: "Why is the AC system on my car making noises?",
    content:
      "Aside from the discomfort, a noisy air conditioner may cause you, it is also a good indication that you should get your system checked. Loud noises coming from the AC in your car can stem from a variety of issues such as a clogged evaporator coil or a faulty compressor.",
  },
  {
    title: "Why is my car AC blowing out hot air?",
    content: `A car AC blowing out hot air can be due to low refrigerant level or due to a problem in the condenser, the compressor, the cooling fan, or the electrical system of your car. It can also be a restricted condenser coil. In such a case, it is highly advised to get your car thoroughly inspected at the nearest GoCarsmith workshop in ${locationName}.`,
  },
  {
    title: "Why does my car AC smell bad or musty?",
    content:
      "If you are noticing mildew or mouldy smell coming from your car AC system, this is a good indication that some component in your AC (often the filter or drain line) is dirty and clogged. This can also be attributed to excess moisture from the AC. For such problems, we highly suggest a professional AC cleaning service.",
  },
  {
    title: "Why is my car AC not blowing air properly?",
    content: `Low airflow from the AC blower can be an issue with the evaporator coil (inside cooling coil) or a dirty air filter, clogged drainpipe, or a broken fan blower inside your car AC vent. To avoid further deterioration, we highly advise you to get your car AC thoroughly diagnosed at the nearest GoCarsmith workshop in ${locationName}.`,
  },
  {
    title: "What happens during a routine car AC service?",
    content: `A comprehensive car AC service deals with a my raid of things including dust and dirt build-up in the cooling coil, HVAC filter, or the blower fan. The service also covers AC gas recharging and high/low-pressure test, compressor oil replacement, condenser cleaning, and more on your car. Visit your nearest GoCarsmith workshop in ${locationName} to know more.`,
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


const slides = [
  {
    name: " Srikant Panda",
    location:"Bhubaneswar ",
    content:
      "As I started my AC after a long time when winter ended I realised that it was not cooling enough. So I contacted GoCarsmith and they explained to me what was wrong with it. Due to a lot of dust buildup, my Car AC was not throwing enough air. Comprehensive AC service is what was needed. It took them only 5 hours to get the job well done and the car was delivered to my doorstep.",
  },
  {
    name: "Sachin Joshi",
    location:"Bombay ",
    content:
      "For some reason, my car AC stopped working and I had no clue why. I got in touch with GoCarsmith and according to them, there was a leak in my AC system. Their diagnosis was spot-on as now the car cools really good. They got the car from my home and delivered it back and it was really convenient for me.",
  },
  {
    name: " Srinivas Raju",
    location:"Vizag",
    content:
      "After my car AC stopped cooling suddenly, I contacted GoCarsmith and they told me that the AC unit was fine but there was dust in the blower which caused the bad airflow. After they did a thorough cleanup of my car AC system,  the AC started working again and it was throwing cool air. GoCarsmith is a no-nonsense service provider.",
  },
  {
    name: "Ankit Saxena",
    location:"Lucknow ",
    content:
      "As summers were approaching, I started my car AC to check if it was working fine and to my surprise, it wasn’t cooling well. Immediately called up Sahil from GoCarsmith. He arranged a pick up from my home, diagnosed and updated me over the phone. The service included a minor AC recharge and I was all set to go. Truly amazing.",
  },
  {
    name: "Manish Kashyap",
    location:"Patna ",
    content:
      "Quite unusually, my car was overheating while running the AC. I was so fed up, that I used to switch off the AC during peak summers which was troublesome for me. Gave GoCarsmith a call and all and they narrowed down the problem to a faulty compressor. They replaced the unit with an OEM one and no more sweaty car journeys for me.",
  },
  {
    name: "Sukhvinder Singh",
    location:"Delhi ",
    content:
      "I am extremely happy with the technical assistance. Billing, invoicing and other payment-related problems were common issues faced by both, the customers and us as well. But from GoCarsmith it has reduced to a lot amount as they offer 24x7 service for solving problems related to bills, some technical errors, garage operation, the management, or even solving customer’s problems.",
  },
];
const AcRepair = () => {

  const [isLoading,setIsLoading]=useState(false)
  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);

  const getToken = () => {
    return localStorage.getItem("token");
  };
  const [data, setData] = useState([]);

  const [keySpecs, setKeySpecs] = useState([]);

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
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-ac-replacement/Why-your-Car-AC-isn%E2%80%99t-Cooling-Enough.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-ac-replacement/How-Does-The-Car-AC-Work.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-ac-replacement/What-happens-when-you-don%E2%80%99t-service-your-car-AC.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-ac-replacement/Does-Car-AC-affect-Fuel-Mileage.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-ac-replacement/How-to-get-the-Maximum-Cooling-from-your-Car-AC.jpeg",
  ];

  const containerStyle = {
    position: "relative",
    width: "100%",
    margin: "auto",
  };

  const sliderRef = useRef(null);

  const settings1 = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "10px",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

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
        const field = "AcServices";
        
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
          if(response.status===200){
            setData(response.data.AcServices);
            setIsLoading(false)
          }
        
        // Log the response.data to the console
        console.log("Response Data:", response.data.AcServices);
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
      const LabelName = "AC Services";
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/getpricelist/${location}/${BrandId}/${LabelName}`
        );

        if (response.stconsole.logatus === 200) {
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
        const response = await fetch("https://gocarsmithbackend.onrender.com/api/AddToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Replace with the actual user ID
            userId,
            listOfServices: [...cartItems, ...items], // Send the updated cart to the backend
          }),
        });
  
        if (response.ok) {
          navigate('/cart')
        //  window.location.reload(false)
        } else {
          console.error("Failed to add items to the cart on the server.");
        }
      } catch (error) {
        console.error("Error adding items to the cart on the server:", error);
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
  const renderCheckboxListItem = (label, serviceIndex) => (
    <Typography variant="body1" gutterBottom key={label.servicename} style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked style={{ color: 'green', marginRight: '8px' }} />
      {label.servicename}
    </Typography>
  );
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
const regularACServiceRef = useRef(null);
const highPerformanceACServiceRef = useRef(null);
const coolingCoilReplacementRef = useRef(null);
const condenserReplacementRef = useRef(null);
const compressorReplacementRef = useRef(null);
const heatingcoilReplacementRef = useRef(null);
const vBeltReplacementRef = useRef(null);
const radiatorFlushCleanRef = useRef(null);
const aCBlowerMotorReplacementRef = useRef(null);
const radiatorReplacementRef = useRef(null);
const radiatorFanMotorReplacementRef = useRef(null);




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
        case 'regular ac service':
          scrollToBlinkingSpot(regularACServiceRef);
          break;
        case 'high performance ac service':
          scrollToBlinkingSpot(highPerformanceACServiceRef);
          break;
        case 'cooling coil replacement':
          scrollToBlinkingSpot(coolingCoilReplacementRef);
          break;
        case 'condenser replacement':
          scrollToBlinkingSpot(condenserReplacementRef);
          break;
        case 'compressor replacement':
          scrollToBlinkingSpot(compressorReplacementRef);
          break;
        case 'heating coil replacement':
          scrollToBlinkingSpot(heatingcoilReplacementRef);
          break;
        case 'v-belt replacement':
          scrollToBlinkingSpot(vBeltReplacementRef);
          break;
        case 'radiator flush & clean':
          scrollToBlinkingSpot(radiatorFlushCleanRef);
          break;
        case 'ac blower motor replacement':
          scrollToBlinkingSpot(aCBlowerMotorReplacementRef);
          break;
        case 'radiator replacement':
          scrollToBlinkingSpot(radiatorReplacementRef);
          break;
        case 'radiator fan motor replacement':
          scrollToBlinkingSpot(radiatorFanMotorReplacementRef);
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
        case 'regular ac service':
          scrollToBlinkingSpot(regularACServiceRef);
          break;
        case 'high performance ac service':
          scrollToBlinkingSpot(highPerformanceACServiceRef);
          break;
        case 'cooling coil replacement':
          scrollToBlinkingSpot(coolingCoilReplacementRef);
          break;
        case 'condenser replacement':
          scrollToBlinkingSpot(condenserReplacementRef);
          break;
        case 'compressor replacement':
          scrollToBlinkingSpot(compressorReplacementRef);
          break;
        case 'heating coil replacement':
          scrollToBlinkingSpot(heatingcoilReplacementRef);
          break;
        case 'v-belt replacement':
          scrollToBlinkingSpot(vBeltReplacementRef);
          break;
        case 'radiator flush & clean':
          scrollToBlinkingSpot(radiatorFlushCleanRef);
          break;
        case 'ac blower motor replacement':
          scrollToBlinkingSpot(aCBlowerMotorReplacementRef);
          break;
        case 'radiator replacement':
          scrollToBlinkingSpot(radiatorReplacementRef);
          break;
        case 'radiator fan motor replacement':
          scrollToBlinkingSpot(radiatorFanMotorReplacementRef);
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
    <Container style={{ marginTop: "50px" }}>

       {!(data.REGULAR_AC_SERVICE && data.REGULAR_AC_SERVICE.price !== null) &&
!(data.HIGH_PERFORMANCE_AC_SERVICE && data.HIGH_PERFORMANCE_AC_SERVICE.price !== null) &&
!(data.COOLING_COIL_REPLACEMENT && data.COOLING_COIL_REPLACEMENT.price !== null) &&
!(data.CONDENSER_REPLACEMNT && data.CONDENSER_REPLACEMNT.price !== null) &&
!(data.COMPRESSOR_REPLACEMNT && data.COMPRESSOR_REPLACEMNT.price !== null) &&
!(data.HEATING_COIL_REPLACEMNT && data.HEATING_COIL_REPLACEMNT.price !== null) &&
!(data.V_BELT_REPLACEMNT && data.V_BELT_REPLACEMNT.price !== null) &&
!(data.AC_BLOWER_MOTOR_REPLACEMNT && data.AC_BLOWER_MOTOR_REPLACEMNT.price !== null) &&
!(data.RADIATOR_FLUSH_AND_CLEAN && data.RADIATOR_FLUSH_AND_CLEAN.price !== null) &&
!(data.RADIATOR_REPLACEMNT && data.RADIATOR_REPLACEMNT.price !== null) &&
!(data.RADIATOR_FAN_MOTOR_REPLACEMNT && data.RADIATOR_FAN_MOTOR_REPLACEMNT.price !== null) && (

  isLoading?  <Spinner animation="border" role="status" 
  style={{position: "fixed",left: "50%",
    
  }} >

  <span className="visually-hidden" >Loading...</span>

</Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
  {/* Oops! No Data Found For This Model or Location. */}
</Typography> 
      
    )}

      <h1 style={{ marginLeft: "80px" }}>Service Packages</h1>
      {/* first card */}
      {data.REGULAR_AC_SERVICE && data.REGULAR_AC_SERVICE.price !== null ? (
         <Card ref={regularACServiceRef} className={addBlinkClass('Regular AC Service')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
         <Card
           style={{
             maxWidth: "1000px",
             height: "auto",
             margin: "auto",
             padding:"20px"
           }}
         >
          <Typography variant="h5" gutterBottom style={{ color: "green" }}>
            <b>RECOMMENDED</b>
          </Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="300"
                image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/newB.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "8px",marginBottom:"30px" }}
              />
            </Grid>
            {/* Second Container */}
            <Grid item sm={8}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ marginRight: "210px" }}
                >
                  Regular AC Service
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
                      &#8226; 500 kms or 1 Month Warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	AC vent Cleaning " },
                      1
                    )}
                    {renderCheckboxListItem(
                      { servicename: "AC Gas ( upto 400 gms )" },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "AC Filter Cleaning " },
                      3
                    )}
                   
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Every 5,000 kms or 3 Months ( Recommended )
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "AC Inspection" },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Condenser Cleaning" },
                      7
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 8)}
                  {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 9)}  */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                   ₹ {data.REGULAR_AC_SERVICE.price +500}/-
                  </span>
                  &nbsp;&nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.REGULAR_AC_SERVICE.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.REGULAR_AC_SERVICE])}
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
      {data.HIGH_PERFORMANCE_AC_SERVICE &&
      data.HIGH_PERFORMANCE_AC_SERVICE.price !== null ? (
        <Card ref={highPerformanceACServiceRef} className={addBlinkClass('High Performance AC Service')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/ac%20High.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  High Performance AC Service
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
                      &#8226; 1000 kms or 1 Month warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	AC vent Cleaning " },
                      1
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Dashboard Removing Refitting" },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "AC Gas ( Upto 600gms ) " },
                      3
                    )}
                    {renderCheckboxListItem(
                      { servicename: "AC Filter Cleaning" },
                      4
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Cooling Coil Cleaning" },
                      5
                    )}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Every 10,000 kms or 1 year ( Recommended)
                    </Typography>
                    {renderCheckboxListItem({ servicename: "AC Leak Test" }, 6)}
                    {renderCheckboxListItem(
                      { servicename: "Dashboard Cleaning" },
                      7
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Condenser Cleaning" },
                      8
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Compressor Oil ( Upto 200ml )" },
                      9
                    )}
                    {/*  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                    ₹ {data.HIGH_PERFORMANCE_AC_SERVICE.price + 500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.HIGH_PERFORMANCE_AC_SERVICE.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      addToCart([data.HIGH_PERFORMANCE_AC_SERVICE])
                    }
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
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
      <h1 style={{ marginLeft: "80px" }}>AC Fitments</h1>
      {data.COOLING_COIL_REPLACEMENT &&
      data.COOLING_COIL_REPLACEMENT.price !== null ? (
        <Card ref={coolingCoilReplacementRef} className={addBlinkClass('Cooling Coil Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "green" }}>
            <b>RECOMMENDED</b>
          </Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="270"
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/cooling%20coil/Thumbnail.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  Cooling Coil Replacement
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
                      &#8226; 3 Months Warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "		Cooling Coli Replacement ( OES )" },
                      1
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename: "	AC Pipe, Valve, Sensors Cost Additional",
                      },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Free Pickup & Drop" },
                      3
                    )}
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
                    {renderCheckboxListItem(
                      { servicename: "	Spare Part Cost Only" },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	AC Gas, Compressor Oil Cost Additional" },
                      7
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                    {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                    ₹ {data.COOLING_COIL_REPLACEMENT.price +500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.COOLING_COIL_REPLACEMENT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.COOLING_COIL_REPLACEMENT])}
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
      {data.CONDENSER_REPLACEMNT && data.CONDENSER_REPLACEMNT.price !== null ? (
           <Card ref={condenserReplacementRef} className={addBlinkClass('Condenser Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
           <Card
             style={{
               maxWidth: "1000px",
               height: "auto",
               margin: "auto",
               padding:"20px"
             }}
           >
          <Typography variant="h5" gutterBottom style={{ color: "green" }}>
            <b>RECOMMENDED</b>
          </Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="280"
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/Condensor%20Replacement.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  Condenser Replacement
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
                      &#8226; 3 Months Warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	Condenser Replacement ( OES )" },
                      1
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename: "AC Pipe, Valve, Sensors Cost Additional",
                      },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Free Pickup & Drop " },
                      3
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                    {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Recommended : In Case of Condenser Leakage or Less
                      Cooling
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	Spare Part Cost Only" },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "AC Gas, Compressor Oil Cost Additional" },
                      7
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                    {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                    ₹ {data.CONDENSER_REPLACEMNT.price +500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.CONDENSER_REPLACEMNT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.CONDENSER_REPLACEMNT])}
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
      {data.COMPRESSOR_REPLACEMNT &&
      data.COMPRESSOR_REPLACEMNT.price !== null ? (
        <Card ref={compressorReplacementRef} className={addBlinkClass('Compressor Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "green" }}>
            <b>RECOMMENDED</b>
          </Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="300"
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Compressor%20Replacement%20Photos/Thumbnail.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  Compressor Replacement
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
                      &#8226; 3 Months Warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "		Compressor Replacement ( OES )" },
                      1
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename: "AC Pipe, Valve, Sensors Cost Additional",
                      },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Free Pickup & Drop " },
                      3
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Steering Adjustment and Correction ' }, 4)} */}
                    {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Recommended : In Case of Condenser Leakage or Less
                      Cooling
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "Spare Part Cost Only" },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "AC Gas, Compressor Oil Cost Additional" },
                      7
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Camber and Castor Adjustment' }, 8)}
                  {renderCheckboxListItem({ servicename: 'All Four Type Rotation as per Tread Wear' }, 9)} */}
                    {/* {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                      ₹ {data.COMPRESSOR_REPLACEMNT.price + 500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.COMPRESSOR_REPLACEMNT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.COMPRESSOR_REPLACEMNT])}
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
      {data.HEATING_COIL_REPLACEMNT &&
      data.HEATING_COIL_REPLACEMNT.price !== null ? (
        <Card ref={heatingcoilReplacementRef} className={addBlinkClass('Heating Coil Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "green" }}>
            <b>RECOMMENDED</b>
          </Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="280"
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Heating%20Coil%20Replacement/Thumbanil.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  Heating coil Replacement
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
                      &#8226; 3 Months Warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "		Heating Coli Replacement ( OES )" },
                      1
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Spare Part Cost Only " },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Free Pickup & Drop " },
                      3
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                    {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Recommended : In Case of Heater not Working
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	Hoses Additional (If required )" },
                      6
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename:
                          "	Coolant and Radiator Flush Cost Additional",
                      },
                      7
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                    {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                    ₹ {data.HEATING_COIL_REPLACEMNT.price +500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.HEATING_COIL_REPLACEMNT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.HEATING_COIL_REPLACEMNT])}
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
      {data.V_BELT_REPLACEMNT && data.V_BELT_REPLACEMNT.price !== null ? (
        <Card ref={vBeltReplacementRef} className={addBlinkClass('V-Belt Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: "green" }}>
            <b>RECOMMENDED</b>
          </Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="280"
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/V-Belt%20Replacement/Thumbnail.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  V-Belt Replacement
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
                      &#8226; 1 Months Warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "		V-Belt Replacement ( OES )" },
                      1
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename: "Pulleys, Bearing, Timing Cost Additional",
                      },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Free Pickup & Drop" },
                      3
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                    {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Recommended : In Case of whining noise from Engine
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "Opening & Fitting of V-Belt " },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Scanning Cost Additional" },
                      7
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                    {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
                  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                    ₹ {data.V_BELT_REPLACEMNT.price +500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.V_BELT_REPLACEMNT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                {" "}
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.V_BELT_REPLACEMNT])}
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
      <h1 style={{ marginLeft: "80px" }}>Radiator</h1>
      {data.RADIATOR_FLUSH_AND_CLEAN &&
      data.RADIATOR_FLUSH_AND_CLEAN.price !== null ? (
        <Card ref={radiatorFlushCleanRef} className={addBlinkClass('Radiator Flush & Clean')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "green" }}
          ></Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="280"
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Radiator%20cleaning/Thumbnail.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  Radiator Flush & Clean
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
                      &#8226; Protects Radiator From Corrosion
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	Coolant Draining" },
                      1
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Anti – Freeze Coolant Replacement" },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Coolant Leakage Inspection" },
                      3
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                    {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Free Pickup and Drop
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	Radiator Flushing " },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "		Radiator Cleaning" },
                      7
                    )}
                    {/* {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 8)} */}
                    {/* {renderCheckboxListItem({ servicename: ' Brake Fluid Top Up' }, 9)}
          {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                     ₹ {data.RADIATOR_FLUSH_AND_CLEAN.price + 500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.RADIATOR_FLUSH_AND_CLEAN.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.RADIATOR_FLUSH_AND_CLEAN])}
                  >
                    Add to Cart
                  </Button>
                
              </Grid>
            </Grid>
          </Grid>
        </Card>
        </Card>
      ) : null}

      {/* nineth card */}
      {data.AC_BLOWER_MOTOR_REPLACEMNT &&
      data.AC_BLOWER_MOTOR_REPLACEMNT.price !== null ? (
        <Card ref={aCBlowerMotorReplacementRef} className={addBlinkClass('AC Blower Motor Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "green" }}
          ></Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="300"
                image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/AC%20Blower%20Motor/Thumbnail.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  AC Blower Motor Replacement
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
                      &#8226; 1 Month warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	AC Blower Motor Replacement (OES)" },
                      1
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename: "AC Filter Vents, Casting Cost Additional",
                      },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Free Pickup & Drop " },
                      3
                    )}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Every 10,000 kms or 1 year ( Recommended)
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "Spare Part Cost Only" },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Wiring Cost Additional(If Needed)" },
                      7
                    )}
                    {renderCheckboxListItem(
                      { servicename: "	Condenser Cleaning" },
                      8
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Compressor Oil ( Upto 200ml )" },
                      9
                    )}
                    {/*  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                    ₹ {data.AC_BLOWER_MOTOR_REPLACEMNT.price + 500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.AC_BLOWER_MOTOR_REPLACEMNT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.AC_BLOWER_MOTOR_REPLACEMNT])}
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
      {data.RADIATOR_REPLACEMNT && data.RADIATOR_REPLACEMNT.price !== null ? (
         <Card ref={radiatorReplacementRef} className={addBlinkClass('Radiator Replacement')}style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
         <Card
           style={{
             maxWidth: "1000px",
             height: "460px",
             margin: "auto",
           }}
         >
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "green" }}
          ></Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="300"
                image="https://res.cloudinary.com/du9ucrizw/image/upload/v1702893005/thumbnail_1_luhvcj.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  Radiator Replacement
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
                      &#8226; 1000 kms or 1 Month warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	Radiator Replacement (OES) " },
                      1
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename:
                          "Radiator Hoses, Thermostat Valves Cost Additional",
                      },
                      2
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Free Pickup & Drop " },
                      3
                    )}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Every 10,000 kms or 1 year ( Recommended)
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "Spare Part Cost Only" },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Coolant Cost Additional" },
                      7
                    )}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                  ₹ {data.RADIATOR_REPLACEMNT.price +500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.RADIATOR_REPLACEMNT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                {" "}
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() => addToCart([data.RADIATOR_REPLACEMNT])}
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
      {data.RADIATOR_FAN_MOTOR_REPLACEMNT &&
      data.RADIATOR_FAN_MOTOR_REPLACEMNT.price !== null ? (
        <Card ref={radiatorFanMotorReplacementRef} className={addBlinkClass('Radiator Fan Motor Replacement')}  style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: "green" }}
          ></Typography>
          <Grid container spacing={2}>
            {/* First Container */}
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                alt="Car Image"
                height="300"
                image="https://res.cloudinary.com/du9ucrizw/image/upload/v1702893005/Thumbnail_2_fi9ah9.jpg"
                style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                  Radiator Fan Motor Replacement
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
                      &#8226; 1000 kms or 1 Month warranty
                    </Typography>
                    {renderCheckboxListItem(
                      { servicename: "	Radiator Fan Motor Replacement (OES) " },
                      1
                    )}
                    {renderCheckboxListItem(
                      {
                        servicename:
                          "Coolant and Radiator Flush Cost Additional ",
                      },
                      2
                    )}
                  </CardContent>
                </Grid>
                {/* Fourth Container */}
                <Grid item xs={12} sm={6}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      &#8226; Every 10,000 kms or 1 year ( Recommended)
                    </Typography>
                    {renderCheckboxListItem(
                      {
                        servicename: "Opening & Fitting of Radiator Fan Motor",
                      },
                      6
                    )}
                    {renderCheckboxListItem(
                      { servicename: "Free Pickup & Drop" },
                      7
                    )}
                    {/*  {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* Price andAdd to Cart Container */}
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
                     ₹ {data.RADIATOR_FAN_MOTOR_REPLACEMNT.price +500}/-
                  </span>
                  &nbsp;
                  <b style={{ fontSize: "25px", color: "black" }}>
                    ₹ {data.RADIATOR_FAN_MOTOR_REPLACEMNT.price}/-
                  </b>
                </h6>
              </Grid>
              <Grid item xs={12} sm={2}>
                
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
                    onClick={() =>
                      addToCart([data.RADIATOR_FAN_MOTOR_REPLACEMNT])
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


      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", paddingBottom:"15px" }}>
          Customer Quotes
        </h1>

        <Slider {...settings} >
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
                    <Typography variant="body2" sx={{ paddingTop: 1 ,fontSize:"15px",   textAlign:"justify" }}>
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
          Frequently Asked Questions
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
            <AccordionDetails >
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
      <Typography variant="h4" sx={{ textAlign: "left", marginBottom: "30px" }}>
        <b>Why Choose GoCarsmith in {locationName} ?</b>
      </Typography>

      <Paper sx={{ padding: "24px" }}>
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          <b>Scheduled car service in {locationName}</b>
        </Typography>
        <div>
          <ul>
            <li>
              <span sx={{ fontWeight: "normal" }}>
                AC car servicing is essential for a smooth and trouble-free car
                ownership experience.
              </span>
            </li>
            <li>
              <span sx={{ fontWeight: "normal" }}>
                Crucial components like brake pads, tyres, the engine oil have a
                finite life-span and need replacement periodically.
              </span>
            </li>
            <li>
              <span sx={{ fontWeight: "normal" }}>
                You can lower your cost of ownership by spending fair on routine
                maintenance, saving you a lot of time and money.
              </span>
            </li>
            <li>
              <span sx={{ fontWeight: "normal" }}>
                A well-cared car will run and look better in the long run and
                always hold a higher value.
              </span>
            </li>
          </ul>
        </div>
        <div className="_1hV59">
          <Typography
            variant="h6"
            sx={{ textAlign: "left", marginTop: "20px" }}
          >
            <b>
              {BrandName} {modelName} {fuelType} services offered
            </b>
          </Typography>
          <div>You can choose from our top 3 service packages:</div>
          <div className="_1VMvZ">
            <ul>
              <li>
                <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                  <b>Basic Car Service:</b> All the bare essential services to
                  keep your car up and running.
                </span>
              </li>
              <li>
                <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                  <b>Standard Car Service:</b> The most popular service package.
                  Benefits of the basic scheme with additional services.
                </span>
              </li>
              <li>
                <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                  <b>Comprehensive Car Service:</b> GoCarsmith's signature
                  package with bumper-to-bumper car servicing
                </span>
              </li>
            </ul>
          </div>
          <Typography
            variant="h6"
            sx={{ textAlign: "left", marginTop: "50px" }}
          >
            <b>Industry-rated top-notch equipment</b>
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "left", marginTop: "5px" }}
          >
            At every GoCarsmith workshop in {locationName}, we employ only the
            cutting edge in industry-standard car service equipment. From
            automatic AC gas recharging apparatus, laser automated wheel
            balancing/alignment machine, OBD2 diagnostic scanner, ECU
            programming devices, and specialized tools specific to your car.
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
            When you choose GoCarsmith, you get the GoCarsmith Advantage. Your{" "}
            {BrandName} {modelName} service is assured under our 1000kms/1 month
            warranty policy anywhere in {locationName}. Now, book with
            confidence.
          </Typography>
        </div>
      </Paper>
      <div style={{marginTop:"15px"}}>
       
        {priceLists.length > 0 ? (
          <>
           <h2>
          Price Lists for {locationName} and {BrandName}
        </h2>
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
                {priceLists.map((priceList) =>
                  priceList.List.map((entry) => (
                    <TableRow key={entry._id}>
                      <TableCell>{entry.ServiceType}</TableCell>
                      <TableCell>{entry.Price}</TableCell>
                      <TableCell>{entry.Saving}%</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          </>
        ) : (
          <p></p>
        )}
      </div>
      
      <h1 style={{padding:"20px 0px 10px 0px"}}>Popular Regions</h1>
      <div style={{ padding: "20px", background: "#F2F2F2" , marginBottom:"20px"}}>
        <Slider {...carouselSettings}>
          {childLocations.map((loc, index) => (
            <div key={loc._id} style={{ textAlign: "center", padding: "20px" }}>
              {loc.name}
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default AcRepair;