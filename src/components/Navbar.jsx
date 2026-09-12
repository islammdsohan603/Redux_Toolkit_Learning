import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiSearch, FiBookmark } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Navbar = () => {
  const savedCount = useSelector((s) => s.collection.savedItems.length);

  return (
    <nav className="navbar">
      <div
        style={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              boxShadow: "0 0 15px rgba(139,92,246,0.4)",
            }}
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <HiSparkles size={16} color="#fff" />
          </motion.div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            PixelVault
          </span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          {[
            { to: "/", label: "Search", Icon: FiSearch },
            { to: "/collection", label: "Collection", Icon: FiBookmark, badge: savedCount },
          ].map(({ to, label, Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              end
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium relative"
                  style={{
                    color: isActive ? "#ffffff" : "var(--text-muted)",
                    background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                    transition: "all 0.2s",
                  }}
                  whileHover={{
                    color: "#ffffff",
                  }}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                  {badge > 0 && (
                    <motion.span
                      key={badge}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="flex items-center justify-center rounded-full text-white"
                      style={{
                        width: 18,
                        height: 18,
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      }}
                    >
                      {badge > 99 ? "99+" : badge}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
