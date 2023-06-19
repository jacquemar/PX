import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  totalProduct,
  productPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let product = [];
  for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
    product.push(i);
  }
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="mx-auto mt-4 grid h-full max-w-lg grid-cols-1">
      <div className="col-span-2 flex items-center justify-center">
        <div className="text-gray-600 bg-gray-100 dark:bg-gray-600 mx-2 flex w-full max-w-[128px] items-center justify-between rounded-lg dark:text-gray-400">
          <button
            type="button"
            className="bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-800 dark:focus:ring-gray-800 inline-flex h-8 items-center justify-center rounded-l-lg px-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={prevPage}
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              ></path>
            </svg>
            <span className="sr-only">Previous page</span>
          </button>
          <span className="mx-1 flex-shrink-0 text-sm font-medium">
            1 of {product}
          </span>
          <button
            type="button"
            className="bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-800 dark:focus:ring-gray-800 inline-flex h-8 items-center justify-center rounded-r-lg px-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={nextPage}
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              ></path>
            </svg>
            <span className="sr-only">Next page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
