import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectCartItems,
  clearCart,
  getTotals,
} from "../../features/cart/cartSlice";
import CartItem from "./CartItem";
import InfoOverlay from "../checkout/InfoOverlay";
import "./cart.css";

const StartShopping = () => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };
  return (
    <div className="start-shopping">
      <p className="small-title mb-md">No items in Cart!</p>
      <button className="btn-fill" onClick={backHandler}>
        Start Shopping
      </button>
    </div>
  );
};

const CartItems = ({ cart, cartItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [overlay, setOverlay] = useState(false);

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const backHandler = () => {
    navigate(-1);
  };

  const infoOverlayHandler = () => {
    setOverlay(true);
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  return (
    <div className="cart-items-wrap">
      <div className="titles">
        <h2 className="cart-item-title">Product</h2>
        <h2 className="cart-item-title">Price</h2>
        <h2 className="cart-item-title">Quantity</h2>
        <h2 className="cart-item-title">Total</h2>
      </div>
      <div className="cart-items">
        {cartItems?.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} cart={cart} />
        ))}
      </div>
      <div className="cart-summary">
        <div className="clear-cart">
          <button className="btn-fill" onClick={clearCartHandler}>
            Clear Cart
          </button>
        </div>
        <div className="cart-checkout">
          <div className="subTotal">
            <span>SubTotal:</span>
            <span>${cart.cartTotalAmount}</span>
          </div>
          <button className="btn-fill" onClick={infoOverlayHandler}>
            Checkout
          </button>
          {overlay ? (
            <InfoOverlay overlay={overlay} setOverlay={setOverlay} />
          ) : (
            ""
          )}
          <span onClick={backHandler} className="continue-shopping">
            Continue Shopping?
          </span>
        </div>
      </div>
    </div>
  );
};
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  console.log("cart items ", cartItems);

  return (
    <div className="cart-container">
      <h2 className="main-title mb-md">Shopping Cart</h2>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <StartShopping />
        ) : (
          <CartItems cart={cart} cartItems={cartItems} />
        )}
      </div>
    </div>
  );
};

export default Cart;
