import React, { createContext, useState } from "react";

// Créez le contexte du panier
export const CartContext = createContext();

// Créez le fournisseur du panier
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fonction pour ajouter un article au panier
  const addToCart = (productItem) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === productItem.id
    );

    if (existingItemIndex !== -1) {
      // Si le produit existe déjà dans le panier, augmentez simplement la quantité
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Si le produit n'existe pas encore dans le panier, ajoutez-le avec une quantité de 1
      setCartItems([...cartItems, { ...productItem, quantity: 1 }]);
    }
  };

  // Fonction pour supprimer un article du panier
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Calcul du prix total du panier
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Valeur du contexte
  const cartContextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    calculateTotalPrice,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
