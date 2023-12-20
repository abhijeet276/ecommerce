import { Route, Routes } from "react-router-dom";
import { useTheme } from "./contexts/themeContext";
import { useEffect } from "react";
import webFont from "webfontloader"
import Layout from "./Layout/Layout";
import "./App.css"
import Home from "./containers/Home";
import ProductDetail from "./containers/ProductDetail";
import Products from "./containers/Products";
import Search from "./containers/Products/Search";
import ForgotPassword from "./containers/auth/forgotPassword";
// import VerificationOtp from "./containers/auth/verificationCode";
// import Login from "./containers/auth/login";
// import Signup from './containers/auth/signup';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme)
  useEffect(() => {
    webFont.load({
      google: { families: ["Roboto", "Droid sans"] }
    })
  }, [])
  return (
    <div className={`theme-${theme}`}>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<ForgotPassword />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/Search" element={<Layout><Search /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        </Routes>
      </div>
    </div>
  )
}

export default App