import React from "react";
import Navbar from "./Navbar";

const Philosophy = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="header">
        <h1>Our Philosophy</h1>
        <h2>Radical Transparency. Hide Nothing.</h2>
        <p>100% Transparent Formulas: We disclose every ingredient and its purpose.</p>
        <p>Only Verified Ingredients: Free from over 1800 questionable substances.</p>
        <p>Potent & Multi-Tasking: Real results with antioxidants and skin-replenishing agents.</p>
        <p>Conscious & Responsible: PETA Certified Vegan and Cruelty-Free, sustainable packaging.</p>
      </div>
    </div>
  );
};

export default Philosophy;