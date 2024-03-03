import { Outlet, Route, Routes } from "react-router-dom";
import { useTheme } from "./contexts/themeContext";
import { useEffect, useState } from "react";
import webFont from "webfontloader"
import Layout from "./Layout/Layout";
import Home from "./containers/Home";
import ProductDetail from "./containers/ProductDetail";
import Products from "./containers/Products";
import Search from "./containers/Products/Search";
import ProfileCard from "./containers/profile";
import ForgotPassword from "./containers/auth/forgotPassword";
import Login from "./containers/auth/login";
import Signup from './containers/auth/signup';
import UpdateProfile from "./containers/profile/UpdateProfile";
import UpdatePassword from "./containers/auth/updatePassword/UpdatePassword";
import ResetPassword from "./containers/auth/resetPassword/ResetPassword";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Shipping from "./components/Cart/Shipping";
import Payment from "./components/Cart/Payment";
import Cart from "./components/Cart/Cart";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Profile from "./containers/profile";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import "./App.css"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const { theme, toggleTheme } = useTheme();


  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    // const { data } = await axios.get("/api/v1/stripeapikey");
    // setStripeApiKey(data.stripeApiKey);
  }

  console.log(theme)
  useEffect(() => {
    webFont.load({
      google: { families: ["Roboto", "Droid sans"] }
    });
    getStripeApiKey()
  }, []);

  return (
    <div className={`theme-${theme}`}>
      <div className="content-wrapper">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/process/payment" element={<Payment />} />
            <Route path="/success" element={<OrderSuccess />} />
          </Route>
          {/* <Route path="/orders" element={<MyOrders />} /> */}

          {/* {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/process/payment" element={<Payment />} />
            </Elements>
          )} */}
          {/* <ProtectedRoute path="/home" element={<Layout><Home /></Layout>} />
          <ProtectedRoute path="/products" element={<Layout><Products /></Layout>} />
          <ProtectedRoute path="/search" element={<Layout><Search /></Layout>} />
          <ProtectedRoute path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <ProtectedRoute path="/profile" element={<Layout><ProfileCard /></Layout>} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App