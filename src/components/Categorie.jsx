import React from "react";
import { Link } from "react-router-dom";
import Posters from "../pages/posters/Posters";

const Categorie = () => {
  return (
    <div>
      <div>
        <p className="mb-6 ml-6 text-xl font-bold">Categories</p>
        <div className="mx-12 grid grid-cols-4 justify-items-center pt-2">
          <div className="">
            <img
              src="../src/assets/STICKER-ICON.png"
              alt="sticker-icon"
              className="h12 ml-3 w-12"
            />
            <p className="mt-3 text-center text-xs">Stickers Étiquettes</p>
          </div>
          <div className="">
            <Link to="/posters">
              <img
                src="../src/assets/POSTER-ICON.png"
                alt=""
                className="h12 ml-3 w-12 rounded-full"
              />
              <p className=" mt-3 text-center text-xs">Posters Affiches</p>
            </Link>
          </div>
          <div className="">
            <img
              src="../src/assets/POLAROID-ICON.png"
              alt=""
              className="h12 ml-3 w-12 "
            />
            <p className="mt-3 text-center text-xs">Photos Polaroïd</p>
          </div>
          <div className="">
            <img
              src="../src/assets/CARTE-ICON.png"
              alt=""
              className="h12 w-12 justify-items-center"
            />
            <p className="mt-3 text-center text-xs">Cartes</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categorie;
