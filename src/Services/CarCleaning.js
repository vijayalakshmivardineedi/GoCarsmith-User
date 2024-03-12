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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import Footer from "./Footer";
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLocation } from "react-router-dom"
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
    title: `I have a few scratches and paint fade on my ${BrandName}. Which service should I book?`,
    content: `You can choose our rubbing/polishing service which will get rid all the surface scratches and swirl marks from your ${BrandName}. However, if the scratches are deep, we recommend getting the panel dented and painted. You can choose from any of our specialised auto body workshops located near you in ${locationName}.`,
  },
  {
    title: `How often should I get a Rubbing/Polishing service for my ${BrandName}?`,
    content: `A rubbing/polishing service will preserve and protect the paint-work of your ${BrandName}. It also adds a layer of protection over the clear coat. We recommend getting a rubbing/polishing service every 3-4 months to maintain that showroom shine.`,
  },
  {
    title: 'What is the difference between Dry Cleaning and Interior Detail Cleaning?',
    content: `If your ${BrandName} has a dirty dashboard, filthy carpets or foul odour, we recommend our dry cleaning package which includes complete seats and upholstery shampoo with vacuum cleaning and dashboard polishing. For general maintenance, get the interior detail cleaning service done every month. It includes interior dry-washing and vacuum cleaning with dashboard and trim polishing.`,
  },
  {
    title: 'Which products do you use for car care services like rubbing, waxing, polishing etc?',
    content: `We use only the best car care products from 3M and Wuerth for your ${BrandName} which offer excellent performance and great results. With GoCarsmith, you get the best car care treatment at the best prices in ${locationName}`,
  },
  {
    title: 'What is the difference between Teflon coating vs Anti-rust coating?',
    content: `Teflon coating for your ${BrandName} is a paint protection treatment, chemically synthesised from a fluoropolymer which bonds to the paint offering a brilliant shine, doing away with the problem of corrosion and wear and tear. Anti-Rust coating is a car underbody protection treatment, which is applied to the underbody of the car. A thick 2-3mm of a rubberised silicone-polyether layer is applied to the under-body to give it enhanced protection against hard rust and paint chips. Book a service today and get a complete underbody rust and corrosion treatment at attractive prices in ${locationName}.`,
  },
  {
    title: `Will the protective coating on my ${BrandName} ${modelName} spoil the paint over time?`,
    content: `Absolutely not, any paint protection coating is temporary and gentle to the painted surface. A Teflon coating can last upto 6 to 8 months if cared well. Ceramic coating on the other hand bonds to the paint surface and lasts much longer than any wax or paint sealant. A highly recommended service for your ${BrandName} ${modelName}.`,
  },
  {
    title: `What products do you use for interior cleaning on my ${BrandName} ${modelName} ? `,
    content: `For interior car care services like dashboard polishing and detailing, leather and upholstery cleaning we use top quality car care products from 3M, Wuerth and Xxtra armor which are specifically developed for interior car care on your ${BrandName} ${modelName}.`,
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

const renderCheckboxListItem = (label, serviceIndex) => (
  <Typography variant="body1" gutterBottom key={label.servicename} style={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox checked style={{ color: 'green', marginRight: '8px' }} />
    {label.servicename}
  </Typography>
);
const slides = [
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content: 'I thought of getting my Maruti Suzuki Celerio serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.',
  },
  {
    name: "Ankit Saxena",
    location: "Lucknow",
    content: `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
  },
  {
    name: "Vidya Hegde",
    location: "Bangalore",
    content: `I had my ${BrandName} ${modelName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
  },
  {
    name: "Sukhvinder Singh",
    location: "Delhi",
    content:
      `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`
  },
  {
    name: "Sachin Joshi",
    location: "Bombay",
    content:
      'Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone'
  },
  {
    name: "Srinivas Raja",
    location: "Vizag",
    content: 'Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality. '
  },
];
const CarSpaCleaning = () => {
  const locations = useLocation();
  const [isLoading,setIsLoading]=useState(false)
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
    centerPadding: '10px',
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const images = [
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-cleaning-service/Teflon-Vs-Ceramic-Vs-Paint-Protection-Film.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-cleaning-service/Leather-Seats-Vs-Fabric-Seats.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-cleaning-service/8-Summer-Car-Hacks.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-cleaning-service/Get-Your-Car-Winter-Ready.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-cleaning-service/5-Monsoon-Car-Care-Tips.jpg',
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
    setIsLoading(true)
    const fetchDetails = async () => {

      try {
        const field = 'CarSpaCleaning';

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
          setData(response.data.CarSpaCleaning);
          setIsLoading(false)
        } 

        // Log the response.data to the console
        console.log('Response Data:', response.data.CarSpaCleaning);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, []);
  console.log();
  const [priceLists, setPriceLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const LabelName = "CAR SPA AND CLEANING";
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
  // Function to render checkbox list items
  // const renderCheckboxListItem = (item, key) => (
  //   <Typography key={key} variant="body2" gutterBottom>
  //     &#8226; {item.servicename}
  //   </Typography>
  // );
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
  const deepCleaningRef = useRef(null);
  const carInteriorSpaRef = useRef(null);
  const deepAllRoundSpaRef = useRef(null);
  const premiumTopWashRef = useRef(null);
  const rubbingPolishingRef = useRef(null);
  const ratPestRepellentRef = useRef(null);
  const carInspectionRef = useRef(null);
  const sunroofServiceRef = useRef(null);
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
          case 'deep cleaning':
            scrollToBlinkingSpot(deepCleaningRef);
            break;
          case 'car interior spa':
            scrollToBlinkingSpot(carInteriorSpaRef);
            break;
          case 'deep all round spa':
            scrollToBlinkingSpot(deepAllRoundSpaRef);
            break;
          case 'premium top wash':
            scrollToBlinkingSpot(premiumTopWashRef);
            break;
          case 'car rubbing & polishing':
            scrollToBlinkingSpot(rubbingPolishingRef);
            break;
          case 'rat & pest repellent treatment':
            scrollToBlinkingSpot(ratPestRepellentRef);
            break;
          case 'car inspection & diagnostics':
            scrollToBlinkingSpot(carInspectionRef);
            break;
          case 'sunroof service':
            scrollToBlinkingSpot(sunroofServiceRef);
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
          case 'deep cleaning':
            scrollToBlinkingSpot(deepCleaningRef);
            break;
          case 'car interior spa':
            scrollToBlinkingSpot(carInteriorSpaRef);
            break;
          case 'deep all round spa':
            scrollToBlinkingSpot(deepAllRoundSpaRef);
            break;
          case 'premium top wash':
            scrollToBlinkingSpot(premiumTopWashRef);
            break;
          case 'car rubbing & polishing':
            scrollToBlinkingSpot(rubbingPolishingRef);
            break;
          case 'rat & pest repellent treatment':
            scrollToBlinkingSpot(ratPestRepellentRef);
            break;
          case 'car inspection & diagnostics':
            scrollToBlinkingSpot(carInspectionRef);
            break;
          case 'sunroof service':
            scrollToBlinkingSpot(sunroofServiceRef);
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

  return (<>
    <Container style={{ marginTop: '50px' }}>

      {!(data.FESTIVAL_360_DEEP_CLEANING && data.FESTIVAL_360_DEEP_CLEANING.price !== null) &&
        !(data.CAR_INTERIOR_SPA && data.CAR_INTERIOR_SPA.price !== null) &&
        !(data.DEEP_ALL_ROUND_SPA && data.DEEP_ALL_ROUND_SPA.price !== null) &&
        !(data.PREMIUM_TOP_WASH && data.PREMIUM_TOP_WASH.price !== null) &&
        !(data.CAR_RUBBING_POLISHING && data.CAR_RUBBING_POLISHING.price !== null) &&
        !(data.RAT_PEST_REPELLENT_TREATMENT && data.RAT_PEST_REPELLENT_TREATMENT.price !== null) &&
        !(data.CAR_INSPECTION_DIAGNOSTICS && data.CAR_INSPECTION_DIAGNOSTICS.price !== null) &&
        !(data.SUNROOF_SERVICE && data.SUNROOF_SERVICE.price !== null) && (
          isLoading?  <Spinner animation="border" role="status" 
          style={{position: "fixed",left: "50%",
            
          }} >

          <span className="visually-hidden" >Loading...</span>

        </Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
          {/* Oops! No Data Found For This Model or Location. */}
        </Typography>

        )}
      <h1 style={{ marginLeft: '80px' }}>Festive Special</h1>

      {/* first Card */}
      {data.FESTIVAL_360_DEEP_CLEANING && data.FESTIVAL_360_DEEP_CLEANING.price !== null ? (
        <Card ref={deepCleaningRef} className={addBlinkClass('360° Deep Cleaning')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/7%20services%20Images/festive/thumbnail.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                    360° Deep Cleaning
                  </Typography>
                  <Button style={{ color: 'gray' }}>
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
                      {renderCheckboxListItem({ servicename: 'Exterior rubbing & Polishing' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Interior Vacuum Cleaning' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Tyre Dressing & Alloy Polishing ' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Brand New Festive Look
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Interior Wet Shampooing & Detailing' }, 4)}
                      {renderCheckboxListItem({ servicename: 'Pressure washing' }, 5)}
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 6)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.FESTIVAL_360_DEEP_CLEANING.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.FESTIVAL_360_DEEP_CLEANING.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.FESTIVAL_360_DEEP_CLEANING])}
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
      <h1 style={{ marginLeft: '80px' }}>Spa</h1>
      {data.CAR_INTERIOR_SPA && data.CAR_INTERIOR_SPA.price !== null ? (
        <Card ref={carInteriorSpaRef} className={addBlinkClass('Car Interior Spa')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
              <b>FREE CAR INSPECTION</b>
            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>

                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="250"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Dry%20Cleaning%20sq.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    <b>Car Interior Spa</b>
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
                        &#8226; Every 3 Month ( Recommended )
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Pressure washing' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Interior Vacuum Cleaning' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Interior Wet Shampooing & Detailing ' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <br />
                      {renderCheckboxListItem({ servicename: 'Anti viral & Bacterial Treatment' }, 5)}
                      {renderCheckboxListItem({ servicename: 'Dashboard Polishing' }, 6)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.CAR_INTERIOR_SPA.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_INTERIOR_SPA.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button
                      variant="outlined"
                      color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.CAR_INTERIOR_SPA])}
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
      {data.DEEP_ALL_ROUND_SPA && data.DEEP_ALL_ROUND_SPA.price !== null ? (
        <Card ref={deepAllRoundSpaRef} className={addBlinkClass('Deep All Round Spa')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  height="280"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/comprehensive%20cleaning%20sq.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                    Deep All Round Spa
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
                        &#8226; 	Every 6 Month ( Recommended
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Rubbing with compound' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Machine Rubbing' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Alloy Polishing ' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Dashboard Polishing ' }, 4)}


                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <br />
                      {renderCheckboxListItem({ servicename: 'Pressure Car Wash' }, 5)}
                      {renderCheckboxListItem({ servicename: 'Wax Polishing' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Tyre dressing' }, 7)}

                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.DEEP_ALL_ROUND_SPA.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.DEEP_ALL_ROUND_SPA.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.DEEP_ALL_ROUND_SPA])}
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
                  height="280"
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Foam_Wash_Thumbnail.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Premium Top Wash
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Revitalize your Ride In Just 1 Hour
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 	Applicable on work-in only
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Exterior Top wash' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Hand Drying' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Preserving Paint & Finish
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Rinsing' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Tyre external wash' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.PREMIUM_TOP_WASH.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.PREMIUM_TOP_WASH.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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


      {/* sixth card */}
      {data.CAR_RUBBING_POLISHING && data.CAR_RUBBING_POLISHING.price !== null ? (
        <Card ref={rubbingPolishingRef} className={addBlinkClass('Car Rubbing & Polishing')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Car%20Rubbing%20and%20Polishing/thumbnail.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}/>
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Car Rubbing & Polishing
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
                        &#8226; 	Every 6 Months recommended

                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Machine Rubbing with Compound' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Pressure Car wash' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Alloy Polishing' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <br />
                      {renderCheckboxListItem({ servicename: 'Wax Polishing' }, 5)}
                      {renderCheckboxListItem({ servicename: 'Tyre Dressing' }, 6)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.CAR_RUBBING_POLISHING.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_RUBBING_POLISHING.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}> 
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.CAR_RUBBING_POLISHING])}
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
      {data.RAT_PEST_REPELLENT_TREATMENT && data.RAT_PEST_REPELLENT_TREATMENT.price !== null ? (
        <Card ref={ratPestRepellentRef} className={addBlinkClass('Rat & Pest Repellent Treatment')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Rat%20Repellent%20Treatment/thumbnail.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Rat & Pest Repellent Treatment
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 3 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;	1 Month Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Rat Repellent Treatment' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Sprayed on Underbody and Engine Bay' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Protects Car Wiring from Pests' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;	No Toxic Pesticides Used
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Prevents Pest Breeding inside Car' }, 4)}
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
                      ₹ {data.RAT_PEST_REPELLENT_TREATMENT.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RAT_PEST_REPELLENT_TREATMENT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.RAT_PEST_REPELLENT_TREATMENT])}
                    >
                      Add to Cart
                    </Button>
                 
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}

      <h1 style={{ marginLeft: '80px' }}>Inspection</h1>
      {/* eighth card */}
      {data.CAR_INSPECTION_DIAGNOSTICS && data.CAR_INSPECTION_DIAGNOSTICS.price !== null ? (
        <Card ref={carInspectionRef} className={addBlinkClass('Car Inspection & Diagnostics')}  style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://res.cloudinary.com/yourmechanic/image/upload/dpr_auto,f_auto,q_auto/v1/article_images/RS_Pre_Purchase_Inspection" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}/>
              </Grid>
              {/* Second Container */}

              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Car Inspection & Diagnostics
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
                        &#8226;	25 Points Checklist
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Underbody Inspection' }, 1)}
                      {renderCheckboxListItem({ servicename: '25 Points Checklist' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;	Every 1 Month (Recommended)
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Upfront Estimate' }, 3)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.CAR_INSPECTION_DIAGNOSTICS.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_INSPECTION_DIAGNOSTICS.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.CAR_INSPECTION_DIAGNOSTICS])}
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
      <h1 style={{ marginLeft: '80px' }}>Sunroof</h1>
      {data.SUNROOF_SERVICE && data.SUNROOF_SERVICE.price !== null ? (
        <Card ref={sunroofServiceRef} className={addBlinkClass('Sunroof Service')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/services_icon/Sunroof-Service.jpg" 
                  />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Sunroof Service
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
                        &#8226;	1000 Kms or 1 Month Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Roof Opening + Refitting' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Sunroof Lubrication' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;	Every 15000 Kms or 12 Months
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Drainage Tube Clog/Debris Removal' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Sunroof Cleaning' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.SUNROOF_SERVICE.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.SUNROOF_SERVICE.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                      onClick={() => addToCart([data.SUNROOF_SERVICE])}
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
        <h1 style={{ textAlign: 'center' }}>Customer Quotes</h1>
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
      <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '20px', }}><b>Why Choose GoCarsmith In  {locationName}</b></Typography>
      <Paper sx={{ padding: '24px', background: "#f5f4f2" }}>
        <Typography variant="body1" sx={{ marginBottom: '16px', }}>
          <b>Car care services in {locationName} </b>
        </Typography>
        <div>
          <ul>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Car Cleaning Service is the best way to remove all the dust, dirt, mud and other unsightly build-ups from your car.</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Interior car care is a crucial service that de-contaminates and sanitizes the interior, upholstery, seats, carpet etc.</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Washing and waxing will help protect the delicate paintwork on your car. Regular car care will go a long way in keeping your car as new as day one.</span>
            </li>
          </ul>
        </div>
        <div className="_1hV59">
          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b> {BrandName} {modelName} {fuelType} care services offered </b></Typography>
          <div>Choose from a category of finest car services, available at your nearest GoCarsmith workshop in {locationName}.</div>
          <div className="_1VMvZ">
            <ul>
              <li>
                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}>Interior and exterior cleaning services</span>
              </li>
              <li>
                <span sx={{ fontWeight: 'normal', marginTop: '10px' }}>Ceramic and Teflon coating</span>
              </li>
              <li>
                <span sx={{ fontWeight: 'normal', marginTop: '50px' }}>Rubbing and polishing services</span>
              </li>
              <li>
                <span sx={{ fontWeight: 'normal', marginTop: '50px' }}>Anti-rust underbody treatment</span>
              </li>
            </ul>
          </div>
          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '50px' }}><b>Premium car care products</b></Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
            Every GoCarsmith workshop across {locationName} uses the highest quality, specially formulated, PH neutral car care products from global brands like 3M, Wuerth and Extra Armor to give your {BrandName} {modelName}  the best possible shine.
          </Typography>

          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b> Specialised car care equipment </b></Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
            Professional {BrandName} {modelName}  cleaning and detailing require speciality tools and machines. That is why every GoCarsmith workshop in {locationName} is equipped with Industry grade buffing and polishing machines, automatic pressure washers and other car care tools along with special car care products are put to use to get the best results.
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
  </>
  );
};

export default CarSpaCleaning;