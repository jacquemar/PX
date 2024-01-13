import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div>
      <div className="">
        <p className="mb-6 ml-6 text-xl font-bold">Catégories</p>
        <div className="relative flex gap-2  overflow-x-auto overscroll-contain p-2">
          <Link to="/stickers" className="flex flex-col items-center">
            <img
              src="../src/assets/STICKER-ICON.png"
              alt="sticker-icon"
              className="h-12 w-12"
            />
            <p className="mt-3 text-center text-xs">Stickers Étiquettes</p>
          </Link>
          <Link to="/posters" className="flex flex-col items-center">
            <img
              src="../src/assets/POSTER-ICON.png"
              alt=""
              className="h-12 w-12 rounded-full"
            />
            <p className="mt-3 text-center text-xs">Posters Affiches</p>
          </Link>
          <Link to="/photos" className="flex flex-col items-center">
            <img
              src="../src/assets/POLAROID-ICON.png"
              alt=""
              className="h-12 w-12"
            />
            <p className="mt-3 text-center text-xs">Photos Cadres</p>
          </Link>
          <Link to="/skin" className="flex flex-col items-center">
            <img
              src="../src/assets/SKIN-ICON.png"
              alt=""
              className="h-12 w-12"
            />
            <p className="mt-3 text-center text-xs">Skin Adhésif</p>
          </Link>
          <Link to="/cartes" className="flex flex-col items-center">
            <img
              src="../src/assets/CARTE-ICON.png"
              alt=""
              className="h-12 w-12"
            />
            <p className="mt-3 text-center text-xs">Cartes Professionnelles</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
