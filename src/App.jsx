import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components import
import { Header, Footer, Categorie } from "./components";

//pages import
import { Home, Ticket } from "./pages";
import Posters from "./pages/posters/Posters";
import Admin from "./pages/admin/Admin";
import Stickers from "./pages/Stickers/Stickers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/posters" element={<Posters />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/stickers" element={<Stickers />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
