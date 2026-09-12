import { createSlice } from "@reduxjs/toolkit";

// Rehydrate from localStorage on startup
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("pixelvault_collection");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem("pixelvault_collection", JSON.stringify(items));
  } catch {
    /* ignore quota errors */
  }
};

const collectionSlice = createSlice({
  name: "collection",

  initialState: {
    savedItems: loadFromStorage(),
  },

  reducers: {
    addToCollection(state, action) {
      const exists = state.savedItems.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.savedItems.unshift(action.payload);
        saveToStorage(state.savedItems);
      }
    },

    removeFromCollection(state, action) {
      state.savedItems = state.savedItems.filter(
        (item) => item.id !== action.payload
      );
      saveToStorage(state.savedItems);
    },

    clearCollection(state) {
      state.savedItems = [];
      saveToStorage([]);
    },
  },
});

export const { addToCollection, removeFromCollection, clearCollection } =
  collectionSlice.actions;

export default collectionSlice.reducer;
