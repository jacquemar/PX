import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components import
import {Header, Footer, } from "./components";

//pages import
import {Home, Ticket, } from "./pages";

function App() {

  return (
    <BrowserRouter>
          <Header/>
            <Routes>
              <Route path="/" element ={ <Home/> }/>
              <Route path="/ticket" element={ <Ticket/> }/>
            </Routes>

    </BrowserRouter>
  );
}

export default App;
