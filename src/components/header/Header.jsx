import React from "react";

const Header = () => {
  return (
    <>
      <div className="mt-10 mb-4 flex place-content-center">
        <input
          className=" border-15 w-3/4 rounded-full border-cyan-700 bg-neutral-100 text-center"
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="recherchez un produit "
        />{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" -ml-14 h-10 w-10 rounded-full pt-4  "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <div className="ml-8 h-14 w-14 ">
          {" "}
          <img src="/logo512.png"></img>{" "}
        </div>
      </div>

      <div className="search_results"></div>
    </>
  );
};
export default Header;
