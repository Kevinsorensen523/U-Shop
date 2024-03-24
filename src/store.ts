import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartSlice";
import historyReducer from "./components/historySlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    history: historyReducer,
  },
});
