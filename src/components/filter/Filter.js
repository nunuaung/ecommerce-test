import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sortProductByPrice,
  filterProductByCategories,
  getFilterProducts,
} from "../../features/product/productSlice";
import "./filter.css";

const Filter = ({ products }) => {
  const [sort, setSort] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const dispatch = useDispatch();

  const sortHandler = (e) => {
    console.log("sort by => ", e.target.value);
    setSort(e.target.value);
    dispatch(sortProductByPrice(e.target.value));
  };

  const filterCategoryHandler = (e) => {
    setFilterCategory(e.target.value);
    dispatch(filterProductByCategories(e.target.value));
  };

  return (
    <div className="filter-container">
      <div className="filter-sort mb-md">
        Sort by Price
        <select value={sort} onChange={sortHandler}>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </select>
      </div>
      <div className="filter-categories mb-md">
        Filter by Category
        <select value={filterCategory} onChange={filterCategoryHandler}>
          <option>All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
