import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera, FiVideo } from "react-icons/fi";
import { setActiveTabs, searchMedia } from "../redux/features/searchSlice";

const TABS = [
  { id: "photos", label: "Photos", Icon: FiCamera },
  { id: "videos", label: "Videos", Icon: FiVideo },
];

const Tabs = () => {
  const dispatch = useDispatch();
  const { activeTab, query } = useSelector((s) => s.search);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    dispatch(setActiveTabs(tabId));
    if (query) {
      dispatch(searchMedia({ query, activeTab: tabId, page: 1 }));
    }
  };

  return (
    <div
      className="flex items-center gap-2 p-1.5 rounded-full"
      style={{
        background: "rgba(18, 14, 28, 0.75)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
        width: "fit-content",
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <motion.button
            key={id}
            onClick={() => handleTabChange(id)}
            className="relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-colors z-10 select-none"
            style={{
              color: isActive ? "#ffffff" : "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}
            initial={false}
            whileHover={{
              scale: 1.05,
              y: -1,
              color: "#ffffff",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Animated active pill background */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #9333ea, #c026d3)",
                    boxShadow: "0 0 18px rgba(168, 85, 247, 0.5)",
                    zIndex: -1,
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
            </AnimatePresence>

            {/* Inactive hover highlight overlay */}
            {!isActive && (
              <motion.span
                className="absolute inset-0 rounded-full bg-white/5 opacity-0 transition-opacity hover:opacity-100"
                style={{ zIndex: -1 }}
              />
            )}

            <motion.div
              whileHover={{ rotate: id === "photos" ? -8 : 8, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center justify-center"
            >
              <Icon size={16} />
            </motion.div>
            <span>{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default Tabs;
