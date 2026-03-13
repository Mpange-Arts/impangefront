import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BlogsAPI from "../../api/blogs";

const STORY_DURATION = 6000;

// ─── Keyframes ────────────────────────────────────────────────

const marqueeScroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
`;

// ─── Styled ───────────────────────────────────────────────────

const Wrapper = styled.div`
  position: relative; width: 100%; height: 100svh;
  background: #000; overflow: hidden;
  font-family: 'PP Neue Montreal', sans-serif; user-select: none;
`;

const BgImage = styled(motion.div)`
  position: absolute; inset: 0; z-index: 0;
  img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
  &::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.65) 100%);
  }
`;

const ContentColumn = styled.div`
  position: absolute; top: 0; bottom: 0;
  left: 50%; transform: translateX(-50%);
  z-index: 10; width: clamp(200px, 22vw, 320px);
  display: flex; flex-direction: column; padding-top: 80px;
  @media (max-width: 768px) {
    left: 0; transform: none; width: 100%; padding: 20px 6% 0;
  }
`;

const ProgressRow = styled.div`display: flex; gap: 5px; width: 100%; margin-bottom: 20px;`;

const ProgressTrack = styled.div`
  flex: 1; height: 2px; background: rgba(255,255,255,0.25);
  border-radius: 2px; overflow: hidden; cursor: pointer;
`;

const ProgressFill = styled.div`
  height: 100%; background: #fff; border-radius: 2px;
  width: ${p => p.$pct * 100}%;
`;

const Badge = styled(motion.div)`
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 0; width: fit-content;
`;

const BadgeCircle = styled.div`
  width: 38px; height: 38px; border-radius: 50%;
  background: ${p => p.$color};
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 700; color: #fff;
  flex-shrink: 0; letter-spacing: 0;
`;

const BadgeLabel = styled.span`
  font-size: 0.8rem; font-weight: 400;
  color: rgba(255,255,255,0.82); letter-spacing: 0.02em; text-transform: none;
`;

const TagRow = styled(motion.div)`
  display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px;
`;

const Tag = styled(motion.span)`
  display: inline-flex; align-items: center;
  padding: 4px 11px;
  border: 1px solid rgba(255,255,255,0.22); border-radius: 999px;
  font-size: 0.62rem; font-weight: 400; letter-spacing: 0.09em;
  text-transform: uppercase; color: rgba(255,255,255,0.6);
  backdrop-filter: blur(6px); background: rgba(255,255,255,0.05);
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  &:hover { background: rgba(255,255,255,0.14); color: rgba(255,255,255,0.95); border-color: rgba(255,255,255,0.45); }
`;

const Spacer = styled.div`flex: 1;`;

const BottomContent = styled.div`padding-bottom: 12vh;`;

const Title = styled(motion.h2)`
  font-size: clamp(1.6rem, 3.2vw, 3.6rem);
  font-weight: 400; line-height: 1.1; letter-spacing: -0.025em;
  color: #fff; margin: 0 0 2.5vh; white-space: pre-line; text-transform: none;
`;

const Cta = styled(motion.button)`
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.82rem; font-weight: 400;
  color: rgba(255,255,255,0.72);
  text-decoration: underline; text-underline-offset: 5px;
  letter-spacing: 0.02em; text-transform: none;
  cursor: pointer; background: none; border: none; padding: 0;
  font-family: 'PP Neue Montreal', sans-serif;
  &::before { content: '○'; font-size: 0.55rem; display: inline-block; text-decoration: none; }
  &:hover { color: #fff; }
`;

const MarqueeBar = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 20;
  height: 36px; overflow: hidden; display: flex; align-items: center;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.28); backdrop-filter: blur(8px);
`;

const MarqueeTrack = styled.div`
  display: flex; white-space: nowrap;
  animation: ${marqueeScroll} 22s linear infinite;
  ${Wrapper}:hover & { animation-play-state: paused; }
`;

const MarqueeItem = styled.span`
  font-size: 0.6rem; font-weight: 300; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(255,255,255,0.3); padding: 0 2.5vw;
  &[data-active="true"] { color: rgba(255,255,255,0.8); font-weight: 400; }
`;

const MarqueeDot = styled.span`
  font-size: 0.45rem; color: rgba(255,255,255,0.15); vertical-align: middle;
`;

const TapZone = styled.div`
  position: absolute; top: 0; bottom: 36px; z-index: 5; width: 38%; cursor: pointer;
  &.left  { left: 0; }
  &.right { right: 0; }
`;

// Skeleton
const SkeletonBg = styled.div`
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
`;

const SkeletonContent = styled.div`
  position: absolute; top: 80px; left: 50%; transform: translateX(-50%);
  width: clamp(200px, 22vw, 320px); display: flex; flex-direction: column; gap: 14px;
  @media (max-width: 768px) { left: 6%; transform: none; width: 80%; }
`;

const SkeletonLine = styled.div`
  height: ${p => p.h || '14px'};
  width: ${p => p.w || '100%'};
  border-radius: 4px;
  background: rgba(255,255,255,0.08);
`;

// ─── Animation variants ───────────────────────────────────────

const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ x: dir > 0 ? "-40%" : "40%", opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

const tagContainerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
  exit:    { transition: { staggerChildren: 0.04 } },
};

const tagItemV = {
  hidden:  { opacity: 0, y: 8, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.2 } },
};

// ─── Helpers ──────────────────────────────────────────────────

// Map blog from API to the shape this component needs
const mapBlogToStory = (blog) => ({
  id:          blog.id,
  badgeIcon:   blog.title.charAt(0).toUpperCase(),
  badgeLabel:  blog.title,
  badgeColor:  '#1ec9a0',
  tags:        blog.tags || [],
  title:       blog.excerpt || blog.title,
  cta:         'Read Article',
  ctaHref:     `/news/${blog.slug}`,
  image:       blog.imageUrl || '',
  slug:        blog.slug,
});

const buildMarqueeItems = (stories, activeName) => {
  const items = stories.map((s, i) => ({ label: s.badgeLabel, active: s.badgeLabel === activeName, key: i }));
  return [...items, ...items];
};

// ─── Component ────────────────────────────────────────────────

const NewsStories = () => {
  const navigate = useNavigate();
  const [stories, setStories]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress]   = useState(0);
  const [paused, setPaused]       = useState(false);
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    BlogsAPI.getAll({ limit: 5 })
      .then((data) => setStories((data.blogs || []).map(mapBlogToStory)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const goTo = useCallback((idx, dir) => {
    cancelAnimationFrame(rafRef.current);
    setDirection(dir);
    setCurrent((idx + stories.length) % stories.length);
    setProgress(0);
    startRef.current = null;
  }, [stories.length]);

  const next = useCallback(() => goTo(current + 1,  1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    if (paused || stories.length === 0) { cancelAnimationFrame(rafRef.current); return; }
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const pct = Math.min((now - startRef.current) / STORY_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) { goTo(current + 1, 1); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, paused, goTo, stories.length]);

  // ── Loading skeleton ─────────────────────────────────────
  if (loading) {
    return (
      <Wrapper>
        <SkeletonBg />
        <SkeletonContent>
          <SkeletonLine h="2px" w="100%" style={{ marginBottom: 20 }} />
          <SkeletonLine h="38px" w="160px" style={{ borderRadius: 38 }} />
          <SkeletonLine h="12px" w="80px" style={{ borderRadius: 20, marginTop: 18 }} />
          <div style={{ marginTop: 'auto', paddingBottom: '12vh', paddingTop: '40vh' }}>
            <SkeletonLine h="40px" w="100%" style={{ marginBottom: 12 }} />
            <SkeletonLine h="40px" w="85%"  style={{ marginBottom: 12 }} />
            <SkeletonLine h="40px" w="70%"  style={{ marginBottom: 24 }} />
            <SkeletonLine h="14px" w="100px" />
          </div>
        </SkeletonContent>
      </Wrapper>
    );
  }

  if (stories.length === 0) {
    return (
      <Wrapper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          No stories yet
        </span>
      </Wrapper>
    );
  }

  const story        = stories[current];
  const marqueeItems = buildMarqueeItems(stories, story.badgeLabel);

  return (
    <Wrapper
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); startRef.current = null; }}
    >
      {/* Background */}
      <AnimatePresence custom={direction} mode="sync">
        <BgImage key={`bg-${current}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit">
          <img src={story.image} alt={story.badgeLabel} />
        </BgImage>
      </AnimatePresence>

      {/* Content column */}
      <ContentColumn>
        <ProgressRow>
          {stories.map((_, i) => (
            <ProgressTrack key={i} onClick={() => goTo(i, i >= current ? 1 : -1)}>
              <ProgressFill $pct={i < current ? 1 : i === current ? progress : 0} />
            </ProgressTrack>
          ))}
        </ProgressRow>

        <AnimatePresence mode="wait">
          <Badge key={`badge-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <BadgeCircle $color={story.badgeColor}>{story.badgeIcon}</BadgeCircle>
            <BadgeLabel>{story.badgeLabel}</BadgeLabel>
          </Badge>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <TagRow key={`tags-${current}`} variants={tagContainerV} initial="hidden" animate="visible" exit="exit">
            {story.tags.map((tag) => (
              <Tag key={tag} variants={tagItemV}>{tag}</Tag>
            ))}
          </TagRow>
        </AnimatePresence>

        <Spacer />

        <BottomContent>
          <AnimatePresence mode="wait">
            <Title key={`title-${current}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              {story.title}
            </Title>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Cta key={`cta-${current}`} onClick={(e) => { e.stopPropagation(); navigate(story.ctaHref); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              {story.cta}
            </Cta>
          </AnimatePresence>
        </BottomContent>
      </ContentColumn>

      <TapZone className="left"  onClick={prev} />
      <TapZone className="right" onClick={next} />

      <MarqueeBar>
        <MarqueeTrack>
          {marqueeItems.map((item, i) => (
            <React.Fragment key={i}>
              <MarqueeItem data-active={item.active ? "true" : "false"}>{item.label}</MarqueeItem>
              <MarqueeDot>·</MarqueeDot>
            </React.Fragment>
          ))}
        </MarqueeTrack>
      </MarqueeBar>
    </Wrapper>
  );
};

export default NewsStories;