import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./CustomCursor.css";

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    document.body.style.cursor = "none";

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    // Squish on hover
    const handleMouseEnter = () => {
      gsap.to(cursor, { scaleX: 1.2, scaleY: 0.85, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    };

    // Click press
    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.85, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const hoverables = document.querySelectorAll("a, button, .cta");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Mouse-shaped cursor */}
      <div className="cursor-mouse" ref={cursorRef}>
        <div className="cursor-scroll-dot" />
      </div>

      {/* Fast-tracking center dot (hidden inside mouse shape) */}
      <div className="cursor-center-dot" ref={dotRef} />
    </>
  );
}

export default CustomCursor;