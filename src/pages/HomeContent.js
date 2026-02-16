import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

const HomeContent = ({ heroVideo }) => {
  const horizontalRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // 1. Text Reveal Animation for the Hero
    gsap.to(".line h1", {
      y: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out",
      delay: 2 // After loader
    });

    // 2. Horizontal Scroll Section (Truekind style)
    const pin = gsap.fromTo(horizontalRef.current, 
      { translateX: 0 },
      {
        translateX: "-300vw", // Move across 4 sections (100vw each)
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top", // Length of the scroll
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        }
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div className="container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="header">
        <div className="hero-img">
          <video autoPlay muted loop playsInline>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-copy">
          <div className="line"><h1><span>Do few</span> things but,</h1></div>
          <div className="line"><h1> do them <span>well</span></h1></div>
        </div>
      </section>

      {/* Horizontal Product Showcase */}
      <div ref={triggerRef} className="horizontal-overflow-wrapper">
        <div ref={horizontalRef} className="horizontal-inner">
          <div className="horizontal-section">
            <div className="product-card">
              <img src="https://via.placeholder.com/600x800" alt="Product" />
              <h3>AHA Brightening Cleanser</h3>
            </div>
          </div>
          <div className="horizontal-section">
            <div className="product-card">
              <img src="https://via.placeholder.com/600x800" alt="Product" />
              <h3>Rosehip Perfecting Oil</h3>
            </div>
          </div>
          <div className="horizontal-section">
            <div className="product-card">
              <img src="https://via.placeholder.com/600x800" alt="Product" />
              <h3>Bakuchiol Night Cream</h3>
            </div>
          </div>
          <div className="horizontal-section">
             <div className="product-card">
              <img src="https://via.placeholder.com/600x800" alt="Product" />
              <h3>Radiance Facial Oil</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section Preview */}
      <section className="standard-section">
          <h2>Our Philosophy</h2>
          <p>Radical Transparency in every drop.</p>
      </section>
    </div>
  );
};

export default HomeContent;