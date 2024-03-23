import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface HistoryItem {
  transactionCode: string;
  totalAmount: number;
  items: CartItem[];
}

interface HistoryState {
  transactions: HistoryItem[];
}

const initialState: HistoryState = {
  transactions: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<HistoryItem>) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { addTransaction } = historySlice.actions;
export default historySlice.reducer;
