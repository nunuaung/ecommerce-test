import React from "react";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {
  addToCart,
  removeFromCart,
  decreaseQtyFromCart,
} from "../../features/cart/cartSlice";

const CartItem = ({ item, cart }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(item));
  };

  const decreaseQtyHandler = () => {
    dispatch(decreaseQtyFromCart(item));
  };

  const increaseQtyHandler = () => {
    dispatch(addToCart(item));
  };

  return (
    <div className="cart-item-wrap">
      <div className="cart-product cart-info-wrap">
        <img src={item.image} alt={item.title} />
        <div className="cart-product-info">
          <p onClick={() => removeFromCartHandler(item)} className="trash-icon">
            <FaTrash />
          </p>
        </div>
      </div>
      <div className="cart-product-price cart-product">${item.price}</div>
      <div className="cart-product-quantity cart-product">
        <button className="btn-fill" onClick={() => decreaseQtyHandler(item)}>
          -
        </button>
        <span className="count">{item.cartQuantity}</span>
        <button className="btn-fill" onClick={() => increaseQtyHandler(item)}>
          +
        </button>
      </div>
      <div className="cart-total-price cart-product">
        ${item.price * item.cartQuantity}
      </div>
    </div>
  );
};

export default CartItem;
