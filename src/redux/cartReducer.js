import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
        case 'UPDATE_TOTAL_QUANTITY':
            return {
                ...state,
                totalQuantity: action.payload,
            };
        case 'UPDATE_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.payload,
            };
        case 'GET_CART_ITEMS_COUNT':
            return {
        ...state,
        totalQuantity: state.cartItems.length // Mettez à jour le nombre total d'articles dans le panier
      };
      
      

    
        default:
            return state;
    }
    
};
export default cartReducer;