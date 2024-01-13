import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "../../pages/admin/Admin";
import AddDb from "./AddDb";
import AddPageInDb from "./AddPageInDb";

function NotionManager() {
  return (
    <div className="">
      <Admin />
      <div className=" mt-5 flex-col">
        <ToastContainer />
        <div className="mx-8 grid-cols-3">
          <AddDb />
        </div>
        <div className="mx-8 mt-3 grid-cols-3">
          <AddPageInDb />
        </div>

        <p id="dbResponse"></p>
        <p id="pageResponse"></p>
      </div>
    </div>
  );
}

export default NotionManager;
