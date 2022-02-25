import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

const truncade = (string, n) => {
  return string.slice(0, n) + "....";
};

const ProductCard = ({ product }) => {
  const productId = product.id;

  return (
    <>
      <Link to={`/products/${productId}`} className="product-item flex3-col">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h2 className="product-name">{truncade(product.title, 20)}</h2>
          <div className="product-smallcol">
            <p className="product-price">${product.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
