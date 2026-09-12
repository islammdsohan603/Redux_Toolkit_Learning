import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiX,
  FiBookmark,
  FiDownload,
  FiExternalLink,
  FiCheck,
  FiPlay,
  FiCamera,
} from "react-icons/fi";
import { addToCollection, removeFromCollection } from "../redux/features/collectionSlice";
import { addToast } from "../redux/features/toastSlice";

const MediaModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const savedItems = useSelector((s) => s.collection.savedItems);
  const isSaved = savedItems.some((s) => s.id === item.id);
  const isVideo = item._type === "video";

  // Close on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleSave = () => {
    if (isSaved) {
      dispatch(removeFromCollection(item.id));
      dispatch(addToast({ message: "Removed from collection", type: "delete" }));
    } else {
      dispatch(addToCollection(item));
      dispatch(addToast({ message: "Saved to collection!", type: "save" }));
    }
  };

  const handleDownload = () => {
    const url = isVideo ? item._videoUrl : item._full;
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixelvault-${item.id}${isVideo ? ".mp4" : ".jpg"}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
    dispatch(addToast({ message: "Download started!", type: "download" }));
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10 }}
        >
          <FiX size={18} />
        </button>

        <div>
          {/* Media Preview */}
          <div
            className="relative"
            style={{
              borderRadius: "1.5rem 1.5rem 0 0",
              overflow: "hidden",
              background: item._color || "#0d0d18",
              maxHeight: "55vh",
            }}
          >
            {isVideo && item._videoUrl ? (
              <video
                src={item._videoUrl}
                poster={item._thumb}
                controls
                autoPlay
                muted
                loop
                className="w-full object-contain"
                style={{ maxHeight: "55vh" }}
              />
            ) : (
              <img
                src={item._full || item._thumb}
                alt={item._description || "media"}
                className="w-full object-contain"
                style={{ maxHeight: "55vh" }}
              />
            )}

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "80px",
                background: "linear-gradient(to top, #0d0d18, transparent)",
              }}
            />
          </div>

          {/* Info Panel */}
          <div style={{ padding: "1.5rem 1.75rem" }}>
            {/* Source badge */}
            <div className="flex items-center justify-between mb-4">
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent-2)",
                  background: "rgba(168,85,247,0.12)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "99px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                {isVideo ? <FiPlay size={10} /> : <FiCamera size={10} />}
                {isVideo ? "Pexels Video" : "Unsplash Photo"}
              </span>

              {isVideo && (
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  {item._width}x{item._height} · {item._duration}s
                </span>
              )}
            </div>

            {/* Description */}
            {item._description && (
              <p
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                  textTransform: "capitalize",
                }}
              >
                {item._description}
              </p>
            )}

            {/* Author */}
            {item._author && (
              <a
                href={item._authorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  marginBottom: "1.25rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <FiCamera size={13} />
                {item._author}
                <FiExternalLink size={12} />
              </a>
            )}

            {/* Colors (photos only) */}
            {!isVideo && item._color && (
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  Dominant colour:
                </span>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: item._color,
                    border: "2px solid rgba(255,255,255,0.2)",
                  }}
                />
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "monospace" }}>
                  {item._color}
                </span>
              </div>
            )}

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", margin: "0.75rem 0" }} />

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1,
                  minWidth: "120px",
                  padding: "0.65rem 1rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: isSaved
                    ? "rgba(236,72,153,0.15)"
                    : "rgba(255,255,255,0.06)",
                  color: isSaved ? "#f472b6" : "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                {isSaved ? <FiCheck size={15} /> : <FiBookmark size={15} />}
                {isSaved ? "Saved" : "Save"}
              </motion.button>

              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1,
                  minWidth: "120px",
                  padding: "0.65rem 1rem",
                  borderRadius: "0.75rem",
                  border: "none",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                <FiDownload size={15} />
                Download
              </motion.button>

              {item._sourceLink && (
                <motion.a
                  href={item._sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "0.65rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "all 0.2s",
                  }}
                >
                  <FiExternalLink size={15} />
                  Source
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaModal;
