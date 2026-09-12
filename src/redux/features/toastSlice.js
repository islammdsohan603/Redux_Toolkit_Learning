import { createSlice } from "@reduxjs/toolkit";

let toastId = 0;

const collectionSlice = createSlice({
  name: "toast",

  initialState: {
    toasts: [],
  },

  reducers: {
    addToast(state, action) {
      state.toasts.push({
        id: ++toastId,
        message: action.payload.message,
        type: action.payload.type || "info", // "save" | "delete" | "download" | "info"
      });
    },

    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = collectionSlice.actions;
export default collectionSlice.reducer;
