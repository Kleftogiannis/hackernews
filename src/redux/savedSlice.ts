import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ResultsWithID } from "../App";


interface SavedState {
  items: ResultsWithID[];
}

const initialState: SavedState = {
  items: [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    addSavedItem: (state, action: PayloadAction<ResultsWithID>) => {
      const exists = state.items.some((item) => item.objectID === action.payload.objectID);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeSavedItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.objectID !== action.payload);
    },
  },
});

export const { addSavedItem, removeSavedItem } = savedSlice.actions;
export const selectSavedItems = (state: RootState) => state.saved.items;

export default savedSlice.reducer;
