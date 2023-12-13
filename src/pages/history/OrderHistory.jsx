import React, { useEffect, useState } from "react";
import logo from "../../assets/logo192.png";
import { useDispatch, useSelector } from "react-redux";
import { resetTicketList } from "../../redux/slices/cartSlice";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const ticketList = useSelector((state) => state.cart.ticketList);
  const status = useSelector((state) => state.ticket.status);
  const error = useSelector((state) => state.ticket.error);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const handleResetTicketList = () => {
    dispatch(resetTicketList(ticketList));
  };

  useEffect(() => {
    if (ticketList.length > 0) {
      const ticketNumbers = ticketList.map((ticket) => ticketList);
      console.log(ticketNumbers);
      const url = `http://localhost:2000/tickets-by-numbers?ticketList=${ticketNumbers.join(
        ","
      )}`;
      fetch(url)
        .then((response) => response.json())
        .then((tickets) => {
          console.log(tickets);
          setFilteredTickets(tickets);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [ticketList]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <nav class="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
        <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a href="" class="flex items-center">
            <img src={logo} class="mr-3 h-8" alt="print xpress logo"></img>
            <span class="whitespace-nowrap text-center text-2xl font-semibold dark:text-white">
              Factures
            </span>
          </a>
          <div class="flex md:order-2">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Ouvrir le menu</span>
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <a
                  href="#"
                  class="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Tickets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Catégories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div></div>

      <section class="container mx-auto mt-24 px-4">
        <div class="flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        <div class="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            class="rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900"
                          ></input>
                          <button class="flex items-center gap-x-2">
                            <span>Ticket Number</span>

                            <svg
                              class="h-3"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.1"
                              />
                              <path
                                d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="0.3"
                              />
                            </svg>
                          </button>
                        </div>
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Statut
                      </th>

                      <th
                        scope="col"
                        class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                      >
                        Numéro Client
                      </th>

                      <th scope="col" class="relative px-4 py-3.5">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket._id}>
                        <td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                          <div class="inline-flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              class="rounded border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900"
                            ></input>
                            <span>#{ticket.ticketNumber}</span>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                          <div class="text-emerald-500 bg-emerald-100/60 inline-flex items-center gap-x-2 rounded-full px-3 py-1 dark:bg-gray-800">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <h2 class="text-sm font-normal">Paid</h2>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <div class="flex items-center gap-x-2">
                            <img
                              class="h-8 w-8 rounded-full object-cover"
                              src={ticket.deliveryMethod}
                              alt=""
                            ></img>
                            <div>
                              <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                                {ticket.phoneNumber}
                              </h2>
                              <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {ticket.deliveryPrice}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="whitespace-nowrap px-4 py-4 text-sm">
                          <div class="flex items-center gap-x-6">
                            <button class="dark:hover:text-indigo-500 hover:text-indigo-500 text-gray-500 transition-colors duration-200 focus:outline-none dark:text-gray-300">
                              Archive
                            </button>
                            <button class="hover:text-indigo-500 text-blue-500 transition-colors duration-200 focus:outline-none">
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <a
            href="#"
            class="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>previous</span>
          </a>

          <div class="hidden items-center gap-x-3 md:flex">
            <a
              href="#"
              class="rounded-md bg-blue-100/60 px-2 py-1 text-sm text-blue-500 dark:bg-gray-800"
            >
              1
            </a>
            <a
              href="#"
              class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              2
            </a>
            <a
              href="#"
              class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              3
            </a>
            <a
              href="#"
              class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              ...
            </a>
            <a
              href="#"
              class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              12
            </a>
            <a
              href="#"
              class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              13
            </a>
            <a
              href="#"
              class="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              14
            </a>
          </div>

          <a
            href="#"
            class="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <span>Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 rtl:-scale-x-100"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
        <div className="flex items-center text-pxcolor">
          <button onClick={handleResetTicketList}>
            {" "}
            EFFACER LES DONNEES PERSISTANTES
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
