import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPhotos, fetchVideos } from "../../api/mediaApp";

const PER_PAGE = 10;

// ── Async Thunk ────────────────────────────────────────────────
export const searchMedia = createAsyncThunk(
  "search/searchMedia",
  async ({ query, activeTab, page = 1 }, { rejectWithValue }) => {
    try {
      if (activeTab === "photos") {
        const data = await fetchPhotos(query, page, PER_PAGE);
        const normalized = (data?.results || []).map((p) => ({
          ...p,
          _type: "photo",
          _thumb: p.urls?.small,
          _full: p.urls?.full,
          _author: p.user?.name,
          _authorLink: p.user?.links?.html,
          _sourceLink: p.links?.html,
          _description: p.alt_description || p.description || "",
          _color: p.color,
        }));
        return {
          results: normalized,
          totalResults: data.total || 0,
          totalPages: Math.min(data.total_pages || 1, 50), // Unsplash caps at 50
          page,
        };
      } else {
        const data = await fetchVideos(query, page, PER_PAGE);
        const normalized = (data?.videos || []).map((v) => ({
          ...v,
          _type: "video",
          _thumb: v.image,
          _videoUrl:
            v.video_files?.find((f) => f.quality === "sd")?.link ||
            v.video_files?.[0]?.link,
          _author: v.user?.name,
          _authorLink: v.user?.url,
          _sourceLink: v.url,
          _description: `${v.width}×${v.height} · ${v.duration}s`,
          _duration: v.duration,
          _width: v.width,
          _height: v.height,
        }));
        const totalResults = data?.total_results || 0;
        return {
          results: normalized,
          totalResults,
          totalPages: Math.min(Math.ceil(totalResults / PER_PAGE), 50),
          page,
        };
      }
    } catch (err) {
      console.error("Search error:", err);
      return rejectWithValue(err?.message || "Something went wrong. Check API keys.");
    }
  }
);

// ── Slice ──────────────────────────────────────────────────────
const searchSlice = createSlice({
  name: "search",

  initialState: {
    query: "",
    activeTab: "photos",
    results: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },

    setActiveTabs(state, action) {
      state.activeTab = action.payload;
      // Reset pagination when switching tabs
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalResults = 0;
      state.results = [];
    },

    clearResults(state) {
      state.results = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalResults = 0;
      state.error = null;
    },

    removeFromResults(state, action) {
      state.results = state.results.filter((item) => item.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(searchMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setQuery,
  setActiveTabs,
  clearResults,
  removeFromResults,
} = searchSlice.actions;

// Keep these as named exports for backward compatibility
export const setResult = () => {};
export const setLoading = () => {};
export const setError = () => {};

export default searchSlice.reducer;
