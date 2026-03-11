import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import "./App.css";

import Loader from "./components/Loader";
import HomeContent from "./pages/HomeContent";
import Work from "./pages/Work";
import Studio from "./pages/Studio";
import News from "./pages/News";
import Contact from "./pages/Contact";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';




gsap.registerPlugin(ScrollTrigger);

// Only animate on EXIT (leaving a page) and ENTER from navigation
// Never on initial mount — loader handles that
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    onAnimationComplete={() => ScrollTrigger.refresh()}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<PageTransition><HomeContent /></PageTransition>} />
        <Route path="/work"    element={<PageTransition><Work /></PageTransition>} />
        <Route path="/studio"  element={<PageTransition><Studio /></PageTransition>} />
        <Route path="/news"    element={<PageTransition><News /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
      <Router>
        <Loader />
        <AnimatedRoutes />
      </Router>
    </ReactLenis>
  );
}

export default App;