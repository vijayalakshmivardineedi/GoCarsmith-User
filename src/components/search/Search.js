import React, { useState } from "react";
import {
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  ListItem,
  ListItemIcon,
  Stepper, Step, StepLabel,
  IconButton,
  ListItemText,
  List, ListItem as MuiListItem,
  CardMedia,
  Button,  
  Rating,
  Avatar,
  Paper,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdOutlineVerifiedUser } from "react-icons/md";
import ArrowLeftIcon from "@mui/icons-material/ArrowBack";
import {
  FaHourglassEnd ,FaRegThumbsUp ,
  FaTags ,
} from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import GoMechanicWarranty from "./GoMechanicWarranty";
const pagesData = {
  "Radiator Flush & Clean": {
    images: [
      "https://res.cloudinary.com/du9ucrizw/image/upload/v1701407593/1_v6qfet.jpg",
      "https://res.cloudinary.com/du9ucrizw/image/upload/v1701407592/2_zm2wz8.jpg",
      "https://res.cloudinary.com/du9ucrizw/image/upload/v1701407592/3_ko35hs.jpg",
    ],
    headingText: "Radiator Flush & Clean",
    pointsList: [
      { text: "Takes 2 Hours", icon: FaHourglassEnd  },
      { text: "Protects Radiator from Corrosion", icon: MdOutlineVerifiedUser },
      { text: "Free Pickup and Drop", icon: FaRegThumbsUp  },
      { text: "Every 6 Months Recommended", icon: FaTags  },
    ],
    promo: {
      title: "Save 25% on this Order",
      subtitle: "Get Miles Membership Now",
      imageUrl:
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/ServiceDetail/icon_payment.png",
    },
    includedServices: [
      "Coolant Draining",
      "Radiator Flushing",
      "Anti - Freeze Coolant Replacement",
      "Radiator Cleaning",
      "Coolant Leakage Inspection",
    ],
    serviceSteps: [
      "A Dedicated Service Buddy will arrange a doorstep pick-up from your location.",
      "Your Car will be serviced at the nearest GoMechanic Workshop.",
      "Any additional work will be notified and authorised by you.",
      "We'll doorstep deliver your Car in the specified service time.",
    ],
    reviews: [
      {
        name: "Divakar",
        description: "Good People & Well Behaviour.",
        rating: 5,
      },
      {
        name: "Lohitha",
        description: "Thanks to GoCarsmith.",
        rating: 5,
      },
      {
        name: "Harish",
        description: "Great service! Highly recommended.",
        rating: 5,
      },
      {
        name: "Kalyani",
        description: "Fast and reliable service.",
        rating: 4,
      },
      // Add more reviews as needed
    ],
    faqData: [
      {
        question: "What is GoCarSmith?",
        answer:
          "GoCarSmith is a network of technology-enabled car service centres, offering a seamless service experience at the convenience of a tap. With our highly skilled technicians, manufacturer recommended procedures and the promise of genuine spare parts, we are your best bet",
      },
      {
        question: "Why should I choose GoCarSmith?",
        answer:
          "GoCarSmith offers the best car services and solutions at fair and flexible prices. You end up saving up to 40% compared to what is charged at Authorised Service Centres and Multi-brand workshops",
      },
      {
        question: "How can you offer upto 40% savings on services?",
        answer:
          "Our distinctive business model enables us to provide affordable car services. We achieve savings on labour costs, centralized bulk procurement of spare parts, no real-estate overheads, and adept operational excellence, which are passed on straight to You- the Customer.",
      },
      {
        question:
          "How is GoCarSmith different from other service platforms out there?",
        answer:
          "Unlike other platforms, we do not work on a lead generation model. Uncompromised customer gratification is our idea of fulfilment, that is why we own the complete experience right from procurement of spare parts to quality control at our partner car service centres. Our Customer Representative will be on ground duty promptly reporting every development directly to you. GoCarSmith is your personal car service expert and partner rolled into one.",
      },
      {
        question: "Where can I book a car service with GoCarSmith?",
        answer:
          "You can book a GoCarSmith car service directly from our website or by downloading the exclusive Android App. Want a more human experience? call or WhatsApp on 8398 970 970. GoCarSmith car services are also available on Paytm Mall.",
      },
      {
        question: "How to book a car service with GoCarSmith?",
        answer:
          "We have made booking a car service as easy as 1-2-3. Just select you Car’s make, model and fuel type, select the type of car service you require, Choose your preferred time slot And Enjoy! We offer free pick-up and drop-in, so you don’t miss out the cherished moments with your loved ones.",
      },
      {
        question: "What if I am not available to drop my car?",
        answer:
          "Worry not! We’ll take care of everything. We offer free pick-up and drop-in.",
      },
      {
        question: "Do I have to pay before the service?",
        answer:
          "Not at all. From the booking to delivery, our priority at GoCarSmith keeps You and Your Car Service first. We will send you the bill once your car is serviced and inspected by our professionals. We offer flexible payment options for your ease. You can still prepay if you choose to.",
      },
      // ... other FAQ items
    ],
  },
  "Radiator Replacement": {
    images: [
      "https://res.cloudinary.com/du9ucrizw/image/upload/v1701683979/1_re41c9.jpg",
      "https://res.cloudinary.com/du9ucrizw/image/upload/v1701685660/2_yyw8af.jpg",
      "https://res.cloudinary.com/du9ucrizw/image/upload/v1701686047/3_cb0ysc.jpg",
    ],
    headingText: "Radiator Replacement",
    pointsList: [
      { text: "Takes 6 Hours", icon: FaHourglassEnd  },
      { text: "1 Month Warranty", icon: MdOutlineVerifiedUser },
      { text: "Recommended: In Case of Blockage in the Radiator Vessels", icon: FaRegThumbsUp  },
      { text: "Recommended: In Case of Radiator Leakage", icon: FaTags  },
    ],
    promo: {
      title: "Save 25% on this Order",
      subtitle: "Get Miles Membership Now",
      imageUrl:
        "https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/ServiceDetail/icon_payment.png",
    },
    includedServices: [
      "Free Pickup & Drop",
      "Radiator Replacement(OES)",
      "Spare Part Cost Only",
      "Radiator Hoses, Thermostat Valves Cost Additional",
      "Coolant Cost Additional",
    ],
    serviceSteps: [
      "A Dedicated Service Buddy will arrange a doorstep pick-up from your location.",
      "Your Car will be serviced at the nearest GoMechanic Workshop.",
      "Any additional work will be notified and authorised by you.",
      "We'll doorstep deliver your Car in the specified service time.",
    ],
    reviews: [
      {
        name: "Lohitha",
        description: "Wow! It's to Amazing Service Culture.",
        rating: 5,
      },
      {
        name: "Divya",
        description: "Great service! Highly recommended.",
        rating: 5,
      },
      {
        name: "Harish",
        description: "Great service! Highly recommended.",
        rating: 5,
      },
      {
        name: "Kalyani",
        description: "Fast and reliable service.",
        rating: 4,
      },
      // Add more reviews as needed
    ],
    faqData: [
      {
        question: "What kind of spare parts does GoMechanic use for the Car Inspections of my Mitsubishi Pajero Sport Diesel?",
        answer:
          "At GoMechanic, we use only 100% genuine OEM/OES spare parts for all the services. We acquire these spare parts following our robust inventory management, ensuring premium service at the best price in Visakhapatnam.",
      },
      {
        question: "Can I avail free pick-up and drop service in Visakhapatnam?",
        answer:
          " Yes, of course, GoMechanic offers free pick up and delivery for your Mitsubishi Pajero Sport Diesel in Visakhapatnam. Along with that, your car is also covered under the GoMechanic Assurance Programme under which any harm caused by GoMechanic Executives during pickup and drop will be refunded up to the limit of INR 25,000.",
      },
      {
        question: "How can I know the charges for the Car Inspections of my Mitsubishi Pajero Sport Diesel in Visakhapatnam?",
        answer:
          "You can easily know the estimated cost of the service by selecting your carâ€™s brand and model at www.gomechanic.in. We assure quality service at nationwide best prices.",
      },
      {
        question:
          "Will I get any warranty on my Mitsubishi Pajero Sport Diesel Car Inspections?",
        answer:
          "For sure you will. GoMechanic offers Service-warranty on all the services. The warranty is valid all across India, hence you can avail of it from any GoMechanic workshop.",
      },
      
      // ... other FAQ items
    ],
  },
  
};
const FaqAccordion = ({ faqData }) => {
    const [expanded, setExpanded] = useState(null);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : null);
    };
  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: 6,
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: 'bold',
            marginBottom: '16px',
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2}>
          <div
            style={{
              flex: '1',
              padding: '50px',              
            }}
          >
            {faqData.map((faq, index) => (
              <Grid item xs={12} key={index}>
                <Accordion
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      style={{
                        fontSize: '18px',
                        color: 'gray',
                        background: '#F5F5F5',
                        padding: '8px',
                        borderRadius: '4px',
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </div>
        </Grid>
      </div>
    );
  };
// Main App component code
const Container = ({ children }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '20px',
      }}
    >
      {children}
    </Box>
  );

  const ImageContainer = ({ children }) => (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
      }}
    >
      {children}
    </Box>
  );

  const Image = ({ src, alt }) => (
    <Box
      component={Paper} // You can use Paper or another Material-UI component if needed
      sx={{
        width: '420px',
        height: '220px',
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    </Box>
  );

  const HeadingContainer = ({ children }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );

  const Heading = ({ children }) => (
    <Typography
      variant="h5"
      sx={{
        marginTop: '25px',
        marginLeft: '10px',
        fontWeight:700,
      }}
    >
      {children}
    </Typography>
  );

const ArrowIcon = () => (
  <ArrowLeftIcon
    style={{
      fontSize: "22px",
      marginTop:'25px',
    }}
  />
);

const CustomList = ({ children }) => (
    <Grid
      container
      spacing={6}
      sx={{
        listStyle: 'none',
        padding: 0,
        textAlign: 'center',
      }}
    >
      {React.Children.map(children, (child, index) => (
        <Grid item key={index}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
  const CustomListItem = ({ children }) => (
    <MuiListItem
      sx={{
        margin: '5px',
        fontSize: '20px',
      }}
    >
      {children}
    </MuiListItem>
  );
const PromoContainer = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #ccc',
      width: '250px',
      height: '59px',
    }}
  >
    {children}
  </Box>
);
const PromoImage = ({ src }) => (
    <img
      src={src}
      alt="offers"
      style={{
        width: '50px',
        height: '50px',
      }}
    />
  );
  const PromoDetails = ({ children }) => (
    <Box
      component={Paper} // You can use Paper or another Material-UI component if needed
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
  
  const PromoTitle = ({ children }) => (
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 'bold',
      }}
    >
      {children}
    </Typography>
  );

  const PromoSubtitle = ({ children }) => (
    <Typography
      variant="subtitle2"
      sx={{
        fontStyle: 'italic',
      }}
    >
      {children}
    </Typography>
  );
  const PromoComponent = ({ title, subtitle, imageUrl }) => (
    <Box>
      <Typography variant="body1" marginTop={2} marginBottom={3}>Special Offer</Typography>
      <Paper sx={{ display: 'flex', alignItems: 'center', border: '2px solid #ccc', width: '300px' }}>
        <Box sx={{padding:1}}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <PromoSubtitle>{subtitle}</PromoSubtitle>
        </Box>
        <img
          src={imageUrl}
          alt="offers"
          style={{
            width:'50px',
            height:'50px',
          }}
        />
      </Paper>
    </Box>
  );
  const NewComponent = ({ services }) =>(
    <Box marginTop={3} >
      <Typography variant="h6" sx={{fontWeight:"700"}} >
        What's Included?
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        {services.map((service, index) =>(
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <List>
                <ListItem >
                  <ListItemIcon>
                    <img
                      alt="Included"
                      loading="lazy"
                      src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/Cart/%20Font%402x.png"
                    />
                  </ListItemIcon>
                  <ListItemText primary={service} />
                </ListItem>
              </List>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
  const ServiceSteps = ({ steps }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isStepsVisible, setIsStepsVisible] = useState(false);
    const toggleStepsVisibility = () => {
      setIsStepsVisible(!isStepsVisible);
    };
    return (
      <Box className="_2gj-N">
        <Box className="steps">
          <Typography variant="h6" fontWeight="bold" marginTop={2}>
            Steps After Booking
            <IconButton onClick={toggleStepsVisibility}>
              {isStepsVisible ? <ExpandMoreIcon /> : <RiArrowDropDownLine />}
            </IconButton>
          </Typography>
          <Paper sx={{marginTop:3,marginBottom:3}}>
          {isStepsVisible && (
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          </Paper>
        </Box>
      </Box>
    );
  };
  const CardComponent = ({ onClick }) => (
    <div style={{ display:"flex",justifyContent:"center" }}>
    <Card
      sx={{
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '80%', // Adjusted width
        backgroundColor: 'rgb(77, 175, 231)',
      }}
    >
      <div style={{ display: 'flex' ,justifyContent:"center", alignItems:"start" }}>
        <CardContent sx={{ flex: 1, padding: '16px' }}>
          <Typography
            variant="h4" // Adjusted heading variant
            sx={{ fontWeight: 'bold', color: '#fffffe' }}
          >
            GoMechanic Service Warranty
          </Typography>
          <Typography
            variant="body1"
            className="cardSubtitle"
            sx={{ fontSize: '1rem', color: '#fffffe' }}
          >
            1 month replacement warranty
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/detailPage/KhannaBar%402x.png"
          alt="Service Warranty"
          sx={{ flex: 1, height: 'auto', marginLeft: '540px' }}
        />
      </div>
      <div className="bottomSection">
        <Button
          className="knowMoreButton"
          onClick={onClick}
          sx={{
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            width: '100%',
          }}
        >
          Know More
        </Button>
      </div>
    </Card>
    </div>
  );
const Review = ({name, description, rating }) => (
  <Paper
    elevation={3}
    style={{
      padding: "10px",
      marginBottom: "15px",
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <Avatar
        style={{
          width: "50px",
          height: "50px",
          marginRight: "10px",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </Avatar>
      <div>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Rating name="read-only" value={rating} readOnly />
      </div>
    </div>
  </Paper>
);
const ReviewsSection = ({ reviews }) => (
  <Box>
    <Typography variant="h5" marginTop={3} marginBottom={2} sx={{fontWeight:"700"}}>Customer Reviews</Typography>
    <Box sx={{ display: "flex", gap: "20px" }}>
      {reviews.map((review, index) => (
        <Review key={index} {...review} />
      ))}
    </Box>
  </Box>
);
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHeading, setSelectedHeading] = useState("");
  const [isWarrantyPopupVisible, setIsWarrantyPopupVisible] = useState(false);

  const filteredPages = Object.values(pagesData).filter((page) =>
    page.headingText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dropdownOptions = Object.values(pagesData).map((page) => page.headingText);

  const toggleWarrantyPopup = () => {
    setIsWarrantyPopupVisible(!isWarrantyPopupVisible);
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedHeading(selectedValue);
    setSearchQuery(selectedValue); // Update searchQuery to match the selected heading text
  };

  return (
    <Container>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="filterDropdown">Filter by Heading Text: </label>
        <select
          id="filterDropdown"
          onChange={handleDropdownChange}
          value={selectedHeading}
        >
          <option value="">Select Heading Text</option>
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {filteredPages.map((page, pageIndex) => (
        <div key={pageIndex}>
          <ImageContainer>
            {page.images.map((image, index) => (
              <Image key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </ImageContainer>
          <HeadingContainer>
            <ArrowIcon />
            <Heading>{page.headingText}</Heading>
          </HeadingContainer>
          <CustomList>
            {page.pointsList.map((point, index) => (
              <CustomListItem key={index}>
                {React.createElement(point.icon)} {point.text}
              </CustomListItem>
            ))}
          </CustomList>
          <PromoComponent
            title={page.promo.title}
            subtitle={page.promo.subtitle}
            imageUrl={page.promo.imageUrl}
          />
          <NewComponent services={page.includedServices}/>
          <ServiceSteps steps={page.serviceSteps} />
          <CardComponent onClick={toggleWarrantyPopup} />
          {isWarrantyPopupVisible && <GoMechanicWarranty />}
          <ReviewsSection reviews={page.reviews} />
          <FaqAccordion faqData={page.faqData} />
        </div>
      ))}
      {filteredPages.length === 0 && (
        <Typography variant="body1">No matching results found.</Typography>
      )}
    </Container>
  );
};
export default Search;