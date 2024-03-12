import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Grid,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";
import Feature from "ol/Feature";
import { Form } from "react-bootstrap";
import Select from "react-select";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";

import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import axios from "axios";
import Profile from "../Customers/Profile";
import { IoMdClose } from "react-icons/io";


const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
 
  const navigate = useNavigate();


  const userString1 = localStorage.getItem("user");
const user = JSON.parse(userString1);
const userId = user?._id;

const userValuesPresent = userId ;
  
  const handleCardClick1 = (card) => {
    if (userValuesPresent) {
      // All required user-related values are present, navigate to the page
      navigate(card.link);
      // window.location.reload();
    } else {
      // Display alert when user-related values are missing
      window.alert("Please Login...");
    }
  };
  ////////////
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Dummy data for search suggestions (replace it with your actual data)

  const allWords = ["Regular AC Service", "High Performance AC Service",
    "Cooling Coil Replacement", "Condenser Replacement",
    "Compressor Replacement", "Heating coil Replacement",
    "V-Belt Replacement", "Radiator Flush & Clean",
    "AC Blower Motor Replacement", "Radiator Replacement",
    "Radiator Fan Motor Replacement",//AcRepair

    "Amaron (44 Months Warranty)", "Amaron (55 Months Warranty)",
    "Amaron (66 Months Warranty)", "Exide (44 Months Warranty)",
    "Exide (55 Months Warranty)", "Exide (66 Months Warranty)",
    "Livguard (60 Months Warranty)", "Livguard (72 Months Warranty)",
    "Alternator Replacement", "Alternator Repair",//Bateries

    "360° Deep Cleaning", "Car Interior Spa",
    "Deep All Round Spa", "Premium Top Wash",
    "Car Rubbing & Polishing", "Rat & Pest Repellent Treatment",
    "Car Inspection & Diagnostics", "Sunroof Service",//cleaning cleaning Spa

    "Second Hand Car Inspection", "Road Trip Inspection",
    "Engine Scanning", "Insurance Claim Inspection",
    "Complete Suspension Inspection", "Car Fluids Check",
    "Radiator Flush and Clean", "Radiator Replacement Inspection",
    "Car Waterlog & Assistance", "Radiator Fan Motor Replacement Inspection",
    "Car Engine Issues", "Problem with Car Brakes & Wheels",
    "DAMAGED CAR BODY INTERIORS",// car inspection

    "Clutch Set Replacement", "Clutch Bearing Replacement",
    "Flywheel Replacement", "Flywheel Turning",
    "Clutch Overhaul", "Front Bumper Replacement",
    "Rear Bumper Replacement", "Bonnet Replacement",
    "Boot Replacement", "Fender Replacement",
    "Right Front Door Replacement", "Right Rear Door Replacement",
    "Left Front Door Replacement", "Left Rear Door Replacement",
    "Clutch & Transmission Troubles", "ABS Issue",//clutch

    "Front Bumper Paint", "Bonnet Paint",
    "Rear Bumper Paint", "Boot Paint",
    "Full body Dent Paint", "Alloy Paint",
    "Left Fender Paint", "Left Front Door Paint",
    "Left Rear Door Paint", "Left Quarter Panel Paint",
    "Left Running Board Paint", "Right Fender Paint",
    "Right Front Door Paint", "Right Rear Door Paint",
    "Right Quarter panel Paint", "Right Running Board Paint",//denting


    "3M™ Car Rubbing & Polishing", "Ceramic Coating",
    "Megular’s Ceramic Coating", "3M™ Teflon Coating",
    "Megular’s Teflon Coating", //"PPF & Paint Protections Film",
    "Anti Rust Underbody Coating", "Silencer Coating",//detailing


    "Know Your Policy", "Accidental Denting & Painting (Insurance)",
    "Car Flood Damage (Insurance)", "Fire Damage Assistance (Insurance)",
    "Windshield Replacement (Insurance)", "Key Replacement (Insurance)",
    "Tyres & Wheel Replacement (Insurance)", "Battery Replacement (Insurance)",//
    "Car Theft Claim (Insurance)", "ECM Replacement (Insurance)",
    "Doorstep Accidental Inspection", "Towing (Insurance)",
    "Insurance Claim Inspection Details",//insurance



    "Basic Service", "Standard Service",
    "Comprehensive Service", "Front Brake Pads",
    "Rear Brake Shoes", "Front Brake Discs",
    "Caliper Pin Replacement", "Disc Turning",
    "Handbrake Wire Replacement", "Brake Durms Turning",
    "Wheel Cylinder Replacement",//periodic


    "Battery Jumpstart", "Car Engine Scanning",
    "Car Fluid Leakage", //"Wheel-Lift Tow 20 Kms",
    "Car Self Starter Issue", //"Flat-Bed Tow 20 Kms",
    "Clutch Breakdown", "Car Flooding",
    "Insurance Accident", "Brake Failure",
    "Critical Dashboard Light", "Wrong Fuel Emergency",//sos


    "EPS Module Repair", "Steering Rack Repair",
    "Front Shock Absorber Replacement", "Rear Shock Absorber Replacement",
    "Suspension Lower Arm Replacement", "Link Rod Replacement",
    "Tie Rod End Replacement","Complete Suspension Inspection Suspension",
    "Front Shocker Mount Replacement", "Front Axle Repair",
    "Silencer Repair","Radiator Replacement Suspension",
    "Gear Box Mounting Replacement", "Engine Mounting Replacement",
    "Fuel Pump Replacement","Radiator Fan Motor Replacement Suspension",
    "Water Pump Replacement", "ECM Repair",
    "Dickey Shocker Replacement","Premium Top Wash Suspension",
    "Mud Flaps", "Door Latch Replacement",
    "Power Window Repair",//suspension


    "Apollo Alnac 4GS", "Apollo Amazer 4G Life",
    "MRF ZLX", "MRF ZVTY",
    "MRF", "JK UX ROYALE",
    "BRIDGESTONE B290", "BRIDGESTONE ECOPIA",
    "BRIDGESTONE B290", "CEAT MILAZE SIZE",
    "CEAT MILAZE X3", "CEAT MILAZE",
    "COMPLETE WHEEL CARE", "MUD FLAPS",//tyres



    "Front Windshield Replacement", "Rear Windshield Replacement",
    "Door Glass Replacement", "Front Head light",
    "Rear Taillight", "Fog Light",
    "Side Mirror Replacement",//windshields


  ];

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    // Filter words that contain the search query
    const results = allWords.filter((word) => word.toLowerCase().includes(query));
    setSearchResults(results);
  };

  const keywordPageMapping = {
    "Regular AC Service": "/AcRepair/${word}", // Use template literal to insert the keyword
    "High Performance AC Service": "/AcRepair/${word}",
    "Cooling Coil Replacement": "/AcRepair/${word}",
    "Condenser Replacement": "/AcRepair/${word}",
    "Compressor Replacement": "/AcRepair/${word}",
    "Heating coil Replacement": "/AcRepair/${word}",
    "V-Belt Replacement": "/AcRepair/${word}",
    "Radiator Flush & Clean": "/AcRepair/${word}",
    "AC Blower Motor Replacement": "/AcRepair/${word}",
    "Radiator Replacement": "/AcRepair/${word}",
    "Radiator Fan Motor Replacement": "/AcRepair/${word}",//ac

    "Amaron (44 Months Warranty)": "/Batteries/${word}",
    "Amaron (55 Months Warranty)": "/Batteries/${word}",
    "Amaron (66 Months Warranty)": "/Batteries/${word}",
    "Exide (44 Months Warranty)": "/Batteries/${word}",
    "Exide (55 Months Warranty)": "/Batteries/${word}",
    "Exide (66 Months Warranty)": "/Batteries/${word}",
    "Livguard (60 Months Warranty)": "/Batteries/${word}",
    "Livguard (72 Months Warranty)": "/Batteries/${word}",
    "Alternator Replacement": "/Batteries/${word}",
    "Alternator Repair": "/Batteries/${word}",//batteries

    "360° Deep Cleaning": "/CarCleaning/${word}",
    "Car Interior Spa": "/CarCleaning/${word}",
    "Deep All Round Spa": "/CarCleaning/${word}",
    "Premium Top Wash": "/CarCleaning/${word}",
    "Car Rubbing & Polishing": "/CarCleaning/${word}",
    "Rat & Pest Repellent Treatment": "/CarCleaning/${word}",
    "Car Inspection & Diagnostics": "/CarCleaning/${word}",
    "Sunroof Service": "/CarCleaning/${word}",//car cleaning

    "Second Hand Car Inspection": "/CarInspections/${word}",
    "Road Trip Inspection": "/CarInspections/${word}",
    "Engine Scanning": "/CarInspections/${word}",
    "Insurance Claim Inspection": "/CarInspections/${word}",
    "Complete Suspension Inspection": "/CarInspections/${word}",
    "Car Fluids Check": "/CarInspections/${word}",
    "Radiator Flush and Clean": "/CarInspections/${word}",
    "Radiator Replacement Inspection": "/CarInspections/${word}",
    "Radiator Fan Motor Replacement Inspection": "/CarInspections/${word}",
    "Car Waterlog & Assistance": "/CarInspections/${word}",
    "Car Engine Issues": "/CarInspections/${word}",
    "Problem with Car Brakes & Wheels": "/CarInspections/${word}",
    "DAMAGED CAR BODY INTERIORS": "/CarInspections/${word}",// car inspection

    

    "Clutch Set Replacement": "/Clutch/${word}",
    "Clutch Bearing Replacement": "/Clutch/${word}",
    "Flywheel Replacement": "/Clutch/${word}",
    "Flywheel Turning": "/Clutch/${word}",
    "Clutch Overhaul": "/Clutch/${word}",
    "Front Bumper Replacement": "/Clutch/${word}",
    "Rear Bumper Replacement": "/Clutch/${word}",
    "Bonnet Replacement": "/Clutch/${word}",
    "Boot Replacement": "/Clutch/${word}",
    "Fender Replacement": "/Clutch/${word}",
    "Right Front Door Replacement": "/Clutch/${word}",
    "Right Rear Door Replacement": "/Clutch/${word}",
    "Left Front Door Replacement": "/Clutch/${word}",
    "Left Rear Door Replacement": "/Clutch/${word}",
    "Clutch & Transmission Troubles": "/Clutch/${word}",
    "ABS Issue": "/Clutch/${word}",//clutch

    "Front Bumper Paint": "/Denting/${word}",
    "Bonnet Paint": "/Denting/${word}",
    "Rear Bumper Paint": "/Denting/${word}",
    "Boot Paint": "/Denting/${word}",
    "Full body Dent Paint": "/Denting/${word}",
    "Alloy Paint": "/Denting/${word}",
    "Left Fender Paint": "/Denting/${word}",
    "Left Front Door Paint": "/Denting/${word}",
    "Left Rear Door Paint": "/Denting/${word}",
    "Left Quarter Panel Paint": "/Denting/${word}",
    "Left Running Board Paint": "/Denting/${word}",
    "Right Fender Paint": "/Denting/${word}",
    "Right Front Door Paint": "/Denting/${word}",
    "Right Rear Door Paint": "/Denting/${word}",
    "Right Quarter panel Paint": "/Denting/${word}",
    "Right Running Board Paint": "/Denting/${word}",//denting


    "3M™ Car Rubbing & Polishing": "/Detailing/${word}",
    "Ceramic Coating": "/Detailing/${word}",
    "Megular’s Ceramic Coating": "/Detailing/${word}",
    "3M™ Teflon Coating": "/Detailing/${word}",
    "Megular’s Teflon Coating": "/Detailing/${word}",
    "PPF & Paint Protections Film": "/Detailing/${word}",
    "Anti Rust Underbody Coating": "/Detailing/${word}",
    "Silencer Coating": "/Detailing/${word}",//detailing


    "Know Your Policy": "/Insurance/${word}",
    "Accidental Denting & Painting (Insurance)": "/Insurance/${word}",
    "Car Flood Damage (Insurance)": "/Insurance/${word}",
    "Fire Damage Assistance (Insurance)": "/Insurance/${word}",
    "Windshield Replacement (Insurance)": "/Insurance/${word}",
    "Key Replacement (Insurance)": "/Insurance/${word}",
    "Tyres & Wheel Replacement (Insurance)": "/Insurance/${word}",
    "Battery Replacement (Insurance)": "/Insurance/${word}",
    "Car Theft Claim (Insurance)": "/Insurance/${word}",
    "ECM Replacement (Insurance)": "/Insurance/${word}",
    "Doorstep Accidental Inspection": "/Insurance/${word}",
    "Towing (Insurance)": "/Insurance/${word}",
    "Insurance Claim Inspection Details": "/Insurance/${word}",//insurance



    "Basic Service": "/Periodic/${word}",
    "Standard Service": "/Periodic/${word}",
    "Comprehensive Service": "/Periodic/${word}",
    "Front Brake Pads": "/Periodic/${word}",
    "Rear Brake Shoes": "/Periodic/${word}",
    "Front Brake Discs": "/Periodic/${word}",
    "Caliper Pin Replacement": "/Periodic/${word}",
    "Disc Turning": "/Periodic/${word}",
    "Handbrake Wire Replacement": "/Periodic/${word}",
    "Brake Durms Turning": "/Periodic/${word}",
    "Wheel Cylinder Replacement": "/Periodic/${word}",//periodic


    "Battery Jumpstart": "/Sos/${word}",
    "Car Engine Scanning": "/Sos/${word}",
    "Car Fluid Leakage": "/Sos/${word}",
    "Wheel-Lift Tow 20 Kms": "/Sos/${word}",
    "Car Self Starter Issue": "/Sos/${word}",
    "Flat-Bed Tow 20 Kms": "/Sos/${word}",
    "Clutch Breakdown": "/Sos/${word}",
    "Car Flooding": "/Sos/${word}",
    "Insurance Accident": "/Sos/${word}",
    "Brake Failure": "/Sos/${word}",
    "Critical Dashboard Light": "/Sos/${word}",
    "Wrong Fuel Emergency": "/Sos/${word}",//sos


    "EPS Module Repair": "/Suspension/${word}",
    "Steering Rack Repair": "/Suspension/${word}",
    "Front Shock Absorber Replacement": "/Suspension/${word}",
    "Rear Shock Absorber Replacement": "/Suspension/${word}",
    "Suspension Lower Arm Replacement": "/Suspension/${word}",
    "Link Rod Replacement": "/Suspension/${word}",
    "Tie Rod End Replacement": "/Suspension/${word}",
    "Complete Suspension Inspection Suspension": "/Suspension/${word}",
    "Front Shocker Mount Replacement": "/Suspension/${word}",
    "Front Axle Repair": "/Suspension/${word}",
    "Silencer Repair": "/Suspension/${word}",
    "Radiator Replacement Suspension": "/Suspension/${word}",
    "Gear Box Mounting Replacement": "/Suspension/${word}",
    "Engine Mounting Replacement": "/Suspension/${word}",
    "Radiator Fan Motor Replacement Suspension": "/Suspension/${word}",
    "Fuel Pump Replacement": "/Suspension/${word}",
    "Water Pump Replacement": "/Suspension/${word}",
    "ECM Repair": "/Suspension/${word}",
    "Premium Top Wash Suspension": "/Suspension/${word}",
    "Dickey Shocker Replacement": "/Suspension/${word}",
    "Mud Flaps": "/Suspension/${word}",
    "Door Latch Replacement": "/Suspension/${word}",
    "Power Window Repair": "/Suspension/${word}",//suspension


    "Apollo Alnac 4GS": "/Tyres/${word}",
    "Apollo Amazer 4G Life": "/Tyres/${word}",
    "MRF ZLX": "/Tyres/${word}",
    "MRF ZVTY": "/Tyres/${word}",
    "MRF": "/Tyres/${word}",
    "JK UX ROYALE": "/Tyres/${word}",
    "BRIDGESTONE B290": "/Tyres/${word}",
    "BRIDGESTONE ECOPIA": "/Tyres/${word}",
    "BRIDGESTONE B290": "/Tyres/${word}",
    "CEAT MILAZE SIZE": "/Tyres/${word}",
    "CEAT MILAZE X3": "/Tyres/${word}",
    "CEAT MILAZE": "/Tyres/${word}",
    "COMPLETE WHEEL CARE": "/Tyres/${word}",
    "MUD FLAPS": "/Tyres/${word}",//tyres



    "Front Windshield Replacement": "/WindShields/${word}",
    "Rear Windshield Replacement": "/WindShields/${word}",
    "Door Glass Replacement": "/WindShields/${word}",
    "Front Head light": "/WindShields/${word}",
    "Rear Taillight": "/WindShields/${word}",
    "Fog Light": "/WindShields/${word}",
    "Side Mirror Replacement": "/WindShields/${word}",


    // Add more mappings as needed
  };


  const handleWordClick = (word) => {
    // Check if the clicked word has a corresponding page in the mapping
    const pagePath = keywordPageMapping[word];

    if (pagePath) {
      // Navigate to the specific page when a word is clicked
      const finalPath = pagePath.replace("${word}", word); // Replace "${word}" with the actual keyword
      navigate(finalPath);

      // Clear search results and query
      setSearchResults([]);
      setSearchQuery("");
    } else {
      console.error(`No mapping found for keyword: ${word}`);
    }
  };



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClose2 = () => {
    setDialogOpen(false);
    handleClose1(); // Close the menu as well
  };

  const handleProfileClick = () => {
    setDialogOpen(true);
    handleClose1(); // Close the menu after opening the dialog
  };  




  const isUserLoggedIn = !!localStorage.getItem("token");
  const handleLogOut = async () => {
    try {
      // Retrieve authorization token from local storage
      const token = localStorage.getItem("token");
      console.log(token);

      // Make a request to the signout API endpoint with the authorization header
      const response = await axios.post(
        "https://gocarsmithbackend.onrender.com/api/user/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Successfully signed out

        // Clear all items from local storage
        localStorage.clear();
        setAnchorEl1(null); // Reset anchorEl1

        // Redirect to the login page or any other desired page
        navigate("/");
      } else {
        // Failed to sign out
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleButtonClick = () => {
    // Open a new window with the specified URL
    window.open('/blog/home', '_blank');
  };
  // MapIntegration
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [anchorElMap, setAnchorElMap] = useState({});
  const mapRef = useRef(null);
  let map;
  const vectorLayer = new VectorLayer({
    source: new VectorSource(),
  });
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setTarget(null); // Remove the map from the previous target
    }
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: "https://ows.terrestris.de/osm/service",
            params: { LAYERS: "OSM-WMS" },
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([78.9629, 22.5937]),
        zoom: 4,
        maxZoom: 18,
        pixelRatio: window.devicePixelRatio,
      }),
    });
    mapRef.current = map;
    const popup = new Overlay({
      element: document.createElement("div"),
      positioning: "top-center",
      offset: [0, -10],
      stopEvent: false,
    });
    popup.getElement().classList.add("custom-popup");
    map.addOverlay(popup);
    map.once("rendercomplete", () => {
      if (selectedLocation !== "Locations") {
        getServiceCenters(selectedLocation, popup);
      }
      // Now that the map is fully initialized, set up event listeners
      // and add features with popup
      setupMapEventListeners(map, popup);
    });
    return () => {
      map.setTarget(null); // Remove the map on component unmount
    };
  }, [selectedLocation]);
  const setupMapEventListeners = (map, popup) => {
    // Show popup on pointermove
    map.on("pointermove", (event) => {
      const feature = map.forEachFeatureAtPixel(
        event.pixel,
        (feature) => feature
      );
      const coordinates = event.coordinate;
      if (popup && feature) {
        const properties = feature.getProperties();
        const content = `<p style="background-color: white; border-radius:5px; padding: 2px">${properties.Name}</p>`;
        popup.getElement().innerHTML = content;
        popup.setPosition(coordinates);
      } else {
        if (popup) {
          popup.setPosition(undefined);
        }
      }
    });
    // Hide popup on mouseout
    map.getViewport().addEventListener("mouseout", () => {
      if (popup) {
        popup.setPosition(undefined);
      }
    });
  };
  const createMarker = (location, popup) => {
    console.log("Creating marker for:", location);
    const marker = new Feature({
      geometry: new Point(
        fromLonLat([location.address.Longitude, location.address.Latitude])
      ),
    });
    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://res.cloudinary.com/dlstbthzk/image/upload/v1701350867/pointer_6823515_unskpe.png",
          scale: 0.09,
        }),
      })
    );
    marker.set("Name", location.serviceCenterName);
    marker.set("Locate", location.address.Name);
    marker.set("City", location.serviceCenterCity);
    vectorLayer.getSource().addFeature(marker);
    // Popup
    marker.on("click", (event) => {
      const coordinates = event.coordinate;
      const content = `
                <p style="background-color: white; padding: 2px">${location.serviceCenterName}</p>
                <p style="background-color: white; padding: 2px">${location.address.Name}</p>
                <p style="background-color: white; padding: 2px">${location.serviceCenterCity}</p>
            `;
      // Set content using textContent to avoid HTML injection issues
      popup.getElement().textContent = "";
      popup.getElement().appendChild(createPopupContent(content));
      popup.setPosition(coordinates);
      map.addOverlay(popup);
    });
  };
  // Function to create a div element with the specified HTML content
  const createPopupContent = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div;
  };
  const [serviceCenterData, setServiceCenterData] = useState([]);
  
  useEffect(() => {
    if (serviceCenterData && serviceCenterData.length > 0) {
      const ServiceCenter = serviceCenterData[0]._id;
      localStorage.setItem("ServiceCenter", ServiceCenter);
      console.log("ServiceCenter set in localStorage:", ServiceCenter);
    } else {
      console.error("serviceCenterData is empty or not an array");
    }
  }, [serviceCenterData]); // Add dependencies based on your component's logic
  const getServiceCenters = (location, popup) => {
    const _id = localStorage.getItem("location");
    vectorLayer.getSource().clear(); // Clear existing markers
    axios
      .get(`https://gocarsmithbackend.onrender.com/api/getServicesCenterByLocation/${_id}`)
      .then((response) => {
        console.log("Service center data:", response.data); // Log the data
        setServiceCenterData(response.data)
        response.data.forEach((location) => {
          createMarker(location, popup);
        });
      })
      .catch((error) => {
        console.error("Error fetching service center data:", error);
      });
  };
  useEffect(() => {
    if (selectedLocation !== "Locations") {
      getServiceCenters(selectedLocation);
    }
    console.log(selectedLocation);
  }, [selectedLocation]);


  const [locations, setLocations] = useState([]);
  const token = localStorage.getItem("token");
   
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://gocarsmithbackend.onrender.com/api/user/getLocations"
        );
        if (response.status === 200) {
          const data = response.data; // Check the structure of the response
         
          setLocations(data.locationList); // Access the locations array
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLocations();
  }, []);
  const handleCloseMenu = (brandId) => {
    setAnchorElMap({
      ...anchorElMap,
      [brandId]: null,
    });
  };

  const handleSelectedLocationChange = (value) => {
    // Find the selected location object
    const selectedLocationObject = locations.find(
      (location) => location.name === value
    );

    if (selectedLocationObject) {
      // Update state
      setSelectedLocation(value);

      // Save location ID and name to localStorage
      localStorage.setItem("location", selectedLocationObject._id);
      localStorage.setItem("parentId", selectedLocationObject._id);
      localStorage.setItem("locationName", selectedLocationObject.name);

      // Reload the page
      window.location.reload();
    }
  };

  // Effect to initialize the selected location from localStorage
  useEffect(() => {
    const savedLocationId = localStorage.getItem("location");
    const savedLocationName = localStorage.getItem("locationName");

    if (savedLocationId && savedLocationName) {
      setSelectedLocation(savedLocationName);
    }
  }, []);
  const [selectCenter, setSelectCenter] = useState("");

  const handleSelectedCenter = (value) => {
    // Find the selected location object
    setSelectCenter(value);
    localStorage.setItem("ServiceCenter", value);
  };

  // Effect to initialize the selected location from localStorage
  useEffect(() => {
    const savedLocationId = localStorage.getItem("location");
    const savedLocationName = localStorage.getItem("locationName");
    const serviceCenterId = localStorage.getItem("ServiceCenter");
    if (savedLocationId && savedLocationName) {
      setSelectedLocation(savedLocationName);
    }
  }, []);

  useEffect(() => {
    const savedLocationId = localStorage.getItem("location");
    const savedLocationName = localStorage.getItem("locationName");
    if (!savedLocationId || !savedLocationName) {
      // Set default location to Hyderabad if not found in localStorage
      const hyderabadLocation = locations.find(
        (location) => location.name === "Hyderabad"
      );

      if (hyderabadLocation) {
        setSelectedLocation("Hyderabad");
        localStorage.setItem("location", hyderabadLocation._id);
        localStorage.setItem("parentId", hyderabadLocation._id);
        localStorage.setItem("locationName", hyderabadLocation.name);
      }
    } else {
      setSelectedLocation(savedLocationName);
    }
  }, [locations]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <img
            src="https://res.cloudinary.com/du9ucrizw/image/upload/v1701775031/Screenshot__35_-removebg-preview_pjeocu.png"
            alt="Logo"
            style={{ height: "80px", width: "auto", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Typography>
        <Grid container direction="row" alignItems="center">
          <Grid>
            <Form.Group className="mb-2" controlId="locations-dropdown">
              <Form.Select
                value={selectedLocation}
                onChange={(e) => handleSelectedLocationChange(e.target.value)}
                className="form-select"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  width: "200px",
                  marginRight: "5px",
                  cursor:"pointer"
                }}
              >
                {locations && locations.length > 0 ? (
                  locations.map((location) => (
                    <option key={location._id} value={location.name}>
                      {location.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No locations available</option>
                )}
              </Form.Select>
            </Form.Group>
          </Grid>
          <Grid>
            <Form.Group className="mb-2" controlId="locations-dropdown">
              <Form.Select
                value={selectCenter}
                onChange={(e) => handleSelectedCenter(e.target.value)}
                className="form-select"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  width: "200px",
                  cursor:"pointer"
                }}
              >
                {serviceCenterData && serviceCenterData.length > 0 ? (
                  serviceCenterData.map((center) => (
                    <option key={center._id} value={center._id}>
                      {center.serviceCenterName}
                    </option>
                  ))
                ) : (
                  <option disabled>No Service Center available</option>
                )}
              </Form.Select>
            </Form.Group>
          </Grid>
        </Grid>

        <div style={{ display: "flex", alignItems: "center" }}>
  <InputBase
    placeholder="Search..."
    value={searchQuery}
    onChange={handleSearchChange}
    style={{
      color: "white",
      width: "200px",
      backgroundColor: "#333",
      borderRadius: "4px",
      padding: "6px",
      marginLeft: 2,
    }}
  />
  <IconButton color="inherit" aria-label="search">
    <SearchIcon />
  </IconButton>
  {/* Display search results */}
  {searchQuery && (
    <div style={{ position: "absolute", top: "calc(100% + 5px)", left: "1099px", zIndex: 1500, backgroundColor: "#fff", color: "#000" }}>
      {/* Search results content */}
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          // Split the result into parts before and after the typed letters
          const index = result.toLowerCase().indexOf(searchQuery);
          const before = result.substring(0, index);
          const matched = result.substring(index, index + searchQuery.length);
          const after = result.substring(index + searchQuery.length);

          return (
            <div key={result} style={{ padding: "8px", borderBottom: "1px solid #ccc", cursor: "pointer" }} onClick={() => handleWordClick(result)}>
              {before}
              <span style={{ backgroundColor: "yellow" }}>{matched}</span>
              {after}
            </div>
          );
        })
      ) : (
        <div style={{ padding: "8px", color: "#ccc" }}>
          No search results found
        </div>
      )}
    </div>
  )}
</div>


        <Button color="inherit" onClick={()=>handleCardClick1({link:"/cart"})}>
          Cart
        </Button>
        <Button color="inherit" onClick={handleButtonClick}>
        Blog
      </Button>
        <Button
          color="inherit"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          More
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {" "}
          <Link
            to="/about"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>About</MenuItem>
          </Link>{" "}
          <Link
            to="/Contact"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>Contact Us</MenuItem>
          </Link>{" "}
          <Link to="/faq" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem onClick={handleClose}>FAQ's</MenuItem>
          </Link>
          <Link
            to="/terms"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>Terms</MenuItem>
          </Link>{" "}
          <Link
            to="/privacy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>Privacy</MenuItem>
          </Link>{" "}
          <Link
            to="/partners"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>Partners</MenuItem>
          </Link>{" "}
          <Link
            to="/offers"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>Offers</MenuItem>
          </Link>{" "}
          <Link
            to="/review"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>Reviews</MenuItem>
          </Link>
        </Menu>
        {isUserLoggedIn ? (
          // Render "Log Out" button when user is logged in
          <>
            <Button
              color="inherit"
              onClick={handleClick1}
              sx={{ marginLeft: "10px" }}
            >
              Customer
            </Button>
            <Menu
              anchorEl={anchorEl1}
              open={Boolean(anchorEl1)}
              onClose={handleClose1}
            >
             
                <MenuItem onClick={() => handleProfileClick()}>Profile</MenuItem>
             
              <Link
                to="/GoMoney"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={() => handleClose1()}>GoApp Money</MenuItem>
              </Link>
              <Link
                to="/Orderhistory"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={() => handleClose1()}>
                  Order History
                </MenuItem>
              </Link>
              <Link
                to="/HealthCard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={() => handleClose1()}>Health Card</MenuItem>
              </Link>
              <Link
                to="/MyCars"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={() => handleClose1()}>My Cars</MenuItem>
              </Link>
              <Link
                to="/ManageAddress"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={() => handleClose1()}>
                  Manage Address
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}   maxWidth="md" // Set the maxWidth to 'lg' (large)
          fullWidth >
            <DialogTitle style={{ display:"flex" ,justifyContent:"flex-end",}}>
            
    <IoMdClose onClick={()=>setDialogOpen(false)}  style={{cursor:"pointer",opacity:"0.6" ,fontSize:"25px"}}/>
            </DialogTitle>
        <Profile/>
      </Dialog>
          </>
        ) : (
          // Render "Log In" button when user is not logged in
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;