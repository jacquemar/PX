import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleResultClick = (result) => {
    // Check if the result is a category or a product
    if (result.isCategory) {
      // Redirect to the category page
      navigate(`/category/${result.name}`);
    } else {
      // Redirect to the product details page
      navigate(`/product/${result._id}`);
    }
  };

  useEffect(() => {
    // Effectuez la recherche côté client à chaque changement de searchTerm
    if (searchTerm.trim() !== "") {
      axios
        .get(`http://localhost:2000/search?q=${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche :", error);
        });
    } else {
      // Réinitialisez les résultats si le terme de recherche est vide
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="relative mb-4 mt-10 flex place-content-center">
        <input
          className="border-15 bg-neutral-100 w-3/4 rounded-full border-cyan-700 text-center"
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="recherchez un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchResults.length > 0 && (
          <div className="search-suggestions absolute z-10 mt-2 w-full sm:w-64">
            <ul className="mt-16 list-none rounded-md border border-gray-300 bg-white p-2 shadow-md">
              {searchResults.map((result) => (
                <li
                  key={result._id}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleResultClick(result)}
                >
                  {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" -ml-14 h-10 w-10 rounded-full pt-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <div className="ml-8 h-14 w-14">
          <img src="/logo512.png" alt="logo"></img>{" "}
        </div>
      </div>

      <div className="search_results"></div>
    </>
  );
};
export default Header;
