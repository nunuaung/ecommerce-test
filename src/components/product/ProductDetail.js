import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import {
  selectProducts,
  getProductDetail,
} from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { FaShoppingBasket } from "react-icons/fa";
import "./product.css";

const ProductDetail = () => {
  const params = useParams();
  const detailId = params.productId;
  const product = useSelector(selectProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetail(detailId));
  }, []);

  const cartHandler = () => {
    dispatch(addToCart(product));
    navigate("/products/cart");
  };

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <div className="detail-container">
      <button className="btn-fill" onClick={backHandler}>
        <FaArrowLeft />
        Back
      </button>
      <div className="detail-flex">
        <div className="detail-col image-holder">
          <div className="image-box">
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className="detail-col info-holder">
          <div className="info-wrapper">
            <h2 className="detail-title mb-md">{product.title}</h2>
            <span className="detail-category mb-md">{product.category}</span>
            <p className="detail-description mb-md">{product.description}</p>
            <p className="product-price mb-md">${product.price}</p>
            <button className="btn-fill" onClick={() => cartHandler(product)}>
              <span className="basket-icon">
                <FaShoppingBasket />
              </span>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
