import React, { useState } from "react";
import "./Paypal.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"

// import phonepe from '../../image/phonepe.png'

const picture =
  "https://cdn.pnggallery.com/wp-content/uploads/phonepe-logo-01.png";

const CheckoutComponent = (props) => {
  const navigate=useNavigate()
  const { formData, subTotal, orderDetails } = props;

  const [loading2, setLoading2] = useState(false);

  const data = {
    name: `${formData.firstName} ${formData.lastName}`,
    amount: subTotal,
    number: formData.phoneNumber,
    MUID: "MUID" + Date.now(),
    transactionId: "T" + Date.now(),
  };
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;
  const GoCarsmithCoins= localStorage.getItem("Coins")
  const deductMoneyData={
  userId:userId,
  amountToUse:GoCarsmithCoins
}
  const handlePayment = (e) => {
    e.preventDefault();
    setLoading2(true);
    axios
      .post("https://gocarsmithbackend.onrender.com/api/payment", { ...data })

      .then(async (res) => {
       if(res){
        try {
          const response = await axios.post(
            `https://gocarsmithbackend.onrender.com/api/user/AddAppointment`,
            orderDetails,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            const data = response.data;
            
            if (data) {
              localStorage.setItem("Coupon", 0);

              const response = await axios.delete(
                `https://gocarsmithbackend.onrender.com/api/removeCart`,{
                  data: deductMoneyData, // Pass the data in the 'data' property of the config object
                }
              );
              if (response.status === 200) {
                
                localStorage.setItem("Coins", 0);
                
              } else {
                console.log("fail to clear cart data");
              }
            }
            window.location.href = res.data;
          } else {
            console.error("Failed to fetch locations");
          }
        } catch (error) {
          console.error("Error:", error);
        }
        setTimeout(() => {
          setLoading2(false);
        }, 1500);
       }else{
        console.log("Appointment Failed")
       }
      })
      .catch((error) => {
        setLoading2(false);
        console.error(error);
      });
  };
  return (
    <>
      <div className="main">
        <div className="center">
          <img width={300} src={picture} alt="" />
          <h2 className="fs-4 mt-2">
            <span className="text-danger fw-bold">LIVE</span> Payment
            Integration
          </h2>
        </div>
        <div className="card px-5 py-4 mt-5">
          <form onSubmit={handlePayment}>
            <div className="col-12 ">
              <p className="fs-5">
                <strong>Name:</strong> {data.name}
              </p>
            </div>
            <div className="col-12 ">
              <p className="fs-5">
                <strong>Number:</strong> {data.number}
              </p>
            </div>
            <div className="col-12 ">
              <p className="fs-5">
                <strong>Amount:</strong> &#8377; {data.amount}
              </p>
            </div>
            {!loading2 ? (
              <div className="col-12 center">
                <button className="w-100 " type="submit">
                  Pay Now
                </button>
              </div>
            ) : (
              <div className="col-12 center">
                <button className="w-100 text-center" type="submit">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden ">Wait...</span>
                  </div>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default CheckoutComponent;