import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetAllProducts, apiGetProductDetail } from "../api/productApi";

const initialState = {
  products: [],
  sort: "",
  category: "",
  filterProducts: [],
};
export const getAllProducts = createAsyncThunk(
  "product/apiGetAllProducts",
  async () => {
    const response = await apiGetAllProducts();
    return response.data;
  }
);
export const getProductDetail = createAsyncThunk(
  "product/apiGetProductDetail",
  async (productId) => {
    const response = await apiGetProductDetail(productId);
    return response.data;
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadAllProduct: (state, action) => {
      state.products = action.payload;
    },
    sortProductByPrice: (state, action) => {
      state.sort = action.payload;
      if (state.filterProducts.length !== 0) {
        state.filterProducts = state.filterProducts
          .slice()
          .sort((a, b) =>
            state.sort === "lowest"
              ? a.price > b.price
                ? 1
                : -1
              : state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : ""
          );
      } else {
        state.products = state.products
          .slice()
          .sort((a, b) =>
            state.sort === "lowest"
              ? a.price > b.price
                ? 1
                : -1
              : state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : ""
          );
      }
    },
    filterProductByCategories: (state, action) => {
      state.category = action.payload;
      console.log("category products action ", state.products);
      state.filterProducts = state.products.filter(
        (product) => product.category === state.category
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload
          .slice()
          .sort((a, b) => b.price - a.price);
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const selectProducts = (state) => state.product.products;
export const getFilterProducts = (state) => state.product.filterProducts;

export const { sortProductByPrice, filterProductByCategories } =
  productSlice.actions;

export default productSlice.reducer;
