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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Paper from "@mui/material/Paper";
import Footer from './Footer';
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "./Header";
import Carousel from "./Carousel";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';

// const locationName = localStorage.getItem('locationName');
//   const location = localStorage.getItem('location');
//   const modelId =  localStorage.getItem('modelId');
//   const fuelType = localStorage.getItem('fuelType');
//   const BrandId = localStorage.getItem('BrandId')
//   const BrandName = localStorage.getItem('BrandName')
//   const modelName = localStorage.getItem('modelname')



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
      `At GoCarsmith ${locationName}, we use only ARAI certified glasses for your ${BrandName} ${modelName}  glass replacement service to provide you with the best-in-class glass replacement.`,
  },
  {
    title: "What all is included in a windshield replacement service?",
    content:
      `The windshield replacement service at GoCarsmith ${locationName} includes replacing the cracked/broken windshield with a new ARAI approved windshield using the best sealant and adhesives available across all GoCarsmith workshops.`,
  },
  {
    title: "How long does it take to replace a windshield?",
    content:
      `The windshield replacement service at GoCarsmith ${locationName} includes replacing the cracked/broken windshield with a new ARAI approved windshield using the best sealant and adhesives available across all GoCarsmith workshops.`,
  },
  {
    title: "How long does it take to replace a windshield?",
    content:
      `We strive to deliver our best in the least possible time. However, it may take upto 6 hours to carry out the windshield replacement process in order to ensure the quality and endurance of the new glass on your ${BrandName} ${modelName} .`,
  },
  {
    title: "How soon can I use my vehicle after a rear windshield replacement?",
    content:
      "We advise you to wait at least 24 hours after a windshield replacement to allow the sealant to cure causing the glass to seal and bond permanently to the frame.",
  },
  {
    title: "Does the glass replacement service come with a warranty?",
    content:
      `All the glass fitments done at GoCarsmith ${locationName} come with a standard fitment warranty of 1 month. No questions asked.`,
  },
  {
    title: "I can’t visit the workshop to drop my car. Can GoCarsmith help? ",
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
  <Typography variant="body1" gutterBottom key={label.servicename} style={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox checked style={{ color: 'green', marginRight: '8px' }} />
    {label.servicename}
  </Typography>
);
const slides = [
  {
    name: "Sachin Joshi",
    location: "Bombay",
    content:
      `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`,
  },
  {
    name: "Abhijeet Bhuyan",
    location: "Kolkata",
    content:
      `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
  },
  {
    name: "Manish Kashyap",
    location: "Patna",
    content:
      `I had my ${modelName} ${BrandName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
  },

  {
    name: "Srinivas Raja",
    location: "Vizag",
    content:
      "Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone",
  },
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content:
      `I thought of getting my ${modelName} Celerio serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.`,
  },
  {
    name: "Sukhvinder Singh",
    location: "Delhi",
    content:
      "Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality.",
  },
];
const WindSheilds = () => {
  const [isLoading,setIsLoading]=useState(false)
  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);
  //console.log(location, modelId, fuelType)
  const [modelName, setModelName] = useState("");

  useEffect(() => {
    // Retrieve the modelName from local storage
    const storedModelName = localStorage.getItem("modelName");

    // Update the state with the retrieved modelName
    setModelName(storedModelName);
  }, []);

  const getToken = () => {
    return localStorage.getItem('token');
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
    "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/WindShield%20Services/Decoding%20Vehicle%20Identification%20Number.png",
    "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/WindShield%20Services/Key%20Details%20Mentioned%20on%20Car.png",
    "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/WindShield%20Services/Car%20Windshields%20to%20have%20ISI%20Mark.png",
    "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/WindShield%20Services/Common%20Sunroof-Moonroof%20Problems.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/WindShield%20Services/Types%20Of%20Car%20Windshield%20Cracks.jpg",
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
    "Rao Nagar",
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
        const field = 'WindshielsLight';

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
          setData(response.data.WindshielsLight);
          setIsLoading(false)
        } 

        // Log the response.data to the console
        console.log('Response Data:', response.data.WindshielsLight);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, []); console.log();

  const [priceLists, setPriceLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const LabelName = "WINDSHIELDS AND LIGHTS";
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
  const frontWindshieldReplacementRef = useRef(null);
  const rearWindshieldReplacementRef = useRef(null);
  const doorGlassReplacementRef = useRef(null);
  const frontHeadlightRef = useRef(null);
  const rearTaillightRef = useRef(null);
  const fogLightRef = useRef(null);
  const sideMirrorReplacementRef = useRef(null);
  const scrollToBlinkingSpot = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log("blink")
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
          case 'front windshield replacement':
            scrollToBlinkingSpot(frontWindshieldReplacementRef);
            break;
          case 'rear windshield replacement':
            scrollToBlinkingSpot(rearWindshieldReplacementRef);
            break;
          case 'door glass replacement':
            scrollToBlinkingSpot(doorGlassReplacementRef);
            break;
          case 'front head light':
            scrollToBlinkingSpot(frontHeadlightRef);
            break;
          case 'rear taillight':
            scrollToBlinkingSpot(rearTaillightRef);
            break;
          case 'fog light':
            scrollToBlinkingSpot(fogLightRef);
            break;
          case 'side mirror replacement':
            scrollToBlinkingSpot(sideMirrorReplacementRef);
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
          case 'front windshield replacement':
            scrollToBlinkingSpot(frontWindshieldReplacementRef);
            break;
          case 'rear windshield replacement':
            scrollToBlinkingSpot(rearWindshieldReplacementRef);
            break;
          case 'door glass replacement':
            scrollToBlinkingSpot(doorGlassReplacementRef);
            break;
          case 'front head light':
            scrollToBlinkingSpot(frontHeadlightRef);
            break;
          case 'rear taillight':
            scrollToBlinkingSpot(rearTaillightRef);
            break;
          case 'fog light':
            scrollToBlinkingSpot(fogLightRef);
            break;
          case 'side mirror replacement':
            scrollToBlinkingSpot(sideMirrorReplacementRef);
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

        {!(data.FRONT_WINDSHIELD_REPLACEMENT && data.FRONT_WINDSHIELD_REPLACEMENT.price !== null) &&
          !(data.REAR_WINDSHIELD_REPLACEMENT && data.REAR_WINDSHIELD_REPLACEMENT.price !== null) &&
          !(data.DOOR_GLASS_REPLACEMENT && data.DOOR_GLASS_REPLACEMENT.price !== null) &&
          !(data.FRONT_HEADLIGHT && data.FRONT_HEADLIGHT.price !== null) &&
          !(data.REAR_TAILLIGHT && data.REAR_TAILLIGHT.price !== null) &&
          !(data.FOG_LIGHT && data.FOG_LIGHT.price !== null) &&
          !(data.SIDE_MIRROR_REPLACEMENT && data.SIDE_MIRROR_REPLACEMENT.price !== null) && (
            isLoading?  <Spinner animation="border" role="status" 
            style={{position: "fixed",left: "50%",
              
            }} >
          
            <span className="visually-hidden" >Loading...</span>
          
          </Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
            {/* Oops! No Data Found For This Model or Location. */}
          </Typography>
          )}

        <h1 style={{ marginLeft: "80px" }}>WindSheilds</h1>
        {/* first card */}
        {data.FRONT_WINDSHIELD_REPLACEMENT && data.FRONT_WINDSHIELD_REPLACEMENT.price !== null ? (
          <Card ref={frontWindshieldReplacementRef} className={addBlinkClass('Front Windshield Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://www.aisglass.com/wp-content/uploads/2021/12/Windshield-scaled.jpg."
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
                      Front Windshield Replacement
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
                          &#8226; 1 Month Waranty On Fitting
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Windshield ( ISI Approved)" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting of New Windshield" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Sensor Charges Additional (If Applicable) ",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; On Crack in Windshield(Recommended)
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Consumables – Sealant/Bond/Adhesive " },
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
                        ₹ {data.FRONT_WINDSHIELD_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.FRONT_WINDSHIELD_REPLACEMENT.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.FRONT_WINDSHIELD_REPLACEMENT])}
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
        {data.REAR_WINDSHIELD_REPLACEMENT && data.REAR_WINDSHIELD_REPLACEMENT.price !== null ? (
          <Card ref={rearWindshieldReplacementRef} className={addBlinkClass('Rear Windshield Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Rear%20Windshield%20replacement/Rear%20Windshield%20Replacement%20Sq.jpg"
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
                      Rear Windshield Replacement
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
                          &#8226; 1 Month Warranty on Fitting
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Windshield ( ISI Approved)" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting of New Windshield" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Defogger Charges Additional (If Applicable) ",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; On Crack in Windshield (Recommended)
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: " Consumables – Sealant/Bond/Adhesive  " },
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
                        ₹ {data.REAR_WINDSHIELD_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.REAR_WINDSHIELD_REPLACEMENT.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.REAR_WINDSHIELD_REPLACEMENT])}
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
        {data.DOOR_GLASS_REPLACEMENT && data.DOOR_GLASS_REPLACEMENT.price !== null ? (
          <Card ref={doorGlassReplacementRef} className={addBlinkClass('Door Glass Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
          <Card
            style={{
              maxWidth: "1000px",
              height: "auto",
              margin: "auto",
              padding:"20px"
            }}
          >
              <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                <b>Glasses</b>
              </Typography>
              <Grid container spacing={2}>
                {/* First Container */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    alt="Car Image"
                    height="280"
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Door%20Glass%20Replacement/Door%20Glass%20Replacement%20Sq.jpg"
                    style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginRight: "200px" }}
                    >
                      Door Glass Replacement
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
                          &#8226; 1 Month Warranty on Fitting
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Door Glass ( ISI Approved) " },
                          8
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting of New Door Glass" },
                          9
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Consumables – Bond/Adhesive" },
                          10
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; On Crack in Door Glass (Recommended)
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          11
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "UV Glass Charges Additional ( If Applicable )",
                          },
                          12
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
                        ₹ {data.DOOR_GLASS_REPLACEMENT.price + 600}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.DOOR_GLASS_REPLACEMENT.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.DOOR_GLASS_REPLACEMENT])}
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
        {data.FRONT_HEADLIGHT && data.FRONT_HEADLIGHT.price !== null ? (
          <Card ref={frontHeadlightRef} className={addBlinkClass('Front Head light')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Lights/721307022804.jpg"
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
                      Front Head light
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
                          &#8226; 1 Month warranty on Fitting
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Heading OES (Price for single unit)" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting of Bumper/Headlight" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; For Broken / Cracked Lights (Recommended)
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop " },
                          3
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Projector/LEDs/DRLs Additional (If Applicable)",
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
                        ₹ {data.FRONT_HEADLIGHT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.FRONT_HEADLIGHT.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.FRONT_HEADLIGHT])}
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
        {data.REAR_TAILLIGHT && data.REAR_TAILLIGHT.price !== null ? (
          <Card ref={rearTaillightRef} className={addBlinkClass('Rear Taillight')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Lights/8E5945257.jpg"
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
                      Rear Taillight
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 3 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month warranty on Fitting
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Tail Light OES (Price for single unit)" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting of Tail Light" },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; For Broken / Cracked Lights (Recommended)
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Bulbs/LEDs Additional (If Applicable)" },
                          5
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Tail Light Price will differ from car model to mode",
                          },
                          3
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
                        ₹ {data.REAR_TAILLIGHT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.REAR_TAILLIGHT.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.REAR_TAILLIGHT])}
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
        {data.FOG_LIGHT && data.FOG_LIGHT.price !== null ? (
          <Card ref={fogLightRef} className={addBlinkClass('Fog Light')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Fog%20Light/maruti_fog_lamp.jpg"
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
                      Fog Light
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 5 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 1 Month warranty on Fitting
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Opening & Fitting of Bumper + Fog Lamp" },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Fog Light Assembly Replacement (Single Unit)",
                          },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Switch/Harness Wiring Check" },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom></Typography>
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          6
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Projector/LEDs/DRLs Additional (If Applicable)",
                          },
                          7
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
                        ₹ {data.FOG_LIGHT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.FOG_LIGHT.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.FOG_LIGHT])}
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
        {data.SIDE_MIRROR_REPLACEMENT && data.SIDE_MIRROR_REPLACEMENT.price !== null ? (
          <Card ref={sideMirrorReplacementRef} className={addBlinkClass('Side Mirror Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="	https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Side%20Mirror%20Replacement/thumbnail.jpg"
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
                      Side Mirror Replacement
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
                          &#8226; 1 Month warranty
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Side Mirror Replacement OES (Single Unit) " },
                          1
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Opening & Fitting of Side Mirror",
                          },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Switch/Harness Wiring Cost Additional" },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In Case of Broken / Cracked Side Mirror
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Free Pickup & Drop" },
                          6
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename:
                              "Semi & Fully Automatic Side Mirror Cost Additional",
                          },
                          7
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
                        ₹ {data.SIDE_MIRROR_REPLACEMENT.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.SIDE_MIRROR_REPLACEMENT.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.SIDE_MIRROR_REPLACEMENT])}
                      >
                        Add to Cart
                      </Button>
                   
                  </Grid>
                </Grid>
              </Grid>
            </Card>
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
                    <Typography variant="body1" sx={{ color: "gray", textAlgin: "end" }} >
                      {slide.location}
                    </Typography>
                    <Typography variant="body2" sx={{ paddingTop: 1 , fontSize:"16px",  textAlign:"justify" }}>{slide.content}</Typography>
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
        <Typography
          variant="h4"
          sx={{ textAlign: "left", marginBottom: "20px" }}
        >
          <b>
            Why Choose GoCarsmith In {locationName}
          </b>
        </Typography>

        <Paper sx={{ padding: "24px", background: "#f5f4f2", }}>
          <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            <b>Windshield & Glass Replacement in {locationName}</b>
          </Typography>
          <p>
            Windshield & Glass Replacement Services offered by GoCarsmith
            {locationName} enables you to get your {BrandName} {modelName} windshield and glasses
            replaced without facing any hassle. We at GoCarsmith {locationName} use
            only ARAI certified glasses for your {BrandName} {modelName} windshield & glass
            replacement services.
          </p>
          <div className="_1hV59">
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              <b>Windshield & Glass Replacement Services Inclusions:</b>
            </Typography>
            <p>
              We offer windshield & glass replacement services for all cars of
              any make and model at GoCarsmith {locationName}. The windshield & glass
              replacement service includes:
            </p>
            <div className="_1VMvZ">
              <ul>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Front Windshield Replacement
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Rear Windshield Replacement
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    Door Glass Replacement
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                <b>Specialised Tools & Equipment</b>
              </Typography>
              <p>
                All the GoCarsmith workshops across {locationName} have specialised
                tools, modern equipment and best-in-class glass adhesives which
                ensure that the windshield or glass replacement on your {BrandName} {modelName}
                 is done perfectly and lasts long. Our trained mechanics also
                ensure that the glass fits well in place and test it for its
                endurance before delivering your vehicle.
              </p>
              <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                <b>Warranty on Detailing Services</b>
              </Typography>
              <p>
                All the windshield and glass replacements done at GoCarsmith {locationName} come with a standard 1-Month warranty on fitment.
              </p>
            </div>
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
        </div>

        <h1 style={{padding:"20px 0px 10px 0px"}}>Popular Regions</h1>
        <div style={{ padding: "20px", background: "#f5f4f2", marginBottom: "20px",  }}>
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

export default WindSheilds;