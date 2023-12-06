import { Product } from "../../../types/IProduct"
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './productCard.scss'
const options: Record<string, any> = {
    edit: false,
    color: "rgba(20, 20, 20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
};
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return <Link className="productCard" to={`product/${product._id}`}>
        <img src={product.image[0]?.url} alt={product.name} />
        <p>{product.name}</p>
        <div className="starwrapper">
            <ReactStars {...options} value={product.rating} /> <span className="review"> ({product.noOfReviews} Reviews)</span>
        </div>
        <span className="price">{`₹${product.price}`}</span>
    </Link>
}
export default ProductCard