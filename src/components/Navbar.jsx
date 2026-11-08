
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = auth.currentUser;

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const username =
    user?.displayName || user?.email?.split("@")[0] || "مستخدم";

  const links = [
    { to: "/", label: "الرئيسية", end: true },
    { to: "/worlds", label: "العوالم" },
    { to: "/tools", label: "الأدوات" },
    { to: "/world/ai", label: "الذكاء الاصطناعي" },
    { to: "/world/cyber", label: "الأمن السيبراني" },
    { to: "/dashboard", label: "لوحة التحكم" },
  ];

  return (
    <header className="ww-navbar" dir="rtl">
      <div className="ww-navbar-inner">

        <Link to="/" className="ww-navbar-brand" onClick={closeMenu}>
          <span className="ww-navbar-logo">W</span>
          <span className="ww-navbar-brand-text">
            WASEEM <strong>WORLD</strong>
          </span>
        </Link>

        <button
          className="ww-navbar-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="فتح القائمة"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`ww-navbar-links ${menuOpen ? "ww-menu-open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `ww-navbar-link ${isActive ? "ww-nav-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="ww-navbar-mobile-account">
            <span className="ww-navbar-avatar">
              {username.charAt(0).toUpperCase()}
            </span>
            <span>{username}</span>
            <button onClick={handleLogout} type="button">
              تسجيل الخروج
            </button>
          </div>
        </nav>

        <div className="ww-navbar-account">
          <div className="ww-navbar-user">
            <span className="ww-navbar-avatar">
              {username.charAt(0).toUpperCase()}
            </span>
            <span className="ww-navbar-user-name">{username}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="ww-navbar-logout"
          >
            خروج
          </button>
        </div>

      </div>
    </header>
  );
}
