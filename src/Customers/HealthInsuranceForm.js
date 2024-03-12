import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const HealthInsuranceForm = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  const [formData, setFormData] = useState({
    userId: userId,
    holderName: "",
    address: "",
    DOB: "",
    gender: "",
    CoverPhoto: null,
    insuranceCompany: "",
    policyPlan: "",
    contactNumber: "",
  });
  console.log(formData.CoverPhoto);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    try {
      const response = await axios.post(
        `https://gocarsmithbackend.onrender.com/api/createHealthCard`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        navigate("/HealthCard");
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  return (
    <Card variant="outlined" style={{ margin: "20px", padding: "20px" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <IconButton
            sx={{ fontSize: "20px" }}
            onClick={() => navigate("/HealthCard")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" sx={{ marginLeft: 2 }}>
            Health Insurance Card
          </Typography>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="User ID"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Holder Name"
                name="holderName"
                value={formData.holderName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="DOB"
                name="DOB"
                type="date"
                value={formData.DOB}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Insurance Company</InputLabel>
                <Select
                  name="insuranceCompany"
                  value={formData.insuranceCompany}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Insurance Company</MenuItem>
                  <MenuItem value="National Health Authority">
                    National Health Authority
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Policy Plan</InputLabel>
                <Select
                  name="policyPlan"
                  value={formData.policyPlan}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Policy Plan</MenuItem>
                  <MenuItem value="For Individuals">For Individuals</MenuItem>
                  <MenuItem value="For Family">For Family</MenuItem>
                  <MenuItem value="For Senior Citizens">
                    For Senior Citizens
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <input
                type="file"
                name="CoverPhoto"
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "black",
                  fontWeight: 700,
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthInsuranceForm;
