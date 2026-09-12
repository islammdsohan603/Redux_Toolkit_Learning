import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookmark, FiTrash2, FiDownload, FiCheckCircle } from "react-icons/fi";
import { removeToast } from "../redux/features/toastSlice";
import { useEffect } from "react";

const AUTO_DISMISS_MS = 3000;

const TOAST_CONFIG = {
  save:     { Icon: FiBookmark,    accent: "var(--accent-2)" },
  delete:   { Icon: FiTrash2,      accent: "#ef4444" },
  download: { Icon: FiDownload,    accent: "#10b981" },
  info:     { Icon: FiCheckCircle, accent: "var(--accent-2)" },
};

const ToastItem = ({ toast }) => {
  const dispatch = useDispatch();
  const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;
  const { Icon, accent } = config;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  return (
    <motion.div
      className="toast-item"
      style={{ borderLeftColor: accent }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      onClick={() => dispatch(removeToast(toast.id))}
    >
      <Icon size={15} style={{ color: accent, flexShrink: 0 }} />
      {toast.message}
    </motion.div>
  );
};

const Toast = () => {
  const toasts = useSelector((s) => s.toast.toasts);

  return (
    <div className="toast-container">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
