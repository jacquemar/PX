import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Admin from "../../pages/admin/Admin";
import ProductListView from "../../components/admin/ProductListView";

export default function AddProduct() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile, name + category);
      formData.append("name", name);
      formData.append("category", category);
      formData.append("gender", gender);
      formData.append("price", price);

      // Envoyer le formulaire avec le fichier au backend
      const response = await axios.post(
        "http://localhost:2000/upload",
        formData
      );

      // Récupérer l'URL de l'image depuis la réponse du backend
      const { secure_url } = response.data;

      setUrl(secure_url);
      toast.success("Produit ajouté avec succès !");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi du fichier :",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-30 text-center">
      <Admin />
      <div className="p-50% mt-10 inline-block h-auto">
        <ToastContainer />
        <form encType="multipart/form-data">
          <div class="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                nom du produit
              </label>
              <input
                id="name"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                name="name"
                placeholder="Nom"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <label
                for="Categorie"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Categorie
              </label>
              <input
                id="Categorie"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                name="category"
                placeholder="Catégorie"
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label
                for="genre"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Genre
              </label>
              <input
                id="genre"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="text"
                name="genre"
                placeholder="Genre"
                onChange={(e) => setGender(e.target.value)}
              ></input>
            </div>
            <div>
              <label
                for="price"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Prix
              </label>
              <input
                id="price"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="number"
                name="price"
                placeholder="Prix"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label
                for="cover"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Image du Produit
              </label>
              <input
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                type="file"
                name="cover"
                id="cover"
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            class="w-full rounded-lg bg-pxcolor px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            ✅ Ajouter le Produit ✅
          </button>
        </form>
        <div className="mt-10 h-24 w-36 items-center">
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="h-10text-gray-200 inline w-10 animate-spin fill-blue-600 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <img src={url} alt="" />
          )}
        </div>
      </div>
    </div>
  );
}
