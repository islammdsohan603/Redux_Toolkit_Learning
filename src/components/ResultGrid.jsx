import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiCamera } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import ResultCard from "./ResultCard";
import Pagination from "./Pagination";

const SKELETON_HEIGHTS = [200, 280, 160, 320, 240, 180, 300, 200, 260, 140, 220, 300];

const SkeletonCard = ({ height }) => (
  <div className="masonry-item">
    <div className="skeleton rounded-xl" style={{ height }} />
  </div>
);

const EmptyState = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-16 gap-4 text-center"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <motion.div
      className="w-20 h-20 rounded-2xl flex items-center justify-center"
      style={{
        background: "rgba(147,51,234,0.12)",
        border: "1px solid rgba(168,85,247,0.35)",
        boxShadow: "0 0 30px rgba(147,51,234,0.15)",
      }}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
    >
      <FiCamera size={34} style={{ color: "#c084fc" }} />
    </motion.div>
    <div>
      <h3
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "0.5rem",
        }}
      >
        Search for anything
      </h3>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "0.875rem",
          lineHeight: 1.5,
          maxWidth: "320px",
          margin: "0 auto",
        }}
      >
        Type a keyword above to discover<br />
        stunning photos and videos from Unsplash<br />
        & Pexels.
      </p>
    </div>
  </motion.div>
);

const NoResultsState = ({ query }) => (
  <motion.div
    className="flex flex-col items-center justify-center py-24 gap-4 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center"
      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
    >
      <FiAlertCircle size={28} style={{ color: "#ef4444" }} />
    </div>
    <p style={{ color: "var(--text-muted)" }}>
      No results found for <strong style={{ color: "white" }}>"{query}"</strong>
    </p>
  </motion.div>
);

const ErrorState = ({ message }) => (
  <motion.div
    className="flex flex-col items-center justify-center py-20 gap-4 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div
      className="px-6 py-4 rounded-xl"
      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}
    >
      <FiAlertCircle size={24} style={{ color: "#f87171", marginBottom: "0.5rem" }} />
      <p style={{ color: "#f87171", fontWeight: 600, marginBottom: "0.25rem" }}>
        Something went wrong
      </p>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{message}</p>
    </div>
  </motion.div>
);

const ResultsHeader = ({ count, query, activeTab }) => (
  <motion.div
    className="flex items-center gap-2 mb-4 px-1"
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <HiSparkles size={16} style={{ color: "var(--accent-2)" }} />
    <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
      <strong style={{ color: "white" }}>{count}</strong> {activeTab} found for{" "}
      <strong style={{ color: "var(--accent-2)" }}>"{query}"</strong>
    </span>
  </motion.div>
);

const ResultGrid = () => {
  const { results, loading, error, query, activeTab } = useSelector(
    (s) => s.search
  );

  if (loading) {
    return (
      <div className="masonry-grid mt-4">
        {SKELETON_HEIGHTS.map((h, i) => (
          <SkeletonCard key={i} height={h} />
        ))}
      </div>
    );
  }

  if (error) return <ErrorState message={error} />;

  if (!query) return <EmptyState />;

  if (results.length === 0) return <NoResultsState query={query} />;

  return (
    <div>
      <ResultsHeader count={results.length} query={query} activeTab={activeTab} />
      <div className="masonry-grid">
        <AnimatePresence>
          {results.map((item) => (
            <ResultCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>
      <Pagination />
    </div>
  );
};

export default ResultGrid;
