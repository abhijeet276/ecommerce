import React, { Fragment } from "react";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";

import { removeItemsFromCart } from "../../redux/slices/cartSlice";
import { fetchAddToCart } from "../../redux/services/cartService";
import CartItemCard from "./CartItemCard";
import "./Cart.scss";

const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { cartItems } = useAppSelector((state) => state.cart);
    console.log(cartItems, "cartItemscartItemscartItems0000")

    const increaseQuantity = (id: any, quantity: number, stock: any) => {
        // console.log(id, "idddd", quantity, "quantity", stock)
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(fetchAddToCart({ id, quantity: newQty }));
    };

    const decreaseQuantity = (id: any, quantity: number) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(fetchAddToCart({ id: id, quantity: newQty }));
    };

    const deleteCartItems = (id: any) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        // navigate("/login?redirect=shipping");
        navigate('/shipping')
    };
    // let cartItems: any = []

    console.log(cartItems, "cartItemscartItems")

    return (
        <Fragment>
            {cartItems.length == 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <div>No Product in Your Cart</div>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item: any) => (
                                <div className="cartContainer" key={item.product}>
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                    <div className="cartInput">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.product, item.quantity)
                                            }
                                        >
                                            -
                                        </button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item._id,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity
                                        }`}</p>
                                </div>
                            ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc: any, item: any) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
