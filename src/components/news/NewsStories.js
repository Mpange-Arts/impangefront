import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────

const STORIES = [
  {
    id: 1,
    badgeIcon: "Z",
    badgeLabel: "Zara Campaign",
    badgeColor: "#1ec9a0",
    title: "Get a behind the\nscenes look at our\nWork for Zara.",
    cta: "Visit Case Study",
    ctaHref: "/work",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    badgeIcon: "L",
    badgeLabel: "Lusaka Portraits",
    badgeColor: "#1ec9a0",
    title: "A story of light,\nidentity and place\nin Lusaka.",
    cta: "Read More",
    ctaHref: "/work",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    badgeIcon: "V",
    badgeLabel: "Velt Studio",
    badgeColor: "#1ec9a0",
    title: "How we built the\nVelt Studio digital\nexperience.",
    cta: "Visit Case Study",
    ctaHref: "/work",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 4,
    badgeIcon: "P",
    badgeLabel: "Pulse Motion",
    badgeColor: "#1ec9a0",
    title: "Pulse Motion —\nanimating a brand\nfrom the inside out.",
    cta: "Watch Now",
    ctaHref: "/work",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 5,
    badgeIcon: "K",
    badgeLabel: "Kente Identity",
    badgeColor: "#1ec9a0",
    title: "Rooted in culture,\nbuilt for the\nmodern world.",
    cta: "Visit Case Study",
    ctaHref: "/work",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1600",
  },
];

const STORY_DURATION = 6000;

// ─── Styled ───────────────────────────────────────────────────

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100svh;
  background: #000;
  overflow: hidden;
  font-family: 'PP Neue Montreal', sans-serif;
  user-select: none;
`;

// Full-bleed background
const BgImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* Dark overlay — heavier at bottom */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.45) 0%,
      rgba(0,0,0,0.05) 30%,
      rgba(0,0,0,0.6) 100%
    );
  }
`;

// ── Central content column — same axis as reference ───────────
// Sits center-left of the screen, all content aligned here

const ContentColumn = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: clamp(200px, 22vw, 320px);
  display: flex;
  flex-direction: column;
  padding-top: 80px;

  @media (max-width: 768px) {
    left: 0;
    transform: none;
    width: 100%;
    padding: 20px 6% 0;
  }
`;

// Progress bars
const ProgressRow = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  margin-bottom: 20px;
`;

const ProgressTrack = styled.div`
  flex: 1;
  height: 2px;
  background: rgba(255,255,255,0.25);
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #fff;
  border-radius: 2px;
  width: ${p => p.$pct * 100}%;
`;

// Badge — logo circle + label, sits directly below bars
const Badge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
  width: fit-content;
`;

const BadgeCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  letter-spacing: 0;
`;

const BadgeLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(255,255,255,0.82);
  letter-spacing: 0.02em;
  text-transform: none;
`;

// Spacer — pushes title + cta to lower portion, same axis
const Spacer = styled.div`
  flex: 1;
`;

// Title block — bottom of the column
const BottomContent = styled.div`
  padding-bottom: 12vh;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.6rem, 3.2vw, 3.6rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: #fff;
  margin: 0 0 2.5vh;
  white-space: pre-line;
  text-transform: none;
`;

const Cta = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 400;
  color: rgba(255,255,255,0.72);
  text-decoration: underline;
  text-underline-offset: 5px;
  letter-spacing: 0.02em;
  text-transform: none;
  cursor: pointer;

  &::before {
    content: '○';
    font-size: 0.55rem;
    display: inline-block;
    text-decoration: none;
  }

  &:hover { color: #fff; }
`;

// Tap zones
const TapZone = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 8;
  width: 38%;
  cursor: pointer;

  &.left  { left: 0; }
  &.right { right: 0; }
`;

// ─── Slide variants ───────────────────────────────────────────

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-40%" : "40%",
    opacity: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Component ────────────────────────────────────────────────

const NewsStories = () => {
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress]   = useState(0);
  const [paused, setPaused]       = useState(false);
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  const goTo = useCallback((idx, dir) => {
    cancelAnimationFrame(rafRef.current);
    setDirection(dir);
    setCurrent((idx + STORIES.length) % STORIES.length);
    setProgress(0);
    startRef.current = null;
  }, []);

  const next = useCallback(() => goTo(current + 1,  1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return; }

    const tick = (now) => {
      if (!startRef.current) startRef.current = now - progress * STORY_DURATION;
      const pct = Math.min((now - startRef.current) / STORY_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) { goTo(current + 1, 1); return; }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, paused, goTo]);

  const story = STORIES[current];

  return (
    <Wrapper
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); startRef.current = null; }}
    >
      {/* ── Full-bleed background ─────────────────────────── */}
      <AnimatePresence custom={direction} mode="sync">
        <BgImage
          key={`bg-${current}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <img src={story.image} alt={story.badgeLabel} />
        </BgImage>
      </AnimatePresence>

      {/* ── Central content column ────────────────────────── */}
      <ContentColumn>

        {/* Progress bars */}
        <ProgressRow>
          {STORIES.map((_, i) => (
            <ProgressTrack key={i} onClick={() => goTo(i, i >= current ? 1 : -1)}>
              <ProgressFill
                $pct={i < current ? 1 : i === current ? progress : 0}
              />
            </ProgressTrack>
          ))}
        </ProgressRow>

        {/* Badge — directly below bars, same left edge */}
        <AnimatePresence mode="wait">
          <Badge
            key={`badge-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <BadgeCircle $color={story.badgeColor}>{story.badgeIcon}</BadgeCircle>
            <BadgeLabel>{story.badgeLabel}</BadgeLabel>
          </Badge>
        </AnimatePresence>

        <Spacer />

        {/* Title + CTA — lower portion, same axis */}
        <BottomContent>
          <AnimatePresence mode="wait">
            <Title
              key={`title-${current}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {story.title}
            </Title>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <Cta
              key={`cta-${current}`}
              href={story.ctaHref}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {story.cta}
            </Cta>
          </AnimatePresence>
        </BottomContent>

      </ContentColumn>

      {/* ── Tap zones ─────────────────────────────────────── */}
      <TapZone className="left"  onClick={prev} />
      <TapZone className="right" onClick={next} />

    </Wrapper>
  );
};

export default NewsStories;