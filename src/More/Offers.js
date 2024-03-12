import React from "react";
import Slider from "react-slick";
import {
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MdExpandMore } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link ,useNavigate} from "react-router-dom";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
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
const Offers = () => {
  const accordionData = [
    {
      title: "Why should I choose GoCarsmith Car Services?",
      content:
        "GoCarsmith offers up to 49% savings on car services when compared to authorized car service centres. Moreover, the deals, discount and offers help you even more!",
    },
    {
      title: "How is GoCarsmith Different from other Car Services Workshops?",
      content:
        "GoCarsmith  offers a wide range of car services through a network of over 200+ workshops spread across 10 cities in India. With a variety of best deals and discounts on the cars services, GoCarsmith ensures that you save up to 40% on your car services.",
    },
    {
      title: "On what car services can I apply the GoCarsmith  Coupon Code?",
      content:
        "You can apply GoCarsmith   coupon code on a variety of car services. However, most of the offers are applicable to a wide range of services available while some of the Offers can be applied on specific services.",
    },
    {
      title: "Where should I apply the Coupon code to avail GoCarsmith Offers?",
      content:
        "While placing order for a car services, enter the GoCarsmith Coupon Code in the Apply Coupon bar in the Checkout section and get huge savings.",
    },
    {
      title: "What is the GoCarsmith referral Program?",
      content:
        "With GoCarsmith  Referral Program, you can earn ₹1000 GoCarsmith  Money by sharing your referral code with your friends. Moreover, your friend also earns ₹1000 GoApp Money on completing their first car services",
    },
    {
      title: "Are there any day-specific deals by GoCarsmith",
      content:
        "Yes, we have Throttle Tuesdays and Supersaver Wednesdays. You can save extra ₹100 over existing discount",
    },
  ];
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
  const handleCardClick = (imageUrl) => {
    // Check if required values are present in local storage
    const requiredValues = [
      "BrandName",
      "modelName",
      "fuelType",
      "location",
    ];
    // Check if any of the user-related values are present
    const userValuesPresent = [usermodelId, usermodelName, userfuelType, userBrandId, userBrandName].some((value) => value);
    if (requiredValues.every((value) => localStorage.getItem(value)) || userValuesPresent) {
      // All required values are present, navigate to the page
      navigate(imageUrl.link);
      window.location.reload();
    } else {
      // Display alert when values are missing
      window.alert("Please select Brand, Model, Fuel and Location.");
    }
  };
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
  const accordionStyles = {
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    background: "#e0e0e0",
    // Add any other styles you want
  };
  // const settings1 = {
  //   dots: false,
  //   infinite: false,
  //   speed: 400,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   centerMode: true,
  //   variableWidth: true,
  //   centerPadding: "5px",
  //   nextArrow: <CustomNextArrow />,
  //   prevArrow: <CustomPrevArrow />, // Adjust this value to set the gap between images
  // };


  
  const settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
   nextArrow: <CustomNextArrow />,
     prevArrow: <CustomPrevArrow/>,
    
  };
  const imageUrls1 = [
    {
      image:
        "https://res.cloudinary.com/du9ucrizw/image/upload/v1701338117/car-service_cjwzbn.png",
        link: "/Periodic",
      },
    {
      image:
        "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/home_treninding_images_v1/clutch.png",
      link: "/Clutch",
    },
    {
      image:
        "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/home_treninding_images_v1/detailing.png",
      link: "/Detailing",
    },
    {
      image:
        "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/home_treninding_images_v1/ac.png",
      link: "/AcRepair",
    },
    {
      image:
        "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/home_treninding_images_v1/light.png",
      link: "/WindShields",
    },
    {
      image:
        "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/home_treninding_images_v1/tyre.png",
      link: "/Tyres",
    },
    {
      image:
        "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/home_treninding_images_v1/spa.png",
      link: "/CarCleaning",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // set the duration for each slide in milliseconds
  };
  const navigate =useNavigate();
  const images = [
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob01.jpg%3Fv%3D1697090390.226571?version=1697090390.563549",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob02.jpg%3Fv%3D1698766989.187429?version=1698766989.585356",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob03.jpg%3Fv%3D1697090623.986?version=1697090624.21495",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob04.jpg%3Fv%3D1697090642.557963?version=1697090642.842166",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob05.jpg%3Fv%3D1697090691.18666?version=1697090691.533689",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob06.jpg%3Fv%3D1697090655.131017?version=1697090655.405522",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob07.jpg?version=1690803191.107313",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob08.jpg?version=1690803200.659342",
    "https://gomechprod.blob.core.windows.net/retail-carousel/indianewapp10prob012.jpg?version=1690803239.754811",
    // Add more image URLs as needed
  ];
  const chunkSize = 3; // Number of images in each row
  // Split the images array into chunks of size 'chunkSize'
  const chunkedImages = Array.from(
    { length: Math.ceil(images.length / chunkSize) },
    (_, index) => images.slice(index * chunkSize, (index + 1) * chunkSize)
  );
  return (
    <div>
      <Typography variant="h4" style={{ marginLeft: "20px", marginTop:"20px" }}>
          GoCarsmith Current Offers
        </Typography>
      <Slider {...settings}>
        {chunkedImages.map((chunk, slideIndex) => (
          <div key={slideIndex}>
            <div style={{ display: "flex" }}>
              {chunk.map((image, index) => (
                <div key={index} style={{ flex: 1, margin: "0 8px",marginTop:"20px" }}>
                  <img
                    src={image}
                    alt={`Slide ${slideIndex + 1},  ${index + 1}`}
                    style={{ width: "100%" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
      <br />
      <br />
      <div>
        <Typography variant="h4" style={{ marginLeft: "20px" }}>
          <b>GoCarsmith Coupons & Offers On Car Services</b>
        </Typography>
        <Typography style={{ marginLeft: "20px", paddingTop:'20PX',paddingLeft:'20PX',paddingRight:'20PX' }}>
          Looking to save on your car services? Get the best Offers and
          discounts
         
          on Car Services such as Periodic Car Services, AC Services, Car
          Detailing
         
          Services, Car Denting and Painting and much more. Use the GoCarsmith
         
          Coupon Code to get the best deals and savings!
        </Typography>
        <br />
        <Typography variant="h4" style={{ marginLeft: "20px" }}>
          <b>Popular Services</b>
        </Typography>
        <br />
      </div>
      <div style={{margin:"70px"}}>
  <Slider {...settings1} >
    {imageUrls1.map((imageUrl, index) => (
      <div key={index} >
          <img
            src={imageUrl.image}
            alt={` ${index + 1}`}
            style={{ width:"90%",height:"390px", cursor:"pointer"}}
            onClick={()=>handleCardClick(imageUrl)}
          />
      </div>
    ))}
  </Slider>
</div>
      <div>
      
        <Container style={{ marginTop: "130px" }}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                style={{ marginLeft: "280px" }}
              >
                <b>How GoCarsmith Works?</b>
              </Typography>
              <br />
              <Grid container spacing={5}>
                {/* Left side with numbers 1, 2, 3, 4 */}
                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    marginTop: "10px",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "40px",
                      border: "1px solid #ccc",
                      backgroundColor:"#e8e6df",
                      padding:"0px",
                      width: "30px",
                      textAlign:"center",
                    }}
                  >
                    1
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "#e8e6df",
                      padding: "0px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    2
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "#e8e6df",
                      padding: "0px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    3
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      marginBottom: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "#e8e6df",
                      padding: "0px",
                      width: "30px",
                      textAlign: "center",
                    }}
                  >
                    4
                  </Typography>
                </Grid>

                {/* Center content */}
                <Grid item xs={12} sm={6}>
                  <div>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "10px" }}
                    >
                      <b>Select The Perfect Car Service</b>
                    </Typography>
                    <p style={{paddingLeft:"15px"}}>From GoCarsmith board portfolio of Services</p>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "30px" }}
                    >
                      <b>Schedule Free Doorstep Pick-up</b>
                    </Typography>
                    <p style={{paddingLeft:"15px"}}>We offer free pick up and drop for all service booked</p>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "40px" }}
                    >
                      <b>Track Your Car Service Real-Time</b>
                    </Typography>
                    <p style={{paddingLeft:"15px"}}>We Will take care of everything from here!</p>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "left", marginTop: "45px" }}
                    >
                      <b>Earn While We Service</b>
                    </Typography>
                    <p style={{paddingLeft:"15px"}}>
                      Spread the word! You get Rs.750. Your friends get Rs.750!
                    </p>
                  </div>
                </Grid>

                {/* Right side with an image */}
                <Grid item xs={12} sm={3}>
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/Select-The-Perfect-Car-Service.png"
                    alt="Select The Perfect Car Service"
                    style={{ width: "80%", height: "auto" }}
                  />
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/Schedule-Free-Doorstep-Pick-up.png"
                    alt="Schedule Free Doorstep Pick-up"
                    style={{ width: "80%", height: "auto" }}
                  />
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/track-your-car-service-real-time.png"
                    alt="Track Your Car Service Real-Time"
                    style={{ width: "80%", height: "auto" }}
                  />
                  <img
                    src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Homepage/Earn-While-We-Service.png"
                    alt="Earn While We Service"
                    style={{ width: "80%", height: "auto" }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
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
                expandIcon={<MdExpandMore />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                
                <Typography>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{backgroundColor:"#ffffff", textAlign:"justify", padding:"10px"}}>{item.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Offers;