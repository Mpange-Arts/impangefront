import React, { useEffect, useRef, useState } from 'react';
// Optional: for smoother animations, you can use 'framer-motion'
// import { motion, useInView } from 'framer-motion';
import './ScrollRevealSection.css'; // We'll create this CSS file next

const ScrollRevealSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  // Feature data based on the website's content
  const features = [
    {
      title: "Clean, Beyond Reproach",
      description: "Truly clean with only verified ingredients; and free from over 1800 questionable ingredients. Because what you put on your skin matters."
    },
    {
      title: "Radical Transparency",
      description: "No black boxes, nothing to hide, we disclose our full formulas, so you will never have to guess what's in it and how much."
    },
    {
      title: "Potent & Multi Tasking",
      description: "Our formulas are chock-a-block with actives, anti oxidants, skin restoring agents backed by dermal science that aim to deliver real results."
    },
    {
      title: "Conscious & Responsible",
      description: "Peta Certified Vegan and Cruelty Free. Our products are always housed in responsible packaging and made sustainably."
    }
  ];

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const handleScroll = () => {
      const rect = currentSection.getBoundingClientRect();
      // Calculate the progress through the section (from 0 to 1)
      const start = rect.top; // When top of section hits bottom of viewport
      const end = rect.bottom - window.innerHeight; // When bottom of section hits top of viewport
      const scrollProgress = Math.max(0, Math.min(1, -start / (end - start)));

      // Map progress to an item index (0 to features.length - 1)
      const newIndex = Math.min(
        features.length - 1,
        Math.floor(scrollProgress * features.length)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [features.length]); // Re-run if features length changes

  return (
    <section className="scroll-reveal-section" ref={sectionRef}>
      {/* Left side: Sticky container for the heading */}
      <div className="sticky-header">
        <h2>
          <span className="gradient-text">Clean, Conscious,</span>
          <br />
          Performance skincare.
        </h2>
      </div>

      {/* Right side: Scrollable content items */}
      <div className="scroll-items">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`scroll-item ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'past' : ''}`}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollRevealSection;