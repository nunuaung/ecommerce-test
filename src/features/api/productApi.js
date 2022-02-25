import { API_URL } from "./api";
const axios = require("axios");

export const API = API_URL + "/products";

export function apiGetAllProducts() {
  return axios.get(API);
}

export function apiGetProductDetail(productId){
  return axios.get(API + "/" + productId);
}
