

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SelectedCarDetails = ({ selectedBrand, selectedModel, selectedFuelType , onChangeClick,onCloseClick}) => {
  return (
    <Card  style={{
      minWidth: 250,
      height: 535,
      maxWidth: 400,
      borderRadius: "1px",
      position: "sticky",
      top: "0",
    }}>
      <CardContent>
        <img
          src={`https://gocarsmithbackend.onrender.com${selectedModel.modelImage}`}
          alt={selectedModel.model || "Model Image"}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            marginBottom: "20px",
          }}
        />
        <Typography variant="subtitle1">Brand: {selectedBrand}</Typography>
        <Typography variant="subtitle1">Model: {selectedModel.model}</Typography>
        <Typography variant="subtitle1">Fuel Type: {selectedFuelType.alt}</Typography>
     
      </CardContent>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"0px 10px 0px 10px" }}>
      <button onClick={onChangeClick} style={{margin:"10px" , 
      fontSize:"19px", padding:4,backgroundColor:"#033a4d" 
      , color:"white", border:"1px solid #033a4d", borderRadius:"5px" ,letterSpacing:"2px"}}>Change</button>
      <button onClick={onCloseClick} style={{margin:"10px", fontSize:"19px" ,
      borderRadius:"5px",border:"1px solid red", backgroundColor:"red" ,
       padding:4,letterSpacing:"2px"}}>Close</button>
     
      </div>
     </Card>
  );
};

export default SelectedCarDetails;