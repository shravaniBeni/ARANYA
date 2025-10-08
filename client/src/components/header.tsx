import { useState } from "react";
import "../styles/header.scss";
// import { Link as ScrollLink } from "react-scroll";
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
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate("/howitworks")}>How It Works</a>
            </li>
            <li>
              <a onClick={() => navigate("/features")}>Features</a>
            </li>
            <li>
              <a onClick={() => navigate("/footer")}>Contact</a>
            </li>
          </ul>
        </nav>

        {/* CTA Buttons (always on navbar) */}
        <div className="cta-buttons">
          <button className="login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup" onClick={() => navigate("/signup")}>
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
