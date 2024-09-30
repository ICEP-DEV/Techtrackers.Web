import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../..//LoginsStyle/header.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id="header" className={scrolled ? "header-scrolled" : ""}>
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src={require("../../Images/logo-removebg.jpg")}
            alt="logo"
            className="logos"
            height={100}
          />
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className="hamburger-icon">&#9776;</span> {/* Hamburger icon */}
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/homePage" className="nav_button">
            Home
          </Link>
          <Link to="/About" className="nav_button">
            About
          </Link>
          <Link to="/service" className="nav_button">
            Service
          </Link>
          <Link to="/" className="nav_button">
            Login
          </Link>
          <Link to="/contact" className="nav_button">
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
