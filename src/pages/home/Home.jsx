import React from "react";
import { Header, Footer, Categorie } from "../../components";

const Home = () => {
  return (
    <div className="bg-gray-25">
      <Categorie />
      <div className="mt-4 flex">
        <p className="mr-16 mb-6 mt-4 ml-6 text-xl font-bold">
          Meilleurs Vente
        </p>
        <p className="ml-16 mb-6 mt-5 text-sm">voir tout</p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="mx-4 h-64 w-44 rounded-lg bg-[url('../../assets/products/photo-polaroid1.jpg')] shadow-md"></div>
          <div className="h-64 w-44 rounded-lg bg-[url('../../assets/products/poster-joker.jpg')] shadow-md"></div>
          <div>
            <p className="text-ms mx-5 mt-1">Photos Polaroïd</p>
            <p className="mx-5 text-sm font-thin text-gray-500">Photos</p>
            <p className="text-md mx-5 font-light text-cyan-700">5.000 XOF</p>
          </div>
          <div>
            <p className="text-ms mt-1">Poster JOKER</p>
            <p className="text-sm font-thin text-gray-500">Posters/Affiches</p>
            <p className="text-md font-light text-cyan-700">3.000 XOF</p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4">
          <div className="mx-4 h-64 w-44 rounded-lg bg-[url('../../assets/products/stick-astroworldcolor.jpg')] shadow-md"></div>
          <div className="h-64 w-44 rounded-lg bg-[url('../../assets/products/skin-tokyo.jpg')] shadow-md"></div>
          <div>
            <p className="text-ms mx-5 mt-1">Stickers ASTRO</p>
            <p className="mx-5 text-sm font-thin text-gray-500">
              Stickers/Étiquettes
            </p>
            <p className="text-md mx-5 font-light text-cyan-700">300 XOF</p>
          </div>
          <div>
            <p className="text-ms mt-1">Skin Adhésif TOKYO</p>
            <p className="text-sm font-thin text-gray-500">Stickers</p>
            <p className="text-md font-light text-cyan-700">4.000 XOF</p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4">
          <div className="mx-4 h-64 w-44 rounded-lg bg-[url('../../assets/products/MOJO.jpg')] shadow-md"></div>
          <div className="h-64 w-44 rounded-lg bg-[url('../../assets/products/businesscard1.jpg')] shadow-md"></div>
          <div>
            <p className="text-ms mx-5 mt-1">Stickers DOMO</p>
            <p className="mx-5 text-sm font-thin text-gray-500">
              Stickers/Étiquettes
            </p>
            <p className="text-md mx-5 font-light text-cyan-700">300 XOF</p>
          </div>
          <div>
            <p className="text-ms mt-1">Business Cards</p>
            <p className="text-sm font-thin text-gray-500">Carte</p>
            <p className="text-md font-light text-cyan-700">10.000 XOF</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
