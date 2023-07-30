export const addToCart = (productItem) => {
    return {
        type: 'ADD_TO_CART',
        payload: productItem
    };
};

export const removeFromCart = (itemId) => {
    return{
        type: 'REMOVE_FROM_CART',
        payload: itemId
    };
};

export const updateTotalQuantity = (quantity) => {
  return {
    type: 'UPDATE_TOTAL_QUANTITY',
    payload: quantity
  };
};

export const updateTotalPrice = (totalPrice) => {
  return {
    type: 'UPDATE_TOTAL_PRICE',
    payload: totalPrice
  };
};

export const updateProductList = (productList) => {
  return {
    type: 'UPDATE_PRODUCT_LIST',
    payload: productList
  };
};


export const getCartItemsCount = (totalQuantity) => {
  return {
    type: 'GET_CART_ITEMS_COUNT',
    payload: totalQuantity
  };
};