import { CgMouse } from "react-icons/cg";
import "./Home.scss";
import {  IProduct } from "../../../types/IProduct";
import Product from "../Product";
const product:IProduct = {
  name: "Blue Tshirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "3000",
  _id: "abhishek",
  };
const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Feature Product</h2>
      <div className="container" id="container">
        <Product product={product}/>
      </div>
    </>
  );
};
export default Home;