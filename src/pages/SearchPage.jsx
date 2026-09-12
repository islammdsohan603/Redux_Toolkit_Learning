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
      filter: "blur(100px)",
      pointerEvents: "none",
      ...style,
    }}
  />
);

const SearchPage = () => {
  return (
    <div style={{ flex: 1, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Ambient background glow orbs */}
      <Orb
        style={{
          width: 550,
          height: 550,
          background: "radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 70%)",
          top: "-160px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Orb
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%)",
          top: "140px",
          right: "-120px",
        }}
      />

      {/* Hero Section */}
      <div
        className="bg-grid"
        style={{
          textAlign: "center",
          padding: "5rem 1.5rem 2rem",
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Badge tag: • UNSPLASH + PEXELS */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c084fc",
            marginBottom: "1rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.45rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#c084fc",
              boxShadow: "0 0 8px #c084fc",
              display: "inline-block",
            }}
          />
          UNSPLASH + PEXELS
        </motion.p>

        {/* Title: Discover Stunning Media */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "0.85rem",
            lineHeight: 1.15,
            color: "#ffffff",
          }}
        >
          Discover Stunning{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7 20%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Media
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "#94a3b8",
            fontSize: "0.98rem",
            lineHeight: 1.6,
            maxWidth: "520px",
            margin: "0 auto 2.25rem",
          }}
        >
          Search millions of free photos and videos, save your favorites,
          <br className="hidden sm:inline" /> and download in full quality.
        </motion.p>

        {/* Search Bar Wrapper - একদম পারফেক্ট মাঝখানে রাখার জন্য max-w-2xl */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
          className="w-full max-w-2xl mx-auto flex justify-center"
        >
          <SearchBar />
        </motion.div>

        {/* Tabs directly below SearchBar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            marginTop: "1.25rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Tabs />
        </motion.div>
      </div>

      {/* Results / Empty State Grid */}
      <div style={{ padding: "1rem 1.5rem 4rem", maxWidth: "1400px", margin: "0 auto" }}>
        <ResultGrid />
      </div>
    </div>
  );
};

export default SearchPage;