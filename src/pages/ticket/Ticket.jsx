import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateTotalPrice,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/slices/cartSlice";
import { setTicketNumber } from "../../redux/slices/ticketSlice";

const Ticket = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const ticketNumber = useSelector((state) => state.ticket.ticketNumber);
  const dispatch = useDispatch();

  const generateTicketNumber = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ticketNumber = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      ticketNumber += chars.charAt(randomIndex);
    }
    return ticketNumber;
  };
  useEffect(() => {
    dispatch(updateTotalPrice());
    const generatedTicketNumber = generateTicketNumber();
    dispatch(setTicketNumber(generatedTicketNumber)); // Définissez le numéro de ticket dans le store Redux
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(updateTotalPrice());
  }, [cartItems, dispatch]);

  console.log(cartItems);

  const handleAddToCart = (product) => {
    const productIndex = cartItems.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      // Si le produit est déjà présent dans le panier, augmentez la quantité de 1
      dispatch(increaseQuantity({ productId: product.id }));
    } else {
      // Sinon, ajoutez le produit au panier avec une quantité de 1
      dispatch(addToCart(product));
    }
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    const removedItem = cartItems.find((item) => item.id === itemId);
    dispatch(removeFromCart(itemId));
    // Mettre à jour le prix total en utilisant une action Redux
    dispatch(updateTotalPrice());
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity({ productId: itemId }));
  };

  return (
    <div>
      <section className="mb-10 h-screen bg-gray-100  py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Votre Ticket{" "}
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm font-light text-cyan-600">{ticketNumber}</p>
          </div>

          <div className="mx-auto mt-8 max-w-md md:mt-12">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {cartItems.map((item, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="relative shrink-0">
                          <span className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-red-600 text-sm font-medium text-white shadow sm:-right-2 sm:-top-2">
                            {item.quantity}
                          </span>
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={item.cover}
                            alt={item.name}
                          />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {item.name}
                              </p>
                              <button
                                className="mx-1 mt-2 inline-flex items-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                type="button"
                                onClick={() => handleDecreaseQuantity(item.id)}
                              >
                                <span className="sr-only">
                                  Quantity button{" "}
                                </span>
                                <svg
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </button>
                              <button
                                className="mx-1 mt-2 inline-flex items-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                type="button"
                                onClick={() => handleAddToCart(item)}
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </button>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="w-20 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                {item.price}XOF
                              </p>
                            </div>
                          </div>

                          <div className="absolute right-0 top-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"
                                  className=""
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="mx-0 mb-0 mt-6 h-0 border-b-0 border-l-0 border-r-0 border-t border-solid border-gray-300" />

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {" "}
                    {totalPrice}{" "}
                    <span className="text-xs font-normal text-gray-400">
                      FCFA
                    </span>
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link to="/checkout">
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-pxcolor px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
                    >
                      Créer le ticket
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-4 h-6 w-6 transition-all group-hover:ml-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ticket;
