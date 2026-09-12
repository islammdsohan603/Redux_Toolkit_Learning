import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiImage, FiFilm } from "react-icons/fi";
import { setActiveTabs, clearResults } from "../redux/features/searchSlice";

const TABS = [
  { id: "photos", label: "Photos", Icon: FiImage },
  { id: "videos", label: "Videos", Icon: FiFilm },
];

const Tabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((s) => s.search.activeTab);

  const handleTabChange = (tabId) => {
    if (tabId !== activeTab) {
      dispatch(setActiveTabs(tabId));
      dispatch(clearResults());
    }
  };

  return (
    <div className="flex items-center gap-1 glass rounded-xl p-1" style={{ width: "fit-content" }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <motion.button
            key={id}
            onClick={() => handleTabChange(id)}
            className="relative flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors z-10"
            style={{
              color: isActive ? "#fff" : "var(--text-muted)",
              fontFamily: "'Inter', sans-serif",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Active background pill */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    zIndex: -1,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>

            <Icon size={15} />
            {label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Tabs;
