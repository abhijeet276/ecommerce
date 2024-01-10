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
import { useAlert } from "react-alert";
import { fetchAddToCart } from "../../redux/services/cartService";
type ProductParams = {
  id: string;
};
const ProductDetail = () => {
  const { isFetching, error, isError } = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()
  const params = useParams<ProductParams>();
  const [product, setProduct] = useState<Product>({} as Product);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const alert = useAlert();

  const increaseQuantity = () => {
    // if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = (id: any) => {
    dispatch(fetchAddToCart({ id, quantity }));
    // alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if (isError) alert.error(error)
  }, [error])

  useEffect(() => {
    if (params.id)
      dispatch(fetchSelectedProduct({ id: params.id })).unwrap().then(res =>
        setProduct(res))
  }, [params]);

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
          <RatingComponent value={Number(product.rating)} />
          <span className="detailsBlock-2-span">
            {" "}
            ({product.noOfReviews} Reviews)
          </span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button onClick={decreaseQuantity} >-</button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity} >+</button>
            </div>
            <button
              className="addTocart"
              //  disabled={product.Stock < 1 ? true : false}
              onClick={() => addToCartHandler(product._id)}
            >
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