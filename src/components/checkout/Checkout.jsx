import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Invoice from "../Invoice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { format } from "date-fns";

import { resetCart, addTicketNumber } from "../../redux/slices/cartSlice";

const communesList = [
  "Marcory",
  "Cocody",
  "Bingerville",
  "Bassam",
  "Port-Bouët",
  "Koumassi",
  "Treichville",
  "Plateaux",
  "Adjamé",
  "Yopougon",
  "Abobo",
  "Anyama",
  "Williamsville",
];

const Checkout = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const navigate = useNavigate();
  // État local pour stocker le numéro de téléphone
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fonction de rappel pour gérer les modifications du numéro de téléphone
  const handlePhoneNumberChange = (event) => {
    let phoneNumberValue = event.target.value;
    phoneNumberValue = phoneNumberValue.replace(/\D/g, "");
    if (phoneNumberValue.length <= 13) {
      if (!phoneNumberValue.startsWith("+225")) {
        phoneNumberValue = "+225" + phoneNumberValue.substr(3);
      }
      setPhoneNumber(phoneNumberValue);
    } else {
      console.log("longueur non valide");
    }
  };

  const calculateDeliveryPrice = (selectedCommune, selectedMethod) => {
    const deliveryPrices = {
      Marcory: 1000,
      Cocody: 1500,
      Bingerville: 2000,
      Bassam: 2000,
      "Port-Bouët": 1500,
      Koumassi: 1500,
      Treichville: 1000,
      Plateaux: 1500,
      Adjamé: 1500,
      Yopougon: 2000,
      Abobo: 1500,
      Anyama: 2000,
      Williamsville: 2000,
    };

    const basePrice = deliveryPrices[selectedCommune] || 0;
    const methodPrice = selectedMethod === "express" ? 1500 : 0;

    return basePrice + methodPrice;
  };

  // État local pour stocker la valeur sélectionnée de la commune
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("viens_chercher"); // Ajout de l'état local pour la méthode de livraison sélectionnée
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("om");
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [netAPayer, setnetAPayer] = useState(0);
  const [isRedirected, setIsRedirected] = useState(false);

  // Fonction de rappel pour gérer les modifications de la commune sélectionnée
  const handleCommuneChange = (event) => {
    setSelectedCommune(event.target.value);
    const newDeliveryPrice = calculateDeliveryPrice(
      event.target.value,
      selectedMethod
    );
    setDeliveryPrice(newDeliveryPrice.toString());
  };

  // fonction de validations du ticket
  const validateForm = () => {
    // Vérification de toutes les conditions de validation

    const isPhoneNumberValid = phoneNumber.trim() !== "";
    const isCommuneSelected = selectedCommune !== "";
    const isPaymentMethodSelected = selectedPaymentMethod !== "";

    // Mise à jour l'état isFormValid en fonction de la validation
    setIsFormValid(
      isPhoneNumberValid && isCommuneSelected && isPaymentMethodSelected
    );
  };

  // Appel de la fonction de validation à chaque fois que les champs sont modifiés
  useEffect(() => {
    validateForm();
  }, [phoneNumber, selectedCommune, selectedPaymentMethod]);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
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

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const ticketNumber = useSelector((state) => state.ticket.ticketNumber);

  const dispatch = useDispatch();

  const currentDate = format(new Date(), "dd/MM/yyyy HH:mm:ss");

  useEffect(() => {
    const calculatedNetAPayer =
      parseFloat(totalPrice) + parseFloat(deliveryPrice);
    setnetAPayer(calculatedNetAPayer.toFixed(2));
  }, [totalPrice, deliveryPrice]);

  const [pdfContent, setPdfContent] = useState("");

  //ORANGE SMS
  const sendSMS = async () => {
    const phoneNumber = phoneNumber;
    const message = `Félicitation🎉, vous venez de passer une commande pour un total de ${totalPrice} à livrer à ${selectedCommune}`;

    try {
      await axios.post("http://localhost:2000/send-sms", {
        phoneNumber,
        message,
      });
      console.log("SMS envoyé avec succès");
    } catch (error) {
      console.error("Erreur lors de l'envoi du SMS :", error);
    }
  };

  const handleGeneratePDF = async () => {
    // enregistrement en BD
    try {
      const response = await axios.post("http://localhost:2000/create-order", {
        cartItems: cartItems,
        selectedCommune: selectedCommune,
        selectedMethod: selectedPaymentMethod,
        deliveryMethod: selectedMethod,
        deliveryPrice: deliveryPrice,
        totalPrice: totalPrice,
        phoneNumber: phoneNumber,
        ticketNumber: ticketNumber,
        orderDate: currentDate,
      });

      if (response.ok) {
        toast.success("Commande passée avec succès ! ");
        sendSMS();
        const pdfContent = generatePDF(); // Générer le PDF
        setPdfContent(pdfContent); // Mettre à jour l'état local du contenu PDF
        setShowInvoice(true); // Afficher la facture
        dispatch(resetCart(cartItems)); // Réinitialiser le panier
        setTimeout(() => {
          navigate("/history"); // Naviguer vers la page d'historique
        }, 2000);
      } else {
        // Gérer les erreurs si nécessaire
      }
    } catch (error) {
      // Afficher le toast de succès
      toast.error("Échec de l'enregistrement de la commande!");
      console.error(error);
    }
  };

  // Fonction pour générer et télécharger le fichier PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Informations du ticket
    const ticketText = `Ticket Number: ${ticketNumber}\n\n`;
    const cartItemsText = `Cart Items:\n`;
    const cartItemsDetails = cartItems
      .map((item) => `- ${item.name} - ${item.price} FCFA`)
      .join("\n");
    const deliveryDetailsText = `\n\nDelivery Details:\nSelected Commune: ${selectedCommune}\nDelivery Price: ${deliveryPrice} FCFA\nMethod: ${
      selectedMethod === "radio_2" ? "Livraison Xpress" : "Livraison standard"
    }\n\n`;

    // Ajouter les informations au PDF
    doc.text(ticketText, 10, 10);
    doc.text(cartItemsText, 10, 20);
    doc.text(cartItemsDetails, 15, 30);
    doc.text(deliveryDetailsText, 10, 70);

    // Télécharger le fichier PDF
    return doc.output("datauristring");
  };

  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Création du Ticket
        </a>
        <div className="mt-4 py-2 text-xs sm:ml-auto sm:mt-0 sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="bg-emerald-200 text-emerald-700 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Ticket</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Livrason</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Paiement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Détails du Ticket</p>
          <p className="text-gray-400">
            Vérifiez vos articles, et choisissez la méthode de livraison qui
            vous convient.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <ul className="flex flex-col rounded-lg bg-white sm:flex-row">
                {cartItems.map((item, index) => (
                  <li key={`${item.id}-${index}`} className="">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={item.cover}
                      alt={item.name}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{item.name}</span>
                      <p className="text-lg font-bold">{item.price} FCFA</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-lg font-medium">Méthodes de livraison</p>
          <form className="mt-5 grid gap-6">
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
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="deliveryMethod"
                value="express"
                checked={selectedMethod === "express"}
                onChange={handleMethodChange}
              />
              <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
              <label
                className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                for="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="../../src/assets/24h-01.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Livraison Xpress</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Livrée sous 24h
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_3"
                type="radio"
                name="deliveryMethod"
                value="calendrier"
                checked={selectedMethod === "calendrier"}
                onChange={handleMethodChange}
              />
              <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
              <label
                className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                for="radio_3"
              >
                <img
                  className="w-14 object-contain"
                  src="../../src/assets/calendar-01.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    Livraison calendrier
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    choisissez un jour de l'année
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Détails de paiement</p>
          <p className="text-gray-400">
            Terminer la commande en fournissant les informations de facturation
            et de livraison
          </p>
          <div className="">
            <label
              for="quartier"
              className="mb-2 mt-4 block text-sm font-medium"
            >
              Quartier
            </label>
            <div className="relative">
              <input
                type="text"
                id="quartier"
                name="quartier"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Bietry"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="commune"
              className="mb-2 mt-4 block text-sm font-medium"
            >
              Commune
            </label>
            <div className="relative">
              <select
                id="commune"
                name="commune"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                value={selectedCommune}
                onChange={handleCommuneChange} // Utiliser la fonction de rappel pour mettre à jour l'état local
              >
                <option value="">Je viens chercher</option>
                {communesList.map((commune) => (
                  <option key={commune} value={commune}>
                    {commune}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
            </div>
            <label for="numero" className="mb-2 mt-4 block text-sm font-medium">
              Numéro
            </label>
            <div className="relative">
              <input
                type="text"
                id="numero"
                name="numero"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="+225 0102030405"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label
                htmlFor="card-no"
                className="mb-2 mt-4 block text-xl font-medium"
              >
                Méthode de paiement
              </label>
              <form className="mt-5 grid gap-6">
                {/* ... Autres parties du code ... */}
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="om"
                    type="radio"
                    name="paiementmethod"
                    value="om"
                    checked={selectedPaymentMethod === "om"} // Mettre à jour l'attribut "checked" en fonction de l'état local
                    onChange={handlePaymentMethodChange} // Nouveau gestionnaire d'événements pour la méthode de livraison sélectionnée
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                  <label
                    className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                    htmlFor="om"
                  >
                    <img
                      className="w-14 object-contain"
                      src="../../src/assets/om.png"
                      alt=""
                    />
                    <div className="mt-2 font-semibold">Orange Money</div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="wave"
                    type="radio"
                    name="paiementmethod"
                    value="wave"
                    checked={selectedPaymentMethod === "wave"} // Mettre à jour l'attribut "checked" en fonction de l'état local
                    onChange={handlePaymentMethodChange} // Nouveau gestionnaire d'événements pour la méthode de livraison sélectionnée
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                  <label
                    className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                    htmlFor="wave"
                  >
                    <img
                      className="w-14 object-contain"
                      src="../../src/assets/wave.png"
                      alt=""
                    />
                    <div className="mt-2 font-semibold">Wave</div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="cash"
                    type="radio"
                    name="paiementmethod"
                    value="cash"
                    checked={selectedPaymentMethod === "cash"} // Mettre à jour l'attribut "checked" en fonction de l'état local
                    onChange={handlePaymentMethodChange} // Nouveau gestionnaire d'événements pour la méthode de livraison sélectionnée
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                  <label
                    className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                    htmlFor="cash"
                  >
                    <img
                      className="w-14 object-contain"
                      src="../../src/assets/cash.png"
                      alt=""
                    />
                    <div className="mt-2 font-semibold">
                      Payer à la livraison
                    </div>
                  </label>
                </div>
              </form>
            </div>

            <div className="mt-6 border-b border-t py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total Brut</p>
                <p className="font-semibold text-gray-900">{totalPrice}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Livraison/Expédition
                </p>
                <p className="font-semibold text-gray-900">{deliveryPrice}</p>
              </div>

              {selectedMethod === "radio_2" && (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">
                    Livraison Xpress
                  </p>
                  <p className="font-extralight italic text-gray-600">1500</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {" "}
                {netAPayer}{" "}
                <span className="text-xs font-normal text-gray-400">FCFA</span>
              </p>
            </div>
          </div>

          <button
            className="mb-8 mt-4 w-full rounded-md bg-pxcolor px-6 py-3 font-medium text-white"
            onClick={() => {
              if (isFormValid) {
                toast.success("Commande passée avec succès !");
                dispatch(addTicketNumber(ticketNumber));
                handleGeneratePDF(),
                  setShowInvoice(true),
                  dispatch(resetCart(cartItems));
                setTimeout(() => {
                  navigate("/"); // Naviguer vers la page d'historique
                }, 3000);
              } else {
                toast.error("Veuillez remplir tous les champs requis.");
              }
            }}
            disabled={!isFormValid}
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
