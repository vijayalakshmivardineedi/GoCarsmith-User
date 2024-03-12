import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SelectedCarDetails from "./Selected"; // Adjust the path accordingly

function Brands({onClickClose}) {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandModels, setBrandModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [view, setView] = useState("brands");
  const [fuelTypes, setFuelTypes] = useState([]);
  const [isCarDetailsVisible, setIsCarDetailsVisible] = useState(true);
  const fuelTypeImages = [
    {
      src: "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/fuel_type/PETROL.svg",
      alt: "Petrol",
    },
    {
      src: "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/fuel_type/CNG.svg",
      alt: "CNG",
    },
    {
      src: "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/fuel_type/DIESEL.svg",
      alt: "Diesel",
    },
    {
      src: "https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/fuel_type/electric.svg",
      alt: "Electric",
    },
  ];

  useEffect(() => {
    const fetchAllBrands = async () => {
      try {
        const response = await fetch(
          "https://gocarsmithbackend.onrender.com/api/user/getBrands"
        );
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
          setFilteredBrands(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAllBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const fetchModels = async () => {
        try {
          const response = await fetch(
            `https://gocarsmithbackend.onrender.com/api/user/getModel/${selectedBrand._id}`
          );
          if (response.ok) {
            const data = await response.json();
            setBrandModels(data);
          } else {
            console.error("Failed to fetch models");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchModels();
    }
  }, [selectedBrand]);

  const handleModelClick = (model) => {
    setSelectedModel(model);
    setView("fueltypes");
    localStorage.setItem("modelName", model.model);
    localStorage.setItem("modelId", model._id);
    localStorage.setItem("imagePath", model.modelImage);
    console.log(model);
  };

  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const fetchFuelTypes = async () => {
        try {
          const response = await fetch(
            `https://gocarsmithbackend.onrender.com/api/user/getFuelTypesByBrandAndModel/${selectedBrand._id}/${selectedModel._id}`
          );
          if (response.ok) {
            const data = await response.json();
            setFuelTypes(data.fuelTypes);
            console.log(data.fuelTypes);
          } else {
            console.error("Failed to fetch fuel types");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchFuelTypes();
    }
  }, [selectedBrand, selectedModel]);

  const handleFuelTypeSelect = (fuelType) => {
    setSelectedFuelType(fuelType);

    // Store selectedBrand, selectedModel, and selectedFuelType in localStorage
    if (selectedBrand && selectedModel && fuelType) {
      localStorage.setItem("modelId", selectedModel._id);
      localStorage.setItem("modelName", selectedModel.model);
      localStorage.setItem("fuelType", fuelType.alt);
    }
  };

  const handleBackClick = () => {
    if (view === "fueltypes") {
      setView("brands");
    } else if (view === "models") {
      setView("brands");
    }
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedFuelType(null);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
    const filtered = brands.filter((brand) =>
      brand.brandName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBrands(filtered);
  };
  
  const [isBrandsVisible, setIsBrandsVisible] = useState(false);
  const handleBrandChangeClick = () => {
    localStorage.removeItem("BrandName");
    localStorage.removeItem("modelId");
    localStorage.removeItem("modelName");
    localStorage.removeItem("fuelType");
    
    setIsBrandsVisible(true);
    setIsCarDetailsVisible(false);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    localStorage.setItem("BrandId", brand._id);
    localStorage.setItem("BrandName", brand.brandName);
  };
  const filteredFuelTypeImages = fuelTypeImages.filter((image) =>
    fuelTypes.includes(image.alt)
  );
  return (
    <div style={{ flexGrow: 1 }}>
      {isCarDetailsVisible && (
      <Card
        style={{
          minWidth: 250,
          height: 500,
          maxWidth: 400,
          borderRadius: "1px",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: "0",
        }}
      >
        <CardContent>
        { selectedBrand ? (
            selectedModel ? (
              selectedFuelType ? (
                <SelectedCarDetails
                  selectedBrand={selectedBrand.brandName}
                  selectedModel={selectedModel}
                  selectedFuelType={selectedFuelType}
                  onChangeClick={handleBrandChangeClick}
                  onCloseClick={onClickClose}
                />
              ) : (
                <Grid
                  container
                  spacing={2}
                  style={{
                    marginTop: "1px",
                    padding: "10px",
                    overflowY: "auto",
                    maxHeight: "calc(80vh - 180px)",
                  }}
                >
                  <AppBar position="static" style={{ marginBottom: "1px" }}>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                      <Typography variant="h6">
                        <IconButton
                          edge="start"
                          aria-label="back"
                          style={{ color: "#fff" }}
                          onClick={handleBackClick}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                        <strong>Select Fuel Type</strong>
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  {filteredFuelTypeImages.map((fuelType, index) => (
                    <Grid item key={fuelType.alt} xs={12} sm={3} md={4} lg={4}>
                      <div onClick={() => handleFuelTypeSelect(fuelType)}>
                        <img
                          src={fuelType.src}
                          alt={fuelType.alt}
                          style={{
                            width: "70%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto",
                            cursor: "pointer",
                          }}
                        />
                        <Typography variant="subtitle1" textAlign={"center"}>
                          {fuelType.alt}
                        </Typography>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              )
            ) : (
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "1px",
                  padding: "10px",
                  overflowY: "auto",
                  maxHeight: "calc(80vh - 180px)",
                }}
              >
                <AppBar position="static" style={{ marginBottom: "1px" }}>
                  <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">
                      <IconButton
                        edge="start"
                        aria-label="back"
                        style={{ color: "#fff" }}
                        onClick={handleBackClick}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <strong>Select Models</strong>
                    </Typography>
                  </Toolbar>
                </AppBar>
                {brandModels.map((model) => (
                  <Grid
                    item
                    key={model._id}
                    xs={12}
                    sm={3}
                    md={4}
                    lg={4}
                    style={{ position: "relative", overflow: "hidden" }}
                    onClick={() => handleModelClick(model)}
                  >
                    <div
                      style={{
                        transition: "transform 1s",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <img
                        src={`https://gocarsmithbackend.onrender.com${model.modelImage}`}
                        alt={model.model || "Model Image"}
                        style={{
                          width: "70%",
                          height: "auto",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                      <Typography variant="subtitle1" textAlign={"center"}>
                        {model.model}
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            )
          ) : (
            <div style={{ marginTop: "10px" }}>
                {view === "brands" && (
              <Grid
                container
                spacing={2}
                style={{
                  marginTop: "1px",
                  padding: "10px",
                  overflowY: "auto",
                  maxHeight: "calc(80vh - 180px)",
                }}
              >
                <AppBar position="static" style={{ marginBottom: "1px" }}>
                  <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">
                      <strong>Select Brands</strong>
                    </Typography>
                  </Toolbar>
                </AppBar>
                <TextField
                  style={{ marginBottom: "1px", marginTop: "15px" }}
                  label="Search Brands"
                  variant="outlined"
                  fullWidth
                  value={searchText}
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="inherit" aria-label="search">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {filteredBrands.map((brand) => (
                  <Grid
                    item
                    key={brand._id}
                    xs={12}
                    sm={3}
                    md={4}
                    lg={4}
                    onClick={() => handleBrandClick(brand)}
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <div
                      style={{
                        transition: "transform 1s",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <img
                        src={`https://gocarsmithbackend.onrender.com${brand.brandImage}`}
                        alt={brand.name}
                        style={{
                          width: "80%",
                          height: "55px",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                      <Typography variant="subtitle1" textAlign={"center"}>
                        {brand.brandName}
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
                )}
            </div>
          )}
        </CardContent>
      </Card>)}
      {isBrandsVisible && <Brands />}
    </div>
  );
}

export default Brands;