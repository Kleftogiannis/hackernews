import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ResultsWithID } from "../App";

interface SearchState {
  results: ResultsWithID[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: SearchState = {
  results: [],
  status: "idle",
};

export const fetchResults = createAsyncThunk<ResultsWithID[], string>(
  "search/fetchResults",
  async (searchTerm) => {
    const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${searchTerm}`);
    const data = await response.json();
    return data.hits || [];
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action: PayloadAction<ResultsWithID[]>) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectSearchResults = (state: RootState) => state.search.results;

export default searchSlice.reducer;
