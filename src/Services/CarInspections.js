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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLocation } from 'react-router-dom';


// const locationName = localStorage.getItem('locationName');
// const location = localStorage.getItem('location');
// const modelId = localStorage.getItem('modelId');
// const fuelType = localStorage.getItem('fuelType');
// const BrandId = localStorage.getItem('BrandId')
// const BrandName = localStorage.getItem('BrandName')
// const modelName = localStorage.getItem('modelName')


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
    content: `We only use the best engine oil approved by for your ${modelName}. We use Mobil 5W-30 Engine oil that enhances engine performance and efficiency, providing superior protection against wear and tear giving your car engine a longer life.`,
  },
  {
    title: `Are there any extra/added charges apart from the described rates for my ${modelName} service?`,
    content: `Absolutely not. When you book a car service for your ${modelName}, you only pay for the service you opted. No last minute surprises, no hidden costs.`,
  },
  {
    title: `How much time does it take for my ${modelName} car service?`,
    content: `At GoCarsmith, we are all for a fulfilled customer experience. When you book with us, you get 1 month/1000 kms unconditional warranty on your ${modelName} car service. On top of that, our 24x7 proactive customer support will tend to your issue with the highest priority.`,
  },
  {
    title: 'When should I go for a standard service or a comprehensive service?',
    content: `A standard car service package for your ${modelName} includes all the basic services and inspections and is required after every 10,000 kms. Whereas, a comprehensive service for your ${modelName} is a more elaborate package with complete top-to-bottom car servicing, replacements and maintenance and is mandated after every 40,000 kms from the odometer reading.`,
  },
  {
    title: `Is there a warranty on my ${BrandName} ${modelName} car inspections service?`,
    content: `Yes, all the car inspections services done at GoCarsmith ${locationName} come with a warranty. However, the warranty may vary according to the service you avail. You can claim this warranty at any workshop across ${locationName}.`,
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
    name: "Vidya Hegde",
    location: "Bangalore",
    content: `I had my Car inspections Services ${modelName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
  },
  {
    name: "Abhijeet Bhuyan",
    location: "Kolkata",
    content: `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`
  },
  {
    name: "Sachin Joshi",
    location: "Bombay",
    content: 'I thought of getting my Car inspections Services serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.',
  },
  {
    name: "Srinivas Raja",
    location: "Vizag",
    content: `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
  },
  {
    name: "Manish Kashyap",
    location: "Patna",
    content:
      'Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone'
  },
  {
    name: "Ankit Saxena",
    location: "Lucknow",
    content: 'Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality.'
  },
];
const CarInspections = () => {
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
    'https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Decoding%20Vehicle%20Identification%20Number.png',
    'https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Key%20Details%20Mentioned%20on%20Car.png',
    'https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/Car%20Windshields%20to%20have%20ISI%20Mark.png',
    'https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Custom%20Service/new-service/When%20NOT%20to%20Claim%20Car%20Insurance.png',
    'https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/custom-repair/10-Things-To-Know-About-AMT-Cars.jpg',

  ];

  const imageStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '15px',
  };

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
        const field = 'CarInspections';

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
          setData(response.data.CarInspections);
          setIsLoading(false)
        } 

        // Log the response.data to the console
        console.log('Response Data:', response.data.CarInspections);
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

      const LabelName = "CAR INSPECTIONS";
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
  const secondHandCarInspectionRef = useRef(null);
  const roadTripInspectionRef = useRef(null);
  const engineScanningRef = useRef(null);
  const insuranceClaimInspectionRef = useRef(null);
  const completeSuspensionInspectionRef = useRef(null);
  const carFluidsCheckRef = useRef(null);
  const radiatorFlushAndCleanRef = useRef(null);
  const radiatorReplacementInspectionRef = useRef(null);
  const radiatorFanMotorReplacementInspectionRef = useRef(null);
  const carWaterlogAssistanceRef = useRef(null);
  const carEngineIssuesRef = useRef(null);
  const problemWithCarBrakesWheelsRef = useRef(null);
  const damagedCarBodyInteriorsRef = useRef(null);
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
          case 'second hand car inspection':
            scrollToBlinkingSpot(secondHandCarInspectionRef);
            break;
          case 'road trip inspection':
            scrollToBlinkingSpot(roadTripInspectionRef);
            break;
          case 'engine scanning':
            scrollToBlinkingSpot(engineScanningRef);
            break;
          case 'insurance claim inspection':
            scrollToBlinkingSpot(insuranceClaimInspectionRef);
            break;
          case 'complete suspension inspection':
            scrollToBlinkingSpot(completeSuspensionInspectionRef);
            break;
          case 'car fluids check':
            scrollToBlinkingSpot(carFluidsCheckRef);
            break;
          case 'radiator flush and clean':
            scrollToBlinkingSpot(radiatorFlushAndCleanRef);
            break;
          case 'radiator replacement inspection':
            scrollToBlinkingSpot(radiatorReplacementInspectionRef);
            break;
          case 'radiator fan motor replacement inspection':
            scrollToBlinkingSpot(radiatorFanMotorReplacementInspectionRef);
            break;
          case 'car waterlog & assistance':
            scrollToBlinkingSpot(carWaterlogAssistanceRef);
            break;
          case 'car engine issues':
            scrollToBlinkingSpot(carEngineIssuesRef);
            break;
          case 'problem with car brakes & wheels':
            scrollToBlinkingSpot(problemWithCarBrakesWheelsRef);
            break;
          case 'damaged car body interiors':
            scrollToBlinkingSpot(damagedCarBodyInteriorsRef);
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
          case 'second hand car inspection':
            scrollToBlinkingSpot(secondHandCarInspectionRef);
            break;
          case 'road trip inspection':
            scrollToBlinkingSpot(roadTripInspectionRef);
            break;
          case 'engine scanning':
            scrollToBlinkingSpot(engineScanningRef);
            break;
          case 'insurance claim inspection':
            scrollToBlinkingSpot(insuranceClaimInspectionRef);
            break;
          case 'complete suspension inspection':
            scrollToBlinkingSpot(completeSuspensionInspectionRef);
            break;
          case 'car fluids check':
            scrollToBlinkingSpot(carFluidsCheckRef);
            break;
          case 'radiator flush and clean':
            scrollToBlinkingSpot(radiatorFlushAndCleanRef);
            break;
          case 'radiator replacement inspection':
            scrollToBlinkingSpot(radiatorReplacementInspectionRef);
            break;
          case 'radiator fan motor replacement inspection':
            scrollToBlinkingSpot(radiatorFanMotorReplacementInspectionRef);
            break;
          case 'car waterlog & assistance':
            scrollToBlinkingSpot(carWaterlogAssistanceRef);
            break;
          case 'car engine issues':
            scrollToBlinkingSpot(carEngineIssuesRef);
            break;
          case 'problem with car brakes & wheels':
            scrollToBlinkingSpot(problemWithCarBrakesWheelsRef);
            break;
          case 'damaged car body interiors':
            scrollToBlinkingSpot(damagedCarBodyInteriorsRef);
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


      {!(data.SECOND_HAND_CAR_INSPECTION && data.SECOND_HAND_CAR_INSPECTION.price !== null) &&
        !(data.ROAD_TRIP_INSPECTION && data.ROAD_TRIP_INSPECTION.price !== null) &&
        !(data.ENGINE_SCANNING && data.ENGINE_SCANNING.price !== null) &&
        !(data.Insurance_Claim_Inspection && data.Insurance_Claim_Inspection.price !== null) &&
        !(data.COMPLETE_SUSPENSION_INSPECTION && data.COMPLETE_SUSPENSION_INSPECTION.price !== null) &&
        !(data.CAR_FLUIDS_CHECK && data.CAR_FLUIDS_CHECK.price !== null) &&
        !(data.RADIATOR_FLUSH_CLEAN && data.RADIATOR_FLUSH_CLEAN.price !== null) &&
        !(data.RADIATOR_REPLACEMENT && data.RADIATOR_REPLACEMENT.price !== null) &&
        !(data.RADIATOR_FAN_MOTOR_REPLACEMENT && data.RADIATOR_FAN_MOTOR_REPLACEMENT.price !== null) &&
        !(data.CAR_WATERLOG_ASSISTANCE && data.CAR_WATERLOG_ASSISTANCE.price !== null) &&
        !(data.CAR_ENGINE_ISSUES && data.CAR_ENGINE_ISSUES.price !== null) &&
        !(data.RADIATOR_FAN_MOTOR_REPLACEMENT && data.RADIATOR_FAN_MOTOR_REPLACEMENT.price !== null) &&
        !(data.DAMAGED_CAR_BODY_INTERIORS && data.DAMAGED_CAR_BODY_INTERIORS.price !== null) && (
          
          isLoading?  <Spinner animation="border" role="status" 
          style={{position: "fixed",left: "50%",
            
          }} >
        
          <span className="visually-hidden" >Loading...</span>
        
        </Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
          {/* Oops! No Data Found For This Model or Location. */}
        </Typography>
        
        )}

      <h1 style={{ marginLeft: '80px' }}>Used Car</h1>
      {/* first card */}
      {data.SECOND_HAND_CAR_INSPECTION && data.SECOND_HAND_CAR_INSPECTION.price !== null ? (
        <Card ref={secondHandCarInspectionRef} className={addBlinkClass('Second Hand Car Inspection')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
              <b>GET 10% OFF PERIODIC SERVICE</b>
            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="300"
                  image="https://media.istockphoto.com/id/1258125364/photo/replacement-of-spark-plugs-in-a-modern-engine.jpg?s=612x612&w=0&k=20&c=3PxkCoppC8g7f1nWWn-GBiZjQocjz7sLuVj2Wpx8iJ8="
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                    Second Hand Car Inspection
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
                        &#8226; 	Available at Doorstep
                      </Typography>
                      {renderCheckboxListItem({ servicename: '50 Points Check-List ' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Full Car Scanning' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Physical Car Diagnosis' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;Scanner Report Provided
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Upfront Estimate' }, 4)}
                      {renderCheckboxListItem({ servicename: 'Get Car Valuation' }, 5)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.SECOND_HAND_CAR_INSPECTION.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.SECOND_HAND_CAR_INSPECTION.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.SECOND_HAND_CAR_INSPECTION])}
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
      <h1 style={{ marginLeft: '80px' }}>Inspections</h1>
      {data.ROAD_TRIP_INSPECTION && data.ROAD_TRIP_INSPECTION.price !== null ? (
        <Card ref={roadTripInspectionRef} className={addBlinkClass('Road Trip Inspection')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
        <Card
          style={{
            maxWidth: "1000px",
            height: "auto",
            margin: "auto",
            padding:"20px"
          }}
        >
            <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
              <b>NEW</b>
            </Typography>
            <Grid container spacing={2}>
              {/* First Container */}
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt="Car Image"
                  height="280"
                  image="https://media.istockphoto.com/id/1367189665/photo/an-asian-insurance-adjuster-inspecting-damage-to-vehicle.jpg?s=612x612&w=0&k=20&c=IynArO49gQhgblC7P40oKasON7g4WAhOGlGPE_svXR8="
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    <b>Road Trip Inspection</b>
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
                        &#8226;  Recommended for Long Road Trips
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Wheel Alignment & Balancing' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Full Car Scanning' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Detailed Health Card ' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <br />
                      {renderCheckboxListItem({ servicename: 'Fluid Leakage Inspection ' }, 5)}
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
                      ₹ {data.ROAD_TRIP_INSPECTION.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.ROAD_TRIP_INSPECTION.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.ROAD_TRIP_INSPECTION])}
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
      {data.ENGINE_SCANNING && data.ENGINE_SCANNING.price !== null ? (
        <Card ref={engineScanningRef} className={addBlinkClass('Engine Scanning')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Car%20service%20Photos/Engine%20Scanning/Thumbnail.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                    Engine Scanning
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
                        &#8226;	Scanner Report Provided
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Electrical Scanning' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Error Code Deletion' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        OEM Scanner Used
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Sensor Reset' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Inspection of Exhaust Smoke' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.ENGINE_SCANNING.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.ENGINE_SCANNING.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.ENGINE_SCANNING])}
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
      {data.Insurance_Claim_Inspection && data.Insurance_Claim_Inspection.price !== null ? (
        <Card ref={insuranceClaimInspectionRef} className={addBlinkClass('Insurance Claim Inspection')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Car%20Insurance_Square.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
                    Insurance Claim Inspection
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />Cashless Facilty
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;	Real time Claim Tracking Machanism
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Claim Intimation ' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Co-ordination with Insurance Company' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Policy Inspection' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Insurance Clain Advice' }, 4)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        Free Pick-up/Drop
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Survey Estimate Approval' }, 5)}
                      {renderCheckboxListItem({ servicename: '2 Years Warranty on Paint Jobs' }, 6)}
                      {renderCheckboxListItem({ servicename: 'Body Damage Inspection' }, 7)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.Insurance_Claim_Inspection.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.Insurance_Claim_Inspection.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.Insurance_Claim_Inspection])}
                  >
                    Add to Cart
                  </Button>
               
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/*Fifth card */}
      {data.COMPLETE_SUSPENSION_INSPECTION && data.COMPLETE_SUSPENSION_INSPECTION.price !== null ? (
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
                  height="280"
                  image="https://blog.way.com/wp-content/uploads/2022/11/car-suspension.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Complete Suspension Inspection
                  </Typography>
                  <Button style={{ color: 'gray' }}>
                    <ScheduleIcon />	Takes 4 Hours
                  </Button>
                </div>
                {/* Third Container */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 25 Points Check List
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Front Shocker Check' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Rear Shocker Check' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Shocker Mount Check' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; 	On suspension Noise ( Recommended )
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Link Rod Inspection' }, 4)}
                      {renderCheckboxListItem({ servicename: 'Jumping Rod Bush Check' }, 5)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.COMPLETE_SUSPENSION_INSPECTION.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.COMPLETE_SUSPENSION_INSPECTION.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.COMPLETE_SUSPENSION_INSPECTION])}
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
      {data.CAR_FLUIDS_CHECK && data.CAR_FLUIDS_CHECK.price !== null ? (
        <Card ref={carFluidsCheckRef} className={addBlinkClass('Car Fluids Check')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Car%20service%20Photos/Car%20fluid%20Check/Thumbnail.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
                />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Car Fluids Check
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
                        &#8226; 	Free Pickup Included

                      </Typography><br />
                      {renderCheckboxListItem({ servicename: 'Brake Fluid Check' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Coolant Check' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Engine Oil Check' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; On Leakage or Check Light ( Recommended )
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Power Steering Oil Check' }, 3)}
                      {renderCheckboxListItem({ servicename: 'Battery Water Inspection' }, 4)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.CAR_FLUIDS_CHECK.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_FLUIDS_CHECK.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.CAR_FLUIDS_CHECK])}
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
      <h1 style={{ marginLeft: '80px' }}>Radiator</h1>
      {data.RADIATOR_FLUSH_CLEAN && data.RADIATOR_FLUSH_CLEAN.price !== null ? (
        <Card ref={radiatorFlushAndCleanRef} className={addBlinkClass('Radiator Flush and Clean')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Radiator%20cleaning/Thumbnail.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Radiator Flush and Clean
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
                        &#8226; 	Protects Radiator from Corrosion
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Coolant Draining' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Radiator Flushing' }, 2)}
                      {renderCheckboxListItem({ servicename: 'Anti- Freeze Coolant Replacement' }, 3)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Free Pickup and Drop
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Radiator Cleaning' }, 5)}
                      {renderCheckboxListItem({ servicename: 'Coolant Leakage Inspection' }, 6)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.RADIATOR_FLUSH_CLEAN.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RADIATOR_FLUSH_CLEAN.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.RADIATOR_FLUSH_CLEAN])}
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
      {data.RADIATOR_REPLACEMENT && data.RADIATOR_REPLACEMENT.price !== null ? (
        <Card ref={radiatorReplacementInspectionRef} className={addBlinkClass('Radiator Replacement Inspection')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Radiator%20Replacement%20Replacement_/thumbnail.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}/>
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Radiator Replacement Inspection
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
                        &#8226; 	Recommended :  In case of Blockage in the Radiator Vessels
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Radiator Replacement (OES)' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Radiator Hoses, Thermostat Valves Cost Additional' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Free Pickup and Drop
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Spare part Cost Only' }, 3)}
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
                      ₹ {data.RADIATOR_REPLACEMENT.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RADIATOR_REPLACEMENT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
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

      {/* ninth card */}
      {data.RADIATOR_FAN_MOTOR_REPLACEMENT && data.RADIATOR_FAN_MOTOR_REPLACEMENT.price !== null ? (
        <Card ref={radiatorFanMotorReplacementInspectionRef} className={addBlinkClass('Radiator Fan Motor Replacement Inspection')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Radiator%20Fan%20Motor%20Replacement/Thumbnail.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}/>
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Radiator Fan Motor Replacement Inspection
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
                        &#8226; 	1 Month Warranty
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Radiator Fan Motor Replacement (OES)' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Coolant and Radiant Flush Cost Additional' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226; Recommended :  In Case of Radiator Fan not working
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Opening & Fitting of Radiator Fan Motor' }, 3)}
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
                      ₹ {data.RADIATOR_FAN_MOTOR_REPLACEMENT.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RADIATOR_FAN_MOTOR_REPLACEMENT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.RADIATOR_FAN_MOTOR_REPLACEMENT])}
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
      <h1 style={{ marginLeft: '80px' }}>Custom Issues</h1>
      {data.CAR_WATERLOG_ASSISTANCE && data.CAR_WATERLOG_ASSISTANCE.price !== null ? (
        <Card ref={carWaterlogAssistanceRef} className={addBlinkClass('Car Waterlog & Assistance')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/CUSTOM%20SERVICES/Car%20Water%20logging%20Assistance.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Car Waterlog & Assistance
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
                        &#8226;	Recommended : In Case of Car Flooding
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Physical Car Diagnosis' }, 1)}
                      {renderCheckboxListItem({ servicename: '50 Points Check-List' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;		Every 1 Years ( Recommended )
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Detailed Health Card' }, 4)}
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
                      ₹ {data.CAR_WATERLOG_ASSISTANCE.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_WATERLOG_ASSISTANCE.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.CAR_WATERLOG_ASSISTANCE])}
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
      {data.CAR_ENGINE_ISSUES && data.CAR_ENGINE_ISSUES.price !== null ? (
        <Card ref={carEngineIssuesRef} className={addBlinkClass('Car Engine Issues')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://rovntechs.com/wp-content/uploads/2021/11/Common-Engine-Problems-1024x684.jpg"
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Car Engine Issues
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
                        &#8226;	Recommended : In Case of Engine Vibrations
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Full Car Scanning' }, 1)}
                      {renderCheckboxListItem({ servicename: '25 Points Check-List' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <Typography variant="body2" gutterBottom>
                        &#8226;		Every 1 Years ( Recommended )
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Detailed Health Card' }, 4)}
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
                      ₹ {data.CAR_ENGINE_ISSUES.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CAR_ENGINE_ISSUES.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.CAR_ENGINE_ISSUES])}
                  >
                    Add to Cart
                  </Button>
               
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Card>
      ) : null}


      {/* twelth card */}
     
      {data.RADIATOR_FAN_MOTOR_REPLACEMENT && data.RADIATOR_FAN_MOTOR_REPLACEMENT.price !== null ? (
        <Card ref={problemWithCarBrakesWheelsRef} className={addBlinkClass('Problem with Car Brakes & Wheels')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://www.shutterstock.com/image-photo/car-mechanic-serviceman-disassembly-checking-600nw-2342615173.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}/>
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    Problem with Car Brakes & Wheels
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
                        &#8226;	Recommended : In Case of Vibrations while Braking
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Physical Car Diagnosis' }, 1)}
                      {renderCheckboxListItem({ servicename: '50 Points Check-List' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <br />
                      {renderCheckboxListItem({ servicename: 'Detailed Health Card' }, 4)}
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
                      ₹ {data.RADIATOR_FAN_MOTOR_REPLACEMENT.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.RADIATOR_FAN_MOTOR_REPLACEMENT.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.RADIATOR_FAN_MOTOR_REPLACEMENT])}
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
     
      {data.DAMAGED_CAR_BODY_INTERIORS && data.DAMAGED_CAR_BODY_INTERIORS.price !== null ? (
        <Card ref={damagedCarBodyInteriorsRef} className={addBlinkClass('DAMAGED CAR BODY INTERIORS')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                  image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/CUSTOM%20SERVICES/Damaged%20Car%20Body%20or%20Interiors.jpg" 
                  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}/>
              </Grid>
              {/* Second Container */}
              <Grid item sm={8}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                    DAMAGED CAR BODY INTERIORS
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
                        &#8226;	Recommended : In Case of Dirty Seat Covers
                      </Typography>
                      {renderCheckboxListItem({ servicename: 'Physical Car Diagnosis' }, 1)}
                      {renderCheckboxListItem({ servicename: 'Car Interior Inspection' }, 2)}
                    </CardContent>
                  </Grid>
                  {/* Fourth Container */}
                  <Grid item xs={12} sm={6}>
                    <CardContent>
                      <br />
                      {renderCheckboxListItem({ servicename: 'Free Pickup & Drop' }, 3)}
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              {/* Price and Add to Cart Container */}
              <Grid container>
                <Grid item xs={12} sm={10}>
                  <h6 className="text-success">
                    <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                      ₹ {data.DAMAGED_CAR_BODY_INTERIORS.price + 500}/-
                    </span>
                    &nbsp;&nbsp;
                    <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.DAMAGED_CAR_BODY_INTERIORS.price}/-</b>
                  </h6>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="outlined" color="error"
                    style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                    onClick={() => addToCart([data.DAMAGED_CAR_BODY_INTERIORS])}
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
                  <Typography variant="body2" sx={{ paddingTop: 1 ,fontSize:"16px",  textAlign:"justify" }}>
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
      <Paper sx={{ padding: '24px', background: "#f5f4f2", }}>
        <Typography variant="body1" sx={{ marginBottom: '16px', }}>
          <b>Custom Car Services in {locationName}</b>
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '16px', }}>Squealing brakes? Electrical issues? Noisy suspension? Just tell us your requirements and get a call back within 2 hrs with a personalised quotation exclusively for your car at the best GoCarsmith Workshops in {locationName}</Typography>
        <Typography variant="h5" sx={{ marginBottom: '16px', }}><b>Custom Car Services offered</b></Typography>
        <Typography variant="body1" sx={{ marginBottom: '16px', }}>We offer a host of services for individual requirements at every GoCarsmith workshop in {locationName}. Our services range from:</Typography>
        <div>
          <ul>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Clutch plate replacement service</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Engine Overhauling</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Suspension repairs</span>
            </li>
            <li>
              <span sx={{ fontWeight: 'normal' }}>Transmission/Gearbox repairs</span>
            </li>
          </ul>
        </div>
        <div className="_1hV59">
          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b> Industry-rated top notch equipment </b></Typography>
          <div>At every GoCarsmith workshop in {locationName}, we employ only the cutting edge in industry standard car service equipment. From automatic AC gas recharging apparatus, laser automated wheel balancing/alignment machine, OBD2 diagnostic scanner, ECU programming devices and specialised tools specific to your car.</div>
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
            At every GoCarsmith workshop in {locationName}, we employ only the cutting edge in industry standard car service equipment. From automatic AC gas recharging apparatus, laser automated wheel balancing/alignment machine, OBD2 diagnostic scanner, ECU programming devices and specialised tools specific to your car.
          </Typography>

          <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b>  Warranty on car services  </b></Typography>
          <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
            When you choose GoCarsmith, you get the GoCarsmith Advantage. Your {BrandName} {modelName}  service is assured under our 1000kms/1 month warranty policy anywhere in {locationName}. Now, book with confidence.
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

export default CarInspections;