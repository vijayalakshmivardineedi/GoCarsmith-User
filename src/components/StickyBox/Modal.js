import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, TextField, Button } from "@mui/material";
import Brands from "./Brands";
import SelectedCarDetails from "./Selected";

const Modal = ({ onClose }) => {
  const [userCars, setUserCars] = useState([]);
  const locationName = localStorage.getItem("locationName");
  const [forceUpdateKey, setForceUpdateKey] = useState(0); // New state variable

  const BrandName = localStorage.getItem("BrandName") || (userCars.length > 0 ? userCars[0].brandName : '');
  const modelId = localStorage.getItem("modelId") ||   (userCars.length > 0 ? userCars[0].modelId : '');
  const modelName = localStorage.getItem("modelName") ||  (userCars.length > 0 ? userCars[0].modelName : '');
  const fuelType = localStorage.getItem("fuelType") || (userCars.length > 0 ? userCars[0].fuelType : '');
  const modelImage = localStorage.getItem("imagePath") || (userCars.length > 0 ? userCars[0].modelImage : '');


  const hasStoredDetails =
    BrandName && modelId && modelName && modelImage && fuelType;

  const [isBrandsVisible, setIsBrandsVisible] = useState(false);

  const handleSelectCarsClick = () => {
    setIsBrandsVisible(true);
  };
  

  const handleBrandChangeClick = () => {
    localStorage.removeItem("BrandName");
    localStorage.removeItem("modelId");
    localStorage.removeItem("modelName");
    localStorage.removeItem("fuelType");

    setUserCars([]);
    setIsBrandsVisible(true);
    
  };

  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const userEmail = user?.email;
  const token = localStorage.getItem('token');

  const fetchUserCars = async () => {
    try {
      const response = await fetch(`https://gocarsmithbackend.onrender.com/api/user/getCarsByEmail/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const carsData = data.carsData;

        setUserCars((prevUserCars) => {
          const newUserCars = [...prevUserCars, ...carsData];
          localStorage.setItem("userCars", JSON.stringify(newUserCars));
          return newUserCars;
        });
      } else {
        console.error('Failed to fetch user cars');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserCars();
  }, [forceUpdateKey]); // Include forceUpdateKey in the dependencies

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="85vh"
    >
      {hasStoredDetails ? (
        <SelectedCarDetails
          key={`${BrandName}-${modelId}-${modelName}`}
          selectedBrand={BrandName}
          selectedModel={{
            _id: modelId,
            model: modelName,
            modelImage: modelImage,
          }}
          selectedFuelType={{ alt: fuelType }}
          onChangeClick={handleBrandChangeClick}
          onCloseClick={onClose}
        />
      ) : (
        <>
          <Brands onClickClose={onClose}/>
        </>
      )}
      
    </Box>
  );
};

export default Modal;