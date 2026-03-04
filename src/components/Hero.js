import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Hero({ heroVideo }) {
  const taglineRef = useRef(null);
  const scrollLabelTopRef = useRef(null);
  const scrollLabelBotRef = useRef(null);
  const bigTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [scrollLabelTopRef.current, scrollLabelBotRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 4.5, ease: "power2.out" }
      );
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 4.6, ease: "power3.out" }
      );
      gsap.fromTo(
        bigTextRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.4, delay: 4.7, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-section">
      {/* Video Background */}
      <div className="hero-img">
        <video autoPlay muted loop playsInline>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      {/* Scroll label — top left */}
      <span className="hero-scroll-top" ref={scrollLabelTopRef}>
        Scroll
      </span>

      {/* Tagline — bottom left */}
      <p className="hero-tagline" ref={taglineRef}>
        We build brands, spaces and stories<br />
        that move people.
      </p>

      {/* Scroll to explore — bottom right */}
      <span className="hero-scroll-bot" ref={scrollLabelBotRef}>
        Scroll to explore
      </span>

      {/* Giant bleeding text — bottom */}
      <div className="hero-big-text" ref={bigTextRef}>
        <h1>Craft.</h1>
      </div>
    </div>
  );
}

export default Hero;