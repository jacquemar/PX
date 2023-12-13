import React, { useState } from "react";
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
        <div className="mx-2 flex w-full max-w-[128px] items-center justify-between rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400">
          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-l-lg bg-gray-100 px-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
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
            {currentPage} of {Math.round(totalProduct / productPerPage)}
          </span>
          <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-r-lg bg-gray-100 px-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
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
