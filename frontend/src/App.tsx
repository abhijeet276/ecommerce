import { Route, Routes } from "react-router-dom";
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
import ProtectedRoute from "./Layout/protectedRoute/ProtectedRoute";
import UpdateProfile from "./containers/profile/UpdateProfile";
import UpdatePassword from "./containers/auth/updatePassword/UpdatePassword";
import ResetPassword from "./containers/auth/resetPassword/ResetPassword";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Shipping from "./components/cart/Shipping";
import Payment from "./components/cart/Payment";
import Cart from "./components/cart/Cart";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import "./App.css"

const App = () => {
  const { theme, toggleTheme } = useTheme();


  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
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
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/Search" element={<Layout><Search /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/profile" element={<Layout><ProfileCard /></Layout>} />
          <Route path="/update-profile" element={<Layout><UpdateProfile /></Layout>} />
          <Route path="/update-password" element={<Layout><UpdatePassword /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/reset-password/:token" element={<Layout><ResetPassword /></Layout>} />
          <Route path="/Cart" element={<Layout><Cart /></Layout>} />
          <Route path="/shipping" element={<Layout><Shipping /></Layout>} />
          <Route path="/order/confirm" element={<Layout><ConfirmOrder /></Layout>} />
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