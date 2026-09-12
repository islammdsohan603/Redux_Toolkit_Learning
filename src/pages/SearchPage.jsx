import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import ResultGrid from "../components/ResultGrid";

// Floating orbs for ambient background glow
const Orb = ({ style }) => (
  <div
    style={{
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(80px)",
      pointerEvents: "none",
      ...style,
    }}
  />
);

const SearchPage = () => {
  return (
    <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
      {/* Ambient background orbs */}
      <Orb
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Orb
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
          top: "200px",
          right: "-60px",
        }}
      />

      {/* Hero Section */}
      <div
        className="bg-grid"
        style={{
          textAlign: "center",
          padding: "4rem 1.5rem 2.5rem",
          position: "relative",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent-2)",
              boxShadow: "0 0 6px var(--accent-2)",
            }}
          />
          Unsplash + Pexels
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "0.5rem",
            lineHeight: 1.1,
          }}
        >
          Discover Stunning{" "}
          <span className="gradient-text">Media</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "var(--text-muted)",
            fontSize: "1rem",
            maxWidth: "480px",
            margin: "0 auto 2rem",
          }}
        >
          Search millions of free photos and videos, save your favorites, and download in full quality.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
        >
          <SearchBar />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            marginTop: "1.25rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs />
        </motion.div>
      </div>

      {/* Results */}
      <div style={{ padding: "0 1.5rem 3rem", maxWidth: "1400px", margin: "0 auto" }}>
        <ResultGrid />
      </div>
    </div>
  );
};

export default SearchPage;
