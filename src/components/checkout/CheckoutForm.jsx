import React, { useState } from "react";
import Delivery from "./Delivery";
import DeliveryInfos from "./DeliveryInfos";
import Payment from "./Payment";

const CheckoutForm = () => {
  const [page, setPage] = useState(0);
  const FormTitles = ["Livraison", "Adresse", "Paiement"];
  const PageDisplay = () => {
    if (page === 0) {
      return <Delivery />;
    } else if (page === 1) {
      return <DeliveryInfos />;
    } else {
      return <Payment />;
    }
  };
  return (
    <div>
      <div className="progressBar"></div>
      <div className="form-container"></div>

      <div className="body mt-16 w-11/12">{PageDisplay()}</div>

      <div className="footer mt-20 grid items-center justify-items-center">
        <div className="col-start-1 col-end-3">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
            type="button"
            className="mr-2 mb-2 rounded-lg border border-pxcolor px-5 py-2.5 text-center text-sm font-medium text-pxcolor hover:bg-pxcolor hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            Retour
          </button>
        </div>
        <div className="col-span-2 col-end-7">
          <button
            disabled={page == FormTitles.length - 1}
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
            type="button"
            className="mr-2 mb-2 rounded-lg bg-pxcolor px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
