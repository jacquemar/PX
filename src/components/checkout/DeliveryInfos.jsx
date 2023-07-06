import React from "react";

export default function DeliveryInfos() {
  return (
    <div>
      <ol class="mt-6 ml-16 mb-6 flex w-11/12 items-center ">
        <li class="flex w-full items-center text-blue-600 after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-blue-100 after:content-[''] dark:text-blue-500 dark:after:border-blue-800">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 lg:h-12 lg:w-12">
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-blue-600 dark:text-blue-300 lg:h-6 lg:w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </li>
        <li class="flex w-full items-center text-blue-600 after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-blue-100 after:content-[''] dark:text-blue-500 dark:after:border-blue-800">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 lg:h-12 lg:w-12">
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-blue-600 dark:text-blue-300 lg:h-6 lg:w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </li>
        <li class="flex w-full items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 lg:h-12 lg:w-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6"
            >
              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
              <path
                fill-rule="evenodd"
                d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </li>
      </ol>

      <div className="mt-16 ml-6">
        <div class="relative z-0 mb-8">
          <input
            type="text"
            id="floating_standard"
            class="peer block w-full appearance-none  border-0 border-b-2 border-gray-300 bg-transparent py-6 px-0 text-sm text-gray-900 focus:border-pxcolor focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
          />
          <label
            for="floating_standard"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-pxcolor dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Lieu de livraison
          </label>
        </div>
        <div class="relative z-0 mb-8">
          <input
            type="text"
            id="floating_standard"
            class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-6 px-0 text-lg text-gray-900 focus:border-pxcolor focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
          />
          <label
            for="floating_standard"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-pxcolor dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Quartier
          </label>
        </div>
        <div className="ml-10">
          <div className="relative z-0 mb-8 inline-flex ">
            <select
              id="underline_select"
              class="peer appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-lg text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
            >
              <option selected>Ville</option>
              <option value="ABJ">Abidjan</option>
              <option value="BAS">Bassam</option>
              <option value="YAK">Yamoussokro</option>
              <option value="SPD">San pedro</option>
            </select>
          </div>
          <div class="relative z-0 mb-8 ml-12 inline-flex ">
            <select
              id="underline_select"
              class="peer appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-lg text-gray-500 focus:border-gray-200 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-gray-400"
            >
              <option selected>Pays</option>
              <option value="CIV">Côte d'Ivoire</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
