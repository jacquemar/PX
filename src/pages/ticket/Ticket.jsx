import React, { useState, useEffect, useContext } from "react";
import { Footer } from "../../components";
import { CartContext } from "../../components/CartContext";
import { Item } from "material";

const Ticket = () => {
  const {
    cartItems,
    removeFromCart,
    setCartItems,
    addToCart,
    calculateTotalPrice,
  } = useContext(CartContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityMap, setQuantityMap] = useState({});

  useEffect(() => {
    if (cartItems) {
      // Vérifier si cartItems est défini
      // Calculer le total des quantités et des prix à chaque changement de panier
      let newTotalQuantity = 0;
      let newTotalPrice = 0;

      cartItems.forEach((item) => {
        newTotalQuantity += item.quantity;
        newTotalPrice += item.quantity * item.price;
      });

      setTotalQuantity(newTotalQuantity);
      setTotalPrice(newTotalPrice);
    }
  }, [cartItems]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Le produit existe déjà dans le panier, mettez à jour sa quantité
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === existingItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      setCartItems(updatedCartItems);
    } else {
      // Le produit n'existe pas encore dans le panier, ajoutez-le
      const newItem = {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        cover: product.cover,
      };

      setCartItems([...cartItems, newItem]);
    }

    // Mettre à jour les totaux
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + product.price);
  };

  const handleRemoveFromCart = (itemId) => {
    const removedItem = cartItems.find((item) => item.id === itemId);

    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);

    // Mettre à jour les totaux
    setTotalQuantity(totalQuantity - removedItem.quantity);
    setTotalPrice(totalPrice - removedItem.quantity * removedItem.price);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity - 1;
        return {
          ...item,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    // Mettre à jour la quantité du produit dans quantityMap
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [itemId]: Math.max((prevQuantityMap[itemId] || 0) - 1, 0),
    }));

    // Vérifier si la nouvelle quantité est égale à 0 et supprimer l'élément du panier
    if (updatedCartItems.find((item) => item.id === itemId)?.quantity === 0) {
      handleRemoveFromCart(itemId);
    }

    // Mettre à jour les totaux
    const updatedItem = updatedCartItems.find((item) => item.id === itemId);
    setTotalQuantity(totalQuantity - 1);
    setTotalPrice(totalPrice - updatedItem.price);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    // Mettre à jour la quantité du produit dans quantityMap
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [itemId]: (prevQuantityMap[itemId] || 0) + 1,
    }));

    // Mettre à jour les totaux
    const updatedItem = updatedCartItems.find((item) => item.id === itemId);
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + updatedItem.price);
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-gray-500 mt-6 w-full text-left text-sm dark:text-gray-400">
          <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 text-base uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Nom
              </th>
              <th scope="col" className="px-6 py-3">
                Qté
              </th>
              <th scope="col" className="px-6 py-3">
                Prix
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log(cartItems)}
            {cartItems.map((item, index) => (
              <tr
                key={`${item.id}-${index}`}
                className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b bg-white"
              >
                <td className="w-24 p-1">
                  <img src={item.cover} alt={item.name} />
                </td>
                <td className="text-gray-900 px-6 py-4 font-semibold dark:text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-gray-500 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center rounded-full border bg-white p-1 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400"
                      type="button"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <span className="sr-only">Quantity button </span>
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
                    <div>
                      <input
                        type="number"
                        id="first_product"
                        className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 block w-14 rounded-lg border px-2.5 py-1 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder={quantityMap[item.id] || item.quantity}
                        value={quantityMap[item.id] || item.quantity}
                        required
                      />
                    </div>
                    <button
                      className="text-gray-500 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center rounded-full border bg-white p-1 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400"
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
                </td>

                <td className="text-gray-900 px-6 py-4 font-semibold dark:text-white">
                  {item.price}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="text-red-600 dark:text-red-500 font-medium hover:underline"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr class="text-gray-900 font-semibold dark:text-white">
              <th scope="col" className=" px-6 py-3 text-center text-base">
                Total
              </th>

              <td class="px-6 py-3">{totalQuantity}</td>
              <td class="px-6 py-3 text-base text-red">
                {totalPrice} <span className="text-gray-400">XOF</span>{" "}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Ticket;
