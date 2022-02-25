import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  getAllProducts,
  getFilterProducts,
} from "../../features/product/productSlice";
import ProductCard from "./ProductCard";
import {getTotals} from "../../features/cart/cartSlice";
import Filter from "../filter/Filter";
import Pagination from "../pagination/Pagination";
import "./product.css";

const Product = () => {
  const products = useSelector(selectProducts);
  const filterProducts = useSelector(getFilterProducts);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const user = state.values;
  const cart = useSelector(state=>state.cart);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const [activePage, setActivePage] = useState(''); 

  useEffect(() => {
    dispatch(getAllProducts()); 
  }, []);

  useEffect(() => {
    dispatch(getTotals()); 
  }, [cart]);

  const indexOfLastPrduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastPrduct - perPage;
  const currentProducts = filterProducts.length!==0 ? (filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastPrduct
  )) : (products.slice(
    indexOfFirstProduct,
    indexOfLastPrduct
  ))

  const paginate = (pageNumber)=>{
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  }

  return (
    <div className="products-container">
    <h1 className="main-title mb-md">Products</h1>
      <Filter/>
      <div className="products-list flex3-row">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination perPage={perPage} 
          totalProducts={filterProducts.length!==0 ? filterProducts.length : products.length}
          paginate={paginate}
          activePage={activePage}
          />
    </div>
  );
};

export default Product;
