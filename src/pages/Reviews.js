import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const slides = [
  {
    place: "GoCarsmith Car Care Garge - Miyapur, Hyderabad",
    name: "Atul Khatana",
    content:
      "Many customers used to come and demand 100% genuine parts for their cars. There is a high circulation for duplicate parts in the market. But after getting a partnership with GoCarsmith this thing has reduced dramatically as they provide us 100% genuine OEM along with a warranty. This has also increased customer satisfaction.",
  },
  {
    place: "GoCarsmith Wheelscart  - Vijayanagar, Bangalore",
    name: "Arjun Kapoor",
    content:
      "My garage was going at a sustainable pace. But there wasn’t much growth in the business, but a partnership with GoCarsmith proved to be really beneficial for me. Despite the global recession, my garage maintained a good pace. The incentives earned are pretty good, something I may not have achieved independently..",
  },
  {
    place: "GoCarsmith Car Mechanic Garge - Aadheri West, Mumbai",
    name: "Rahul Sharma",
    content:
      "Good marketing means good business, this is something I learned from GoCarsmith. My workshop now gained brand status in the area. All because of the marketing strategies of GoCarsmith. They offer digital promotion and even social media marketing which turned out to be very effective in my local region.",
  },
  {
    place: "GoCarsmith Car24 Garge - A.S.Rao, Hyderabad",
    name: "Aisha Patel",
    content:
      "The kind of technical assistance GoCarsmith gives to its partner workshops is amazing. They even created an app which made the management of the garage at the ease of the clicks. The app features weekly/monthly status for the work done. Along with a proper directory for spare parts and full-time service assistance.",
  },
  {
    place: "Jyothi Car Care Garge - Gajuwaka, Vizag",
    name: "Jagadish Kumar",
    content:
      "I realised the value of what marketing can do to someone’s business when I partnered with GoCarsmith. They provide an amazing promotional campaign with digital outreach and brand awareness. Honestly, they provide very unique marketing solutions to their partners.",
  },
  {
    place: "GoCarsmith City Car Care - Kirti Nagar,, Delhi",
    name: "Abhijeet Bhuyan",
    content:
      "I am extremely happy with the technical assistance. Billing, invoicing and other payment-related problems were common issues faced by both, the customers and us as well. But from GoCarsmith it has reduced to a lot amount as they offer 24x7 service for solving problems related to bills, some technical errors, garage operation, the management, or even solving customer’s problems.",
  },
  {
    place: "GoCarsmith City Car Care Garge - Madhurawada, Vizag",
    name: "Srikant Naidu",
    content:
      "My garage was going at a sustainable pace. But there wasn’t much growth in the business, but a partnership with GoCarsmith proved to be really beneficial for me. Despite the global recession, my garage maintained a good pace. The incentives earned are pretty good, something I may not have achieved independently.",
  },
  {
    place: "GoCarsmith Manish Car Service Garge - Nayapalli, Bhubaneswar",
    name: "Ankit Malhotra",
    content:
      "Quality standards, time efficiency, and worth its price are the key to customer satisfaction which in turn is necessary for a good business. GoCarsmith definitely helped me to create a good name in terms of brand quality. Their guaranteed and 100% original OEM helped me to gain confidence among the customers as they get value for their money by getting top-class service and original products.",
  },
];


const CustomNextArrow = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      right: "-20px", // Adjust the distance from the right edge
      transform: "translateY(-50%)",
      cursor: "pointer",// Ensure the arrow is above the images
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
      cursor: "pointer",// Ensure the arrow is above the images
    }}
    onClick={onClick}
  >
    <ChevronLeftIcon />
  </div>
);


const CardComponent = () => {
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

  return (
    <div style={{ width: "90%", margin: "auto"  }}>
      <h1 style={{ textAlign: "center" }}>GoCarsmith Happy Partners </h1>
      <p style={{ textAlign: "center" }}>
        Hear it from the workshop owners themselves!
      </p>
      
      <Slider {...settings} >
            {slides.map((slide, index) => (
              <div key={index} style={{ width: "410px", height: "250px",zIndex: -1 }}>
                <Card style={{height: "450px", margin: "10px",zIndex: -1 }}>
                  <CardContent style={{ margin: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        
                      }}
                    >
                      {slide.avatar ? (
                        <Avatar
                          alt={slide.name}
                          src={slide.avatar}
                          style={{ width: "100px", height: "100px" }} // Adjust the size as needed
                        />
                      ) : (
                        <Avatar
                          style={{
                            width: "80px",
                            height: "80px",
                            fontSize: "32px",
                            margin:"-15px 0px 10px 0px"
                             // Adjust the font size as needed
                          }}
                        >
                          {slide.name.charAt(0)}
                        </Avatar>
                      )}
                    </div>
                    <Typography variant="body2" style={{textAlign:"justify",padding:"-15px 0px -15px 0px"}}>{slide.content}</Typography>
                    <hr />
                    <div
                      style={{
                        margin: "10px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold", marginLeft: "10px" }}
                      >
                        {slide.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ marginLeft: "10px" }}
                      >
                        {slide.place}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
    </div>
  );
};

export default CardComponent;
