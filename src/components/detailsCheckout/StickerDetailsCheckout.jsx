import React from "react";
import { useState } from "react";

function StickerDetailsCheckout() {
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  // Nouveau gestionnaire d'événements pour la méthode de livraison sélectionnée
  const handleMethodChange = (event) => {
    const selectedMethodValue = event.target.value;
    setSelectedMethod(selectedMethodValue);
    const newDeliveryPrice = calculateDeliveryPrice(
      selectedCommune,
      selectedMethodValue
    );
    setDeliveryPrice(newDeliveryPrice.toString());
  };
  return (
    <div>
      <section class="py-12 sm:py-16">
        <div class="container mx-auto px-4">
          <nav class="flex">
            <ol role="list" class="flex items-center">
              <li class="text-left">
                <div class="-m-1">
                  <a
                    href="#"
                    class="rounded-md p-1 text-sm font-medium text-gray-600 hover:text-gray-800 focus:text-gray-900 focus:shadow"
                  >
                    Accueil
                  </a>
                </div>
              </li>

              <li class="text-left">
                <div class="flex items-center">
                  <span class="mx-2 text-gray-400">/</span>
                  <div class="-m-1">
                    <a
                      href="#"
                      class="rounded-md p-1 text-sm font-medium text-gray-600 hover:text-gray-800 focus:text-gray-900 focus:shadow"
                    >
                      Stickers
                    </a>
                  </div>
                </div>
              </li>

              <li class="text-left">
                <div class="flex items-center">
                  <span class="mx-2 text-gray-400">/</span>
                  <div class="-m-1">
                    <a
                      href="#"
                      class="rounded-md p-1 text-sm font-medium text-gray-600 hover:text-gray-800 focus:text-gray-900 focus:shadow"
                      aria-current="page"
                    >
                      Personnalisation
                    </a>
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div class="lg:col-span-3 lg:row-end-1">
              <div class="lg:flex lg:items-start">
                <div class="lg:order-2 lg:ml-5">
                  <div class="max-w-xl overflow-hidden rounded-lg">
                    <img
                      class="h-full w-full max-w-full object-cover"
                      src="../../../src/assets/stckDetail3.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div class="flex flex-row items-start lg:flex-col">
                    <button
                      type="button"
                      class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                    >
                      <img
                        class="h-full w-full object-cover"
                        src="../../../src/assets/stckDetail2.jpg"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                    >
                      <img
                        class="h-full w-full object-cover"
                        src="../../../src/assets/stckDetail1.jpg"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                    >
                      <img
                        class="h-full w-full object-cover"
                        src="../../../src/assets/stckDetail4.jpg"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                Personnalistaion Sticker/Étiquette
              </h1>

              <div class="mt-5 flex items-center">
                <div class="flex items-center">
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                </div>
                <p class="ml-2 text-sm font-medium text-gray-500">
                  1,209 Commandes
                </p>
              </div>
              <form className="">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="deliveryMethod"
                    value="standard"
                    checked={selectedMethod === "standard"}
                    onChange={handleMethodChange}
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                  <label
                    className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                    for="radio_1"
                  >
                    <img
                      className="w-14 object-contain"
                      src="../../src/assets/standard.png"
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">
                        Livraison standard{" "}
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        Livrée entre 3-4 jours
                      </p>
                    </div>
                  </label>
                </div>
                <h2 class="mt-8 text-base font-semibold text-gray-900">Type</h2>
                <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                  <label class="">
                    <input
                      type="radio"
                      name="type"
                      value="Papier"
                      class="peer sr-only"
                      checked
                    />
                    <p class="rounded-lg border border-pxcolor px-6 py-2 font-bold peer-checked:bg-pxcolor peer-checked:text-white">
                      Papier
                    </p>
                  </label>
                  <label class="">
                    <input
                      type="radio"
                      name="type"
                      value="blanc"
                      class="peer sr-only"
                    />
                    <p class="rounded-lg border border-pxcolor px-6 py-2 font-bold peer-checked:bg-pxcolor peer-checked:text-white">
                      Vinyle blanc
                    </p>
                  </label>
                  <label class="">
                    <input
                      type="radio"
                      name="type"
                      value="transparent"
                      class="peer sr-only"
                    />
                    <p class="rounded-lg border border-pxcolor px-6 py-2 font-bold peer-checked:bg-pxcolor peer-checked:text-white">
                      Vinyle Transparent
                    </p>
                  </label>
                </div>

                <h2 class="mt-8 text-base font-semibold text-gray-900">
                  Quantité
                </h2>

                <div class=" mt-3 flex select-none items-center gap-1">
                  <div class="text-center">
                    <div class="relative w-56">
                      <input
                        class="peer hidden"
                        type="checkbox"
                        name="select-1"
                        id="select-1"
                      />
                      <label
                        for="select-1"
                        class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring"
                      >
                        Selectionnez la quantité
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-xl transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          25
                        </li>
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          50
                        </li>
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          100
                        </li>
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          200
                        </li>
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          500
                        </li>
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          1000
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 class="mt-8 text-base text-gray-900">
                  Choisissez le format
                </h2>
                <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                  <div class="">
                    <div class="relative w-56">
                      <input
                        class="peer hidden"
                        type="checkbox"
                        name="select-1"
                        id="select-1"
                      />
                      <label
                        for="select-1"
                        class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring"
                      >
                        Selectionnez le format
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-xl transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          Nikola Tesla
                        </li>
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          Lorem Ipsanum
                        </li>
                        <li class="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                          Alber Einstein
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 class="mb-4 mt-8 font-semibold text-gray-900 dark:text-white">
                  Finitions
                </h3>
                <ul class="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
                  <li class="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
                    <div class="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-license"
                        type="radio"
                        value=""
                        name="list-radio"
                        class="h-4 w-4 border-gray-300 bg-gray-100 text-pxcolor focus:ring-2 focus:ring-pxcolor dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-pxcolor dark:focus:ring-offset-gray-700"
                      ></input>
                      <label
                        for="horizontal-list-radio-license"
                        class="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Vernis UV
                      </label>
                    </div>
                  </li>
                  <li class="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
                    <div class="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value=""
                        name="list-radio"
                        class="h-4 w-4 border-gray-300 bg-gray-100 text-pxcolor focus:ring-2 focus:ring-pxcolor dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-pxcolor dark:focus:ring-offset-gray-700"
                      ></input>
                      <label
                        for="horizontal-list-radio-id"
                        class="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Pelliculage Brillant
                      </label>
                    </div>
                  </li>
                  <li class="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
                    <div class="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-military"
                        type="radio"
                        value=""
                        name="list-radio"
                        class="h-4 w-4 border-gray-300 bg-gray-100 text-pxcolor focus:ring-2 focus:ring-pxcolor dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-pxcolor dark:focus:ring-offset-gray-700"
                      ></input>
                      <label
                        for="horizontal-list-radio-military"
                        class="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Pelliculage Mate
                      </label>
                    </div>
                  </li>
                  <li class="w-full dark:border-gray-600">
                    <div class="flex items-center ps-3">
                      <input
                        id="horizontal-list-radio-passport"
                        type="radio"
                        value=""
                        name="list-radio"
                        class="h-4 w-4 border-gray-300 bg-gray-100 text-pxcolor focus:ring-2 focus:ring-pxcolor dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-pxcolor dark:focus:ring-offset-gray-700"
                      ></input>
                      <label
                        for="horizontal-list-radio-passport"
                        class="ms-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Normal
                      </label>
                    </div>
                  </li>
                </ul>
              </form>

              <div class="mt-10 flex flex-col items-center justify-between space-y-4 border-b border-t py-4 sm:flex-row sm:space-y-0">
                <div class="flex items-end">
                  <h1 class="text-3xl font-bold">$60.50</h1>
                  <span class="text-base">/month</span>
                </div>

                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-3 h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>

              <ul class="mt-8 space-y-2">
                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    class="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      class=""
                    ></path>
                  </svg>
                  Free shipping worldwide
                </li>

                <li class="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    class="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      class=""
                    ></path>
                  </svg>
                  Cancel Anytime
                </li>
              </ul>
            </div>

            <div class="lg:col-span-3">
              <div class="border-b border-gray-300">
                <nav class="flex gap-4">
                  <a
                    href="#"
                    title=""
                    class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                  >
                    {" "}
                    Description{" "}
                  </a>

                  <a
                    href="#"
                    title=""
                    class="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                  >
                    Reviews
                    <span class="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                      {" "}
                      1,209{" "}
                    </span>
                  </a>
                </nav>
              </div>

              <div class="mt-8 flow-root sm:mt-12">
                <h1 class="text-3xl font-bold">Delivered To Your Door</h1>
                <p class="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  accusantium nesciunt fuga.
                </p>
                <h1 class="mt-8 text-3xl font-bold">
                  From the Fine Farms of Brazil
                </h1>
                <p class="mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                  numquam enim facere.
                </p>
                <p class="mt-4">
                  Amet consectetur adipisicing elit. Optio numquam enim facere.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolore rerum nostrum eius facere, ad neque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StickerDetailsCheckout;
