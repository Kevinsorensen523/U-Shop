import { configureStore } from "@reduxjs/toolkit";

interface AppState {
  cartCount: number;
}

const initialState: AppState = {
  cartCount: 0,
};

const cartReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case "cart/increment":
      return { ...state, cartCount: state.cartCount + 1 };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
