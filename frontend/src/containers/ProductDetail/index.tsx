import Carousel from "react-material-ui-carousel"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSelectedProduct } from "../../redux/services/productService";
import { Product } from "../../../types/IProduct";
import Loader from "../../components/Loader";
import "./productDetail.scss"
import { RatingComponent } from "../../components/Rating";
import Reviews from "../../components/Reviews";
import { Box } from "@mui/material";
type ProductParams = {
  id: string;
};
const ProductDetail = () => {
  const { isFetching } = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()
  const params = useParams<ProductParams>();
  const [product, setProduct] = useState<Product>({} as Product)
  useEffect(() => {
    if (params.id)
      dispatch(fetchSelectedProduct({ id: params.id })).unwrap().then(res =>
        setProduct(res))
  }, [params])
  return <>
    <div className="productDetails">
      <div className="container">
        <Carousel animation="slide" sx={{ width: "100%", textAlign: "center" }}>
          {product && Array.isArray(product.image) ?
            product.image.map((img) =>
              <img className="carouselImage" key={img.url} src={img.url} alt="Product Image" />
            ) : "No Images are found"}
        </Carousel>
      </div>
      <div className="container">
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>
        <div className="detailsBlock-2">
          <RatingComponent  value={Number(product.rating)} />
          <span className="detailsBlock-2-span">
            {" "}
            ({product.noOfReviews} Reviews)
          </span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button >-</button>
              <input readOnly type="number" value="1" />
              <button >+</button>
            </div>
            <button className="addTocart">
              Add to Cart
            </button>
          </div>

          <p>
            Status:
            <b style={{ color: product.stock < 1 ? "red" : "green" }}>
              {product.stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>

        <div className="detailsBlock-4">
          Description : <p>{product.description}</p>
        </div>

        <button onClick={() => { }} className="submitReview">
          Submit Review
        </button>
      </div>
    </div>
    <h3 className="reviewsHeading">REVIEWS</h3>
    {product.review && Array.isArray(product.review) && product.review.length > 0 ?
      <Box className={"reviews"}><Reviews reviews={product.review} /></Box>
      : <p className="noReview">No Reviews Yet</p>}
    {isFetching && <Loader />}
  </>
}

export default ProductDetail