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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog,
    Radio,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect, useRef } from 'react';
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
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// const locationName = localStorage.getItem('locationName');
//     const locations = localStorage.getItem('location');
//     const modelId =  localStorage.getItem('modelId');
//     const fuelType = localStorage.getItem('fuelType');
//     const BrandId = localStorage.getItem('BrandId');
//     const BrandName = localStorage.getItem('BrandName');
//     const modelName = localStorage.getItem('modelName');

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
        title: "Which engine oil do you use in a scheduled car service?",
        content:
            `We only use the best engine oil approved by for your ${modelName} . We use Mobil 5W-30 Engine oil that enhances engine performance and efficiency, providing superior protection against wear and tear giving your car engine a longer life.`,
    },
    {
        title:
            `Are there any extra/added charges apart from the described rates for my ${modelName} service?`,
        content:
            `Absolutely not. When you book a car service for your ${modelName}, you only pay for the service you opted. No last minute surprises, no hidden costs.`,
    },
    {
        title: `How much time does it take for my ${modelName} car service?`,
        content:
            `The service time for your ${modelName} depends on the service package you choose. A standard service takes 4-5 hours whereas, a comprehensive service takes at least 5-6 hours through most of our workshops across ${locationName}.`,
    },
    {
        title: `What if I face any issue after the service of my ${modelName}?`,
        content:
            `At GoCarsmith, we are all for a fulfilled customer experience. When you book with us, you get 1 month/1000 kms unconditional warranty on your ${modelName} car service. On top of that, our 24x7 proactive customer support will tend to your issue with the highest priority.`,
    },
    {
        title:
            "When should I go for a standard service or a comprehensive service?",
        content:
            `A standard car service package for your ${modelName} includes all the basic services and inspections and is required after every 10,000 kms. Whereas, a comprehensive service for your ${modelName} is a more elaborate package with complete top-to-bottom car servicing, replacements and maintenance and is mandated after every 40,000 kms from the odometer reading.`,
    },
    {
        title:
            `What quality of spare parts will you use in my ${BrandName} ${modelName} car service?`,
        content:
            `We use only genuine ${BrandName} spare parts sourced directly from our authorised distributor for your ${BrandName} ${modelName} car service.`,
    },
    {
        title: `How often should I get the engine oil replaced for my ${BrandName} ${modelName}?`,
        content:
            `${BrandName} recommends changing the engine oil every 10,000 to 12,000 kms for your ${BrandName} ${modelName} , provided you are using synthetic engine oil only.`,
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
        name: "Ankit Saxena",
        place: "Lucknow",
        content:
            `I thought of getting my ${BrandName} ${modelName} serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.`,
    },
    {
        name: " Srikant Panda",
        place: "Bhubaneswar ",
        content:
            `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
    },
    {
        name: "Kasturi Nagarajan",
        place: "Chennai",
        content:
            `I had my ${BrandName} ${modelName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
    },
    {
        name: "Vidya Hegde",
        place: "Bangalore",
        content:
            `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`,
    },
    {
        name: "Abdul Azeem",
        place: "Hyderabad",
        content:
            "Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone",
    },
    {
        name: "Manish Kashyap",
        place: "Patna",
        content:
            "Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone",
    },
    {
        name: "Srinivas Raja",
        place: "Vizag",
        content:
            "Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality. ",
    },
];





const PeriodicService = () => {
    const [isLoading,setIsLoading]=useState(false)

    //console.log(location, modelId, fuelType)
    // const [modelName, setModelName] = useState("");

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
    const [selectedOption, setSelectedOption] = useState([]);

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
    const handleCardClick = (title) => {
        // Check if the title is already in the selected options
        if (selectedOption.includes(title)) {
            // If it is, remove it (deselect)
            setSelectedOption(selectedOption.filter((item) => item !== title));
        } else {
            // If it's not, add it (select)
            setSelectedOption([...selectedOption, title]);
        }
    };
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
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Automotive-Engine-Oils-A-Definitive-Guide.jpg",
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Engine-Oil-Grades-Explained.jpeg",
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/A-Comprehensive-Guide-To-Dashboard-Warning-Lights.jpg",
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Bad-Habits-that-will-destroy-the-Clutch.jpeg",
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-repair/Carburettor-Vs-Fuel-Injection-System.jpg",
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
        centerPadding: "10px",
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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true)
            try {
                const field = 'PeriodicServices';

                const response = await axios.get(
                    `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    }
                );

                if(response.status===200){
                    setData(response.data.PeriodicServices);
                    setIsLoading(false)
                  } 

                // Log the response.data to the console
                console.log('Response Data:', response.data.PeriodicServices);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, []);
    const [priceLists, setPriceLists] = useState([]);
    useEffect(() => {
        const fetchData = async () => {

            const LabelName = "Periodic";
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
    const basicServiceRef = useRef(null);
    const standardServiceRef = useRef(null);
    const comprehensiveServiceRef = useRef(null);
    const frontBrakePadsRef = useRef(null);
    const rearBrakeShoesRef = useRef(null);
    const frontBrakeDiscsRef = useRef(null);
    const caliperPinReplacementRef = useRef(null);
    const discTurningRef = useRef(null);
    const handbrakeWireReplacementRef = useRef(null);
    const brakeDrumsTurningRef = useRef(null);
    const wheelCylinderReplacementRef = useRef(null);
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
                case 'basic service':
                    scrollToBlinkingSpot(basicServiceRef);
                    break;
                case 'standard service':
                    scrollToBlinkingSpot(standardServiceRef);
                    break;
                case 'comprehensive service':
                    scrollToBlinkingSpot(comprehensiveServiceRef);
                    break;
                case 'front brake pads':
                    scrollToBlinkingSpot(frontBrakePadsRef);
                    break;
                case 'rear brake shoes':
                    scrollToBlinkingSpot(rearBrakeShoesRef);
                    break;
                case 'front brake discs':
                    scrollToBlinkingSpot(frontBrakeDiscsRef);
                    break;
                case 'caliper pin replacement':
                    scrollToBlinkingSpot(caliperPinReplacementRef);
                    break;
                case 'disc turning':
                    scrollToBlinkingSpot(discTurningRef);
                    break;
                case 'handbrake wire replacement':
                    scrollToBlinkingSpot(handbrakeWireReplacementRef);
                    break;
                case 'brake drums turning':
                    scrollToBlinkingSpot(brakeDrumsTurningRef);
                    break;
                case 'wheel cylinder replacement':
                    scrollToBlinkingSpot(wheelCylinderReplacementRef);
                    break;
              default:
                if (!hasAlerted) {
                  window.alert("No perfect Match Found!");
                  hasAlerted = true; // Update flag to indicate alert has been shown
                }
                break;
            }
          }
        },2000); 
        // Set interval for blinking effect
        const blinkInterval = setInterval(() => {
          // Scroll to the blinking card while the blinking effect is ongoing
          if (!hasScrolled && keyword && typeof keyword === 'string') {
            switch (keyword.toLowerCase()) {
                case 'basic service':
                    scrollToBlinkingSpot(basicServiceRef);
                    break;
                case 'standard service':
                    scrollToBlinkingSpot(standardServiceRef);
                    break;
                case 'comprehensive service':
                    scrollToBlinkingSpot(comprehensiveServiceRef);
                    break;
                case 'front brake pads':
                    scrollToBlinkingSpot(frontBrakePadsRef);
                    break;
                case 'rear brake shoes':
                    scrollToBlinkingSpot(rearBrakeShoesRef);
                    break;
                case 'front brake discs':
                    scrollToBlinkingSpot(frontBrakeDiscsRef);
                    break;
                case 'caliper pin replacement':
                    scrollToBlinkingSpot(caliperPinReplacementRef);
                    break;
                case 'disc turning':
                    scrollToBlinkingSpot(discTurningRef);
                    break;
                case 'handbrake wire replacement':
                    scrollToBlinkingSpot(handbrakeWireReplacementRef);
                    break;
                case 'brake drums turning':
                    scrollToBlinkingSpot(brakeDrumsTurningRef);
                    break;
                case 'wheel cylinder replacement':
                    scrollToBlinkingSpot(wheelCylinderReplacementRef);
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

                {!(data.BASIC_SERVICE && data.BASIC_SERVICE.price !== null) &&
                    !(data.STANDARD_SERVICE && data.STANDARD_SERVICE.price !== null) &&
                    !(data.COMPREHENSIVE_SERVICE && data.COMPREHENSIVE_SERVICE.price !== null) &&
                    !(data.FRONT_BRAKE_PADS && data.FRONT_BRAKE_PADS.price !== null) &&
                    !(data.REAR_BRAKE_PADS && data.REAR_BRAKE_PADS.price !== null) &&
                    !(data.FRONT_BRAKE_DISCS && data.FRONT_BRAKE_DISCS.price !== null) &&
                    !(data.CALIPER_PIN_REPLACEMENT && data.CALIPER_PIN_REPLACEMENT.price !== null) &&
                    !(data.DISC_TURNNING && data.DISC_TURNNING.price !== null) &&
                    !(data.HANDBRAKE_WIRE_REPLACEMENT && data.HANDBRAKE_WIRE_REPLACEMENT.price !== null) &&
                    !(data.BRAKE_DRUMSTURNING && data.BRAKE_DRUMSTURNING.price !== null) &&
                    !(data.WHEEL_CYLINDER_REPLACEMENT && data.WHEEL_CYLINDER_REPLACEMENT.price !== null) && (
                        isLoading?  <Spinner animation="border" role="status" 
                        style={{position: "fixed",left: "50%",
                          
                        }} >
                      
                        <span className="visually-hidden" >Loading...</span>
                      
                      </Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
                        {/* Oops! No Data Found For This Model or Location. */}
                      </Typography>
                      
                    )}


                <h1 style={{ marginLeft: "80px" }}>Schedule Packages</h1>

                {/* first card */}
                {data.BASIC_SERVICE && data.BASIC_SERVICE.price !== null ? (
                    <Card ref={basicServiceRef} className={addBlinkClass('Basic Service')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                        height="300"
                                        image="https://thumbs.dreamstime.com/b/worker-uniform-disassembles-vehicle-engine-car-service-station-automobile-checking-inspection-professional-diagnostics-173424972.jpg"
                                         
                                    />
                                </Grid>
                                {/* Second Container */}
                                <Grid item sm={8}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                                            Basic Service
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
                                                    &#8226; 1000 kms or 1 Month warranty
                                                </Typography>
                                                {renderCheckboxListItem({ servicename: 'Wiper Fluid Replacement' }, 1)}
                                                {renderCheckboxListItem({ servicename: 'Engine Oil Replacement' }, 2)}
                                                {renderCheckboxListItem({ servicename: 'Heater/Spark Plugs Checking ' }, 3)}
                                                {renderCheckboxListItem({ servicename: 'Oil Fluid Replacement ' }, 4)}
                                                {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; Every 5000 kms or 3 Months
                                                </Typography>
                                                {renderCheckboxListItem({ servicename: 'Air Filter Cleaning ' }, 6)}
                                                {renderCheckboxListItem({ servicename: 'Battery Water Top Up' }, 7)}
                                                {renderCheckboxListItem({ servicename: 'Interior Vacuuming ( Carpet & Seats )' }, 8)}
                                                {renderCheckboxListItem({ servicename: 'Coolant Top Up (200 ml )' }, 9)}
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* Price and Add to Cart Container */}
                                <Grid container>
                                    <Grid item xs={12} sm={10}>
                                        <h6 className="text-success">
                                            <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                                                ₹ {data.BASIC_SERVICE.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BASIC_SERVICE.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                       
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => addToCart([data.BASIC_SERVICE])}
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
                {data.STANDARD_SERVICE && data.STANDARD_SERVICE.price !== null ? (
                    <Card ref={standardServiceRef} className={addBlinkClass('Standard Service')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Standard%20Service%20Package%20sq.jpg"
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
                                            Standard Service
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
                                                    { servicename: "Battery Water Top Up" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Front Brake Pads Serviced" },
                                                    2
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Interior Vacuuming (Carpet & Seats) " },
                                                    3
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: " Oil Filter Replacement  " },
                                                    4
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Fuel Filter Checking" },
                                                    5
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; Every 5000 kms or 3 Months
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Heater/Spark plugs Checking" },
                                                    6
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Rear Brake Shoes Serviced" },
                                                    7
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Engine Oil Replacement" },
                                                    8
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: " Brake Fluid Top Up" },
                                                    9
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: " Coolant Top Up (200 ml )" },
                                                    10
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
                                                ₹ {data.STANDARD_SERVICE.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.STANDARD_SERVICE.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                       
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => addToCart([data.STANDARD_SERVICE])}
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
                {data.COMPREHENSIVE_SERVICE && data.COMPREHENSIVE_SERVICE.price !== null ? (
                    <Card ref={comprehensiveServiceRef} className={addBlinkClass('Comprehensive Service')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
                    <Card
                      style={{
                        maxWidth: "1000px",
                        height: "auto",
                        margin: "auto",
                        padding:"20px"
                      }}
                    >
                            <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                                <b>FREE AC GAS TOP-UP</b>
                            </Typography>
                            <Grid container spacing={2}>
                                {/* First Container */}
                                <Grid item xs={12} sm={4}>
                                    <CardMedia
                                        component="img"
                                        alt="Car Image"
                                        height="350"
                                        image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Comprehensive%20Service%20Package%202%20sq.jpg"
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
                                            Comprehensive Service
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
                                                    &#8226; 1000 kms or 1 Month warranty
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "AC Filter Replacement" },
                                                    1
                                                )}
                                                {renderCheckboxListItem({ servicename: "Car Scanning" }, 2)}
                                                {renderCheckboxListItem(
                                                    { servicename: "Battery Water Top Up " },
                                                    3
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Oil Fluid Replacement " },
                                                    4
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Front Brake Pads Serviced" },
                                                    5
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Throttle Body cleaning" },
                                                    6
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Oil Filter Replacement" },
                                                    7
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; Every 5000 kms or 3 Months
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Air Filter Cleaning " },
                                                    8
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Wheel Alignment" },
                                                    9
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Interior Vacuuming ( Carpet & Seats )" },
                                                    10
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Coolant Top Up (200 ml )" },
                                                    11
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Brake Fluid Top Up" },
                                                    12
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Rear Brake Shoes Serviced" },
                                                    13
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
                                                ₹ {data.COMPREHENSIVE_SERVICE.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.COMPREHENSIVE_SERVICE.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.COMPREHENSIVE_SERVICE])}
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
                {data.FRONT_BRAKE_PADS && data.FRONT_BRAKE_PADS.price !== null ? (
                    <Card ref={frontBrakePadsRef} className={addBlinkClass('Front Brake Pads')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
                    <Card
                      style={{
                        maxWidth: "1000px",
                        height: "auto",
                        margin: "auto",
                        padding:"20px"
                      }}
                    >
                            <Typography variant="h5" gutterBottom style={{ color: "green" }}>
                                <b>GOCARSMITH EXCLUSIVE</b>
                            </Typography>
                            <Grid container spacing={2}>
                                {/* First Container */}
                                <Grid item xs={12} sm={4}>
                                    <CardMedia
                                        component="img"
                                        alt="Car Image"
                                        height="300"
                                        image="https://t4.ftcdn.net/jpg/04/23/67/35/240_F_423673516_wtn1XosRyqpk33Qp2032QVGJKJgEzPWm.jpg"
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
                                            Front Brake Pads
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
                                                    &#8226; 1 Month warranty
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Opening & Fitting of Front Brake Pads" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename: "Applicable For Set of 2 Front Brake Pads",
                                                    },
                                                    2
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Front Brake Disc Cleaning " },
                                                    3
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; Every 20000 kms or 12 Months ( Recommended )
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            "Front Brake Pads Replacement (GoCarsnith) ",
                                                    },
                                                    4
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Battery Water Top Up" },
                                                    5
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Inspection of Front Brake Calipers " },
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
                                                ₹ {data.FRONT_BRAKE_PADS.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.FRONT_BRAKE_PADS.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.FRONT_BRAKE_PADS])}
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
                {data.REAR_BRAKE_PADS && data.REAR_BRAKE_PADS.price !== null ? (
                    <Card ref={rearBrakeShoesRef} className={addBlinkClass('Rear Brake Shoes')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        height="350"
                                        image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/BrakePads/Brake%20Shoe%20Thumbnail.jpg"
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
                                            Rear Brake Shoes
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
                                                    &#8226; 1 Month warranty
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Opening & Fitting of Front Brake Pads" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename: "Applicable For Set of 2 Front Brake Pads",
                                                    },
                                                    2
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Rear Brake Disc Cleaning" },
                                                    3
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; Every 20000 kms or 12 Months ( Recommended )
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Rear Brake Shoes Replacement ( OES )" },
                                                    4
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Inspection of Rear Brake Calipers" },
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
                                                ₹ {data.REAR_BRAKE_PADS.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.REAR_BRAKE_PADS.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.REAR_BRAKE_PADS])}
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
                {data.FRONT_BRAKE_DISCS && data.FRONT_BRAKE_DISCS.price !== null ? (
                    <Card ref={frontBrakeDiscsRef} className={addBlinkClass('Front Brake Discs')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Front%20Disc%20Brake/Thumbnail.jpg"
                                        style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}    />
                                </Grid>
                                {/* Second Container */}
                                <Grid item sm={8}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            style={{ marginRight: "270px" }}
                                        >
                                            Front Brake Discs
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
                                                    &#8226; 1 Month warranty
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Opening & Fitting of Front Brake Disc" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "increases Brake Life & Safety" },
                                                    2
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Free pickup & Drop" },
                                                    3
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; Corrosion Resistance
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            "Front Brake Disc Replacement ( Single OES Units )",
                                                    },
                                                    6
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Reduces Vibrations and Brake Noises" },
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
                                                ₹ {data.FRONT_BRAKE_DISCS.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.FRONT_BRAKE_DISCS.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.FRONT_BRAKE_DISCS])}
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
                {data.CALIPER_PIN_REPLACEMENT && data.CALIPER_PIN_REPLACEMENT.price !== null ? (
                    <Card ref={caliperPinReplacementRef} className={addBlinkClass('Caliper Pin Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Caliper%20Pin%20Replacement/Thumbnail.jpg"
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
                                            Caliper Pin Replacement
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
                                                    &#8226; 1 Month warranty
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Opening & Fitting of Front Brake Disc" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Caliper Pin Replacement (OES)" },
                                                    2
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Free pickup & Drop" },
                                                    3
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; Corrosion Resistance
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            "Front Brake Disc Replacement ( Single OES Units )",
                                                    },
                                                    6
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Caliper Assembly Cost Additional" },
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
                                                ₹ {data.CALIPER_PIN_REPLACEMENT.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.CALIPER_PIN_REPLACEMENT.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.CALIPER_PIN_REPLACEMENT])}
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

                {/* Eigth card */}
                {data.DISC_TURNNING && data.DISC_TURNNING.price !== null ? (
                    <Card ref={discTurningRef} className={addBlinkClass('Disc Turning')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                        image="https://media.istockphoto.com/id/522633920/photo/car-service-procedure.jpg?s=612x612&w=0&k=20&c=CrnBjpIeeOQ66VbyHikmN1wsfnwDSsQ_YHJDOZeiPck="
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
                                            Disc Turning
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
                                                    { servicename: "Opening & Fitting of Brake Discs" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            "Applicable For Set of 2 Discs ( 2 Wheels )",
                                                    },
                                                    2
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; 1 Month warranty on Labor
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Inspections of Brake Discs" },
                                                    3
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Resurfacing of Brake Discs/Rotors" },
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
                                                ₹ {data.DISC_TURNNING.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.DISC_TURNNING.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.DISC_TURNNING])}
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

                {/* Nineth card */}
                {data.HANDBRAKE_WIRE_REPLACEMENT && data.HANDBRAKE_WIRE_REPLACEMENT.price !== null ? (
                    <Card ref={handbrakeWireReplacementRef} className={addBlinkClass('Handbrake Wire Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlGrkV4NO96mbZWtTlBpTaM1sl0YLva76QnlOIaoWAIL56ZixoOooFyxSpIxIhqs7d830&usqp=CAU"
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
                                            Handbrake Wire Replacement
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
                                                    { servicename: "Handbrake Wire Replacement (Single OES Unit)" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            "Brake Drum Inspection",
                                                    },
                                                    2
                                                )}
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            "Electronic Parking Brake Cost Additional",
                                                    },
                                                    3
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; 1 Month warranty on Labor
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Wheel Cylinder, Ratchet, Clamps Cost Additional" },
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
                                                ₹ {data.HANDBRAKE_WIRE_REPLACEMENT.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.HANDBRAKE_WIRE_REPLACEMENT.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.HANDBRAKE_WIRE_REPLACEMENT])}
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

                {/* Tenth card */}
                {data.BRAKE_DRUMSTURNING && data.BRAKE_DRUMSTURNING.price !== null ? (
                    <Card ref={brakeDrumsTurningRef} className={addBlinkClass('Brake Drums Turning')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                        image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Brake%20Drums/Thumbnail2.jpg"
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
                                            Brake Durms Turning
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
                                                    &#8226; 1 Month warranty on Labour
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Opening & Fitting of Brake Discs" },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            "Applicable for Set of 2 Brake Drums",
                                                    },
                                                    2
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; 1 Month warranty on Labor
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Opening & Fitting of Brake Drums" },
                                                    3
                                                )}
                                                {renderCheckboxListItem(
                                                    { servicename: "Refacing of Brake Drums" },
                                                    4
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
                                                ₹ {data.HANDBRAKE_WIRE_REPLACEMENT.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.HANDBRAKE_WIRE_REPLACEMENT.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => addToCart([data.BRAKE_DRUMSTURNING])}
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

                {/* Eleventh card */}
                {data.WHEEL_CYLINDER_REPLACEMENT && data.WHEEL_CYLINDER_REPLACEMENT.price !== null ? (
                    <Card ref={wheelCylinderReplacementRef} className={addBlinkClass('Wheel Cylinder Replacement')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                                        style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                                        height="270"
                                        image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/wheel%20cylinder%20replacement/thumbnail.jpg"
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
                                            Wheel Cylinder Replacement
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
                                                    { servicename: "Opening & Fitting of  Wheel Cylinder " },
                                                    1
                                                )}
                                                {renderCheckboxListItem(
                                                    {
                                                        servicename:
                                                            " Wheel Cylinder Replacement (OES)",
                                                    },
                                                    2
                                                )}
                                            </CardContent>
                                        </Grid>
                                        {/* Fourth Container */}
                                        <Grid item xs={12} sm={6}>
                                            <CardContent>
                                                <Typography variant="body2" gutterBottom>
                                                    &#8226; 1 Month warranty on Labor
                                                </Typography>
                                                {renderCheckboxListItem(
                                                    { servicename: "Brake Shoe & Brake Fluid Cost Additional" },
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
                                                ₹ {data.WHEEL_CYLINDER_REPLACEMENT.price + 500}/-
                                            </span>
                                            &nbsp;&nbsp;
                                            <b style={{ fontSize: "25px", color: "black" }}>₹ {data.WHEEL_CYLINDER_REPLACEMENT.price}/-</b>
                                        </h6>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => addToCart([data.WHEEL_CYLINDER_REPLACEMENT])}
                                            color="error"
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

                <div style={{ padding: "5px" }}>
                    <h1 style={{ textAlign: "center" , paddingBottom:"15px" }}>
                        Customer Quotes
                    </h1>
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
                                            {slide.place}
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
                    sx={{ textAlign: "left", marginBottom: "20px", marginTop: "10px" }}
                >
                    <b>
                        Why choose GoCarsmith  In {locationName}
                    </b>
                </Typography>

                <Paper sx={{ padding: "24px", background: "#f5f4f2" }}>
                    <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                        <b>
                            Why Choose GoCarsmith For {BrandName} {modelName} {fuelType} Periodic Services In {locationName}
                        </b>
                    </Typography>
                    <div>
                        <ul>
                            <li>
                                <span sx={{ fontWeight: "normal" }}>
                                    Periodic car servicing is essential for a smooth and
                                    trouble-free car ownership experience.
                                </span>
                            </li>
                            <li>
                                <span sx={{ fontWeight: "normal" }}>
                                    Crucial components like brake pads, tyres, the engine oil have
                                    a finite life-span and need replacement periodically.
                                </span>
                            </li>
                            <li>
                                <span sx={{ fontWeight: "normal" }}>
                                    You can lower your cost of ownership by spending fair on
                                    routine maintenance, saving you a lot of time and money.
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
                            <b>{BrandName} {modelName} {fuelType} services offered</b>
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
                                        <b>Standard Car Service:</b> The most popular service
                                        package. Benefits of the basic scheme with additional
                                        services.
                                    </span>
                                </li>
                                <li>
                                    <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                                        <b>Comprehensive Car Service:</b> GoCarsmith's signature
                                        package with bumper-to-bumper car servicing.
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
                            When you choose GoCarsmith, you get the GoCarsmith Advantage. Your {BrandName} {modelName} service is assured under our 1000kms/1 month warranty
                            policy anywhere in {locationName}. Now, book with confidence.
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
                <div style={{ padding: "20px", background: "#f5f4f2", marginBottom: "20px" }}>
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

export default PeriodicService;