import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setDbName, setDbId } from "../../redux/slices/databaseSlice";

const AddDb = () => {
  const dispatch = useDispatch(); // Ajoutez cette ligne pour obtenir la fonction dispatch

  const dbName = useSelector((state) => state.database.dbName);
  const dbId = useSelector((state) => state.database.dbId);
  const dbResponseEl = document.getElementById("dbResponse");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:2000/databases", {
        dbName: dbName,
      });

      // Handle the API response

      appendApiResponse(response.data, dbResponseEl);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast.error("Erreur lors de la soumission du formulaire");
    }
  };

  // Fonction pour ajouter la réponse de l'API à l'interface utilisateur
  const appendApiResponse = function (apiResponse, el) {
    console.log(apiResponse);

    // Ajouter le message de succès à l'interface utilisateur
    const newParagraphSuccessMsg = document.createElement("p");
    newParagraphSuccessMsg.innerHTML = "Résultat : " + apiResponse.message;
    dispatch(setDbId(apiResponse.data.id));
    el.appendChild(newParagraphSuccessMsg);
    toast.error("Succès lors de l'ajout de la BD");

    // Voir la console du navigateur pour plus d'informations
    if (apiResponse.message === "error") return;

    // Ajouter l'ID de l'élément Notion à l'interface utilisateur
    const newParagraphId = document.createElement("p");
    newParagraphId.innerHTML = "ID : " + apiResponse.data.id;
    el.appendChild(newParagraphId);

    // Ajouter l'URL de l'élément Notion à l'interface utilisateur
    if (apiResponse.data.url) {
      const newAnchorTag = document.createElement("a");
      newAnchorTag.setAttribute("href", apiResponse.data.url);
      newAnchorTag.innerText = apiResponse.data.url;
      el.appendChild(newAnchorTag);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">
        {" "}
        Ajout d'une Nouvelle DB
      </h1>
      <form id="databaseForm" onSubmit={handleSubmit}>
        <div className="mx-50% mb-6 mt-6 grid flex-auto gap-6">
          <div>
            <label
              htmlFor="dbName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom de la base de données
            </label>
            <input
              type="text"
              id="dbName"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => dispatch(setDbName(e.target.value))} // Utilisez dispatch pour envoyer l'action
              placeholder="Nom de la base de données"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Ajouter la BD
        </button>
      </form>
    </div>
  );
};

export default AddDb;
