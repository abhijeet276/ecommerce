import { Routes } from "react-router-dom";
import Header from "./Layout/Header";
import { useTheme } from "./contexts/themeContext";
import { useEffect } from "react";
import webFont from "webfontloader"
import Layout from "./Layout/Layout";
import "./App.css"
const App = () => {
  const { theme,toggleTheme } = useTheme();
  useEffect(() => {
    webFont.load({
      google: { families: ["Roboto", "Droid sans"] }
    })
  }, [])
  return (
    <div className={`theme-${theme}`}>
      <div className="content-wrapper">
        <Layout/>
        <Routes>
        </Routes>
      </div>
    </div>
  )
}

export default App