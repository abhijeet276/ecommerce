import React from "react";
import "./CartItemCard.scss";
import { Link } from "react-router-dom";

interface CartItemCardProps {
    item: {
        image: string;
        product: string;
        name: string;
        price: number;
        _id: string,
        // Add other properties as needed
    }
    deleteCartItems: ((id: any) => void)

};

const CartItemCard: React.FC<CartItemCardProps> = ({ item, deleteCartItems }) => {

    console.log(item, "000000000000000000000000000")
    return (
        <div className="CartItemCard">
            {/* <img src={item.image} alt="ssa" /> */}
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: ₹${item.price}`}</span>
                <p onClick={() => deleteCartItems(item._id)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;
