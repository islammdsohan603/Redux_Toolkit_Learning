import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookmark, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { clearCollection } from "../redux/features/collectionSlice";
import { addToast } from "../redux/features/toastSlice";
import ResultCard from "../components/ResultCard";

const EmptyCollection = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-28 gap-6 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <motion.div
      className="w-24 h-24 rounded-3xl flex items-center justify-center"
      style={{
        background: "rgba(124,58,237,0.1)",
        border: "1px solid rgba(124,58,237,0.25)",
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
    >
      <FiBookmark size={40} style={{ color: "var(--accent-2)" }} />
    </motion.div>

    <div>
      <h2
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        Your collection is empty
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", maxWidth: "320px" }}>
        Start searching and save your favorite photos and videos here.
      </p>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.75rem",
            borderRadius: "0.875rem",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
          }}
        >
          Explore Media
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

const CollectionPage = () => {
  const dispatch = useDispatch();
  const savedItems = useSelector((s) => s.collection.savedItems);

  const handleClearAll = () => {
    if (window.confirm("Clear your entire collection?")) {
      dispatch(clearCollection());
      dispatch(addToast({ message: "Collection cleared", type: "delete" }));
    }
  };

  return (
    <div style={{ flex: 1 }}>
      {/* Page Header */}
      <div
        style={{
          padding: "3rem 1.5rem 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "0.25rem",
              }}
            >
              My{" "}
              <span className="gradient-text">Collection</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
            >
              {savedItems.length > 0
                ? `${savedItems.length} saved ${savedItems.length === 1 ? "item" : "items"}`
                : "No items saved yet"}
            </motion.p>
          </div>

          {savedItems.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleClearAll}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(239,68,68,0.3)",
                background: "rgba(239,68,68,0.08)",
                color: "#f87171",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              <FiTrash2 size={15} />
              Clear All
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 1.25rem 3rem", maxWidth: "1400px", margin: "0 auto" }}>
        {savedItems.length === 0 ? (
          <EmptyCollection />
        ) : (
          <div className="masonry-grid">
            <AnimatePresence>
              {savedItems.map((item) => (
                <ResultCard key={item.id} item={item} inCollection />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
