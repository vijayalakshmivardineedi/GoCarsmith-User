import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const Carousel = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const keywords = [
      "/Periodic",
      "/AcRepair",
      "/Batteries",
      "/Tyres",
      "/Denting",
      "/Detailing",
      "/CarCleaning",
      "/CarInspections",
      "/WindShields",
      "/Suspension",
      "/Clutch",
      "/Insurance",
      "/Sos",
    ];
  
    const matchedIndex = keywords.findIndex(keyword => path.startsWith(keyword) || path.endsWith(keyword));
  
    if (matchedIndex !== -1) {
      setValue(matchedIndex);
    } else {
      setValue(0); // Default to the first tab if the route doesn't match any keyword
    }
  }, [location.pathname]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          bgcolor: "background.paper",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          justifyContent: "space-around",
          color: "red",
        }}
      >
      <Tabs
  value={value}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons
  aria-label="visible arrows tabs example"
  sx={{
    [`& .${tabsClasses.scrollButtons}`]: {
      "&.Mui-disabled": { opacity: 0.3 },
    },
    "& .MuiTab-root": {
      padding: "20px",
      fontSize: "14px",
      fontWeight: "bold",
      textTransform: "none",
      cursor: "pointer",
    },
    "& .Mui-selected": {
      color: "#ff0000", // Set the color for the active tab
    },
  }}
>
          <Tab
            label="Periodic Services"
            icon={<CarCrashIcon />}
            component={Link}
            to="/Periodic"
          />
          <Tab
            label="AC Services & Repair"
            icon={<AcUnitIcon />}
            component={Link}
            to="/AcRepair"
          />
          <Tab
            label="Batteries"
            icon={<BatteryChargingFullIcon />}
            component={Link}
            to="/Batteries"
          />
          <Tab
            label="Tyres & Wheel Care"
            icon={<DirectionsCarIcon />}
            component={Link}
            to="/Tyres"
          />
          <Tab
            label="Denting & Painting"
            icon={<BuildIcon />}
            component={Link}
            to="/Denting"
          />
          <Tab
            label="Detailing Services"
            icon={<EmojiTransportationIcon />}
            component={Link}
            to="/Detailing"
          />
          <Tab
            label="Car Spa & Cleaning"
            icon={<LocalCarWashIcon />}
            component={Link}
            to="/CarCleaning"
          />
          <Tab
            label="Car Inspection"
            icon={<AirportShuttleIcon />}
            component={Link}
            to="/CarInspections"
          />
          <Tab
            label="WindShields & Lights"
            icon={<VisibilityIcon />}
            component={Link}
            to="/WindShields"
          />
          <Tab
            label="Suspension & Fitments"
            icon={<BuildCircleIcon />}
            component={Link}
            to="/Suspension"
          />
          <Tab
            label="Clutch & Body Parts"
            icon={<DriveEtaIcon />}
            component={Link}
            to="/Clutch"
          />
          <Tab
            label="Insurance Claims"
            icon={<GppGoodIcon />}
            component={Link}
            to="/Insurance"
          />
          <Tab
            label="SOS Services"
            icon={<ContactSupportIcon />}
            component={Link}
            to="/Sos"
          />
        </Tabs>
      </Box>
    </div>
  );
};

export default Carousel;
