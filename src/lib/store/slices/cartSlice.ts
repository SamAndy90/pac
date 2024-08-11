// Cart Slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoadData, SaveData } from "../localStorage";

export interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const loadInitialData = () => {
  const data = LoadData();
  if (data) {
    return data;
  }

  return initialState;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadInitialData,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: CartItem }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
      } else {
        state.items.push(action.payload.item);
        state.totalAmount += action.payload.item.price;
      }

      SaveData(state);
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
      SaveData(state);
    },

    addItem: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
        SaveData(state);
      }
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.quantity > 1) {
        state.totalAmount -= existingItem.price;
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalAmount -= existingItem.price;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
      SaveData(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      SaveData(state);
    },
  },
});

export const { addToCart, clearCart, addItem, removeItem, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
