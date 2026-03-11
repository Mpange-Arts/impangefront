import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxImage = ({ src, alt, speed = 0.2 }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: 0 },
        {
          y: () => element.offsetHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert(); // cleaner cleanup than killing all ScrollTriggers
  }, [speed]);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      style={{
        willChange: "transform",
        scale: "1.25",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
};

export default ParallaxImage;