import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../../pages/admin/Admin";
import Pagination from "../Pagination";

export default function ProductListView() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    // http://
    fetch("http://localhost:2000/list")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return () => {};
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 6;
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = productList.slice(firstProductIndex, lastProductIndex);

  const totalProduct = productList.length;

  const totalPagePerProduct = Math.ceil(totalProduct / productPerPage);
  const [showModal, setShowModal] = useState(false);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/products/${productId}`
      );
      console.log(response.data.message); // Message de succès ou d'erreur
      // Mettez à jour votre liste de produits après la suppression
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      setShowModal(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Admin />
      <div className="p-30 mt-10 text-center">
        <div className="p-50% inline-block">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                      ></input>
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nom du produit
                  </th>
                  <th scope="col" className="w-10 px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Genre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Categorie
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Prix
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProduct.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${product._id}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${product._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {product.name}
                    </td>
                    <td className="p-4">
                      <img
                        src={product.cover}
                        className="max-h-full w-16 max-w-full md:w-32"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4">{product.gender}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>

                      <button
                        type="button"
                        onClick={() => deleteProduct(product._id)}
                        data-modal-target="popup-modal"
                        data-modal-toggle="popup-modal"
                        className="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        REMOVE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalProduct={totalProduct}
              productPerPage={productPerPage}
              setCurrentPage={paginate}
              totalPagePerProduct={totalPagePerProduct}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
