import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems"),
  userInfo: [],
  orderId: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrderInfo: (state, action) => {
      const orderId = new Date().getTime();
      state.userInfo.push(...action.payload, orderId);
      console.log("Order data in orderSlice ", state.userInfo);
    },
    getOrderInfo: (state, action) => {
      state.ordersData = action.payload;
    },
  },
});

export const selectOrdersData = (state) => state.order.ordersData;

export const { saveOrderInfo, getOrderInfo } = orderSlice.actions;

export default orderSlice.reducer;
