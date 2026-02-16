/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const navElement = document.querySelector(".nav");
      if (navElement) {
        if (prevScrollpos > currentScrollPos) {
          navElement.style.top = "0";
        } else {
          navElement.style.top = "-80px"; // Adjust based on navbar height
        }
        prevScrollpos = currentScrollPos;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">mpange</Link> {/* Or 'trueKind.' if desired */}
      </div>
      <div className="nav-links">
        <Link to="/shop">SHOP</Link>
        <Link to="/philosophy">PHILOSOPHY</Link>
        <Link to="/gallery">GALLERY</Link>
        <Link to="/journal">JOURNAL</Link>
      </div>
      <div className="actions">
        <a href="#" className="action-btn">
          <ion-icon name="person-outline"></ion-icon>
        </a>
        <span className="separator">|</span>
        <a href="#" className="action-btn">
          <ion-icon name="cart-outline"></ion-icon> {/* Or 'lock-closed-outline' to match image */}
          <span className="badge">0</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;