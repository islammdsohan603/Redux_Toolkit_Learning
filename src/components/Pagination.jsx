import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { searchMedia } from "../redux/features/searchSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { query, activeTab, currentPage, totalPages, totalResults, loading } =
    useSelector((s) => s.search);

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || loading) return;
    dispatch(searchMedia({ query, activeTab, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build visible page numbers (show up to 5 around current page)
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pages = getPageNumbers();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 mt-10 pb-4"
    >
      {/* Total count */}
      <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
        Page <strong style={{ color: "white" }}>{currentPage}</strong> of{" "}
        <strong style={{ color: "white" }}>{totalPages}</strong>
        {totalResults > 0 && (
          <>
            {" "}·{" "}
            <strong style={{ color: "var(--accent-2)" }}>
              {totalResults.toLocaleString()}
            </strong>{" "}
            total results
          </>
        )}
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1.5">
        {/* Prev */}
        <motion.button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            transition: "all 0.2s",
          }}
        >
          <FiChevronLeft size={15} />
          Prev
        </motion.button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((page, idx) =>
            page === "..." ? (
              <span
                key={`dots-${idx}`}
                style={{ color: "var(--text-muted)", padding: "0 4px", fontSize: "0.85rem" }}
              >
                …
              </span>
            ) : (
              <motion.button
                key={page}
                onClick={() => goToPage(page)}
                disabled={loading}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="flex items-center justify-center rounded-xl text-sm font-semibold cursor-pointer disabled:cursor-not-allowed"
                style={{
                  width: 36,
                  height: 36,
                  background:
                    currentPage === page
                      ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    currentPage === page
                      ? "1px solid rgba(168,85,247,0.5)"
                      : "1px solid var(--border)",
                  color: currentPage === page ? "#fff" : "var(--text-muted)",
                  boxShadow:
                    currentPage === page
                      ? "0 0 12px rgba(124,58,237,0.4)"
                      : "none",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {page}
              </motion.button>
            )
          )}
        </div>

        {/* Next */}
        <motion.button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "none",
            color: "#fff",
            transition: "all 0.2s",
          }}
        >
          Next
          <FiChevronRight size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Pagination;
