import React, { Children, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer, Categorie } from "../../components";
import MOJO from "../../assets/products/MOJO.jpg";

import ProductItem from "../../components/ProductItem";
import uploadImg from "../../assets/products/upload-01-01.jpg";

function Skin() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/list")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const categories = productList.reduce(
    (acc, product) =>
      acc.includes(product.category) ? acc : acc.concat(product.category),
    []
  );

  const genderList = productList.reduce(
    (acc, product) =>
      acc.includes(product.gender) ? acc : acc.concat(product.gender),
    []
  );
  const filterProduct = productList.filter(
    (product) => product.category === "poster" || product.category === "Poster"
  );
  return (
    <div>
      <Header />
      <h1 className="text-center text-xl font-black">POSTERS / AFFICHES</h1>
      <div className="mx-4 mt-4 mr-1 h-40 rounded-lg">
        <img
          src="../../src/assets/cover.png"
          alt="posterimage"
          className="w-12/12 mt-4 h-40 rounded-lg"
        />
      </div>
      <p className="mr-16 mb-6 mt-6 ml-6 text-lg font-bold"> Genre</p>
      <ul className="relative flex items-center overflow-x-auto">
        {genderList.map((cat) => (
          <li
            key={cat}
            className="m-1 inline-block snap-x gap-3 text-base  font-semibold capitalize"
          >
            <div className=" tex bg-white h-16 w-32 scroll-m-2 scroll-smooth rounded-md  text-center shadow-xl">
              {cat}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex">
        <p className="mr-11 mb-6 mt-4 ml-6 text-xl font-bold">
          Les Plus achetés
        </p>
        <p className="ml-16 mb-6 mt-5 text-sm">voir tout</p>
      </div>
      <ul className="mx-1 flex list-none flex-row flex-wrap justify-evenly gap-3 space-x-1  px-1 ">
        <div className="h-50 w-40 rounded-lg  lg:w-1/2">
          <div className="h-6 w-36 ">
            <p className="mt-10 text-center font-thin">
              Personnaliser vos posters
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto mt-2 h-10 w-10 "
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z"
                clipRule="evenodd"
              />
              <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
            </svg>

            <input
              type="file"
              className=" file: file:bg-slate-100
          file:border-cyan-700
          block
          w-full
          file:mt-8
          file:rounded-full
          file:font-normal
          file:opacity-40"
            />
          </div>
        </div>
        {filterProduct.map(({ id, cover, name, prix, category, genre }) => (
          <ProductItem
            id={id}
            name={name}
            category={category}
            prix={prix}
            cover={MOJO}
            genre={genre}
          />
        ))}
      </ul>
    </div>
  );
}

export default Skin;
