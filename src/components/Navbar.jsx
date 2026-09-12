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
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            }}
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <HiSparkles size={16} color="#fff" />
          </motion.div>
          <span
            className="gradient-text"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            PixelVault
          </span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium relative"
                  style={{
                    color: isActive ? "white" : "var(--text-muted)",
                    background: isActive
                      ? "rgba(124,58,237,0.18)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(124,58,237,0.35)"
                      : "1px solid transparent",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.2s",
                  }}
                  whileHover={{
                    color: "white",
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon size={15} />
                  {label}
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
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
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
