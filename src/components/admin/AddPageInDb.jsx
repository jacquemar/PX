import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddPageInDb = () => {
  const [pageName, setPageName] = useState("");
  const [header, setHeader] = useState("");
  const [dbId, setDbId] = useState(""); // Ajoutez ces états
  const pageResponseEl = document.getElementById("pageResponse");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newPageResponse = await axios.post("http://localhost:2000/pages", {
        dbId: dbId,
        pageName: pageName,
        header: header,
      });

      const newPageData = newPageResponse.data;

      if (newPageData.message === "error") {
        throw new Error(`Erreur de l'API: ${newPageData.error}`);
      }

      appendApiResponse(newPageData, pageResponseEl);
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
    el.appendChild(newParagraphSuccessMsg);

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
    <div className="mt-6">
      <h1 className="text-center text-2xl font-bold">
        Ajout d'une Page Dans la BD
      </h1>
      <form id="pageForm" onSubmit={handleSubmit}>
        <div className="mx-50% mb-6 mt-6 grid flex-auto gap-6">
          <div>
            <label
              htmlFor="PageName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom de la première page
            </label>
            <input
              type="text"
              id="pageName"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Premiere page"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Header"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Titre 1
            </label>
            <input
              type="text"
              id="Header"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setHeader(e.target.value)}
              placeholder="Nom de la base de données"
              required
            />
          </div>
          {/* Ajoutez ces champs */}
          <div>
            <label
              htmlFor="DbId"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              ID de la base de données
            </label>
            <input
              type="text"
              id="DbId"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setDbId(e.target.value)}
              placeholder="ID de la base de données"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default AddPageInDb;
