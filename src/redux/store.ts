import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import savedReducer from "./savedSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    saved: savedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
