import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProductList: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const { updateProductList } = productSlice.actions;
export default productSlice.reducer;
