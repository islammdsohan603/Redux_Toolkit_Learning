import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import collectionReducer from "./features/collectionSlice";
import toastReducer from "./features/toastSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    collection: collectionReducer,
    toast: toastReducer,
  },
});
