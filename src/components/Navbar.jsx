
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, languages, changeLanguage, currentLanguage, t } = useLanguage();

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
    { to: "/", label: t("home"), end: true },
    { to: "/worlds", label: t("worlds") },
    { to: "/tools", label: t("tools") },
    { to: "/world/ai", label: t("ai") },
    { to: "/world/cyber", label: t("cyber") },
    { to: "/dashboard", label: t("dashboard") },
  ];

  const languageSelector = (
    <label className="ww-language-selector">
      <span aria-hidden="true">🌐</span>
      <select
        aria-label={t("language")}
        value={language}
        onChange={(event) => {
          changeLanguage(event.target.value);
          closeMenu();
        }}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.native}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <header
      className="ww-navbar"
      dir={currentLanguage.dir}
    >
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
          aria-label="Toggle menu"
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

          <div className="ww-navbar-mobile-language">
            {languageSelector}
          </div>

          <div className="ww-navbar-mobile-account">
            <span className="ww-navbar-avatar">
              {username.charAt(0).toUpperCase()}
            </span>
            <span>{username}</span>
            <button onClick={handleLogout} type="button">
              {t("logout")}
            </button>
          </div>
        </nav>

        <div className="ww-navbar-account">
          {languageSelector}

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
            {t("logout")}
          </button>
        </div>
      </div>
    </header>
  );
}
