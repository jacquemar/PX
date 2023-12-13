import React from "react";
import { Link } from "react-router-dom";
import stickerIcon from "../assets/STICKER-ICON.png";
import posterIcon from "../assets/POSTER-ICON.png";
import polaroidIcon from "../assets/POLAROID-ICON.png";
import carteIcon from "../assets/CARTE-ICON.png";

const Categorie = () => {
  return (
    <div>
      <div>
        <p className="mb-6 ml-6 text-xl font-bold">Categories</p>
        <div className="mx-12 grid grid-cols-4 justify-items-center pt-2">
          <div className="">
            <Link to="/stickers">
              <img
                src={stickerIcon}
                alt="sticker-icon"
                className="h12 ml-3 w-12"
              />
              <p className="mt-3 text-center text-xs">Stickers Étiquettes</p>
            </Link>
          </div>
          <div className="">
            <Link to="/posters">
              <img
                src={posterIcon}
                alt=""
                className="h12 ml-3 w-12 rounded-full"
              />
              <p className=" mt-3 text-center text-xs">Posters Affiches</p>
            </Link>
          </div>
          <div className="">
            <Link to="/photos">
              <img src={polaroidIcon} alt="" className="h12 ml-3 w-12 " />
              <p className="mt-3 text-center text-xs">Photos Cadres</p>
            </Link>
          </div>
          <div className="">
            <Link to="/skin">
              <img
                src={carteIcon}
                alt=""
                className="h12 w-12 justify-items-center"
              />
              <p className="mt-3 text-center text-xs">Skin Adhésif</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categorie;
