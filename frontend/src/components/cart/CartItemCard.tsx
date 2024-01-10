import React from "react";
import "./CartItemCard.scss";
import { Link } from "react-router-dom";

interface CartItemCardProps {
    item: {
        image: string;
        product: string;
        name: string;
        price: number;
        // Add other properties as needed
    };
    deleteCartItems: (productId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, deleteCartItems }) => {
    return (
        <div className="CartItemCard">
            {/* <img src={item.image} alt="ssa" /> */}
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: ₹${item.price}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;
