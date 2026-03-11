import React from "react";
import Navbar from "../components/Navbar";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";
import HeroSection from "../components/HeroSection";
import WorkShowcase from "../components/WorkShowcase";
import PlayReel from "../components/PlayReel";
import Services from "../components/Services";
import NewsSection from "../components/NewsSection";
import { CallToAction, Footer } from "../components/Footer";
import heroVideo from "../assets/hero.mp4";

function HomeContent() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />

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
        </div>

        {/* Bottom-right subtext */}
        <div className="line hero-subtext-corner">
          <p className="hero-subtext">
            Mpange is a celebration of intentional designs — aesthetic brandings,
            that feels alive, and crafts that endures phasing.
          </p>
        </div>
      </div>

      {/* Narrative Section: Mpange Creative Arts Profile */}
      <HeroSection />

      {/* Visual Section: Parallax Image Grid */}
      <WorkShowcase />

      {/* Immersive Section: The Interactive Play Reel Experience */}
      <PlayReel />

      {/* Horizontal Scroll Section: What We Do */}
      <Services />

      {/* Editorial Section: News */}
      <NewsSection />

      {/* CTA — Get in Touch split panel */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default HomeContent;