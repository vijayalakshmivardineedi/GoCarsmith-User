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
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './styles.css';
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Carousel from "./Carousel";
import axios from "axios";
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
    title:
      `My ${modelName} drives very bumpy and rough on the road? What is the problem?`,
    content:
      `Is your ${modelName} giving you a rough ride? This can be due to misaligned tyres, low tyre pressure, faulty suspension or unbalanced wheels which can cause quite an uncomfortable car ride. You can get a complete Wheel Alignment/Balancing service at attractive prices at your nearest GoCarsmith workshop in ${locationName}.`,
  },
  {
    title: `What car insurance companies do you have a tie-up with?`,
    content:
      `We work in tandem with all car insurance companies to provide you with a seamless and hassle-free experience.`,
  },
  {
    title: `Can you provide an estimate for my ${modelName} repair under insurance?`,
    content:
      `Yes, we can provide you with an estimation of repairs for your ${modelName}  for insurance purposes. Please note that this facility is available only at selected GoCarsmith workshops in ${locationName}.`,
  },
  {
    title: `What are the compulsory deductibles with my ${modelName} insurance claim?`,
    content:
      `As per the IRDAI norm, a minimum deductible amount of ₹1000 for vehicles less than 1500cc and ₹2000 for vehicles more than 2000cc is levied with your ${modelName} car insurance claim.`,
  },
  {
    title:
      `I am busy and can't come to the workshop. Do you provide free pick up drop for my ${modelName}?`,
    content:
      `Yes, you can avail free doorstep pick-up and delivery with your ${modelName} car repairs.`,
  },
  {
    title: `What documents do I need to file my ${modelName} insurance claim?`,
    content:
      "Proof of Insurance/Policy number, Registration Certificate, Driving License, PAN and Aadhaar, Copy of the FIR (In case of third-party property damage).",
  },
  {
    title:
      `Do you use genuine spare parts with my ${modelName} car repair under insurance?`,
    content:
      `We use only 100% genuine OEM/OES spare parts as specified by your insurance provider for your ${modelName} car repair under insurance.`,
  },
  {
    title: `Can you provide towing service or roadside assistance for my ${modelName}?`,
    content: `Yes, we do provide towing and roadside assistance for your ${modelName}.`,
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
    name: "Manish Kashyap",
    location: "Patna",
    content:
      `I thought of getting my ${BrandName} ${modelName} serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.`,
  },
  {
    name: "Abdul Azeem",
    location: "Hyderabad",
    content:
      `I Got my ${BrandName} ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
  },
  {
    name: "Vidya Hegde",
    location: "Bangalore",
    content:
      `I had my ${BrandName} ${modelName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
  },
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content:
      `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`,
  },
  {
    name: " Srikant Panda",
    location: "Bhubaneswar ",
    content:
      `Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone`,
  },
  {
    name: "Ankit Saxena",
    location: "Lucknow",
    content:
      `Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality.`,
  },
];
const Insurance = () => {
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
    centerPadding: "10px",

    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const images = [
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-insurance/How-To-Reduce-Your-Car-Insurance-Premium.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-insurance/Car-Insurance--When-NOT-to-file-a-claim.png",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-insurance/How-To-Transfer-Car-Insurance-Policy-For-A-Second-Hand-Car.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-insurance/How-to-Avoid-Car-Insurance-Claim-Rejection.jpg",
    "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/firebase/firebase_data.json/blogs/car-insurance/Comprehensive-VS-Zero-Depreciation-Insurance.jpg",
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
  const [childLocations, setChildLocations] = useState([]);
  const parentId = localStorage.getItem('parentId')
  const [isLoading,setIsLoading]=useState(false)
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
        const field = 'InsuranceAndClaims';
        

        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if(response.status===200){
          setData(response.data.InsuranceAndClaims);
          setIsLoading(false)
        } 

        // Log the response.data to the console
        console.log('Response Data:', response.data.InsuranceAndClaims);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
  }, []);
  const [priceLists, setPriceLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      const LabelName = "INSURANCE CLAIMS";
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
  const knowYourPolicyRef = useRef(null);
  const accidentalDentingPaintingInsuranceRef = useRef(null);
  const carFloodDamageInsuranceRef = useRef(null);
  const fireDamageAssistanceInsuranceRef = useRef(null);
  const windshieldReplacementInsuranceRef = useRef(null);
  const keyReplacementInsuranceRef = useRef(null);
  const tyresWheelReplacementInsuranceRef = useRef(null);
  const batteryReplacementInsuranceRef = useRef(null);
  const carTheftClaimInsuranceRef = useRef(null);
  const ecmReplacementInsuranceRef = useRef(null);
  const doorstepAccidentalInspectionRef = useRef(null);
  const towingInsuranceRef = useRef(null);
  const insuranceClaimInspectionDetailsRef = useRef(null);
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
          case 'know your policy':
            scrollToBlinkingSpot(knowYourPolicyRef);
            break;
          case 'accidental denting & painting (insurance)':
            scrollToBlinkingSpot(accidentalDentingPaintingInsuranceRef);
            break;
          case 'car flood damage (insurance)':
            scrollToBlinkingSpot(carFloodDamageInsuranceRef);
            break;
          case 'fire damage assistance (insurance)':
            scrollToBlinkingSpot(fireDamageAssistanceInsuranceRef);
            break;
          case 'windshield replacement (insurance)':
            scrollToBlinkingSpot(windshieldReplacementInsuranceRef);
            break;
          case 'key replacement (insurance)':
            scrollToBlinkingSpot(keyReplacementInsuranceRef);
            break;
          case 'tyres & wheel replacement (insurance)':
            scrollToBlinkingSpot(tyresWheelReplacementInsuranceRef);
            break;
          case 'battery replacement (insurance)':
            scrollToBlinkingSpot(batteryReplacementInsuranceRef);
            break;
          case 'car theft claim (insurance)':
            scrollToBlinkingSpot(carTheftClaimInsuranceRef);
            break;
          case 'ecm replacement (insurance)':
            scrollToBlinkingSpot(ecmReplacementInsuranceRef);
            break;
          case 'doorstep accidental inspection':
            scrollToBlinkingSpot(doorstepAccidentalInspectionRef);
            break;
          case 'towing (insurance)':
            scrollToBlinkingSpot(towingInsuranceRef);
            break;
          case 'insurance claim inspection details':
            scrollToBlinkingSpot(insuranceClaimInspectionDetailsRef);
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
          case 'know your policy':
            scrollToBlinkingSpot(knowYourPolicyRef);
            break;
          case 'accidental denting & painting (insurance)':
            scrollToBlinkingSpot(accidentalDentingPaintingInsuranceRef);
            break;
          case 'car flood damage (insurance)':
            scrollToBlinkingSpot(carFloodDamageInsuranceRef);
            break;
          case 'fire damage assistance (insurance)':
            scrollToBlinkingSpot(fireDamageAssistanceInsuranceRef);
            break;
          case 'windshield replacement (insurance)':
            scrollToBlinkingSpot(windshieldReplacementInsuranceRef);
            break;
          case 'key replacement (insurance)':
            scrollToBlinkingSpot(keyReplacementInsuranceRef);
            break;
          case 'tyres & wheel replacement (insurance)':
            scrollToBlinkingSpot(tyresWheelReplacementInsuranceRef);
            break;
          case 'battery replacement (insurance)':
            scrollToBlinkingSpot(batteryReplacementInsuranceRef);
            break;
          case 'car theft claim (insurance)':
            scrollToBlinkingSpot(carTheftClaimInsuranceRef);
            break;
          case 'ecm replacement (insurance)':
            scrollToBlinkingSpot(ecmReplacementInsuranceRef);
            break;
          case 'doorstep accidental inspection':
            scrollToBlinkingSpot(doorstepAccidentalInspectionRef);
            break;
          case 'towing (insurance)':
            scrollToBlinkingSpot(towingInsuranceRef);
            break;
          case 'insurance claim inspection details':
            scrollToBlinkingSpot(insuranceClaimInspectionDetailsRef);
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
        {!(data.KNOW_YOUR_POLICY && data.KNOW_YOUR_POLICY.price !== null) &&
          !(data.ACCIDENTAL_DENTING_PAINTING_INSURANCE && data.ACCIDENTAL_DENTING_PAINTING_INSURANCE.price !== null) &&
          !(data.CAR_FLOOD_DAMAGE_INSURANCE && data.CAR_FLOOD_DAMAGE_INSURANCE.price !== null) &&
          !(data.FIRE_DAMAGE_ASSISTANCE_INSURANCE && data.FIRE_DAMAGE_ASSISTANCE_INSURANCE.price !== null) &&
          !(data.WINDSHIELD_REPLACEMENT_INSURANCE && data.WINDSHIELD_REPLACEMENT_INSURANCE.price !== null) &&
          !(data.KEY_REPLACEMENT_INSURANCE && data.KEY_REPLACEMENT_INSURANCE.price !== null) &&
          !(data.TYRES_WHEEL_REPLACEMENT_INSURANCE && data.TYRES_WHEEL_REPLACEMENT_INSURANCE.price !== null) &&
          !(data.BATTERY_REPLACEMENT_INSURANCE && data.BATTERY_REPLACEMENT_INSURANCE.price !== null) &&
          !(data.CAR_THEFT_CLAIM_INSURANCE && data.CAR_THEFT_CLAIM_INSURANCE.price !== null) &&
          !(data.ECM_REPLACEMENT_INSURANCE && data.ECM_REPLACEMENT_INSURANCE.price !== null) &&
          !(data.DOORSTEP_ACCIDENT_INSPECTION && data.DOORSTEP_ACCIDENT_INSPECTION.price !== null) &&
          !(data.TOWING_INSURANCE && data.TOWING_INSURANCE.price !== null) &&
          !(data.INSURANCE_CLAIM_INSPECTION && data.INSURANCE_CLAIM_INSPECTION.price !== null) && (
            isLoading?  <Spinner animation="border" role="status" 
  style={{position: "fixed",left: "50%",
    
  }} >

  <span className="visually-hidden" >Loading...</span>

</Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
  {/* Oops! No Data Found For This Model or Location. */}
</Typography>
          )}

        <h1 style={{ marginLeft: "80px" }}>Know Your Policy</h1>

        {/* first card */}
        {data.KNOW_YOUR_POLICY && data.KNOW_YOUR_POLICY.price !== null ? (
          <Card ref={knowYourPolicyRef} className={addBlinkClass('Know Your Policy')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Know%20Your%20Policy/Know%20Your%20Policy%20Sq.jpg"
                    style={{ borderRadius: "8px 0 0 8px", marginTop: "8px" }}
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
                      Know Your Policy
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Call Within 2 Hour
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Call Within 2 Hour
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Complete Information about your Policy" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Suggestions on Purchase of New Policy" },
                          2
                        )}
                        {renderCheckboxListItem(
                          {
                            servicename: "Vehicle IDV and Premium Rate Suggestions",
                          },
                          3
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Regarding Doubts with Claim Initimation
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Expenditure Assesment " },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Connect with Insurance Agent" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.KNOW_YOUR_POLICY.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.KNOW_YOUR_POLICY.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}

                        onClick={() => addToCart([data.KNOW_YOUR_POLICY])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        <Typography variant="h4" gutterBottom style={{ textAlign: "center", marginRight: "700px", marginTop: "20px", }} >
          <b>Accidental Repairs</b>
        </Typography>

        {/* second card */}
        {data.ACCIDENTAL_DENTING_PAINTING_INSURANCE && data.ACCIDENTAL_DENTING_PAINTING_INSURANCE.price !== null ? (
          <Card ref={accidentalDentingPaintingInsuranceRef} className={addBlinkClass('Accidental Denting & Painting (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Accidental%20Denting%20_%20Painting/Thumbnail.jpg"
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
                      Accidental Denting & Painting (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Accidental Repair in Insurance" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approval" },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
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
                          { servicename: "Claim Intimation " },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Body Panel Replacement (If Required)" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.ACCIDENTAL_DENTING_PAINTING_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.ACCIDENTAL_DENTING_PAINTING_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.ACCIDENTAL_DENTING_PAINTING_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}


        {/* third card */}
        {data.CAR_FLOOD_DAMAGE_INSURANCE && data.CAR_FLOOD_DAMAGE_INSURANCE.price !== null ? (
          <Card ref={carFloodDamageInsuranceRef} className={addBlinkClass('Car Flood Damage (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Car%20Flooding%20Damage/Thumbnail.jpg"
                    style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                      Car Flood Damage (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approval" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Repairing of Flood Damage in Insurance" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation " },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.CAR_FLOOD_DAMAGE_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.CAR_FLOOD_DAMAGE_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.CAR_FLOOD_DAMAGE_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* fourth card */}
        {data.FIRE_DAMAGE_ASSISTANCE_INSURANCE && data.FIRE_DAMAGE_ASSISTANCE_INSURANCE.price !== null ? (
          <Card ref={fireDamageAssistanceInsuranceRef} className={addBlinkClass('Fire Damage Assistance (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Fire%20Damage%20Assistance/Thumbnail.jpg"
                    style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                      Fire Damage Assistance (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approval" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Repairing of Flood Damage in Insurance" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation " },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.FIRE_DAMAGE_ASSISTANCE_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.FIRE_DAMAGE_ASSISTANCE_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.FIRE_DAMAGE_ASSISTANCE_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* fifth card */}
        {data.WINDSHIELD_REPLACEMENT_INSURANCE && data.WINDSHIELD_REPLACEMENT_INSURANCE.price !== null ? (
          <Card ref={windshieldReplacementInsuranceRef} className={addBlinkClass('Windshield Replacement (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/WindshieldReplacement/Windshield%20Replacement%20Sq.jpg"
                    style={{ borderRadius: "8px 0 0 8px", marginTop: "10px" }}
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
                      Windshield Replacement (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; On Cracks in Windshield ( Recommended )
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation " },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Co-rdination with Insurance Company" },
                          2
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Available at Doorstep" },
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
                          { servicename: "Surveyor Estimate Approval" },
                          4
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Windshield Replacement/Repair" },
                          5
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.WINDSHIELD_REPLACEMENT_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.WINDSHIELD_REPLACEMENT_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.WINDSHIELD_REPLACEMENT_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}


        {/* sixth card */}
        {data.KEY_REPLACEMENT_INSURANCE && data.KEY_REPLACEMENT_INSURANCE.price !== null ? (
          <Card ref={keyReplacementInsuranceRef} className={addBlinkClass('Key Replacement (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Key%20Replacement/Thumbnail.jpg"
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
                      Key Replacement (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approvals" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Car Key Replacement in Insurance" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.KEY_REPLACEMENT_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.KEY_REPLACEMENT_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}

                        onClick={() => addToCart([data.KEY_REPLACEMENT_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* seventh card */}
        {data.TYRES_WHEEL_REPLACEMENT_INSURANCE && data.TYRES_WHEEL_REPLACEMENT_INSURANCE.price !== null ? (
          <Card ref={tyresWheelReplacementInsuranceRef} className={addBlinkClass('Tyres & Wheel Replacement (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Tyre%20_%20Wheel%20Replacement/Thumbnail.jpg"
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
                      Tyres & Wheel Replacement (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Tyres & Wheel Damage Due
                          to Accident
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approvals" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Tyres & Wheel Replacement in Insurance" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.TYRES_WHEEL_REPLACEMENT_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.TYRES_WHEEL_REPLACEMENT_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.TYRES_WHEEL_REPLACEMENT_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* eigtht card */}
        {data.BATTERY_REPLACEMENT_INSURANCE && data.BATTERY_REPLACEMENT_INSURANCE.price !== null ? (
          <Card ref={batteryReplacementInsuranceRef} className={addBlinkClass('Battery Replacement (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Battery%20Replacement/Thumbnail.jpg"
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
                      Battery Replacement (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Battery Theft
                        </Typography>
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approvals" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Battery Replacement in Insurance" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.BATTERY_REPLACEMENT_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.BATTERY_REPLACEMENT_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.BATTERY_REPLACEMENT_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* ninth card */}
        {data.CAR_THEFT_CLAIM_INSURANCE && data.CAR_THEFT_CLAIM_INSURANCE.price !== null ? (
          <Card ref={carTheftClaimInsuranceRef} className={addBlinkClass('Car Theft Claim (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/Car%20Theft%20Claim/Thumbnail.jpg"
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
                      Car Theft Claim (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approvals" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Repairing of Flood Damage in Insurance" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.CAR_THEFT_CLAIM_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.CAR_THEFT_CLAIM_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}

                        onClick={() => addToCart([data.CAR_THEFT_CLAIM_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* tenth card */}
        {data.ECM_REPLACEMENT_INSURANCE && data.ECM_REPLACEMENT_INSURANCE.price !== null ? (
          <Card ref={ecmReplacementInsuranceRef} className={addBlinkClass('ECM Replacement (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/retailservices/ECM%20Replacement/Thumbnail.jpg"
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
                      ECM Replacement (Insurance)
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Recommended : In case of Comprehensive Policy
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Surveyor Estimate Approvals" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "ECM Replacement in Insurance" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <br />
                        <br />
                        {renderCheckboxListItem(
                          { servicename: "Claim Intimation" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "File Charge Included" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.ECM_REPLACEMENT_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.ECM_REPLACEMENT_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.ECM_REPLACEMENT_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* 11th card */}
        {data.DOORSTEP_ACCIDENT_INSPECTION && data.DOORSTEP_ACCIDENT_INSPECTION.price !== null ? (
          <Card ref={doorstepAccidentalInspectionRef} className={addBlinkClass('Doorstep Accidental Inspection')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/DoorstepAccidentalInspection/Doorstep%20Accidental%20Inspection%20Sq.jpg"
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
                      Doorstep Accidental Inspection
                    </Typography>
                    <Button style={{ color: "gray" }}>
                      <ScheduleIcon />
                      Takes 24 hours
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; 25 Points Checklist
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "Body Damage Inspection" },
                          1
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Insurance Claim Advice" },
                          2
                        )}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Every 1 Month (Recommended)
                        </Typography>
                        {renderCheckboxListItem(
                          { servicename: "25 Points Checklist" },
                          3
                        )}
                        {renderCheckboxListItem(
                          { servicename: "Policy Inspection" },
                          4
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
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
                        ₹ {data.DOORSTEP_ACCIDENT_INSPECTION.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: "25px", color: "black" }}>₹ {data.DOORSTEP_ACCIDENT_INSPECTION.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.DOORSTEP_ACCIDENT_INSPECTION])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* 12th card */}
        {data.TOWING_INSURANCE && data.TOWING_INSURANCE.price !== null ? (
          <Card ref={towingInsuranceRef} className={addBlinkClass('Towing (Insurance)')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/Towing%20Insurance/thumbnail.jpg" style={{ borderRadius: '8px 0 0 8px', marginTop: '10px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                      Towing (Insurance)
                    </Typography>
                    <Button style={{ color: 'gray' }}>
                      <ScheduleIcon />Cashless Facility
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Real Time Claim Tracking Mechanism
                        </Typography>
                        {renderCheckboxListItem({ servicename: 'Claim Intimation (Included)' }, 1)}
                        {renderCheckboxListItem({ servicename: 'Towing Reimbursement (Included)' }, 2)}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Free Towing
                        </Typography>
                        {renderCheckboxListItem({ servicename: 'Co-ordination with Insurance Company (Included)' }, 3)}
                        {renderCheckboxListItem({ servicename: 'Available at Doorstep (Included)' }, 4)}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                        ₹ {data.TOWING_INSURANCE.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.TOWING_INSURANCE.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button variant="outlined" color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}
                        onClick={() => addToCart([data.TOWING_INSURANCE])}
                      >
                        ADD TO CART
                      </Button>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Card>
        ) : null}

        {/* 13th card */}
        {data.INSURANCE_CLAIM_INSPECTION && data.INSURANCE_CLAIM_INSPECTION.price !== null ? (
          <Card ref={insuranceClaimInspectionDetailsRef} className={addBlinkClass('Insurance Claim Inspection Details')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
                    image="https://gomechprod.blob.core.windows.net/gm-retail-app/service-new-images/Car%20Insurance_Square.jpg" style={{ borderRadius: '8px 0 0 8px', marginTop: '10px' }}
                  />
                </Grid>
                {/* Second Container */}
                <Grid item sm={8}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
                      Insurance Claim Inspection Details
                    </Typography>
                    <Button style={{ color: 'gray' }}>
                      <ScheduleIcon />
                      Cashless Facility
                    </Button>
                  </div>
                  {/* Third Container */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Real Time Claim Tracking Mechanism
                        </Typography>
                        {renderCheckboxListItem({ servicename: 'Claim Intimation (Included)' }, 1)}
                        {renderCheckboxListItem({ servicename: 'Surveyor Estimate Approval (Included)' }, 2)}
                        {renderCheckboxListItem({ servicename: 'Co-ordination with Insurance Company (Included)' }, 3)}
                      </CardContent>
                    </Grid>
                    {/* Fourth Container */}
                    <Grid item xs={12} sm={6}>
                      <CardContent>
                        <Typography variant="body2" gutterBottom>
                          &#8226; Free Pick-up/Drop
                        </Typography>
                        {renderCheckboxListItem({ servicename: '2 Years Warranty on Paint Jobs (Included)' }, 3)}
                        {renderCheckboxListItem({ servicename: 'Policy Inspection (Included)' }, 4)}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Price and Add Card Container */}
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <h6 className="text-success">
                      <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
                        ₹ {data.INSURANCE_CLAIM_INSPECTION.price + 500}/-
                      </span>
                      &nbsp;&nbsp;
                      <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.INSURANCE_CLAIM_INSPECTION.price}/-</b>
                    </h6>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                   
                      <Button variant="outlined" color="error"
                        style={{ fontSize: "16px", border: "3px solid red", fontWeight: "700" }}

                        onClick={() => addToCart([data.INSURANCE_CLAIM_INSPECTION])}
                      >
                        ADD TO CART
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
                  <CardContent style={{ margin: "5px" }}>
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
            <b> Frequently Asked Questions</b>
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

        <Paper sx={{ padding: "24px", background: "#f5f4f2", }}>
          <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            <b>{BrandName} {modelName} Car insurance repairs in {locationName}</b>
          </Typography>
          <div>
            <ul>
              <li>
                <span sx={{ fontWeight: "normal" }}>
                  Claim Assistance: With corporate tie-ups with all insurance
                  companies, we help you speed-up the insurance claim process
                  making the experience that simple and easy.
                </span>
              </li>
              <li>
                <span sx={{ fontWeight: "normal" }}>
                  Huge Savings: Pay upto 50% less and save upto 25% on insurance
                  car repairs compared to a dealership garage. Best prices in
                  {locationName} guaranteed!
                </span>
              </li>
              <li>
                <span sx={{ fontWeight: "normal" }}>
                  Instant Quotation: Fill in your vehicle details and get
                  personalised insurance repair quotes for your {BrandName} {modelName} repair
                  in just 2 hours.
                </span>
              </li>
              <li>
                <span sx={{ fontWeight: "normal" }}>
                  Inclusive Warranty: Get inclusive warranty on service and
                  spares anywhere in {locationName} with 2 years of unconditional
                  warranty on paint with GoCarsmith.
                </span>
              </li>
              <li>
                <span sx={{ fontWeight: "normal" }}>
                  Genuine Spares: Only 100% genuine OEM and OES spares and
                  high-quality consumables are used in your car. Nothing but the
                  best.
                </span>
              </li>
            </ul>
          </div>
          <div className="_1hV59">
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              <b>Insurance Repair services offered</b>
            </Typography>
            <p>Get the best insurance repairs for your car in {locationName}:</p>
            <div className="_1VMvZ">
              <ul>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    Doorstep Windshield Replacement
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "10px" }}>
                    24x7 Roadside Assistance & Towing
                  </span>
                </li>
                <li>
                  <span sx={{ fontWeight: "normal", marginTop: "50px" }}>
                    Free Doorstep Pick-up and Drop
                  </span>
                </li>
              </ul>
            </div>
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              <b>Network Warranty Across {locationName}</b>
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "left", marginTop: "5px" }}
            >
              Wherever you go, our warranty goes with you. Get covered with our
              unrestricted city-wide warranty policy that extends across all
              GoCarsmith garages in {locationName}
            </Typography>
            <Typography
              variant="h7"
              sx={{ textAlign: "left", marginTop: "30px" }}
            >
              <b>Highly Equipped Workshops</b>
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "left", marginTop: "5px" }}
            >
              Every GoCarsmith workshop is equipped with speciality dent pulling
              tools, precision paint booths and industry qualified mechanics who
              are trained to operate automotive equipment.
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

export default Insurance;