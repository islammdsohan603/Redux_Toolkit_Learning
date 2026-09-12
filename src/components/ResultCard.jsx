import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBookmark,
  FiDownload,
  FiTrash2,
  FiInfo,
  FiPlay,
  FiCheck,
  FiCamera,
} from "react-icons/fi";
import { addToCollection, removeFromCollection } from "../redux/features/collectionSlice";
import { removeFromResults } from "../redux/features/searchSlice";
import { addToast } from "../redux/features/toastSlice";
import MediaModal from "./MediaModal";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const btnVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.8 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.06, type: "spring", stiffness: 350, damping: 20 },
  }),
};

const ResultCard = ({ item, inCollection = false }) => {
  const dispatch = useDispatch();
  const savedItems = useSelector((s) => s.collection.savedItems);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isSaved = inCollection || savedItems.some((s) => s.id === item.id);
  const isVideo = item._type === "video";

  const handleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      dispatch(removeFromCollection(item.id));
      dispatch(addToast({ message: "Removed from collection", type: "delete" }));
    } else {
      dispatch(addToCollection(item));
      dispatch(addToast({ message: "Saved to collection!", type: "save" }));
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
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

  const handleDelete = (e) => {
    e.stopPropagation();
    if (inCollection) {
      dispatch(removeFromCollection(item.id));
      dispatch(addToast({ message: "Removed from collection", type: "delete" }));
    } else {
      dispatch(removeFromResults(item.id));
      dispatch(addToast({ message: "Removed from view", type: "delete" }));
    }
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const actions = [
    {
      icon: isSaved ? <FiCheck size={15} /> : <FiBookmark size={15} />,
      label: isSaved ? "Unsave" : "Save",
      onClick: handleSave,
      className: isSaved ? "saved" : "",
    },
    {
      icon: <FiDownload size={15} />,
      label: "Download",
      onClick: handleDownload,
    },
    {
      icon: <FiTrash2 size={15} />,
      label: "Delete",
      onClick: handleDelete,
      className: "delete",
    },
    {
      icon: <FiInfo size={15} />,
      label: "Details",
      onClick: handleDetails,
    },
  ];

  return (
    <>
      <motion.div
        className="masonry-item"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        layout
      >
        <div
          className="relative rounded-xl overflow-hidden cursor-pointer group"
          style={{ border: "1px solid var(--border)" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image / Thumbnail */}
          <div className="relative">
            {!imgLoaded && (
              <div
                className="skeleton w-full"
                style={{
                  height: `${180 + Math.floor(Math.random() * 120)}px`,
                }}
              />
            )}
            <img
              src={item._thumb}
              alt={item._description || "media"}
              className="w-full object-cover block"
              style={{
                display: imgLoaded ? "block" : "none",
                backgroundColor: item._color || "#1a1a2e",
              }}
              onLoad={() => setImgLoaded(true)}
              loading="lazy"
            />

            {/* Video badge */}
            {isVideo && imgLoaded && (
              <div
                className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}
              >
                <FiPlay size={10} />
                {item._duration}s
              </div>
            )}

            {/* Hover Overlay */}
            <AnimatePresence>
              {hovered && imgLoaded && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-between p-3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                  }}
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {/* Action Buttons — top right */}
                  <div className="flex justify-end gap-1.5">
                    {actions.map((action, i) => (
                      <motion.button
                        key={action.label}
                        custom={i}
                        variants={btnVariants}
                        initial="hidden"
                        animate="visible"
                        className={`btn-icon ${action.className || ""}`}
                        onClick={action.onClick}
                        title={action.label}
                      >
                        {action.icon}
                      </motion.button>
                    ))}
                  </div>

                  {/* Author info — bottom */}
                  {item._author && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-xs font-medium">
                        {item._description && (
                          <span
                            className="block truncate-2 mb-0.5"
                            style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}
                          >
                            {item._description}
                          </span>
                        )}
                        <a
                          href={item._authorLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1"
                          style={{ color: "#fff" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiCamera size={11} />
                          {item._author}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalOpen && (
          <MediaModal item={item} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ResultCard;
