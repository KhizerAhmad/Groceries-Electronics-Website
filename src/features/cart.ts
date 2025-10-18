import { createSlice } from "@reduxjs/toolkit";

type Item = {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
};

type CartState = {
  items: Item[];
  totalQuantity: number;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalQuantity += 1;
      }

    },

    removeItemFromCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
        state.items = state.items.filter((i) => i.id !== action.payload);
        state.totalQuantity-=1
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
        state.totalQuantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, increaseQuantity, decreaseQuantity} =
  cartSlice.actions;
export default cartSlice.reducer;
