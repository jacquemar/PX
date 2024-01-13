import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../../pages/admin/Admin";
import Pagination from "../Pagination";

function TicketListView() {
  const [ticketList, setTicketList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2000/ticket-list")
      .then((response) => {
        setTicketList(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tickets :", error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ticketPerPage = 6;
  const lastTicketIndex = currentPage * ticketPerPage;
  const firstTicketIndex = lastTicketIndex - ticketPerPage;
  const currentProduct = ticketList.slice(firstTicketIndex, lastTicketIndex);

  const totalTicket = ticketList.length;
  console.log(ticketList);
  const totalPagePerTicket = Math.ceil(totalTicket / ticketPerPage);
  const [showModal, setShowModal] = useState(false);

  const deleteTicket = async (ticketId) => {
    try {
      const response = await axios.delete(
        `http://localhost:2000/ticket/${ticketId}`
      );
      console.log(response.data.message); // Message de succès ou d'erreur
      // Mettez à jour votre liste de produits après la suppression
      setTicketList((prevTicket) =>
        prevTicket.filter((ticket) => ticket._id !== ticketId)
      );
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
                    numéro de ticket
                  </th>
                  <th scope="col" className="w-10 px-6 py-3">
                    Commune de livraison
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Methode de livraison
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Méthode de paiement
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Prix de livraison
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Prix total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Numéro de téléphone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Détails
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProduct.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${ticket._id}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${ticket._id}`}
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
                      {ticket.ticketNumber}
                    </td>

                    <td className="px-6 py-4">{ticket.selectedCommune}</td>
                    <td className="px-6 py-4">{ticket.selectedMethod}</td>
                    <td className="px-6 py-4">{ticket.deliveryMethod}</td>
                    <td className="px-6 py-4">{ticket.deliveryPrice}</td>
                    <td className="px-6 py-4">{ticket.totalPrice}</td>
                    <td className="px-6 py-4">{ticket.phoneNumber}</td>
                    <td className="px-6 py-4">{ticket.orderDate}</td>
                    <td className="px-6 py-4">
                      <button
                        id="dropdownNotificationButton"
                        data-dropdown-toggle="dropdownNotification"
                        class="relative inline-flex items-center text-center text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-white"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-6 w-6"
                        >
                          <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                          <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
                          <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
                          <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
                        </svg>

                        <div class="absolute -top-0.5 start-2.5 block h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-gray-900"></div>
                      </button>

                      <div
                        id="dropdownNotification"
                        class="z-20 hidden w-full max-w-sm divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-700 dark:bg-gray-800"
                        aria-labelledby="dropdownNotificationButton"
                      >
                        <div class="block rounded-t-lg bg-gray-50 px-4 py-2 text-center font-medium text-gray-700 dark:bg-gray-800 dark:text-white">
                          Notifications
                        </div>
                        <div class="divide-y divide-gray-100 dark:divide-gray-700">
                          <a
                            href="#"
                            class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div class="flex-shrink-0">
                              <img
                                class="h-11 w-11 rounded-full"
                                src="/docs/images/people/profile-picture-1.jpg"
                                alt="Jese image"
                              />
                              <div class="absolute -mt-5 ms-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-600 dark:border-gray-800">
                                <svg
                                  class="h-2 w-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 18"
                                >
                                  <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                  <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                                </svg>
                              </div>
                            </div>
                            <div class="w-full ps-3">
                              <div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                                New message from{" "}
                                <span class="font-semibold text-gray-900 dark:text-white">
                                  Jese Leos
                                </span>
                                : "Hey, what's up? All set for the
                                presentation?"
                              </div>
                              <div class="text-xs text-blue-600 dark:text-blue-500">
                                a few moments ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div class="flex-shrink-0">
                              <img
                                class="h-11 w-11 rounded-full"
                                src="/docs/images/people/profile-picture-2.jpg"
                                alt="Joseph image"
                              />
                              <div class="absolute -mt-5 ms-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-gray-900 dark:border-gray-800">
                                <svg
                                  class="h-2 w-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                                </svg>
                              </div>
                            </div>
                            <div class="w-full ps-3">
                              <div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold text-gray-900 dark:text-white">
                                  Joseph Mcfall
                                </span>{" "}
                                and{" "}
                                <span class="font-medium text-gray-900 dark:text-white">
                                  5 others
                                </span>{" "}
                                started following you.
                              </div>
                              <div class="text-xs text-blue-600 dark:text-blue-500">
                                10 minutes ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div class="flex-shrink-0">
                              <img
                                class="h-11 w-11 rounded-full"
                                src="/docs/images/people/profile-picture-3.jpg"
                                alt="Bonnie image"
                              />
                              <div class="absolute -mt-5 ms-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-600 dark:border-gray-800">
                                <svg
                                  class="h-2 w-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                                </svg>
                              </div>
                            </div>
                            <div class="w-full ps-3">
                              <div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold text-gray-900 dark:text-white">
                                  Bonnie Green
                                </span>{" "}
                                and{" "}
                                <span class="font-medium text-gray-900 dark:text-white">
                                  141 others
                                </span>{" "}
                                love your story. See it and view more stories.
                              </div>
                              <div class="text-xs text-blue-600 dark:text-blue-500">
                                44 minutes ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div class="flex-shrink-0">
                              <img
                                class="h-11 w-11 rounded-full"
                                src="/docs/images/people/profile-picture-4.jpg"
                                alt="Leslie image"
                              />
                              <div class="absolute -mt-5 ms-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-green-400 dark:border-gray-800">
                                <svg
                                  class="h-2 w-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                </svg>
                              </div>
                            </div>
                            <div class="w-full ps-3">
                              <div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold text-gray-900 dark:text-white">
                                  Leslie Livingston
                                </span>{" "}
                                mentioned you in a comment:{" "}
                                <span
                                  class="font-medium text-blue-500"
                                  href="#"
                                >
                                  @bonnie.green
                                </span>{" "}
                                what do you say?
                              </div>
                              <div class="text-xs text-blue-600 dark:text-blue-500">
                                1 hour ago
                              </div>
                            </div>
                          </a>
                          <a
                            href="#"
                            class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div class="flex-shrink-0">
                              <img
                                class="h-11 w-11 rounded-full"
                                src="/docs/images/people/profile-picture-5.jpg"
                                alt="Robert image"
                              />
                              <div class="absolute -mt-5 ms-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 dark:border-gray-800">
                                <svg
                                  class="h-2 w-2 text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 14"
                                >
                                  <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                                </svg>
                              </div>
                            </div>
                            <div class="w-full ps-3">
                              <div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold text-gray-900 dark:text-white">
                                  Robert Brown
                                </span>{" "}
                                posted a new video: Glassmorphism - learn how to
                                implement the new design trend.
                              </div>
                              <div class="text-xs text-blue-600 dark:text-blue-500">
                                3 hours ago
                              </div>
                            </div>
                          </a>
                        </div>
                        <a
                          href="#"
                          class="block rounded-b-lg bg-gray-50 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        >
                          <div class="inline-flex items-center ">
                            <svg
                              class="me-2 h-4 w-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 14"
                            >
                              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                            View all
                          </div>
                        </a>
                      </div>
                    </td>
                    <td className="flex items-center px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>

                      <button
                        type="button"
                        onClick={() => deleteTicket(ticket._id)}
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
              totalTicket={totalTicket}
              ticketPerPage={ticketPerPage}
              setCurrentPage={paginate}
              totalPagePerTicket={totalPagePerTicket}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketListView;
