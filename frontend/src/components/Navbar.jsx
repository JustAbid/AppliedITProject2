import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import Button from "./ui/Button";
import ThemeToggle from "./ui/ThemeToggle";
import "../styles/Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/events", label: "Events" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <nav className="navbar-inner container" aria-label="Primary">
        <Link to="/" className="navbar-logo">
          <Leaf size={22} aria-hidden="true" />
          EcoConnect
        </Link>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={({ isActive }) => (isActive ? "is-active" : "")}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <ThemeToggle />
          <Button to="/events" size="sm" className="navbar-cta">
            Join an Event
          </Button>

          <button
            type="button"
            className="navbar-burger"
            aria-expanded={isMenuOpen}
            aria-controls="navbar-mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div id="navbar-mobile-menu" className={`navbar-mobile ${isMenuOpen ? "is-open" : ""}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? "is-active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button to="/events" fullWidth onClick={() => setIsMenuOpen(false)}>
          Join an Event
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
