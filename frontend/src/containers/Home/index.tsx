import { CgMouse } from "react-icons/cg";
import "./Home.scss";
import { IProduct, Product } from "../../../types/IProduct";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/slices/products";
import ProductCard from "../../components/ProductCard";
const product: IProduct = {
  name: "Blue Tshirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "3000",
  _id: "abhishek",
};
const Home = () => {
  const dispatch = useAppDispatch();
  const { isFetching } = useAppSelector(state => state.product)
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    dispatch(fetchProducts()).unwrap().then(d => {
      if (d) {
        setProducts(d.results)
      }
    })
  }, [])
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
        {products.slice(0,8).map((item) =>
          <ProductCard product={item} />
        )}
      </div>
    </>
  );
};
export default Home;