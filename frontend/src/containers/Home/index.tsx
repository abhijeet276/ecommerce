import { CgMouse } from "react-icons/cg";
import "./Home.scss";
import { Product } from "../../../types/IProduct";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import { fetchProducts } from "../../redux/services/productService";
const Home = () => {
  const dispatch = useAppDispatch();
  const alert = useAlert()
  const { isFetching, isError, error } = useAppSelector(state => state.product)
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    if (isError) alert.error(error.message)
  }, [error])
  useEffect(() => {
    dispatch(fetchProducts()).unwrap().then(d => {
      if (d && Array.isArray(d.results)) setProducts(d.results)
    })
  }, [])
  return (
    <>
      {isFetching && <Loader />}
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
        {products.slice(0, 8).map((item) =>
          <ProductCard product={item} />
        )}
      </div>
    </>
  );
};
export default Home;