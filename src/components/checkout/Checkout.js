import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrdersData,
  getOrderInfo,
} from "../../features/order/orderSlice";

const Checkout = () => {
  const orderData = useSelector((state) => state.order);
  const dispatch = useDispatch();

  console.log("Order Data in checkout page", orderData);

  return (
    <div className="checkout-container">
      <h1 className="main-title">Your Order</h1>
    </div>
  );
};

export default Checkout;
