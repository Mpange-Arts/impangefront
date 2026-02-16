/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import the video from assets
import heroVideo from "./assets/hero.mp4";

import HomeContent from "./pages/HomeContent";
import Consult from "./pages/Consult";
import Philosophy from "./pages/Philosophy";
import Gallery from "./pages/Gallery";
import Stories from "./pages/Stories";

// Register GSAP plugin and custom ease
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

function App() {
  // Refs for the loader (to hide it if animation fails)
  const loaderRef = useRef(null);

  useEffect(() => {
    // Fail-safe timeout
    const timeout = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.display = "none";
        loaderRef.current.style.pointerEvents = "none";
      }
      console.warn("GSAP animation timed out; forcing loader removal.");
    }, 5000);

    // Create the main timeline
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: "hop" },
      onStart: () => clearTimeout(timeout),
      onComplete: () => {
        // Hide loader after all animations complete
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              loaderRef.current.style.display = "none";
              loaderRef.current.style.pointerEvents = "none";
            }
          });
        }
      }
    });

    // 1. Numerical Counter Sequence
    const counts = document.querySelectorAll(".count");
    counts.forEach((count, index) => {
      const digits = count.querySelectorAll(".digit h1");
      tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);
      tl.to(digits, { y: "-100%", duration: 1, stagger: 0.075 }, index * 1 + 1);
    });

    // 2. Clear Spinner & Reveal Loading Word Logo
    tl.to(".spinner", { opacity: 0, duration: 0.3 });
    tl.to(".word h1", { y: "0%", duration: 1 }, "<");

    // 3. Vertical Divider Animation
    tl.to(".divider", {
      scaleY: "100%",
      duration: 1,
      onComplete: () => {
        gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 });
      },
    });

    // 4. Split Logo Reveal (words move away)
    tl.to("#word-1 h1", { y: "100%", duration: 1, delay: 0.3 });
    tl.to("#word-2 h1", { y: "-100%", duration: 1 }, "<");

    // 5. Main Content Reveal (blocks open like a curtain)
    tl.to(
      ".block",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.75,
        onStart: () => {
          gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
        },
      },
      "<"
    );

    // 6. Navigation and Hero Text Reveal
    tl.to(
      [".nav", ".line h1", ".line p"],
      { y: "0%", duration: 1.5, stagger: 0.2 },
      "<"
    );

    // 7. Call to Action (CTA) Button Scale and Label
    tl.to(
      [".cta", ".cta-icon"],
      { scale: 1, duration: 1.5, stagger: 0.75, delay: 0.75 },
      "<"
    );
    tl.to(".cta-label p", { y: "0%", duration: 1.5, delay: 0.5 }, "<");

    // Cleanup on unmount
    return () => {
      tl.kill();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Loader Section */}
      <div className="loader" ref={loaderRef}>
        <div className="overlay">
          <div className="block"></div>
          <div className="block"></div>
        </div>

        <div className="intro-logo">
          <div className="word" id="word-1">
            <h1>
              <span>Mpa</span>
            </h1>
          </div>
          <div className="word" id="word-2">
            <h1>nge</h1>
          </div>
        </div>

        <div className="divider"></div>

        <div className="spinner-container">
          <div className="spinner"></div>
        </div>

        <div className="counter">
          <div className="count">
            <div className="digit">
              <h1>0</h1>
            </div>
            <div className="digit">
              <h1>0</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1>2</h1>
            </div>
            <div className="digit">
              <h1>7</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1>6</h1>
            </div>
            <div className="digit">
              <h1>5</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1>9</h1>
            </div>
            <div className="digit">
              <h1>8</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1>9</h1>
            </div>
            <div className="digit">
              <h1>9</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Routed Content */}
      <Router>
        <Routes>
          <Route path="/" element={<HomeContent heroVideo={heroVideo} />} />
          <Route path="/shop" element={<Consult />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/journal" element={<Stories />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;