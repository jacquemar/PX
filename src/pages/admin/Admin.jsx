import React, { useState, useEffect } from "react";
import { Header, Footer, Categorie } from "../../components";
import { useFormik, Formik } from "formik";

function app() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.value);
    fetch("/addproduit", {
      method: "post",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        alert("Message sent");
      } else {
        alert("An error occurred");
      }
    });
  };
  const [productName, setProductName] = useState("");
  const [productCategorie, setProductCategorie] = useState("");
  const [productGenre, setProductGenre] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCover, setProductCover] = useState("");
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="ml-10 mt-6 w-3/6 justify-center">
        <label>
          Nom du produit :
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Catégorie :
          <input
            type="text"
            value={productCategorie}
            onChange={(e) => setProductCategorie(e.target.value)}
          />
        </label>
        <br />
        <label>
          Genre :
          <input
            type="text"
            value={productGenre}
            onChange={(e) => setProductGenre(e.target.value)}
          />
        </label>
        <br />
        <label>
          Prix :
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>{" "}
        <br />
        <label>
          Cover :
          <input
            type="file"
            value={productCover}
            onChange={(e) => setProductCover(e.target.value)}
          />
        </label>
        <button>
          {" "}
          <input type="submit" value="Envoyer" />{" "}
        </button>
      </form>
    </div>
  );
}
export default app;
