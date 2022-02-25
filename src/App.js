import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFound from "./components/notFound/NotFound";
import Product from "./components/product/Product";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/*" element={<NotFound />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/products/cart" element={<Cart />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/products" element={<Product />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
