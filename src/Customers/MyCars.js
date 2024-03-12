import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MyCars = () => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [year, setYear] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [userCars, setUserCars] = useState([]);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userEmail = user?.email;
  const token = localStorage.getItem("token"); // Assuming your token is stored in the user object

  const fetchAllBrands = async () => {
    
    try {
      const response = await fetch("https://gocarsmithbackend.onrender.com/api/user/getBrands", {
        headers: {
          Authorization: `Bearer ${token}`,
        },});
      if (response.ok) {
        const data = await response.json();
        // Add brandImage property to each brand
        const brandsWithImages = data.map((brand) => ({
          ...brand,
          brandImage: `https://gocarsmithbackend.onrender.com${brand.brandImage}`,
        }));
        setBrands(brandsWithImages);
      } else {
        console.error("Failed to fetch brands");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchModels = async (brandId) => {
    try {
      const response = await fetch(
        `https://gocarsmithbackend.onrender.com/api/user/getModel/${brandId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },}
      );
      if (response.ok) {
        const data = await response.json();
        // Add modelImage property to each model
        const modelsWithImages = data.map((model) => ({
          ...model,
          modelImage: `https://gocarsmithbackend.onrender.com${model.modelImage}`,
        }));
        setModels(modelsWithImages);
      } else {
        console.error("Failed to fetch models");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserCars = async () => {
    try {
      const response = await fetch(
        `https://gocarsmithbackend.onrender.com/api/user/getCarsByEmail/${userEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserCars(data.carsData);
      } else {
        console.error("Failed to fetch user cars");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchUserCars();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    setSelectedBrand(brandId);
    fetchModels(brandId);

    // Log selected brand image path
    const selectedBrandObj = brands.find((brand) => brand._id === brandId);
    if (selectedBrandObj) {
      console.log("Selected Brand Image Path:", selectedBrandObj.brandImage);
    }
  };

  const handleModelChange = (event) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);

    // Log selected model image path
    const selectedModelObj = models.find((model) => model._id === modelId);
    if (selectedModelObj) {
      console.log("Selected Model Image Path:", selectedModelObj.modelImage);
    }
  };

  const handleSave = async () => {
    try {
      const carsData = [
        {
          BrandId: selectedBrand,
          brandName:
            brands.find((brand) => brand._id === selectedBrand)?.brandName ||
            "",
          modelId: selectedModel,
          modelName:
            models.find((model) => model._id === selectedModel)?.model || "",
          modelImage:
            models
              .find((model) => model._id === selectedModel)
              ?.modelImage.replace(/^https:\/\/gocarsmithbackend.onrender.com/, "") || "",
          fuelType: selectedFuelType,
          registrationNumber,
          year,
          kilometers,
        },
      ];

      const requestData = {
        email: userEmail,
        carsData,
      };

      console.log("Email:", userEmail);
      console.log("Cars Data:", carsData);

      const response = await fetch(
        "https://gocarsmithbackend.onrender.com/api/user/addCarsToUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        console.log("Car details saved successfully");
        // Fetch user cars after successful save
        fetchUserCars();
      } else {
        console.error("Failed to save car details");
      }
    } catch (error) {
      console.error("Error saving car details:", error);
    } finally {
      // Close the dialog whether the request was successful or not
      handleClose();
    }
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };


  const handleDelete = async (carId) => {
    try {
      const response = await fetch(
        `https://gocarsmithbackend.onrender.com/api/user/deleteCar/${userEmail}/${carId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      if (response.ok) {
        console.log("Car deleted successfully");
        showSnackbar("Car deleted successfully", "success");
        // Optionally, you can update the UI or perform other actions
        fetchUserCars(); // Refresh the user cars after deletion
      } else {
        console.error("Failed to delete car");
        showSnackbar("Failed to delete car", "error");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      showSnackbar("Error deleting car", "error");
    }
  };
  const handleEditKilometers = async (carId, newKilometers) => {
    try {
      const response = await fetch(
        `https://gocarsmithbackend.onrender.com/api/user/editKilometers/${userEmail}/${carId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ kilometers: newKilometers }),
        }
      );

      if (response.ok) {
        console.log("Kilometers updated successfully");
        // Optionally, you can update the UI or perform other actions
        fetchUserCars(); // Refresh the user cars after editing kilometers
      } else {
        console.error("Failed to update kilometers");
      }
    } catch (error) {
      console.error("Error updating kilometers:", error);
    }
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleClickOpen}
            style={{ backgroundColor: "#1976D2", color: "white" }}
          >
            <b>+ Add</b>
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      Add Vehicle
      <IconButton color="inherit" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  </DialogTitle>
  <DialogContent>
    <form>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{marginTop:"10px"}}>
          <FormControl fullWidth >
            
          <InputLabel id="Brands-label">Brands</InputLabel>
            <Select value={selectedBrand} onChange={handleBrandChange} id="Brands-label" label="Brands">
              {brands.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  <img
                    src={brand.brandImage}
                    alt={brand.brandName}
                    style={{ height: "20px", marginRight: "8px" }}
                  />
                  {brand.brandName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth  sx={{marginTop:"10px"}}>
            <InputLabel  id="Models-label">Model</InputLabel>
            <Select value={selectedModel} onChange={handleModelChange} id="Models-label" label="Model">
              {models.map((model) => (
                <MenuItem key={model._id} value={model._id}>
                  <img
                    src={model.modelImage}
                    alt={model.model}
                    style={{ height: "20px", marginRight: "8px" }}
                  />
                  {model.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="fuelType-label">Fuel Type</InputLabel>
            <Select
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
              id="fuelType-label" label="Fuel Type"
            >
              <MenuItem value="Petrol">Petrol</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="CNG">CNG</MenuItem>
              <MenuItem value="Electrical">Electrical</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Kilometers"
            value={kilometers}
            onChange={(e) => setKilometers(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box textAlign="right" mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </form>
  </DialogContent>
</Dialog>


      {/* Display User Cars in Cards */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" p={2}>
        {userCars.map((car, index) => (
          <Card key={index} style={{ margin: "8px", width: "auto" }}>
            
            <CardMedia
              component="img"
              height="200"
              image={`https://gocarsmithbackend.onrender.com${car.modelImage}`}
              alt={car.modelName}
            />

            <CardContent>
              <Typography variant="h6" component="div">
                {car.brandName} - {car.modelName}
              </Typography>
              <Typography color="textSecondary">
                {car.fuelType}, {car.year}
              </Typography>
              <Typography variant="body1" paragraph>
                Registration: {car.registrationNumber}
              </Typography>
              <TextField
                label="Kilometers"
                fullWidth
                value={car.kilometers}
                onChange={(e) => handleEditKilometers(car._id, e.target.value)}
              />
            </CardContent>
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
        {/* Snackbar for notifications */}
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
          action={
            <CloseIcon
              fontSize="inherit"
              onClick={handleSnackbarClose}
              style={{ cursor: "pointer" }}
            />
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MyCars;
