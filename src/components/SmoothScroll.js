"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1, // Controls the "softness" (lower is softer)
      duration: 1.5,
      smoothTouch: false, // Usually best to leave native scrolling on mobile
    }}>
      {children}
    </ReactLenis>
  );
}