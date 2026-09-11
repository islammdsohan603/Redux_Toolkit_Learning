import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",

  initialState: {
    query: "",
    activeTab: "",
    results: [],
    loading: false,
    error: null,
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },

    setActiveTabs(state, action) {
      state.activeTab = action.payload;
    },

    setResult(state, action) {
      state.results = action.payload;
      state.loading = false;
    },

    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearResults(state) {
      state.results = [];
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setResult,
  setLoading,
  setError,
  clearResults,
} = searchSlice.actions;

export default searchSlice.reducer;
