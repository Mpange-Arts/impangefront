import React from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";
import MagneticButton from "../components/MagneticButton";
import HeroSection from "../components/HeroSection"; // <-- 1. Import the new component here
import WorkShowcase from "../components/WorkShowcase";
import heroVideo from "../assets/hero.mp4";

function HomeContent() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Loader />

      <div className="container">
        {/* Video Background */}
        <div className="hero-img">
          <video autoPlay muted loop playsInline>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Text */}
        <div className="header">
          <div className="line">
            <h1><span>Do few</span> things,</h1>
          </div>
          <div className="line">
            <h1>but do them <span>well.</span></h1>
          </div>
          <div className="line">
            <p className="hero-subtext">
              Mpange is a celebration of intentional living — curated pieces,
              honest materials, and craft that endures.
            </p>
          </div>
        </div>

        {/* CTA — magnetic */}
        <MagneticButton className="cta" strength={0.15}>
          <div className="cta-label">
            <p>Explore the collection</p>
          </div>
          <div className="cta-icon">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </MagneticButton>
      </div>

      {/* 2. Drop the new component right here, before the WorkShowcase! */}
      <HeroSection />

      {/* Work showcase sits outside container so it's full width */}
      <WorkShowcase />
    </>
  );
}

export default HomeContent;