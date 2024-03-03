import { Product } from "../../../types/IProduct"
import { Link, NavLink } from "react-router-dom";
import './productCard.scss'
import { RatingComponent } from "../Rating";
import { useAppDispatch } from "../../redux/hooks";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    let dispatch = useAppDispatch();


    return <NavLink className="productCard" to={`product/${product._id}`}>
        <img src={product.image[0]?.url} alt={product.name} />
        <p>{product.name}</p>
        <div className="starwrapper">
            <RatingComponent size="small" value={product.rating} readOnly /> <span className="review"> ({product.noOfReviews} Reviews)</span>
        </div>
        <span className="price">{`₹${product.price}`}</span>

    </NavLink>
}
export default ProductCard