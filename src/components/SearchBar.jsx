import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import {
  setQuery,
  setResult,
  setLoading,
  setError,
  clearResults,
} from "../redux/features/searchSlice";
import { fetchPhotos, fetchVideos } from "../api/mediaApp";

const SearchBar = () => {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { activeTab, loading } = useSelector((s) => s.search);

  const doSearch = async (searchText) => {
    if (!searchText.trim()) return;
    dispatch(setQuery(searchText));
    dispatch(clearResults());
    dispatch(setLoading(true));

    try {
      if (activeTab === "photos") {
        const data = await fetchPhotos(searchText);
        // Normalize Unsplash: tag each item with type
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
        dispatch(setResult(normalized));
      } else {
        const data = await fetchVideos(searchText);
        // Normalize Pexels: tag each item with type
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
        dispatch(setResult(normalized));
      }
    } catch (err) {
      dispatch(setError(err?.message || "Something went wrong"));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    doSearch(text);
    setText("");
    inputRef.current?.blur();
  };

  const clearInput = () => {
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <form onSubmit={submitHandler}>
        <motion.div
          className="relative flex items-center glass rounded-2xl overflow-hidden"
          animate={{
            boxShadow: focused
              ? "0 0 0 2px rgba(124,58,237,0.7), 0 0 40px rgba(124,58,237,0.3)"
              : "0 0 0 1px rgba(255,255,255,0.08)",
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Search Icon */}
          <motion.div
            className="pl-5 pr-2 text-[var(--text-muted)]"
            animate={{ color: focused ? "var(--accent-2)" : "var(--text-muted)" }}
          >
            <FiSearch size={20} />
          </motion.div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search photos, videos…"
            className="flex-1 bg-transparent p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none text-[15px]"
          />

          {/* Clear button */}
          <AnimatePresence>
            {text && (
              <motion.button
                type="button"
                onClick={clearInput}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="p-2 text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <FiX size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Search Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 m-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
              color: "#fff",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {loading ? (
              <motion.span
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
            ) : (
              <HiSparkles size={15} />
            )}
            {loading ? "Searching…" : "Search"}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

export default SearchBar;
