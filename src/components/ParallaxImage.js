import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({ src, alt, speed = 0.2 }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    // Create a tween that maps scroll progress to a translateY value
    gsap.fromTo(
      element,
      { y: 0 },
      {
        y: () => element.offsetHeight * speed, // or any value you like
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // smooth scrubbing, 0.5 gives a gentle lag
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [speed]);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      style={{
        willChange: "transform",
        scale: "1.25", // keep scale separate
      }}
    />
  );
};

export default ParallaxImage;