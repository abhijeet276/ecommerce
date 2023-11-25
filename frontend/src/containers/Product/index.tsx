import { IProduct } from "../../../types/IProduct"
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './productCard.scss'
const options = {
    edit: false,
    color: "rgba(20, 20, 20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
};
const Product: React.FC<{ product: IProduct }> = ({ product }) => {
    return <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div className="starwrapper">
            <ReactStars {...options}/> <span className="review"> (256 Reviews)</span>
        </div>
        <span  className="price">{product.price}</span>
    </Link>
}
export default Product