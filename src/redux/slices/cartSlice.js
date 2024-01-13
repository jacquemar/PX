import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  ticketNumber: "",
  ticketList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    resetTicketList: (state) => {
      state.ticketList = [];
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      const { productId } = action.payload; // Récupérer l'ID du produit à augmenter

      // Trouver l'index du produit dans le panier
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === productId
      );
      if (productIndex !== -1) {
        // Si le produit est présent dans le panier, augmenter la quantité de 1
        state.cartItems[productIndex].quantity += 1;
        state.totalPrice += state.cartItems[productIndex].price;
      }
    },
    addTicketNumber: (state, action) => {
      state.ticketList.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const removedItemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== removedItemId
      );
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    getCartItemsCount: (state) => {
      state.totalQuantity = state.cartItems.length;
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id || item._id === productId
      );

      if (productIndex !== -1) {
        state.cartItems[productIndex].quantity = quantity;
      }
    },
    decreaseQuantity: (state, action) => {
      const { productId } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id || item._id === productId
      );

      if (productIndex !== -1) {
        // Vérifier si le produit est présent dans le panier

        if (state.cartItems[productIndex].quantity > 1) {
          // Si la quantité est supérieure à 1, diminuer la quantité de 1
          state.cartItems[productIndex].quantity -= 1;
        } else {
          // Si la quantité est égale à 1, supprimer le produit du panier
          state.cartItems.splice(productIndex, 1);
        }
      }
    },
    increaseQuantity: (state, action) => {
      const { productId } = action.payload; // Récupérer l'ID du produit à augmenter
      // Trouver l'index du produit dans le panier
      const productIndex = state.cartItems.findIndex(
        (item) => item.id || item._id === productId
      );
      if (productIndex !== -1) {
        // Si le produit est présent dans le panier

        if (productIndex !== -1) {
          // Si le produit est présent dans le panier, augmenter la quantité de 1
          state.cartItems[productIndex].quantity += 1;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateTotalQuantity,
  updateTotalPrice,
  resetCart,
  resetTicketList,
  addTicketNumber,
  getCartItemsCount,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
