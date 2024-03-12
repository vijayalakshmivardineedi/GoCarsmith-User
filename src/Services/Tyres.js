import Spinner from 'react-bootstrap/Spinner';




import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    title: 'Which engine oil do you use in a scheduled car service?',
    content: `We only use the best engine oil approved by for your ${modelName} . We use Mobil 5W-30 Engine oil that enhances engine performance and efficiency, providing superior protection against wear and tear giving your car engine a longer life.`,
  },
  {
    title: `Are there any extra/added charges apart from the described rates for my ${modelName} service?`,
    content: `Absolutely not. When you book a car service for your ${modelName} , you only pay for the service you opted. No last minute surprises, no hidden costs.`,
  },
  {
    title: `How much time does it take for my ${modelName} car service?`,
    content: `The service time for your ${modelName} depends on the service package you choose. A standard service takes 4-5 hours whereas, a comprehensive service takes at least 5-6 hours through most of our workshops across ${locationName}.`,
  },
  {
    title: `What if I face any issue after the service of my ${modelName}?`,
    content: `At GoCarsmith, we are all for a fulfilled customer experience. When you book with us, you get 1 month/1000 kms unconditional warranty on your ${modelName} car service. On top of that, our 24x7 proactive customer support will tend to your issue with the highest priority.`,
  },
  {
    title: 'When should I go for a standard service or a comprehensive service?',
    content: `A standard car service package for your ${modelName} includes all the basic services and inspections and is required after every 10,000 kms. Whereas, a comprehensive service for your ${modelName} is a more elaborate package with complete top-to-bottom car servicing, replacements and maintenance and is mandated after every 40,000 kms from the odometer reading.`,
  },
  {
    title: `What quality of spare parts will you use in my ${BrandName} ${modelName} car service?`,
    content: `We use only genuine ${BrandName} spare parts sourced directly from our authorised distributor for your ${BrandName} ${modelName} car service.`,
  },
  {
    title: `How often should I get the engine oil replaced for my ${BrandName} ${modelName}?`,
    content: `${BrandName} recommends changing the engine oil every 10,000 to 12,000 kms for your ${BrandName} ${modelName} , provided you are using synthetic engine oil only.`,
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
    name: "Srinivas Raja",
    location: "Vizag",
    content: `I had my ${BrandName} ${modelName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
  },
  {
    name: "Abhijeet Bhuyan",
    location: "Kolkata",
    content: 'Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone.',
  },
  {
    name: "Sachin Joshi",
    location: "Bombay",
    content: 'Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality.',
  },
  {
    name: "Sukhvinder Singh",
    location: "Delhi",
    content:
      `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`
  },
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content:
      "I was preparing my car for a long road trip and the car required a new battery. I needed the battery the next day as I didn't want to risk breaking down in the middle of the road. Called GoCarsmith and ordered the specific battery and got it delivered the next morning. Superb service, I must say!"
  },

];
const Tyres = () => {
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
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-tyre-replacement/Connected-Tyres%2C-yes-you-read-it-right.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-tyre-replacement/Nitrogen-Vs-Air--Which-Is-Better-For-Your-Car-Tyres.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-tyre-replacement/Tyre-Rotation--What-You-Need-To-Know.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-tyre-replacement/Michelin%E2%80%99s-Puncture-Proof-Tyres.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-tyre-replacement/Tips-to-Make-Your-Car_s-Tyre-last-long.jpg',
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
        const field = 'TyresAndWheelsCare';

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
          setData(response.data.TyresAndWheelsCare);
          setIsLoading(false)
        } 

        // Log the response.data to the console
        console.log('Response Data:', response.data.TyresAndWheelsCare);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, []);
  const [priceLists, setPriceLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const LabelName = "TYRES AND WHEEL";
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
  const apolloAlnac4GSRef = useRef(null);
  const apolloAmazer4GLifeRef = useRef(null);
  const mrfZLXRef = useRef(null);
  const mrfZVTYRef = useRef(null);
  const mrfRef = useRef(null);
  const jkUXRoyaleRef = useRef(null);
  const bridgestoneB290Ref = useRef(null);
  const bridgestoneEcopiaRef = useRef(null);
  const ceatMilazeSizeRef = useRef(null);
  const ceatMilazeX3Ref = useRef(null);
  const ceatMilazeRef = useRef(null);
  const completeWheelCareRef = useRef(null);
  const mudFlapsRef = useRef(null);
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
          case 'apollo alnac 4gs':
            scrollToBlinkingSpot(apolloAlnac4GSRef);
            break;
          case 'apollo amazer 4g life':
            scrollToBlinkingSpot(apolloAmazer4GLifeRef);
            break;
          case 'mrf zlx':
            scrollToBlinkingSpot(mrfZLXRef);
            break;
          case 'mrf zvty':
            scrollToBlinkingSpot(mrfZVTYRef);
            break;
          case 'mrf':
            scrollToBlinkingSpot(mrfRef);
            break;
          case 'jk ux royale':
            scrollToBlinkingSpot(jkUXRoyaleRef);
            break;
          case 'bridgestone b290':
            scrollToBlinkingSpot(bridgestoneB290Ref);
            break;
          case 'bridgestone ecopia':
            scrollToBlinkingSpot(bridgestoneEcopiaRef);
            break;
          case 'ceat milaze size':
            scrollToBlinkingSpot(ceatMilazeSizeRef);
            break;
          case 'ceat milaze x3':
            scrollToBlinkingSpot(ceatMilazeX3Ref);
            break;
          case 'ceat milaze':
            scrollToBlinkingSpot(ceatMilazeRef);
            break;
          case 'complete wheel care':
            scrollToBlinkingSpot(completeWheelCareRef);
            break;
          case 'mud flaps':
            scrollToBlinkingSpot(mudFlapsRef);
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
          case 'apollo alnac 4gs':
            scrollToBlinkingSpot(apolloAlnac4GSRef);
            break;
          case 'apollo amazer 4g life':
            scrollToBlinkingSpot(apolloAmazer4GLifeRef);
            break;
          case 'mrf zlx':
            scrollToBlinkingSpot(mrfZLXRef);
            break;
          case 'mrf zvty':
            scrollToBlinkingSpot(mrfZVTYRef);
            break;
          case 'mrf':
            scrollToBlinkingSpot(mrfRef);
            break;
          case 'jk ux royale':
            scrollToBlinkingSpot(jkUXRoyaleRef);
            break;
          case 'bridgestone b290':
            scrollToBlinkingSpot(bridgestoneB290Ref);
            break;
          case 'bridgestone ecopia':
            scrollToBlinkingSpot(bridgestoneEcopiaRef);
            break;
          case 'ceat milaze size':
            scrollToBlinkingSpot(ceatMilazeSizeRef);
            break;
          case 'ceat milaze x3':
            scrollToBlinkingSpot(ceatMilazeX3Ref);
            break;
          case 'ceat milaze':
            scrollToBlinkingSpot(ceatMilazeRef);
            break;
          case 'complete wheel care':
            scrollToBlinkingSpot(completeWheelCareRef);
            break;
          case 'mud flaps':
            scrollToBlinkingSpot(mudFlapsRef);
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

      {!(data.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H && data.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H.price !== null) &&
        !(data.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T && data.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T.price !== null) &&
        !(data.MRF_SIZE_165_80_R14_85TL && data.MRF_SIZE_165_80_R14_85TL.price !== null) &&
        !(data.MRF_ZLX_SIZE_165_80_R14_TL && data.MRF_ZLX_SIZE_165_80_R14_TL.price !== null) &&
        !(data.MRF_ZVTS_Size_155_80_R13_79TL && data.MRF_ZVTS_Size_155_80_R13_79TL.price !== null) &&
        !(data.MRF_ZVTY_SIZE_185_65_R15_88TL && data.MRF_ZVTY_SIZE_185_65_R15_88TL.price !== null) &&
        !(data.JK_UX_ROYALE_SIZE_165_80_R14 && data.JK_UX_ROYALE_SIZE_165_80_R14.price !== null) &&
        !(data.BRIDGESTONE_B290_SIZE_165_80_R14_81S && data.BRIDGESTONE_B290_SIZE_165_80_R14_81S.price !== null) &&
        !(data.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V && data.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V.price !== null) &&
        !(data.BRIDGESTONE_B290_Size_155_80_R13_79S && data.BRIDGESTONE_B290_Size_155_80_R13_79S.price !== null) &&
        !(data.CEAT_MILAZE_SIZE_165_80_R14_85S && data.CEAT_MILAZE_SIZE_165_80_R14_85S.price !== null) &&
        !(data.CEAT_MILAZE_X3__SIZE_165_65_R15 && data.CEAT_MILAZE_X3__SIZE_165_65_R15.price !== null) &&
        !(data.CEAT_MILAZE_Size_155_80_R13 && data.CEAT_MILAZE_Size_155_80_R13.price !== null) &&
        !(data.COMPLETE_WHEEL_CARE && data.COMPLETE_WHEEL_CARE.price !== null) &&
        !(data.MUD_FLAPS && data.MUD_FLAPS.price !== null) && (

          isLoading?  <Spinner animation="border" role="status" 
  style={{position: "fixed",left: "50%",
    
  }} >

  <span className="visually-hidden" >Loading...</span>

</Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
  {/* Oops! No Data Found For This Model or Location. */}
</Typography>
        )}

      {/* first card */}
      {data.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H && data.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H.price !== null ? (
        <Card ref={apolloAlnac4GSRef} className={addBlinkClass('Apollo Alnac 4GS')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/tyres_new/Apollo/Apollo%20Amazer%204G%20Life.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Apollo Alnac 4GS
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-185/65 R15 88H
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 5 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.APOLLO_ALNAC_4GS_SIZE_185_65_R15_88H])}
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
      {data.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T && data.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T.price !== null ? (
        <Card ref={apolloAmazer4GLifeRef} className={addBlinkClass('Apollo Amazer 4G Life')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/tyres_new/Apollo/Apollo%20Amazer%204G%20Life.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Apollo Amazer 4G Life
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-185/65 R15 88T
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 5 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.APOLLO_AMAZER_4G_LIFE_SIZE_185_65_R15_88T])}
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
      {data.MRF_SIZE_165_80_R14_85TL && data.MRF_SIZE_165_80_R14_85TL.price !== null ? (
        <Card ref={mrfZLXRef} className={addBlinkClass('MRF ZLX')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://m.media-amazon.com/images/I/516XMsYkqXL.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    MRF ZLX
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-165/80 R14 85TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.MRF_SIZE_165_80_R14_85TL.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.MRF_SIZE_165_80_R14_85TL.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.MRF_SIZE_165_80_R14_85TL])}
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
      {data.MRF_ZLX_SIZE_165_80_R14_TL && data.MRF_ZLX_SIZE_165_80_R14_TL.price !== null ? (
        <Card ref={mrfZVTYRef} className={addBlinkClass('MRF ZVTY')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  height="320"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn8jwpUOX3wGFL1EwrudM9VJXnnDKlGGk2A3QBH9ZqklZmr6BwhTtZLVkqMaNIN9qqPx8&usqp=CAU"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    MRF ZVTY
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-165/80 R14 TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.MRF_ZLX_SIZE_165_80_R14_TL.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.MRF_ZLX_SIZE_165_80_R14_TL.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.MRF_ZLX_SIZE_165_80_R14_TL])}
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
      {data.MRF_ZVTS_Size_155_80_R13_79TL && data.MRF_ZVTS_Size_155_80_R13_79TL.price !== null ? (
        <Card ref={mrfRef} className={addBlinkClass('MRF')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://5.imimg.com/data5/FQ/GA/XV/SELLER-9240473/mrf-lt-155-d12-savari-lug-tyre-250x250.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    MRF
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-155/80 R13 79H
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.MRF_ZVTS_Size_155_80_R13_79TL.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.MRF_ZVTS_Size_155_80_R13_79TL.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.MRF_ZVTS_Size_155_80_R13_79TL])}
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
      {data.MRF_ZVTY_SIZE_185_65_R15_88TL && data.MRF_ZVTY_SIZE_185_65_R15_88TL.price !== null ? (
        <Card ref={mrfRef} className={addBlinkClass('MRF')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://5.imimg.com/data5/HO/OF/ZK/SELLER-20487139/mrf-commercial-tubeless-tyre-500x500.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    MRF ZVTY
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
                        &#8226; SIZE-185/65 R15 88Y
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Free Installation' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Rating 4.8 Expert Rating ' }, 3)}
                      {renderCheckboxListItem({ servicename: '	Alignment & Balancing Charges Extra ' }, 4)}
                      {/* {renderCheckboxListItem({ servicename: 'Car Wash' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tubeless ' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Fitting Cost Included' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 8)}
                      {renderCheckboxListItem({ servicename: 'Tyres Replacement at service Center' }, 9)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.MRF_ZVTY_SIZE_185_65_R15_88TL.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.MRF_ZVTY_SIZE_185_65_R15_88TL.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.MRF_ZVTY_SIZE_185_65_R15_88TL])}
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
      {data.JK_UX_ROYALE_SIZE_165_80_R14 && data.JK_UX_ROYALE_SIZE_165_80_R14.price !== null ? (
        <Card ref={jkUXRoyaleRef} className={addBlinkClass('JK UX ROYALE')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://cdn.moglix.com/p/EY8KkvZV1DLTE-medium.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    JK UX ROYALE
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-165/80 R14 TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.JK_UX_ROYALE_SIZE_165_80_R14.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.JK_UX_ROYALE_SIZE_165_80_R14.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.JK_UX_ROYALE_SIZE_165_80_R14])}
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
      {data.BRIDGESTONE_B290_SIZE_165_80_R14_81S && data.BRIDGESTONE_B290_SIZE_165_80_R14_81S.price !== null ? (
        <Card ref={bridgestoneB290Ref} className={addBlinkClass('BRIDGESTONE B290')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fliFwN5-gUoGU0AbibG9_eB8JxtFM-VxkWbqLCCXynPJZnGnlvTjd-muX5c2aMnm4rI&usqp=CAU"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    BRIDGESTONE B290
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-165/80 R14 TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.BRIDGESTONE_B290_SIZE_165_80_R14_81S.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BRIDGESTONE_B290_SIZE_165_80_R14_81S.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.BRIDGESTONE_B290_SIZE_165_80_R14_81S])}
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
      {data.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V && data.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V.price !== null ? (
        <Card ref={bridgestoneEcopiaRef} className={addBlinkClass('BRIDGESTONE ECOPIA')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://trimg.cardekho.com/model/200x200/Ecopia-EP150-Bridgestone.jpg"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    BRIDGESTONE ECOPIA
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-165/80 R14 TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    onClick={() => addToCart([data.BRIDGESTONE_ECOPIA_EP150_SIZE_165_65_R14_88V])}
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
      {data.BRIDGESTONE_B290_Size_155_80_R13_79S && data.BRIDGESTONE_B290_Size_155_80_R13_79S.price !== null ? (
        <Card ref={bridgestoneB290Ref} className={addBlinkClass('BRIDGESTONE B290')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  height="330"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEaAcljUJYAxHdIz-nnIN96PBhsBRfWr93g9SvBfHJAoVjS50HkXQwA9Pt4Jdg9qbSn1U&usqp=CAU"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    BRIDGESTONE B290
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-155/80 R13 79s TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.BRIDGESTONE_B290_Size_155_80_R13_79S.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.BRIDGESTONE_B290_Size_155_80_R13_79S.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.BRIDGESTONE_B290_Size_155_80_R13_79S])}
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
      {data.CEAT_MILAZE_SIZE_165_80_R14_85S && data.CEAT_MILAZE_SIZE_165_80_R14_85S.price !== null ? (
        <Card ref={ceatMilazeSizeRef} className={addBlinkClass('CEAT MILAZE SIZE')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS085u8SzdX6w1J0KqiQ03IKsChEgI1ZAhK4B3EDwjDftCz_GKgENwSItskj3KzcH1pC9U&usqp=CAU"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    CEAT MILAZE SIZE
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-165/80 R14 TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.CEAT_MILAZE_SIZE_165_80_R14_85S.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CEAT_MILAZE_SIZE_165_80_R14_85S.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.CEAT_MILAZE_SIZE_165_80_R14_85S])}
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
      {data.CEAT_MILAZE_X3__SIZE_165_65_R15 && data.CEAT_MILAZE_X3__SIZE_165_65_R15.price !== null ? (
        <Card ref={ceatMilazeX3Ref} className={addBlinkClass('CEAT MILAZE X3')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS085u8SzdX6w1J0KqiQ03IKsChEgI1ZAhK4B3EDwjDftCz_GKgENwSItskj3KzcH1pC9U&usqp=CAU"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    CEAT MILAZE X3
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-165/80 R14 TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.CEAT_MILAZE_X3__SIZE_165_65_R15.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CEAT_MILAZE_X3__SIZE_165_65_R15.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.CEAT_MILAZE_X3__SIZE_165_65_R15])}
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
      {data.CEAT_MILAZE_Size_155_80_R13 && data.CEAT_MILAZE_Size_155_80_R13.price !== null ? (
        <Card ref={ceatMilazeRef} className={addBlinkClass('CEAT MILAZE')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS085u8SzdX6w1J0KqiQ03IKsChEgI1ZAhK4B3EDwjDftCz_GKgENwSItskj3KzcH1pC9U&usqp=CAU"
                   style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    CEAT MILAZE
                  </Typography>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; SIZE-155/80 R13 TL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 6 years warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Tubeless
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Fitting Cost Included
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Tyre Replacement at Service Center' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.CEAT_MILAZE_Size_155_80_R13.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CEAT_MILAZE_Size_155_80_R13.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.CEAT_MILAZE_Size_155_80_R13])}
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
      {data.COMPLETE_WHEEL_CARE && data.COMPLETE_WHEEL_CARE.price !== null ? (
        <Card ref={completeWheelCareRef} className={addBlinkClass('COMPLETE WHEEL CARE')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Wheel%20alignment%201%20sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    COMPLETE WHEEL CARE
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
                        &#8226;	SIZE-225/50 R17 94V
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Rating 4.7 Expert Rating' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Automated Wheel Balancing' }, 2)}
                      {renderCheckboxListItem({ servicename: '	Alloy Weight Additional ' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Steering Adjustment and Correction ' }, 4)}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Every 6 Months Or 5,000 kms (Recommended)
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Weight Correction' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Laser Assisted Wheel Alignment' }, 7)}
                      {renderCheckboxListItem({ servicename: 'Camber and Castor Adjustment' }, 8)}
                      {renderCheckboxListItem({ servicename: 'All Four Type Rotation as per Tread Wear' }, 9)}
                      {/* {renderCheckboxListItem({ servicename: ' Coolant Top Up (200 ml )' }, 10)} */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.COMPLETE_WHEEL_CARE.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.COMPLETE_WHEEL_CARE.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.COMPLETE_WHEEL_CARE])}
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
      {data.MUD_FLAPS && data.MUD_FLAPS.price !== null ? (
        <Card ref={mudFlapsRef} className={addBlinkClass('MUD FLAPS')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/Mud%20Flaps.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    MUD FLAPS
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Takes 2 hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;		1 Month warranty on Fitting
                      </Typography>
                      {renderCheckboxListItem({ servicename: '	Mud Flaps Set of 4' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Protects Car Underbody' }, 2)}
                      {/* {renderCheckboxListItem({ servicename: 'Tyres Inspection for Tread ' }, 3)}
          {renderCheckboxListItem({ servicename: 'Alignment & Balancing Charges Extra  ' }, 4)} */}
                      {/* {renderCheckboxListItem({ servicename: 'Fuel Filter Checking' }, 5)} */}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 	Excellent Durability
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Prevents Soil Accumulation' }, 6)}
                      {renderCheckboxListItem({ servicename: '	Easy Fitment' }, 7)}
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
                      ₹ {data.MUD_FLAPS.price + 500}/-
                    </span>
                    &nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.MUD_FLAPS.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  
                    <Button variant="outlined" color="error"
                      onClick={() => addToCart([data.MUD_FLAPS])}
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

      <div>
        <h1 style={{ textAlign: 'center', paddingBottom:"15px"  }}>Customer Quotes</h1>
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
                  <Typography variant="body2" sx={{ paddingTop: 1 ,fontSize:"16px",  textAlign:"justify" }}>{slide.content}</Typography>
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

      <Paper sx={{ padding: '24px', background: "#f5f4f2" }}>
        <Typography variant="h6" sx={{ marginBottom: '16px', }}>
          <b>Scheduled car service in {locationName}</b>
        </Typography>
        <div>
          <ul>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Tyres Replacement servicing is essential for a smooth and trouble-free car ownership experience.</span>
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
            At every GoCarsmith workshop in {locationName}, we employ only the cutting edge in industry-standard car service equipment. From automatic AC gas recharging apparatus, laser automated wheel balancing/alignment machine, OBD2 diagnostic scanner, ECU programming devices, and specialized tools specific to your car.
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
  </>
  );
};
export default Tyres;