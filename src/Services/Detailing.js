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
import Footer from "./Footer";
import Carousel from './Carousel';
import { Link ,useLocation} from 'react-router-dom';

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
    title: `What is GoCarsmith Detailing & Coating Service in ${locationName}?`,
    content: `GoCarsmith detailing & coating service includes multiple services which can help you retain that showroom shine for your ${BrandName}  ${modelName} . These include services like PPF, Ceramic Coating, Teflon Coating and many more.`,
  },
  {
    title: 'What is the difference between Teflon coating vs Anti-rust coating?',
    content: `Teflon coating for your ${BrandName}  ${modelName}  is a paint protection treatment, chemically synthesised from a fluoropolymer which bonds to the paint offering a brilliant shine, doing away with the problem of corrosion and wear and not Anti-rust coating is a car underbody protection treatment, which is applied to the underbody of the car. thick 2-3mm of a rubberised silicone-polyether layer is applied to the under-body to give it enhanced protection against hard not a. paint chips. Book a service today and get complete underbody rust and corrosion treatment at attractive prices in ${locationName}.`,
  },
  {
    title: `How long does it take to carry out the detailing services at GoCarsmith ${locationName}?`,
    content: `It completely depends upon which detailing service you choose. We try to deliver utmost satisfaction in the least time possible. However, it takes around 3-4 days to ensure the selected services are carried out perfectly on your ${BrandName}  ${modelName} .`,
  },
  {
    title: `How often should I avail the detailing services for my ${BrandName}  ${modelName} ?`,
    content: 'Most of the detailing services like Ceramic Coating and Teflon Coating last long once availed. However, GoCarsmith suggests you get it in 7-8 months checked regularly if it needs replacement.',
  },
  {
    title: `Is there a warranty on my ${BrandName} ${modelName}  detailing service?`,
    content: `Yes, all the detailing services done at GoCarsmith ${locationName} come with a warranty. However, the warranty may vary according to the service you avail. You can claim this warranty at any workshop across ${locationName}`,
  },
  {
    title: 'I can’t visit the workshop to drop my car. Can GoCarsmith help?',
    content: `Absolutely not, any paint protection coating is temporary and gentle to the painted surface. A Teflon coating can last upto 6 to 8 months if cared well. Ceramic coating on the other hand bonds to the paint surface and lasts much longer than any wax or paint sealant. A highly recommended service for your ${BrandName}  ${modelName}.`,
  },
  {
    title: `What products do you use for interior cleaning on my ${BrandName}  ${modelName} ? `,
    content: 'Yes, we provide free doorstep pickup and drop with all our services. We ensure that your experience is completely contactless considering the need of the hour.',
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
    name: "Abhijeet Bhuyan",
    location: "Kolkata",
    content: `I had my ${BrandName} ${modelName} service from GoCarsmith and it was nice to see how reasonable and fast the service was. They know the importance of time and they dont delay in the pickup and drop service. The service done was really amazing and commendable.`,
  },
  {
    name: "Srinivas Raja",
    location: "Vizag",
    content: `I own a modified ${modelName} which I use for rally events conducted in Pan-India. It was hard to find a mechanic for it but then I thought of giving GoCarsmith a try. Not only that I was there at the workshop while my ride was getting pampered. Hats off to Team GoCarsmith. Keep up the good work.`,
  },
  {
    name: "Sachin Joshi",
    location: "Bombay",
    content: `I thought of getting my ${BrandName}  ${modelName} serviced last week from GoCarsmith. I am extremely satisfied with the quality of work and the products used to service my car. I also received a huge discount on the service. Moreover, the staff which assisted me was also good! 5 stars from my side.`,
  },
  {
    name: "Kasturi Nagarajan",
    location: "Chennai",
    content: `I Got my ${BrandName}  ${modelName} serviced at GoCarsmith and was surprised to see that they found all the original parts for my car and used them and not only that I also saved a ton of money . As all of us know they are hard to maintain these days but GoCarsmith has made it simple and easy.`,
  },
  {
    name: "Vidya Hegde",
    location: "Bangalore",
    content:
      'Kudos to Team GoCarsmith as I had my first service done from them and it turned out to be a smooth experience and moreover they also provide gifts and goodies.Serious service done by them was perfect. Lots of love for the GoCarsmith team. Will surely recommend this to everyone'
  },
  {
    name: "Sukhvinder Singh",
    location: "Delhi",
    content: 'Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality.'
  },
];
const Detailing = () => {
  const [childLocations, setChildLocations] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
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
  const locations = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [locations.pathname]);
  
  const getToken = () => {
    return localStorage.getItem('token');
    };
  const [data, setData] =  useState([]);

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
    'https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Detailing%20Services/Teflon%20Coating%20Vs%20Ceramic%20Coating.jpg',
    'https://gomechprod.blob.core.windows.net/websiteasset/Blog%20services/Detailing%20Services/Automotive%20Paints%20And%20Coatings.jpg',
    'https://cdn.jdpower.com/car%20brakes%20and%20rotors.jpg',
    'https://w0.peakpx.com/wallpaper/943/675/HD-wallpaper-tata-nexon-crossovers-2020-cars-studio-2020-tata-nexon-indian-cars-tata-thumbnail.jpg',
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
            const field = 'DetailsServicing';

            const response = await axios.get(
                `https://gocarsmithbackend.onrender.com/api/user/getServicesByLocationModelFuelTypeAndField/${locationName}/${modelId}/${fuelType}/${field}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            if(response.status===200){
              setData(response.data.DetailsServicing);
              setIsLoading(false)
            } 

            // Log the response.data to the console
            console.log('Response Data:', response.data.DetailsServicing);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchDetails();
    
}, []);console.log();
const [priceLists, setPriceLists] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    
    const LabelName = "DETAILING SERVICES";
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
  const carRubbingPolishingRef = useRef(null);
  const ceramicCoatingRef = useRef(null);
  const megularsCeramicCoatingRef = useRef(null);
  const teflonCoating3MRef = useRef(null);
  const teflonCoatingMegularsRef = useRef(null);
  const ppfPaintProtectionFilmRef = useRef(null);
  const antiRustUnderbodyCoatingRef = useRef(null);
  const silencerCoatingRef = useRef(null);
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
        case '3m™ car rubbing & polishing':
          scrollToBlinkingSpot(carRubbingPolishingRef);
          break;
        case 'ceramic coating':
          scrollToBlinkingSpot(ceramicCoatingRef);
          break;
        case 'megular’s ceramic coating':
          scrollToBlinkingSpot(megularsCeramicCoatingRef);
          break;
        case '3m™ teflon coating':
          scrollToBlinkingSpot(teflonCoating3MRef);
          break;
        case 'megular’s teflon coating':
          scrollToBlinkingSpot(teflonCoatingMegularsRef);
          break;
        case 'ppf & paint protection film':
          scrollToBlinkingSpot(ppfPaintProtectionFilmRef);
          break;
        case 'anti rust underbody coating':
          scrollToBlinkingSpot(antiRustUnderbodyCoatingRef);
          break;
        case 'silencer coating':
          scrollToBlinkingSpot(silencerCoatingRef);
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
        case '3m™ car rubbing & polishing':
          scrollToBlinkingSpot(carRubbingPolishingRef);
          break;
        case 'ceramic coating':
          scrollToBlinkingSpot(ceramicCoatingRef);
          break;
        case 'megular’s ceramic coating':
          scrollToBlinkingSpot(megularsCeramicCoatingRef);
          break;
        case '3m™ teflon coating':
          scrollToBlinkingSpot(teflonCoating3MRef);
          break;
        case 'megular’s teflon coating':
          scrollToBlinkingSpot(teflonCoatingMegularsRef);
          break;
        case 'ppf & paint protection film':
          scrollToBlinkingSpot(ppfPaintProtectionFilmRef);
          break;
        case 'anti rust underbody coating':
          scrollToBlinkingSpot(antiRustUnderbodyCoatingRef);
          break;
        case 'silencer coating':
          scrollToBlinkingSpot(silencerCoatingRef);
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

  {!(data._3M_CAR_RUBBING_POLISHING && data._3M_CAR_RUBBING_POLISHING.price !== null) &&
!(data.CERAMIC_COATING && data.CERAMIC_COATING.price !== null) &&
!(data.MEGUIARS_CERAMIC_COATING && data.MEGUIARS_CERAMIC_COATING.price !== null) &&
!(data._3M_TEFLON_COATING && data._3M_TEFLON_COATING.price !== null) &&
!(data.MEGUIARS_TEFLON_COATING && data.MEGUIARS_TEFLON_COATING.price !== null) &&
!(data.PPF_PAINT_PROTECTION_FILM && data.PPF_PAINT_PROTECTION_FILM.price !== null) &&
!(data.ANTI_RUST_UNDERBODY_COATING && data.ANTI_RUST_UNDERBODY_COATING.price !== null) &&
!(data.SILENCER_COATING && data.SILENCER_COATING.price !== null) && (
  isLoading?  <Spinner animation="border" role="status" 
  style={{position: "fixed",left: "50%",
    
  }} >

  <span className="visually-hidden" >Loading...</span>

</Spinner> :<Typography variant="h3" style={{ marginTop: "30px", marginLeft: "70px", color: "red" }}>
  {/* Oops! No Data Found For This Model or Location. */}
</Typography>
    )}
    
  <h1 style={{ marginLeft: "80px" }}>Polishing</h1>
    {/* first card */}
    {data._3M_CAR_RUBBING_POLISHING && data._3M_CAR_RUBBING_POLISHING.price !== null ? (
    <Card ref={carRubbingPolishingRef} className={addBlinkClass('3M™ Car Rubbing & Polishing')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
            height="250"
            image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/New%20Thumbnail/3M%20car%20Rubbing%20_%20Polishing.jpg"
             style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
          />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
              3M™ Car Rubbing & Polishing
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
                  &#8226; 	Every 6 Months ( Recommended )
                </Typography>
                {renderCheckboxListItem({ servicename: 'Pressure Car Wash ' }, 1)}
                {renderCheckboxListItem({ servicename: 'Alloy Polishing' }, 2)}
                {renderCheckboxListItem({ servicename: 'Rubbing with 3M Compound ' }, 3)}
              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <br />
                {renderCheckboxListItem({ servicename: 'Tyre Dressing' }, 4)}
                {renderCheckboxListItem({ servicename: 'Machine Rubbing' }, 5)}
                {renderCheckboxListItem({ servicename: '3M Wax Polishing' }, 6)}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {/* Price and Add to Cart Container */}
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h6 className="text-success">
              <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
              ₹ {data._3M_CAR_RUBBING_POLISHING.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data._3M_CAR_RUBBING_POLISHING.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
               style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data._3M_CAR_RUBBING_POLISHING])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
    ): null }


<h1 style={{ marginLeft: "80px" }}>Ceramic Coating</h1>
{/* second card */}
{data.CERAMIC_COATING && data.CERAMIC_COATING.price !== null ? (
    <Card ref={ceramicCoatingRef} className={addBlinkClass('Ceramic Coating')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
    <Card
      style={{
        maxWidth: "1000px",
        height: "auto",
        margin: "auto",
        padding:"20px"
      }}
    >

      <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
        <b>FREE ALL AROUND CLEANING</b>
      </Typography>
      <Grid container spacing={2}>
        {/* First Container */}
        <Grid item xs={12} sm={4}>

          <CardMedia
            component="img"
            alt="Car Image"
            height="250"
            image="https://gomechprod.blob.core.windows.net/gm-retail-app/Banner/3M_ceramic_Thumbnail.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
          />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
              Ceramic Coating
            </Typography>
            <Button style={{ color: 'gray' }}>
              <ScheduleIcon />Takes 3 days
            </Button>
          </div>
          {/* Third Container */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226;  1 year Warranty
                </Typography>
                {renderCheckboxListItem({ servicename: 'Complete paint Correction' }, 1)}
                {renderCheckboxListItem({ servicename: 'Removes Minor Scratches' }, 2)}
                {renderCheckboxListItem({ servicename: 'Exterior Car Wash ' }, 3)}
                {renderCheckboxListItem({ servicename: 'Ultra Shine Polish ' }, 4)}
              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226; Every 3 Years ( Recommended )
                </Typography>  {renderCheckboxListItem({ servicename: '2 Layers of Coating' }, 5)}
                {renderCheckboxListItem({ servicename: 'Deep All Round Spa' }, 6)}
                {renderCheckboxListItem({ servicename: '9H Nano Coating' }, 7)}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {/* Price and Add to Cart Container */}
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h6 className="text-success">
              <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
              ₹ {data.CERAMIC_COATING.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.CERAMIC_COATING.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
             style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data.CERAMIC_COATING])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
    ): null }

    {/* third card */}
    {data.MEGUIARS_CERAMIC_COATING && data.MEGUIARS_CERAMIC_COATING.price !== null ? (
    <Card ref={megularsCeramicCoatingRef} className={addBlinkClass('Megular’s Ceramic Coating')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
    <Card
      style={{
        maxWidth: "1000px",
        height: "auto",
        margin: "auto",
        padding:"20px"
      }}
    >
      <Typography variant="h5" gutterBottom style={{ color: 'green' }}>
        <b>Free Interior Spa</b>
      </Typography>
      <Grid container spacing={2}>
        {/* First Container */}
        <Grid item xs={12} sm={4}>
          <CardMedia
            component="img"
            alt="Car Image"
            height="250"
            image="https://gomechprod.blob.core.windows.net/gm-retail-app/Banner/Meguiar_Ceramic_Thumbnail.jpg"
             style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
          />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
              Megular’s Ceramic Coating
            </Typography>
            <Button style={{ color: 'gray' }}>
              <ScheduleIcon />Takes 3 days
            </Button>
          </div>
          {/* Third Container */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226;	1 year Warranty
                </Typography>
                {renderCheckboxListItem({ servicename: 'Complete paint Correction' }, 1)}
                {renderCheckboxListItem({ servicename: 'Removes Minor Scratches' }, 2)}
                {renderCheckboxListItem({ servicename: 'Exterior Car Wash ' }, 3)}
                {renderCheckboxListItem({ servicename: 'Dashboard Polishing ' }, 4)}
                {renderCheckboxListItem({ servicename: 'Meguiar’s 9H neon Coating' }, 5)}
              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>	Every 3 Years ( Recommended )</Typography>
                {renderCheckboxListItem({ servicename: '2 Layers of Coating' }, 6)}
                {renderCheckboxListItem({ servicename: 'Deep All Round Spa' }, 7)}
                {renderCheckboxListItem({ servicename: 'Dashboard Polishing ' }, 4)}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {/* Price and Add to Cart Container */}
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h6 className="text-success">
              <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
              ₹ {data.MEGUIARS_CERAMIC_COATING.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.MEGUIARS_CERAMIC_COATING.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
               style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data.MEGUIARS_CERAMIC_COATING])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
    ): null }

    {/* Fourth card */}
    {data._3M_TEFLON_COATING && data._3M_TEFLON_COATING.price !== null ? (
    <Card ref={teflonCoating3MRef} className={addBlinkClass('3M™ Teflon Coating')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
            image="https://gomechprod.blob.core.windows.net/gm-retail-app/Banner/3M_Teflon_Thumbnail.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
          />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
            3M™ Teflon Coating
            </Typography>
            <Button style={{ color: 'gray' }}>
              <ScheduleIcon />	Takes 3 Days
            </Button>
          </div>
          {/* Third Container */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226; 		1 year Warranty
                </Typography>
                {renderCheckboxListItem({ servicename: 'Pre—Coating Rubbing and Polishing' }, 1)}
                {renderCheckboxListItem({ servicename: '	Removes Minor Scratches' }, 2)}
              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226; 	Every 3 Years ( Recommended )
                </Typography>
                {renderCheckboxListItem({ servicename: '	Full Body 3M Teflon Coating' }, 3)}
                {renderCheckboxListItem({ servicename: '3M Exterior Anti-Rust Treatment' }, 4)}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {/* Price and Add to Cart Container */}
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h6 className="text-success">
              <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
              ₹ {data._3M_TEFLON_COATING.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data._3M_TEFLON_COATING.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
               style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data._3M_TEFLON_COATING])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
    ): null }

    {/* fifth card */}
    {data.MEGUIARS_TEFLON_COATING && data.MEGUIARS_TEFLON_COATING.price !== null ? (
    <Card ref={teflonCoatingMegularsRef} className={addBlinkClass('Megular’s Teflon Coating')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
            image="https://gomechprod.blob.core.windows.net/gm-retail-app/Banner/Meguiar_Teflon_Thumbnail.jpg"
             style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
          />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '200px' }}>
              Megular’s Teflon Coating
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
                  &#8226;	3 Months Warranty
                </Typography>
                {renderCheckboxListItem({ servicename: 'Pre-Coating Rubbing and Polishing' }, 1)}
                {renderCheckboxListItem({ servicename: 'Removes Minor Scratches' }, 2)}
                {renderCheckboxListItem({ servicename: 'Full Body Megular’s Teflon Coating  ' }, 3)}

              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>	Every 3 Years ( Recommended )</Typography>
                {renderCheckboxListItem({ servicename: 'Ultra Shime Polishing' }, 4)}
                {renderCheckboxListItem({ servicename: 'Exterior Car Wash' }, 5)}
                {renderCheckboxListItem({ servicename: 'Megular’s Exterior Anti-Rust Treatment' }, 6)}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {/* Price and Add to Cart Container */}
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h6 className="text-success">
              <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
              ₹ {data.MEGUIARS_TEFLON_COATING.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.MEGUIARS_TEFLON_COATING.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
               style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data.MEGUIARS_TEFLON_COATING])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
    ): null }

    {/* sixth card */}
    {data.PPF_PAINT_PROTECTION_FILM && data.PPF_PAINT_PROTECTION_FILM.price !== null ? (
    <Card ref={ppfPaintProtectionFilmRef} className={addBlinkClass('PPF & Paint Protections Film')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
            image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/PPF/PPF%20Sq.jpg"  style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }}
          />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
              PPF & Paint Protections Film
            </Typography>
            <Button style={{ color: 'gray' }}>
              <ScheduleIcon />Takes 6 Days
            </Button>
          </div>
          {/* Third Container */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226; 	3 year Warranty

                </Typography><br />
                {renderCheckboxListItem({ servicename: 'Car Wash' }, 1)}
                {renderCheckboxListItem({ servicename: 'Avery PPF—Paint Protections Film ' }, 2)}
              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226; Every 20000 kms or 12 Months ( Recommended )
                </Typography>
                {renderCheckboxListItem({ servicename: 'Underbody Teflon Coating' }, 3)}
                {renderCheckboxListItem({ servicename: 'Body Wax' }, 4)}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {/* Price and Add to Cart Container */}
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h6 className="text-success">
              <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
              ₹ {data.PPF_PAINT_PROTECTION_FILM.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.PPF_PAINT_PROTECTION_FILM.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
             style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data.PPF_PAINT_PROTECTION_FILM])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
    ): null }

    {/* seventh card */}
    {data.ANTI_RUST_UNDERBODY_COATING && data.ANTI_RUST_UNDERBODY_COATING.price !== null ? (
    <Card ref={antiRustUnderbodyCoatingRef} className={addBlinkClass('Anti Rust Underbody Coating')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
            image="https://gomechprod.blob.core.windows.net/gm-retail-app/Banner/3M_ARUC_Thumbnail.jpg"
            style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
              Anti Rust Underbody Coating
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
                  &#8226; 	Every 6 Months recommended

                </Typography>
                {renderCheckboxListItem({ servicename: 'Protective Anti –Corrosion Treatment ' }, 1)}
                {renderCheckboxListItem({ servicename: 'Pressure Car wash' }, 2)}
                {renderCheckboxListItem({ servicename: 'Alloy Polishing' }, 3)}
              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226; 3 Months Warranty

                </Typography>
                {renderCheckboxListItem({ servicename: 'Wax Polishing' }, 5)}
                {renderCheckboxListItem({ servicename: 'Underbody Teflon Coating' }, 6)}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {/* Price and Add to Cart Container */}
        <Grid container>
          <Grid item xs={12} sm={10}>
            <h6 className="text-success">
              <span className="text-gray" style={{ textDecoration: 'line-through', fontSize: '18px', marginLeft: '100px', color: 'gray' }}>
              ₹ {data.ANTI_RUST_UNDERBODY_COATING.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.ANTI_RUST_UNDERBODY_COATING.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
               style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data.ANTI_RUST_UNDERBODY_COATING])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
    ): null }

{/* eight card */}
{data.SILENCER_COATING && data.SILENCER_COATING.price !== null ? (
   <Card ref={silencerCoatingRef} className={addBlinkClass('Silencer Coating')} style={{padding:"20px" , boxShadow:"none" ,marginTop:"10px"}}>
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
            image="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/services_icon/Silencer-Coating-Thumbnail-min.png"
            style={{ borderRadius: '8px 0 0 8px', marginTop: '8px',marginBottom: '30px' }} />
        </Grid>
        {/* Second Container */}
        <Grid item sm={8}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '270px' }}>
              Silencer Coating
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
                  &#8226;	3 Months Warranty
                </Typography>
                {renderCheckboxListItem({ servicename: 'Silencer Anti Rust Coating' }, 1)}
                {renderCheckboxListItem({ servicename: 'Sprayed on Underbody and Engine Bay' }, 2)}
                {renderCheckboxListItem({ servicename: '2 Layers of Protection' }, 3)}
              </CardContent>
            </Grid>
            {/* Fourth Container */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  &#8226;		Every 1 Years ( Recommended )
                </Typography>
                {renderCheckboxListItem({ servicename: 'Silencer Corrosion Treatment' }, 4)}
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
              ₹ {data.SILENCER_COATING.price + 500}/-
              </span>
              &nbsp;&nbsp;
              <b style={{ fontSize: '25px', color: 'black' }}>₹ {data.SILENCER_COATING.price}/-</b>
            </h6>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="outlined" color="error"
               style={{ fontSize: "16px", border: "3px solid red", fontWeight:"700" }}
              onClick={() => addToCart([data.SILENCER_COATING])}
            >
              Add to Cart
            </Button>
           
          </Grid>
        </Grid>
      </Grid>
    </Card>
    </Card>
): null }


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
    <Typography variant="h4" sx={{ textAlign: 'left', marginBottom: '20px', }}><b> Why Choose GoCarsmith In  {locationName}</b></Typography>
    <Paper sx={{ padding: '24px', background: "#f5f4f2" , }}>
      <Typography variant="body1" sx={{ marginBottom: '16px', }}>
        <b>Car care services in {locationName} </b>
      </Typography>
      <div>
        <ul>
          <li>
            <span sx={{ fontWeight: 'normal' }}>Detailing service is the best way to remove all the dust, dirt, mud and other unsightly build-ups from your car.</span>
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
        <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b> {BrandName}  {modelName} Diesel care services offered </b></Typography>
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
          Every GoCarsmith workshop across {locationName} uses the highest quality, specially formulated, PH neutral car care products from global brands like 3M, Wuerth and Extra Armor to give your {BrandName}  {modelName}  the best possible shine.
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'left', marginTop: '20px' }}><b> Specialised car care equipment </b></Typography>
        <Typography variant="body1" sx={{ textAlign: 'left', marginTop: '5px' }}>
          Professional {BrandName}  {modelName}  cleaning and detailing require speciality tools and machines. That is why every GoCarsmith workshop in {locationName} is equipped with Industry grade buffing and polishing machines, automatic pressure washers and other car care tools along with special car care products are put to use to get the best results.
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
    <div style={{ padding: '20px', background: "#f5f4f2" , marginBottom:"20px" }}>
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

export default Detailing;