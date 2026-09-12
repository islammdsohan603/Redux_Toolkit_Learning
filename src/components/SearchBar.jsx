import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { setQuery, clearResults } from "../redux/features/searchSlice";
import { searchMedia } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { activeTab, loading } = useSelector((s) => s.search);

  const submitHandler = (e) => {
    e.preventDefault();
    const searchText = text.trim();
    if (!searchText) return;

    dispatch(setQuery(searchText));
    dispatch(clearResults());
    dispatch(searchMedia({ query: searchText, activeTab, page: 1 }));

    setText("");
    inputRef.current?.blur();
  };

  const clearInput = () => {
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
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
            className="flex-1 bg-transparent py-5 px-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none text-[15px]"
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
