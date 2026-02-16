/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Navbar from "./Navbar";

const Gallery = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="header">
        <h1>Gallery</h1>
        <p>Explore our visual inspirations.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          <img src="placeholder1.jpg" alt="Image 1" style={{ width: "100%" }} />
          <img src="placeholder2.jpg" alt="Image 2" style={{ width: "100%" }} />
          <img src="placeholder3.jpg" alt="Image 3" style={{ width: "100%" }} />
          <img src="placeholder4.jpg" alt="Image 4" style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;