import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Appointment from "./Appointment";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Payment from "./Payment";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";
const steps = [
  "Shipping address",
  "Select Appointment",
  "Review your order",
  "Payment details",
];

dayjs.locale("en");

const serviceCenterId = localStorage.getItem("ServiceCenter");

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

export default function CheckoutPage() {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  // const userId=`6565e96d2511d67373083655`
  //addressform
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phoneNumber: "",
    saveAddress: false,
  });
  const [cartData, setCartData] = useState([]);
  // Event handler for input changes
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    phoneNumber: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update the corresponding field in formData based on input type
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error when the user starts typing
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Add your validation rules here
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
    }

    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
    }

    if (formData.address1.trim() === '') {
      newErrors.address1 = 'Address line 1 is required';
    }

    if (formData.phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    if (formData.city.trim() === '') {
      newErrors.city = 'City is required';
    }

    if (formData.zip.trim() === '') {
      newErrors.zip = 'Zip code is required';
    }

    if (formData.country.trim() === '') {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };



  const [coins,setCoins]=useState({})
  //appointment

  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [currentDate, setCurrentDate] = React.useState(dayjs());
  const [totalAmount, setTotalAmount] = useState(0);
  const GoCarsmithCoins= coins[0]  * (50/100) || 0
  const gst = parseInt(totalAmount * (18 / 100));
  const coupon = localStorage.getItem("Coupon");
  const Discount = parseInt(totalAmount * (coupon / 100));

  const SafetyFee = 105;

  const subTotal = Math.abs(totalAmount + gst + SafetyFee - (Discount+GoCarsmithCoins))
  const [servicesList, setServicesList] = useState([]);

  const parseData = JSON.parse(userString);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  const startMorningHour = 10;
  const endMorningHour = 12;
  const startAfternoonHour = 12;
  const endAfternoonHour = 16;
  const startEveningHour = 16;
  const endEveningHour = 18;

  const generateTimeSlots = (startHour, endHour, labelPrefix) => {
    
    const currentHour = currentDate.hour();

    const currentMinute = currentDate.minute();

    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const label = `${hour}-${hour + 1} ${hour < 12 ? "AM" : "PM"}`;
      const id = `${labelPrefix}${hour}`;
      if (currentDate.isSame(dayjs(), "day") && hour <= currentHour) {
        // Skip past time slots for the current day
        continue;
      }
      slots.push({ label, id });
    }

    return slots;

  };
  const handleDateChange = (newDate) => {
    setCurrentDate(dayjs(newDate));
    setSelectedSlot(null)
  };
  const morningSlots = generateTimeSlots(
    startMorningHour,
    endMorningHour,
    "morning"
  );
  const afternoonSlots = generateTimeSlots(
    startAfternoonHour,
    endAfternoonHour,
    "afternoon"
  );
  const eveningSlots = generateTimeSlots(
    startEveningHour,
    endEveningHour,
    "evening"
  );

  const areAllSlotsDisabled =
    morningSlots.length === 0 &&
    afternoonSlots.length === 0 &&
    eveningSlots.length === 0;

  const [activeStep, setActiveStep] = React.useState(0);
  // payment form

  const [paymentMethod, setPaymentMethod] = useState("payCash");
  const [openPayment, setOpenPayment] = useState(false);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const navigate = useNavigate();
  const handlePayOnlineClick = () => {
    // Set the payment method and open the Payment component
    setPaymentMethod("payOnline");

   
    // navigate("/payment");
  };

 



  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        // return <AddressForm />;
        return (
          <React.Fragment>
          <Typography variant="h6" gutterBottom >
            Shipping address
          </Typography>
    
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
    
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                value={formData.address1}
                onChange={handleInputChange}
                error={!!errors.address1}
                helperText={errors.address1}
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                autoComplete="tel"
                variant="standard"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={formData.city}
                onChange={handleInputChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
                value={formData.state}
                onChange={handleInputChange}
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                value={formData.zip}
                onChange={handleInputChange}
                error={!!errors.zip}
                helperText={errors.zip}
              />
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                value={formData.country}
                onChange={handleInputChange}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
    
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleInputChange}
                  />
                }
                label="Use this address for payment details"
              />
            </Grid>
          </Grid>
        </React.Fragment>
        );

      case 1:
        // return <Appointment />;
        return (
          <React.Fragment>
            <Grid container item md={12}>
              <Grid item md={6} marginTop={"10px"}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Select Appointment Date:
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker"]}
                    sx={{ marginTop: "20px" }}
                  >
                    <DatePicker
                      label="Select Date"
                      minDate={dayjs()}
                      value={currentDate}
                      format="DD/MM/YYYY"
                      onChange={(newDate) => handleDateChange(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item md={6} marginTop={"10px"}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Pick Time Slots:
                </Typography>

                {areAllSlotsDisabled ? (
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{ marginTop: "10px" }}
                  >
                    No slots are available for the selected date.
                  </Typography>
                ) : (
                  <>
                    <Grid
                      item
                      md={12}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <img
                        src="https://gomechprod.blob.core.windows.net/gomech-retail/openweather_icons/Early%20Morning.webp"
                        alt="morning"
                      />
                      <Typography variant="h6" gutterBottom marginLeft={2}>
                        Morning Slots:
                      </Typography>
                    </Grid>

                    <Grid container item spacing={2} md={12}>
                      {morningSlots.map((slot) => (
                        <Grid item md={6} key={slot.id}>
                          <Button
                            key={slot.id}
                            onClick={() => handleSlotSelect(slot.label)}
                            style={{
                              width: "90%",
                              height: "40px",
                              color:
                                selectedSlot === slot.label
                                  ? "#FFFFFF"
                                  : "#000000",
                              backgroundColor:
                                selectedSlot === slot.label
                                  ? "#333333"
                                  : "#FFFFFF",
                              borderRadius: "8px",
                            }}
                          >
                            {slot.label}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid
                      item
                      md={12}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <img
                        src="https://gomechprod.blob.core.windows.net/gomech-retail/openweather_icons/Afternoon.png"
                        alt="afternoon"
                      />
                      <Typography variant="h6" gutterBottom marginLeft={3}>
                        Afternoon Slots:
                      </Typography>
                    </Grid>
                    <Grid container item spacing={2} md={12}>
                      {afternoonSlots.map((slot) => (
                        <Grid item md={6} key={slot.id}>
                          <Button
                            key={slot.id}
                            onClick={() => handleSlotSelect(slot.label)}
                            style={{
                              width: "90%",
                              height: "40px",
                              color:
                                selectedSlot === slot.label
                                  ? "#FFFFFF"
                                  : "#000000",
                              backgroundColor:
                                selectedSlot === slot.label
                                  ? "#333333"
                                  : "#FFFFFF",
                              borderRadius: "8px",
                            }}
                          >
                            {slot.label}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid
                      item
                      md={12}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <img
                        src="https://gomechprod.blob.core.windows.net/gomech-retail/openweather_icons/Evening.png"
                        alt="evening"
                      />
                      <Typography variant="h6" gutterBottom marginLeft={3}>
                        Evening Slots:
                      </Typography>
                    </Grid>
                    <Grid container item spacing={2} md={12}>
                      {eveningSlots.map((slot) => (
                        <Grid item key={slot.id} xs={6}>
                          <Button
                            onClick={() => handleSlotSelect(slot.label)}
                            style={{
                              width: "90%",
                              height: "40px",
                              color:
                                selectedSlot === slot.label
                                  ? "#FFFFFF"
                                  : "#000000",
                              backgroundColor:
                                selectedSlot === slot.label
                                  ? "#333333"
                                  : "#FFFFFF",
                              borderRadius: "8px",
                            }}
                          >
                            {slot.label}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        );

      case 2:
        // return <Review />;
        return (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" style={{fontWeight:"bold",fontSize:"25px"}} gutterBottom>
                Order Summary
              </Typography>
             
            </div>
            <List disablePadding>
              {cartData.map((cartItems) =>
                cartItems.listOfServices.map((product) => (
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary={product.name}
                      secondary={product.desc}
                    />
                    <Typography variant="body2">{product.price}</Typography>
                  </ListItem>
                ))
              )}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="GST" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  &#8377; {gst}
                </Typography>
              </ListItem>
             
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Safe & Warranty Fee" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  &#8377; {SafetyFee}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Discount" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  &#8377; {Discount}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="GoCarsmith Coins" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  &#8377; {GoCarsmithCoins}
                </Typography>
              </ListItem>
              <hr style={{width:"100%", border:"2px solid #054cb0",}}/>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="You Pay" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  &#8377; {subTotal}
                </Typography>
              </ListItem>
              <hr style={{width:"100%", border:"2px solid #054cb0",}}/>
            </List>
            <Grid container item spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Customer Address
                </Typography>
                <Typography gutterBottom>
                  {formData.firstName} {formData.lastName}
                </Typography>
                <Typography gutterBottom>{formData.address1}</Typography>
                <Typography gutterBottom>{formData.address2}</Typography>
                <Typography gutterBottom>{formData.phoneNumber}</Typography>
                <Typography gutterBottom>
                  {formData.city} {formData.state}
                </Typography>
                <Typography gutterBottom>
                  {formData.zip} {formData.country}
                </Typography>
              </Grid>

            </Grid>
          </React.Fragment>
        );

      case 3:
        // return <PaymentForm />;
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
                          color:
                            paymentMethod === "payCash" ? "green" : "black",
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
                          color:
                            paymentMethod === "payOnline" ? "green" : "black",
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
          </React.Fragment>
        );

      default:
        throw new Error("Unknown step");
    }
  };
  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const calculateCartAmount = () => {
    let total = 0;

    cartData.forEach((eachCart) => {
      setServicesList(eachCart.listOfServices);
      const cartAmount = eachCart.listOfServices.reduce(
        (acc, item) =>
          acc + parseFloat(item.price), // Assuming price is a string, convert it to a number
        0
      );

      total += cartAmount;
    });

    setTotalAmount(total);
  };

  useEffect(() => {
    const getCarrtDetails = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/getUserCartBy/${userId}`
        );

        if (response.status === 200) {
          const data = response.data;
          setCartData(data);
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCarrtDetails();
    const getReferalData = async () => {
            
      try {
          const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/getReferalDetailsBy/${userId}`);
          if (response.status === 200) {

              setCoins(response.data.map(item =>parseInt(item.totalMoney)))

          } else {
              console.log("Referral failed");
          }
      } catch (error) {
          console.error('Error earning coins:', error);
      }
  }
  getReferalData()

   
  }, [userId]);
 

 useEffect(() => {
    calculateCartAmount();
  }, [cartData]);
  // const carModel = localStorage.getItem("modelName");
  // const fuelType = localStorage.getItem("fuelType");
  // const Brand = localStorage.getItem("BrandName");

  const userStrings = localStorage.getItem("userCars");
  const userCars = JSON.parse(userStrings);
  const usermodelId = userCars?.[0]?.modelId;
  const usermodelName= userCars?.[0]?.modelName;
  const userfuelType = userCars?.[0]?.fuelType;
  const userBrandId = userCars?.[0]?.BrandId;
  const userBrandName = userCars?.[0]?.brandName;
  
 const imagePath = localStorage.getItem("imagePath") || userCars?.[0]?.modelImage;

  const currentModelId = localStorage.getItem("modelId");
  const currentfuelType = localStorage.getItem("fuelType");
  const currentBrandId = localStorage.getItem("BrandId");
  const currentBrandName = localStorage.getItem("BrandName");
  const currentmodelName = localStorage.getItem('modelName')
  const modelId = currentModelId  || usermodelId;
  const fuelType = currentfuelType  || userfuelType;
  const BrandId = currentBrandId || userBrandId;
  const Brand = currentBrandName || userBrandName;
  const carModel = currentmodelName || usermodelName;
  const locationName = localStorage.getItem("locationName");
  const location = localStorage.getItem("location");
  


  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(activeStep + 1);
      if (activeStep === steps.length - 3) {
        if (!selectedSlot){
      
        setActiveStep(activeStep);
        }
      } else {
        setActiveStep(activeStep + 1);
      }
        if (activeStep === steps.length - 1) {
        // If it's the last step, handle place order or pay now based on the selected payment method
        if (paymentMethod === "payCash") {
          // Handle place order logic for Pay Cash
          placeOrder();
          // setTimeout(() => {
          //   navigate('/Success')
          // }, 3000);
        } else if (paymentMethod === "payOnline") {
          localStorage.setItem("Coins", GoCarsmithCoins);
          // Handle pay now logic for Pay Online
          setOpenPayment(true);
        }
      }
    } else {
      setActiveStep(activeStep);
    }
  };
  
  const orderDetails = {
    formData,
    servicesList,
    userId,
    carModel,
    fuelType,
    email: parseData.email,
    serviceCenterId,
    selectedSlot,
    currentDate,
    subTotal,gst,
    Discount,
    SafetyFee,
    paymentMethod: "PAID",
    Brand,
    imagePath,
  };

  const placeOrder = async () => {
    const payAfterService = {
      formData,
      servicesList,
      userId,
      carModel,
      fuelType,
      email: parseData.email,
      serviceCenterId,
      selectedSlot,
      currentDate,
      subTotal,gst,
      Discount,
      SafetyFee,
      paymentMethod: "CASH",
      Brand,
      imagePath,
    };
    const deductMoneyData={
      userId:userId,
      amountToUse:GoCarsmithCoins
    }
    try {
      const response = await axios.post(
        `https://gocarsmithbackend.onrender.com/api/user/AddAppointment`,
        payAfterService,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem("Coupon", 0);
       
        const response = await axios.delete(
          `https://gocarsmithbackend.onrender.com/api/removeCart`, {
            data: deductMoneyData, // Pass the data in the 'data' property of the config object
          }
        );

        if (response.status === 200) {
          console.log("remove cart")
        } else {
          console.log("fail to clear cart data");
        }
       
        

      } else {
        console.error("Failed to fetch locations");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handlePayCashClick = async () => {
    // Set the payment method and open the Pay Cash Payment component
    setPaymentMethod("payCash");
    const payAfterService = {
      formData,
      servicesList,
      userId,
      carModel,
      fuelType,
      email: parseData.email,
      serviceCenterId,
      selectedSlot,
      currentDate,
      subTotal,
      paymentMethod: "CASH",
    };

    try {
      const response = await axios.post(
        `https://gocarsmithbackend.onrender.com/api/user/AddAppointment`,
        payAfterService,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setOpenPayment(true);
        localStorage.setItem("Coupon", 0);
        console.log(2);
        const response = await axios.delete(
          `https://gocarsmithbackend.onrender.com/api/removeCart/${userId}`
        );

        if (response.status === 200) {
          console.log("clear cart data");
          navigate("/Success");
        } else {
          console.log("fail to clear cart data");
        }
      } else {
        console.error("Failed to fetch locations");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const payNow = () => {
    setOpenPayment(true);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography component="h1" variant="h3" style={{ marginTop:"20px"}}>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <React.Fragment>
              {openPayment && (
                <Payment
                  paymentMethod={paymentMethod}
                  formData={formData}
                  subTotal={subTotal}
                  orderDetails={orderDetails}
                  onClose={() => setOpenPayment(false)}
                />
              )}
            </React.Fragment>
            {paymentMethod === "payCash" && (
              <React.Fragment>
                <Typography variant="h5" gutterBottom sx={{color:"green"}}>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update from the Service
                  Center on your Appointment.
                </Typography>
                {/* <div>
                  <FeedbackForm/>
                </div> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",
                    marginBottom: "120px",
                  }}
                >
                  <Link to="/">
                    <Typography variant="h5" gutterBottom>
                      Back to Home
                    </Typography>
                  </Link>
                </div>
              </React.Fragment>
            )}
          </>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              {paymentMethod === "payCash" ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Pay now" : "Next"}
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
}
