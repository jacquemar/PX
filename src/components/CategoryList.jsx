import React from 'react'

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categorie = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Récupérer les catégories depuis la base de données
    axios
      .get("http://localhost:2000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });
  }, []);

  return (
    <div>
      <div>
        <p className="mb-6 ml-6 text-xl font-bold">Categories</p>
        <div className="mx-12 grid grid-cols-4 justify-items-center pt-2">
          {categories.map((category) => (
            <div key={category.id} className="">
              <Link to={`/${category.slug}`}>
                <img
                  src={category.icon}
                  alt={`${category.name}-icon`}
                  className="h12 ml-3 w-12"
                />
                <p className="mt-3 text-center text-xs">{category.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorie;
