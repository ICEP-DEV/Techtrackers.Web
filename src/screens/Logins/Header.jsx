import { useState, useEffect } from "react";
import { Link as ScrollLink } from 'react-scroll'; // Correct import for react-scroll
import "../Logins/LoginsStyle/header.css";

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
            src={require("../../Images/tut.png")}
            alt="logo"
            className="logos"
            height={70}
          />
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className="hamburger-icon">&#9776;</span> {/* Hamburger icon */}
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
            activeClass="active"
            className="nav_button"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
            activeClass="active"
            className="nav_button"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="services"
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
            activeClass="active"
            className="nav_button"
          >
            Service
          </ScrollLink>
          <ScrollLink
            to="login"
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
            activeClass="active"
            className="nav_button"
          >
            Login
          </ScrollLink>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
            activeClass="active"
            className="nav_button"
            onSetActive={() => console.log("Contact is active!")}
          >
            Contact
          </ScrollLink>
        </div>
      </nav>
    </div>
  );
}

export default Header;
