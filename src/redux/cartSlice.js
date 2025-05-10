import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        cartSlice.caseReducers.incrementProductCounter(state, {
          payload: action.payload.id,
        });
      } else {
        state.cart = [...state.cart, { ...action.payload, counter: 1 }];
      }
    },

    incrementProductCounter: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.counter += 1;
      }
    },
    decrementProductCounter: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.counter -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        const findedIndex = state.cart.indexOf(product);
        state.cart.splice(findedIndex, 1);
      }
    },
    resetCart: (state) => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementProductCounter,
  decrementProductCounter,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
