import React from 'react';
import jsPDF from 'jspdf';

const Invoice = ({
  cartItems,
  selectedCommune,
  deliveryPrice,
  selectedMethod,
  totalPrice,
  pdfContent,
  netAPayer,
  ticketNumber,
  phoneNumber,
  handleClose,
}) => {


  // Fonction pour télécharger le PDF
  const downloadPDF = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfContent;
    downloadLink.download = 'ticket.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Fonction pour imprimer le PDF
  const printPDF = () => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfContent;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    // Add the code to generate the PDF similar to your existing code in Checkout component

    doc.save('ticket.pdf');
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="sm:w-11/12 lg:w-3/4 mx-auto">
          {/* Card */}
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800">
            {/* Grid */}
            <div className="flex justify-between">
              <div>
                <img src="../src/assets/logo-bleu.png" className="h-12 w-12 " alt="" />

                <h1 className="mt-2 text-lg md:text-xl font-semibold text-pxcolor  dark:text-white">
                  Print Xpress
                </h1>
              </div>
              <div className="text-right">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                  Invoice 
                </h2>
                <span className="mt-1 block text-gray-500">#{ticketNumber}</span>

                <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
                  {selectedCommune}<br />
                  Abidjan<br />
                  Côte d'ivoire<br />
                </address>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Facture au numéro:</h3>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{phoneNumber}</h3>

              </div>

              <div className="sm:text-right space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                      Date d'émission:
                    </dt>
                    <dd className="col-span-2 text-gray-500"></dd>
                  </dl>
                
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                 <ul className='flex flex-col rounded-lg bg-white sm:flex-row'>
        {cartItems.map((item, index) => (
            <li key={`${item.id}-${index}`} className=''> 
        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.cover} alt={item.name} />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">{item.name}</span>
         
          <p className="text-lg font-bold">{item.price} FCFA</p>
        </div>
        </li>
        ))}
        </ul>
              </div>
            </div>

            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-right space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                      Total Net:
                    </dt>
                    <dd className="col-span-2 text-gray-500">{netAPayer} FCFA</dd>
                  </dl>

                  {/* ... Other details ... */}
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Merci d'avoir commandé !</h4>
              <p className="text-gray-500">
                si vous avez des questions n'hésitez surtout pas à nous contacter 
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  xpressprint79@gmail.com
                </p>
                <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  +225 07 7729 3456
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">© 2023 Print Xpress.</p>
          </div>
        </div>
      </div>
      <div className="flex row-auto gap-3">
          <button className="mt-4 mb-8 w-1/3 rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={downloadPDF}>Download PDF</button>

      {/* Bouton pour imprimer le PDF */}
      <button className="mt-4 mb-8 w-1/3 rounded-md bg-gray-900 px-6 py-3 font-medium text-white"onClick={printPDF}>Print PDF</button>

      {/* Bouton pour fermer la facture */}
      <button className="mt-4 mb-8 w-1/3 rounded-md bg-gray-900 px-6 py-3 font-medium text-white"onClick={handleClose}>Close Invoice</button>
    </div></div>
  );
}

export default Invoice;
