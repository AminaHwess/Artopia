import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart"; // Import CartProvider
import About from "./pages/about";
import Home from "./pages/home";
import Artcafe from "./pages/artcafe";
import Signup from "./pages/signup";
import Market from "./pages/market";
import Login from "./pages/login";
import Userprofile from "./pages/userprofile";
import Contactus from "./pages/contactus";
import Cart from "./pages/cart";

const App = () => {
  return (
    <CartProvider>
      <div>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/artcafe" element={<Artcafe />} />
              <Route path="/market" element={<Market />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/userprofile/:userId" element={<Userprofile />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
};

export default App;
