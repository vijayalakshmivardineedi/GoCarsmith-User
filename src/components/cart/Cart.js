import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
// import "./Cart.css"
const Cart = ( { cartItems, onDelete, onApplyCoupon }) => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [showCoupons, setShowCoupons] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [enteredCouponCode, setEnteredCouponCode] = useState("");

  const [discountAmount, setDiscountAmount] = useState(null);
  const [lengthOfArray, setLengthOfArray] = useState(null);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          "https://gocarsmithbackend.onrender.com/api/user/getCoupons",
          {}
        );
        if (response.status === 200) {
          const currentDate = new Date();
          const activeCoupons = response.data.filter(
            (coupon) => new Date(coupon.expiryDate) > currentDate
          );
          setCoupons(activeCoupons);
        } else {
          console.error("Failed to fetch coupons");
        }
      } catch (error) {
        console.error("Error while fetching coupons:", error);
      }
    };

    const getCartItems = async () => {
      
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/getUserCartBy/${userId}`
        );
        setCartData(response.data);
       
        setLengthOfArray(response.data[0].listOfServices.length)
        setError(null);
      } catch (error) {
        console.error("Error while fetching coupons:", error);
        setCoupons([]);
        setError("Failed to fetch coupons.");
      }
    };

    fetchCoupons();
    getCartItems();
   
  }, [userId]);

  let totalAmount = 0;

  const calculateTotalAmount = () => {
    cartData.forEach((listOf) => {
      listOf.listOfServices.forEach((item) => {
        totalAmount += item.price;
      });
    });
    return totalAmount;
  };

  const wholeAmount = calculateTotalAmount();

  const handleApplyCoupon = async () => {
    try {
      if (enteredCouponCode) {
        // Filter coupons based on enteredCouponCode
        const filteredCoupons = coupons.filter(coupon => coupon.code.toLowerCase().includes(enteredCouponCode.toLowerCase()));
  
        if (filteredCoupons.length === 0) {
          setError('No matching coupons found.');
          return;
        }
  
        // Assuming you want to use the first matching coupon
        const selectedCoupon = filteredCoupons[0];
  
        const response = await axios.post(
          "https://gocarsmithbackend.onrender.com/api/user/applayCoupon",
          {
            couponCode: selectedCoupon.code,
            totalAmount: wholeAmount,
          }
        );
  
        const { discountedAmount } = response.data;
        localStorage.setItem("Coupon", selectedCoupon.discountValue);
        setDiscountAmount(discountedAmount);
        setSelectedCoupon(selectedCoupon);
        setError(null);
      } else if (selectedCoupon) {
        const response = await axios.post(
          "https://gocarsmithbackend.onrender.com/api/user/applayCoupon",
          {
            couponCode: selectedCoupon.code,
            totalAmount: wholeAmount,
          }
        );
  
        const { discountedAmount } = response.data;
        localStorage.setItem("Coupon", selectedCoupon.discountValue);
        setDiscountAmount(discountedAmount);
        setError(null);
      } else {
        setError("Please enter a coupon code or select a coupon before applying.");
      }
    } catch (error) {
      console.error("Error while applying coupon:", error.response.data.error);
      setError("Failed to apply coupon. Please check the code and try again.");
    }
  };
  
  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleShowCoupons = () => {
    setShowCoupons(!showCoupons);
  };

  const handleRemoveItem = async (listIndex, _id) => {
    try {
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      const userId = user?._id;
      const itemId = _id;
      const response = await axios.delete(
        `https://gocarsmithbackend.onrender.com/api/removeCartItemBy/${userId}/${itemId}`
      );
      if (response.status === 200) {
       
        try {
          const response = await axios.get(
            `https://gocarsmithbackend.onrender.com/api/getUserCartBy/${userId}`
          );
          setCartData(response.data);
          setLengthOfArray(response.data[0].listOfServices.length)
          setError(null);
        } catch (error) {
          console.error("Error while fetching coupons:", error);
          setCoupons([]);
          setError("Failed to fetch coupons.");
        }
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response.data.error
      );
    }
  };


  return (
    
    <div style={{ margin: "20px", display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Typography variant="h4">Shopping Cart</Typography>
        <List style={{ listStyle: "none",
        //  width:"600px",height:"550px", 
        //  borderBottom:"3px solid #6e6c6b" 
          }} 
         className="scrollBar">
          {cartData.map((listOf, listIndex) =>
            listOf.listOfServices.map((item, itemIndex) => (
              <Paper
                key={item._id}
                elevation={3}
                style={{
                  marginBottom: "20px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative", // Ensure the position is relative
                }}
              >
                <ListItem>
                  <div style={{ flex: 1, padding: "10px" }}>
                    <ListItemText
                      primary={
                        <Typography variant="h6" style={{ fontWeight: "bold" }}>
                          {item.name}
                        </Typography>
                      }
                      secondary={`Price: ${item.price.toFixed(2)}`}
                    />
                  </div>
                  <IconButton
                    color="error"
                    style={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={() => handleRemoveItem(listIndex, item._id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </ListItem>
              </Paper>
            ))
          )}
        </List>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <Typography variant="h6">
            <b>Total Amount:</b>
          </Typography>
          <Typography variant="h6">
            <b>{wholeAmount}</b>
          </Typography>
        </div>
        {discountAmount !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px",
            }}
          >
            <Typography variant="h6">
              <b>Final Price:</b>{" "}
            </Typography>
            <Typography variant="h6">
              <b>{discountAmount.toFixed(2)}</b>
            </Typography>
          </div>
        )}
      <Button
        onClick={() => navigate(lengthOfArray > 0 ? "/Checkout" : "/")}
        variant="contained"
        color="primary"
        style={{
          margin: "20px",
          cursor: "pointer",
          alignItems: "right",
          backgroundColor: "red",
          color: "white",
        }}
      >
        {lengthOfArray > 0 ? "CheckOut" : "Click To Book Select Your Service"}
      </Button>
      </div>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <Typography variant="h4">Coupons</Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Enter Coupon Code"
            variant="outlined"
            margin="normal"
            fullWidth
            value={enteredCouponCode}
            onChange={(e) => setEnteredCouponCode(e.target.value)}
          />

          <Button
            onClick={handleApplyCoupon}
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px", cursor: "pointer", backgroundColor: "red",
            color: "white", }}
          >
            Apply 
          </Button>

        </div>
        {lengthOfArray > 0 ? showCoupons && (
          <div>
            {coupons.map((coupon) => (
             <Paper
             key={coupon._id}
             elevation={3}
             style={{
               marginBottom: "10px",
               borderRadius: "12px",
               overflow: "hidden",
               cursor: "pointer",
               backgroundColor: selectedCoupon && selectedCoupon._id === coupon._id ? "#e0e0e0" : "white", // Change the background color as needed
             }}

             onClick={() => handleSelectCoupon(coupon)}
           >

             <div style={{ padding: "10px" }}>
               <Typography variant="h6">{coupon.code}</Typography>
               <Typography>{coupon.description}</Typography>
               <Typography>
                 Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}
               </Typography>
             </div>
           </Paper>
            ))}
            <div>
              <br />
            </div>
          </div>
        ) : ""}
        
        {lengthOfArray > 0 ? !showCoupons && (
          <Button
            style={{
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={handleShowCoupons}
          >
            Show Coupons
          </Button>
        ): ""}
        
        {error && (
          <div style={{ marginTop: "10px", color: "red" }}>
            <Typography>{error}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
