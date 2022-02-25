import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, loadUser } from "../../features/user/userSlice";
import "./navbar.css";

const Navbar = () => {
  const user = useSelector(selectUsers);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const signoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/">
          <h1 className="logo">Ecommerce</h1>
        </Link>
        {localStorage.getItem("username") ? (
          <div className="nav-right flex-row">
            <ul className="nav-menu flex-col">
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
            </ul>
            <Link to="/products/cart" className="nav-cart">
              <FaShoppingCart />
              {cart.cartTotalQuantity > 0 ? (
                <span className="cart-noti">{cart.cartTotalQuantity}</span>
              ) : (
                ""
              )}
            </Link>
            <div className="login-user flex-col">
              <p className="login-username">
                {localStorage.getItem("username").replace(/"/g, "")}
              </p>
              <p className="signout-icon" onClick={signoutHandler}>
                <FaSignOutAlt />
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
