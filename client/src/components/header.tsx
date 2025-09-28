import { useState } from "react";
import "../styles/header.scss";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={closeMenu} />}

      <div className="container">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            ARA<span>NYA</span>
          </a>
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="#" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li>
              <ScrollLink
                to="howItWorks"
                smooth={true}
                duration={500}
                onClick={closeMenu}
              >
                How It Works
              </ScrollLink>
            </li>
            <li>
              <a href="/KeyFeatures" onClick={closeMenu}>
                Features
              </a>
            </li>
            <li>
              <a href="/Footer" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* CTA Buttons (always on navbar) */}
        <div className="cta-buttons">
          <button className="login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;
