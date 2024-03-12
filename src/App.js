// App.js
import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Faqs from "./More/Faqs";
import Contact from "./More/Contact";
import Terms from "./More/Terms";
import About from "./More/About";
import Privacy from "./More/Privacy";
import CheckoutPage from "./components/checkout/CheckoutPage";
import Membership from "./components/membership/Membership";
import Coupons from "./components/coupons/Coupons";
import Search from "./components/search/Search";
import Home from "./pages/Home";
import Offers from "./More/Offers";
import Reviews from "./More/Reviews";
import Partners from "./More/Partners";
import Footer from "./components/footer/Footer";
import Periodic from "./Services/Periodic";
import AcRepair from "./Services/AcRepair";
import Batteries from "./Services/Batteries";
import Tyres from "./Services/Tyres";
import Denting from "./Services/Denting";
import Detailing from "./Services/Detailing";
import CarSpaCleaning from "./Services/CarCleaning";
import CarInspections from "./Services/CarInspections";
import WindShields from "./Services/WindShields";
import Suspension from "./Services/Suspension";
import Insurance from "./Services/Insurance";
import Clutch from "./Services/Clutch";
import Sos from "./Services/Sos";
import CheckoutComponent from "./components/checkout/Payment";
import OrderHistory from "./Customers/Orderhistory";
import GoMoney from "./Customers/GoMoney";
import Profile from "./Customers/Profile";
import Referal from "./Customers/Referal";
import HealthCard from "./Customers/HealthCard";
import MyCars from "./Customers/MyCars";
import ManageAddress from "./Customers/ManageAddress";
import Header from "./Services/Header";
import Success from "./pages/Success";
import ThankYou from "./components/checkout/ThankYou";
import Headers from "./blog/Header";
import BlogHome from "./blog/BlogHome";
import BlogList from "./blog/BlogList";
import BlogDescription from "./blog/BlogDescription";
import LoginCard from "./auth/login";
import Cart from "./components/cart/Cart";
import Token from "./auth/token";
import Carousel from "./Services/Carousel";
import AddressForm from "./Customers/AddressFrom";
import Signup from "./auth/signup";
import VerifyEmail from "./auth/verifyEmail";
import ForgottPassword from "./auth/passwordForgot";
import Passwordchanging from "./auth/changingPassword";
import HealthInsuranceForm from "./Customers/HealthInsuranceForm";
const App = () => {

  return (

    <BrowserRouter>
      <Header />
      <Token/>
      
      <Routes>
        <Route path="/faq" element={<Faqs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Reviews />} />
        <Route path="/AddressForm" element={<AddressForm />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/createCard" element={<HealthInsuranceForm />} />
        <Route path="/Payment" element={<CheckoutComponent />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/success" element={<Success />} />
        <Route path="/ThankYou" element={<ThankYou />} />

        <Route path="/Gomoney" element={<GoMoney />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Referal" element={<Referal />} />
        <Route path="/Orderhistory" element={<OrderHistory />} />
        <Route path="/HealthCard" element={<HealthCard />} />
        {/* Public Routes (outside Header) */}
        <Route path="/login" element={<LoginCard />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/ForgotPassword" element={<ForgottPassword />} />
        <Route path="/Changepassword" element={<Passwordchanging />} />

        {/* Main Layout with Header */}
        <Route
          path="/*"
          element={
            <>
              <Carousel />
              <Routes>
                <Route path="/Periodic" element={<Periodic />} />
                <Route path="/Periodic/:keyword" element={<Periodic />} />
                <Route path="/AcRepair" element={<AcRepair />} />
                <Route path="/AcRepair/:keyword" element={<AcRepair />} />
                <Route path="/Batteries" element={<Batteries />} />
                <Route path="/Batteries/:keyword" element={<Batteries />} />
                <Route path="/Tyres" element={<Tyres />} />
                <Route path="/Tyres/:keyword" element={<Tyres />} />
                <Route path="/Denting" element={<Denting />} />
                <Route path="/Denting/:keyword" element={<Denting />} />
                <Route path="/Detailing" element={<Detailing />} />
                <Route path="/Detailing/:keyword" element={<Detailing />} />
                <Route path="/CarCleaning" element={<CarSpaCleaning />} />
                <Route path="/CarCleaning/:keyword" element={<CarSpaCleaning />} />
                <Route path="/CarInspections" element={<CarInspections />} />
                <Route path="/CarInspections/:keyword" element={<CarInspections />} />
                <Route path="/WindShields" element={<WindShields />} />
                <Route path="/WindShields/:keyword" element={<WindShields />} />
                <Route path="/Suspension" element={<Suspension />} />
                <Route path="/Suspension/:keyword" element={<Suspension />} />
                <Route path="/Insurance" element={<Insurance />} />
                <Route path="/Insurance/:keyword" element={<Insurance />} />
                <Route path="Clutch" element={<Clutch />} />
                <Route path="Clutch/:keyword" element={<Clutch />} />
                <Route path="/Sos" element={<Sos />} />
                <Route path="/Sos/:keyword" element={<Sos />} />
              </Routes>
            </>
          }
        />
        {/* Blog Layout without Carousel */}
        <Route
          path="/blog/*"
          element={
            <>
              <Headers />
              <Routes>
                <Route path="/home" element={<BlogHome />} />
                <Route path="/page/:id" element={<BlogDescription />} />
                <Route
                  path="/bloglist/subcategory/:subCategoryName"
                  element={<BlogList />}
                />
                <Route
                  path="/bloglist/category/:categoryName"
                  element={<BlogList />}
                />
              </Routes>
            </>
          }
        />
        <Route path="/MyCars" element={<MyCars />} />
        <Route path="/ManageAddress" element={<ManageAddress />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
