import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

import HomeContent from "./pages/HomeContent";
import Work from "./pages/Work";
import Studio from "./pages/Studio";
import News from "./pages/News";
import Contact from "./pages/Contact";

// 1. Reusable Page Transition Wrapper
// This adds the fade and slide effect to whatever page is currently loading
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] // Premium smooth easing curve
      }}
    >
      {children}
    </motion.div>
  );
};

// 2. Animated Routes Component
// We extract this so we can safely use the `useLocation` hook inside the Router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* The key tells Framer Motion when the URL actually changes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomeContent /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/studio" element={<PageTransition><Studio /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// 3. Main App Component
function App() {
  return (
    /* Wrap the entire app in Lenis for global smooth scrolling */
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
      <Router>
        <AnimatedRoutes />
      </Router>
    </ReactLenis>
  );
}

export default App;