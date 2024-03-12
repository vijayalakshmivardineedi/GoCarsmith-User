import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { MdExpandMore } from "react-icons/md";

import Button from '@mui/material/Button';

const Coupons = () => {
  const [isTCDropdownVisible, setTCDropdownVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const toggleTCDropdown = (offer) => {
    setSelectedOffer(offer);
    setTCDropdownVisible(!isTCDropdownVisible);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Main Card */}
      <Card style={{ width: '500px', border: '1px solid black', borderRadius: '12px', overflow: 'hidden' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <ArrowBackIcon /> Apply Offers GoApp Money
          </Typography>

          {/* Coupon Input Field */}
          <TextField
            label=" ENTER COUPON"
            variant="outlined"
            fullWidth
            style={{ marginTop: 16, marginBottom: 25 }}
          />

          {/* Available Offers Card */}
          <Typography variant="h6" gutterBottom>
            <b>Available Offers</b>
          </Typography>

          <Card style={{ border: '1px solid #b0a8a7', marginBottom: 16 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ color: 'red', fontWeight: 'bold' }}>
                GOCarsmith
              </Typography>
              <p>FLAT 20% OFF On Car Spa & Cleaning Services.</p>

              <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', marginBottom: '8px' }}>
                <p style={{ cursor: 'pointer', color: '#c489f5', margin: 0 }} onClick={() => toggleTCDropdown("GOCarsmith")}>
                  View T&C
                </p>
                <IconButton
                  edge="end"
                  aria-label="dropdown"
                  onClick={() => toggleTCDropdown("GOCarsmith")}
                  style={{ marginLeft: 'auto' }}
                >
                  {isTCDropdownVisible ? <ExpandLessIcon /> : <MdExpandMore />}
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>WINTERWASH</Typography>
                <Button variant="contained" color="primary">
                  APPLY
                </Button>
              </div>
            </CardContent>
          </Card>

          <Typography variant="h6" gutterBottom>
            <b>Payment Offers</b>
          </Typography>
          <Card style={{ border: '1px solid #b0a8a7', marginBottom: '16px' }}>
            <CardContent>
                <img src="https://gomechprod.blob.core.windows.net/gm-retail-app/logo/SBI-card-checkout-page-icon.png" alt="SBI Cards No Cost EMI" style={{height:"100px" ,width:"75%", padding:10 }} />

              <p>SBI Cards No Cost EMI</p>
              <hr/>
              <Button variant="contained" color="primary">
                SBI CARDS NO COST EMI
              </Button>
            </CardContent>
          </Card>

          <Card style={{ border: '1px solid #b0a8a7' }}>
            <CardContent>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvA73Vf6p-U484mvxE46qzyri5KsCiL8-k83g_4PWsBoLZ2c4yLY_YCzR5hKyTDDLCxg&usqp=CAU" alt="Mobikwik Cashback Offer" />
             
              <p>
                5% Cashback With Mobikwik Upto 300
              </p>
              <hr/>
              <Button variant="contained" color="primary">
                MOBIKWIK CASHBACK OFFER
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Coupons;
