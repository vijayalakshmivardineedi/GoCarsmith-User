import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

// Define the Payment component for "Pay Cash"
const PayCashPayment = () => {
  return (
    <div>
      {/* Your Pay Cash Payment component content goes here */}
      <Typography variant="h4" gutterBottom>
        Pay Cash
      </Typography>
      {/* Add the content for the Pay Cash Payment component */}
    </div>
  );
};

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("payCash");
  const [openPayment, setOpenPayment] = useState(false);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
const navigate =useNavigate();
  const handlePayOnlineClick = () => {
    // Set the payment method and open the Payment component
    setPaymentMethod("payOnline");
    navigate("/payment");
  };

  const handlePayCashClick = () => {
    // Set the payment method and open the Pay Cash Payment component
    setPaymentMethod("payCash");
    setOpenPayment(true);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>
      Select a Payment and Proceed
      <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
        Pay After Service
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={paymentMethod}
          onChange={handlePaymentChange}
        >
          <FormControlLabel
            value="payCash"
            control={<Radio />}
            label={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                }}
                onClick={handlePayCashClick}
              >
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/payment_icon/paycash.png"
                  alt="Pay Cash"
                  style={{
                    width: 50,
                    marginBottom: 5,
                    background: "none",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  variant="caption"
                  style={{
                    color: paymentMethod === "payCash" ? "green" : "black",
                    fontSize: "17px",
                  }}
                >
                  Pay Cash
                </Typography>
              </div>
            }
          />
          <FormControlLabel
            value="payOnline"
            control={<Radio />}
            label={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "5px",
                }}
                onClick={handlePayOnlineClick}
              >
                <img
                  src="https://gomechprod.blob.core.windows.net/gomech-retail/gomechanic_assets/payment_icon/payonline.png"
                  alt="Pay Online"
                  style={{
                    width: 50,
                    marginBottom: 5,
                    background: "none",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  variant="caption"
                  style={{
                    color: paymentMethod === "payOnline" ? "green" : "black",
                    fontSize: "17px",
                  }}
                >
                  Pay Online
                </Typography>
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
      {/* Conditionally render the Payment component based on the selected payment method */}
      {openPayment && (
        <Payment paymentMethod={paymentMethod} onClose={() => setOpenPayment(false)} />
      )}
    </React.Fragment>
  );
}
