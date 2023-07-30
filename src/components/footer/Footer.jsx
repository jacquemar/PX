import React, { useEffect } from "react";
import styles from "./Footer.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Ticket from "../../pages/ticket/Ticket";
import { useSelector, useDispatch } from 'react-redux';
import { getCartItemsCount } from '../../redux/slices/cartSlice';


const Footer = () => {
 const dispatch = useDispatch();
 const totalCartItem = useSelector((state) => state.cart.totalQuantity)
   useEffect(() => {
    // Au chargement du composant Footer, récupérez le nombre total d'articles dans le panier
    dispatch(getCartItemsCount());
  }, []);
  console.log(totalCartItem);
  // Utilisez useSelector pour obtenir le nombre total d'articles depuis le state Redux
  return (
    <div>
      <div>
        <div className="dark:bg-gray-700 dark:border-gray-600 fixed bottom-4 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 rounded-full border border-gray-200 bg-white">
          <div className="mx-auto grid h-full max-w-lg grid-cols-3">
            <button
              data-tooltip-target="tooltip-home"
              type="button"
              className="hover:bg-gray-50 dark:hover:bg-gray-800 group inline-flex flex-col items-center justify-center rounded-l-full px-5"
            >
              <Link to="/">
                <svg
                  className="text-gray-500 mb-1 h-6 w-6 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <span className="sr-only">Home</span>
              </Link>
            </button>

            <div
              id="tooltip-home"
              role="tooltip"
              className="bg-gray-900 tooltip dark:bg-gray-700 invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
            >
              Home
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <div class="flex items-center justify-center">
              <Link to="/ticket">
                <button
                  type="button"
                  class="relative inline-flex items-center rounded-full bg-pxcolor p-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <div className="bg-red-500 dark:border-gray-900 absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white  bg-red text-xs font-bold text-white">
                    <span>{totalCartItem}</span>
                  </div>
                </button>
              </Link>
            </div>


            <div
              id="tooltip-new"
              role="tooltip"
              className="bg-gray-900 tooltip dark:bg-gray-700 invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
            >
              Create new item
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              data-tooltip-target="tooltip-profile"
              type="button"
              className="hover:bg-gray-50 dark:hover:bg-gray-800 group inline-flex flex-col items-center justify-center rounded-r-full px-5"
            >
              <Link to="/">
                <svg
                  className="text-gray-500 mb-1 h-6 w-6 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  ></path>
                </svg>
                <span className="sr-only">Profile</span>
              </Link>
            </button>
            <div
              id="tooltip-profile"
              role="tooltip"
              className="bg-gray-900 tooltip dark:bg-gray-700 invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
            >
              Profile
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
