import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components import
import { Header, Footer, Categorie } from "./components";
import ProductDetailComponent from "./components/ProductDetailComponent";

//pages import
import { Home } from "./pages";
import Posters from "./pages/posters/Posters";
import Ticket from "./pages/ticket/Ticket";
import Admin from "./pages/admin/Admin";
import Stickers from "./pages/Stickers/Stickers";
import Skin from "./pages/skin/Skin";
import Photos from "./pages/photos/Photos";
import CheckoutForm from "./components/checkout/CheckoutForm";
import Checkout from "./components/checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/skin" element={<Skin />} />
          <Route path="/stickers" element={<Stickers />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/checkoutForm" element={<CheckoutForm />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/product/:id" element={<ProductDetailComponent />} />
        </Routes>
       
  
    </BrowserRouter>
  );
}

export default App;
