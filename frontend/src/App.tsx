import Header from "./Component/Layout/Header/Header";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from "./Component/Layout/Footer/Footer";
import Home from "./Component/Home/Home";
const App = () => {
  return (
    <div style={{ color: "white" }}>
      <Router>
        <Header />
        <Routes>
        <Route  path='/' element= {<Home/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
