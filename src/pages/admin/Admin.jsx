import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddProduct from "../../components/admin/AddProduct";
import ProductListView from "../../components/admin/ProductListView";
import logo from "../../assets/logo192.png";

function Admin() {
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
    <div className="p-30 mt-6 text-center">
      <nav class="border-gray-200 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="px logo" />
            <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              INTERFACE ADMINISTRATEUR
            </span>
          </a>

          <div className=" mt-4 w-full md:block md:w-auto">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <NavLink
                  to="/admin"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  activeclassname="bg-pxcolor"
                  exact={true}
                >
                  Accueil 🏡
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/add-product"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  activeclassname="bg-pxcolor"
                  exact={true}
                >
                  Ajouter un produit ➕
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/product-list-view"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  activeclassname=" bg-pxcolor"
                  exact={true}
                >
                  Afficher les Produits 📃
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/ticket-list-view"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                  activeclassname=" bg-pxcolor"
                  exact={true}
                >
                  Afficher les Tickets 🗂
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Admin;
