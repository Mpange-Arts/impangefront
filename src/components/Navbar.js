import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">Mpange</Link>
      </div>

      <div className="nav-links">
        <Link to="/work">Work</Link>
        <Link to="/studio">Studio</Link>
        <Link to="/news">News</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="actions">
        <button className="action-btn">
          <ion-icon name="person-outline"></ion-icon>
        </button>
        <span className="separator">|</span>
        <button className="action-btn">
          <ion-icon name="bag-outline"></ion-icon>
          <span className="badge">0</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;