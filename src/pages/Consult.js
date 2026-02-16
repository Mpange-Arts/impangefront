import React from "react";
import Navbar from "./Navbar";

const Consult = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="header">
        <h1>Consult</h1>
        <p>Book a skincare consultation or explore our products.</p>
        {/* Placeholder product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          <div>
            <h2>AHA Brightening Exfoliant Cleanser</h2>
            <p>₹899</p>
          </div>
          <div>
            <h2>Rosehip & Bakuchiol Skin Perfecting Oil</h2>
            <p>₹899</p>
          </div>
          <div>
            <h2>Kumkumadi Radiance Facial Oil</h2>
            <p>₹899</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consult;