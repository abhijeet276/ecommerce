import { Route, Routes } from "react-router-dom";
import Header from "./Layout/Header";
import { useTheme } from "./contexts/themeContext";
import { useEffect } from "react";
import webFont from "webfontloader"
import Layout from "./Layout/Layout";
import "./App.css"
import Home from "./containers/Home";
const App = () => {
  const { theme,toggleTheme } = useTheme();
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
          <Route path="/" element={<Layout><Home/></Layout>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App