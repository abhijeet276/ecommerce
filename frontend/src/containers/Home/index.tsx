import { CgMouse } from "react-icons/cg";
import { Pagination, PaginationItem, Slider, Stack, Typography } from "@mui/material";

import { Product } from "../../../types/IProduct";
import { fetchProducts } from "../../redux/services/productService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useAlert } from "react-alert";
import "./Home.scss";
import RangeSlider from "../../components/slider";
import CustomPagination from "../../components/pagination/CustomPagination";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "dummy"
];

const Home = () => {
  const dispatch = useAppDispatch();
  const alert = useAlert()
  const { isFetching, isError, error } = useAppSelector(state => state.product)
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5)
  const [products, setProducts] = useState<Product[]>([])
  const [ratings, setRatings] = useState<number | number[]>(0);
  const [price, setPrice] = useState<[number, number]>([0, 25000]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isError) alert.error(error.message)
  }, [error]);

  useEffect(() => {
    dispatch(fetchProducts({ page, category, price })).unwrap().then(d => {
      if (d && Array.isArray(d.results)) setProducts(d.results)
    })
  }, [price, category, page]);

  const priceHandler = (event: any, newPrice: any) => {
    setPrice(newPrice);
  };

  const handleChange = (e: any, value: any) => {
    setPage(value)
  }
  return (
    <>
      {/* <RangeSlider /> */}
      {isFetching && <Loader />}
      <h2 className="homeHeading">Feature Product</h2>
      <div className="container" id="container">
        {products.slice(0, 8).map((item) =>
          <ProductCard product={item} />
        )}
      </div>

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
          style={{ color: 'tomato' }}
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
            style={{ color: 'tomato' }}
          />
        </fieldset>
      </div>
      <CustomPagination
        count={totalPage}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};
export default Home;