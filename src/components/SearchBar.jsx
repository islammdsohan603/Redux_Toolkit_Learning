import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { setQuery, clearResults, searchMedia } from "../redux/features/searchSlice";

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
      <form onSubmit={submitHandler} className="w-full">
        <motion.div
          className="relative flex items-center w-full rounded-2xl transition-all duration-200"
          style={{
            background: "rgba(18, 14, 28, 0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: focused
              ? "1px solid rgba(168, 85, 247, 0.65)"
              : "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: focused
              ? "0 0 0 3px rgba(168, 85, 247, 0.25), 0 0 35px rgba(168, 85, 247, 0.25)"
              : "0 8px 32px rgba(0, 0, 0, 0.45)",
            padding: "6px 8px 6px 8px", // বাইরের সমান প্যাডিং
            minHeight: "60px",
          }}
        >
          {/* সার্চ আইকন - নিখুঁত প্যাডিং ও পজিশনিং */}
          <motion.div
            className="flex items-center justify-center shrink-0 pl-4 pr-3 text-slate-400"
            animate={{ 
              color: focused ? "#c084fc" : "#94a3b8",
              scale: focused ? 1.05 : 1 
            }}
            transition={{ duration: 0.2 }}
          >
            <FiSearch size={21} />
          </motion.div>

          {/* সার্চ ইনপুট */}
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search photos, videos..."
            className="flex-1 bg-transparent py-3 px-2 text-white placeholder-slate-400 outline-none text-[15px] font-medium tracking-wide"
          />

          {/* ক্লিয়ার (X) বাটন */}
          <AnimatePresence>
            {text && (
              <motion.button
                type="button"
                onClick={clearInput}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer mr-1.5 flex items-center justify-center"
              >
                <FiX size={17} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* সার্চ অ্যাকশন বাটন */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{
              scale: 1.05,
              y: -1,
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.7), 0 4px 15px rgba(192, 38, 211, 0.4)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white cursor-pointer transition-all disabled:opacity-60 shrink-0 select-none border border-white/20"
            style={{
              background: "linear-gradient(135deg, #9333ea 0%, #c026d3 100%)",
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 0 16px rgba(168, 85, 247, 0.4)",
            }}
          >
            {loading ? (
              <motion.span
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
            ) : (
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="flex items-center justify-center"
              >
                <HiSparkles size={17} />
              </motion.div>
            )}
            <span>{loading ? "Searching..." : "Search"}</span>
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

export default SearchBar;