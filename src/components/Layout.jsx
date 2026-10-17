import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowUpRight, ArrowLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import LogoMark from "./LogoMark.jsx";
import useSiteSettings from "../hooks/useSiteSettings.js";
const nav = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];
export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme(),
    location = useLocation();
  const { settings } = useSiteSettings();
  const email = settings.email || "hello@ateliernorth.studio";
  const phone = settings.phone || "+1 212 555 0148";
  const phoneLink = phone.replace(/[^\d+]/g, "");
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  if (location.pathname === "/admin") return children;
  return (
    <>
      <header className={`site-header ${scrolled || location.pathname !== "/" ? "is-scrolled" : ""}`}>
        <Link to="/" className="wordmark" aria-label="Atelier North home">
          <LogoMark />
          <span>ATELIER NORTH</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([n, p]) => (
            <NavLink
              key={p}
              to={p}
              end={p === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {n}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link className="header-cta" to="/contact">
            Start a project <ArrowUpRight size={15} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <div
        className={`mobile-drawer ${open ? "drawer-open" : ""}`}
        aria-hidden={!open}
      >
        <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={22}/></button>
        <h2 className="drawer-brand">Atelier North</h2>
        <nav>
          {nav.map(([n, p]) => (
            <NavLink key={p} to={p}>
              {n}
              <span>↗</span>
            </NavLink>
          ))}
          <Link to="/contact">
            Start a project <span>↗</span>
          </Link>
        </nav>
        <p>
          Independent architecture studio
          <br />
          New York · Working everywhere
        </p>
      </div>
      <div
        className="drawer-scrim"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {location.pathname !== "/" && location.pathname !== "/admin" && <Link className="back-home" to="/" aria-label="Back to home"><ArrowLeft size={16}/><span>Back to home</span></Link>}
      {children}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="wordmark">
              <LogoMark />
              <span>ATELIER NORTH</span>
            </Link>
            <p>
              Thoughtful spaces, made to belong.
              <br />
              Independent architecture studio in New York.
            </p>
          </div>
          <div className="footer-col">
            <span className="eyebrow">Explore</span>
            {nav.map(([n, p]) => (
              <Link key={p} to={p}>
                {n}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <span className="eyebrow">Say hello</span>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={`tel:${phoneLink}`}>{phone}</a>
            <span>{settings.address || "45 Orchard Street, New York, NY 10002"}</span>
            <div className="socials">
              {settings.instagram && <a href={settings.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">IG ↗</a>}
              {settings.pinterest && <a href={settings.pinterest} aria-label="Pinterest" target="_blank" rel="noreferrer">PIN ↗</a>}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
