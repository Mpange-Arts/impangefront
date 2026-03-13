import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProductsAPI from '../../api/products';

// ─── Styled Components (100% unchanged) ──────────────────────

const DesktopWrapper = styled.section`
  position: relative;
  height: ${(p) => p.count * 100}vh;
  font-family: 'PP Neue Montreal', sans-serif;
  @media (max-width: 768px) { display: none; }
`;

const Stage = styled.div`
  position: sticky; top: 0;
  height: 100vh; width: 100%;
  overflow: hidden; background: #000;
`;

const Bg = styled(motion.div)`
  position: absolute; inset: 0; z-index: 0;
  img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.65); }
`;

const Scrim = styled.div`
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.08) 45%, transparent 100%);
`;

const Thumb = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-8%, -50%);
  z-index: 3;
  width: clamp(200px, 20vw, 310px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
`;

const ThumbImg = styled(motion.img)`
  width: 100%; height: 100%; object-fit: cover; display: block;
`;

const TitleBlock = styled.div`
  position: absolute;
  top: 50%; left: 5%;
  transform: translateY(-50%);
  z-index: 3;
  display: flex; flex-direction: column; gap: 8px;
  max-width: 38vw;
`;

const TitleClip = styled.div`overflow: hidden;`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 5rem);
  font-weight: 300; line-height: 1.05;
  letter-spacing: -0.025em; color: #fff; margin: 0;
`;

const Subtitle = styled(motion.span)`
  display: block;
  font-size: 0.8rem; font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.45);
  text-transform: none;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 7vh; left: 5%; right: 5%;
  z-index: 4;
  display: flex; align-items: center; justify-content: space-between;
`;

const AllProjectsBtn = styled(motion.button)`
  display: flex; align-items: center; gap: 9px;
  font-size: 0.68rem; font-weight: 300;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  background: none; border: none; cursor: pointer; padding: 0;
  font-family: 'PP Neue Montreal', sans-serif;
  transition: color 0.3s ease;
  &:hover { color: rgba(255,255,255,0.9); }
`;

const Dots = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 2.5px;
  span { display: block; width: 3px; height: 3px; border-radius: 50%; background: currentColor; }
`;

const Counter = styled.div`display: flex; align-items: baseline; gap: 4px;`;

const CountWrap = styled.div`
  position: relative; width: 1.8rem; height: 1.2rem; overflow: hidden;
`;

const CountNum = styled(motion.span)`
  position: absolute; right: 0;
  font-size: 0.82rem; font-weight: 300;
  color: #fff; letter-spacing: 0.06em; line-height: 1;
`;

const Sep   = styled.span`font-size: 0.7rem; color: rgba(255,255,255,0.2);`;
const Total = styled.span`font-size: 0.7rem; font-weight: 300; color: rgba(255,255,255,0.2); letter-spacing: 0.06em;`;

const ProgressBar = styled.div`
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 1px;
  background: rgba(255,255,255,0.05); z-index: 4;
`;

const ProgressFill = styled(motion.div)`
  height: 100%; background: rgba(255,255,255,0.28); transform-origin: left;
`;

const ScrollHint = styled(motion.div)`
  position: absolute; bottom: 7vh; left: 50%;
  transform: translateX(-50%); z-index: 4;
  display: flex; flex-direction: column; align-items: center; gap: 7px;
  pointer-events: none;
`;

const ScrollLine = styled(motion.div)`
  width: 1px; height: 34px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.35), transparent);
`;

const ScrollLabel = styled.span`
  font-size: 0.56rem; letter-spacing: 0.24em;
  text-transform: uppercase; color: rgba(255,255,255,0.22);
`;

const MobileWrapper = styled.section`
  display: none;
  font-family: 'PP Neue Montreal', sans-serif;
  @media (max-width: 768px) {
    display: block; position: relative;
    height: 100vh; overflow: hidden; background: #000;
  }
`;

const MobileSlide = styled(motion.div)`
  position: absolute; inset: 0;
  user-select: none; touch-action: pan-y;
  img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.6); pointer-events: none; }
`;

const MobileScrim = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%);
  z-index: 1;
`;

const MobileTitleBlock = styled.div`
  position: absolute; bottom: 14vh; left: 6%; right: 6%; z-index: 3;
`;

const MobileSubtitle = styled(motion.span)`
  display: block; font-size: 0.7rem; font-weight: 300;
  letter-spacing: 0.1em; color: rgba(255,255,255,0.45);
  text-transform: uppercase; margin-bottom: 8px;
`;

const MobileTitle = styled(motion.h2)`
  font-size: clamp(2.4rem, 11vw, 4rem);
  font-weight: 300; line-height: 1;
  letter-spacing: -0.03em; color: #fff; margin: 0;
`;

const MobileBottomBar = styled.div`
  position: absolute; bottom: 5vh; left: 6%; right: 6%;
  z-index: 4; display: flex; align-items: center; justify-content: space-between;
`;

const MobileProgressDots = styled.div`
  position: absolute; bottom: 12vh; left: 50%;
  transform: translateX(-50%); z-index: 4;
  display: flex; gap: 5px; align-items: center;
`;

const ProgDot = styled.div`
  width: ${p => p.active ? '18px' : '5px'}; height: 2px;
  border-radius: 10px;
  background: ${p => p.active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)'};
  transition: width 0.35s ease, background 0.35s ease;
`;

const SwipeHint = styled(motion.div)`
  display: flex; align-items: center; gap: 6px;
  font-size: 0.56rem; letter-spacing: 0.24em;
  text-transform: uppercase; color: rgba(255,255,255,0.22); white-space: nowrap;
`;

const Overlay = styled(motion.div)`
  position: fixed; inset: 0; z-index: 9998;
  background: #fff; display: flex; flex-direction: column;
  overflow: hidden; font-family: 'PP Neue Montreal', sans-serif;
`;

const GridArea = styled.div`
  position: absolute; inset: 0;
  overflow-x: auto; overflow-y: hidden;
  display: flex; align-items: center; padding: 0 3%;
  &::-webkit-scrollbar { display: none; } scrollbar-width: none;
  @media (max-width: 768px) { display: none; }
`;

const Grid = styled.div`
  display: flex; flex-direction: row; align-items: center;
  height: 70vh; width: max-content; gap: 10px;
`;

const GridCard = styled(motion.div)`
  position: relative; height: 100%;
  width: clamp(220px, 22vw, 340px);
  overflow: hidden; cursor: pointer; flex-shrink: 0;
  img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
    filter: brightness(0.92);
  }
  &:hover img { transform: scale(1.04); filter: brightness(1); }
`;

const CardLabel = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 40px 16px 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  opacity: 0; transform: translateY(6px);
  transition: opacity 0.35s ease, transform 0.35s ease;
  ${GridCard}:hover & { opacity: 1; transform: translateY(0); }
`;

const CardTitle = styled.p`font-size: 0.85rem; font-weight: 300; color: #fff; margin: 0 0 2px; text-transform: none; letter-spacing: 0;`;
const CardSub   = styled.p`font-size: 0.62rem; font-weight: 300; color: rgba(255,255,255,0.5); margin: 0; text-transform: uppercase; letter-spacing: 0.1em;`;

const OverlayBar = styled.div`
  position: absolute; bottom: 6vh; left: 4%; right: 4%;
  display: flex; align-items: center; justify-content: space-between;
  z-index: 3; pointer-events: none;
  button { pointer-events: all; }
`;

const CloseBtn = styled(motion.button)`
  display: flex; align-items: center; gap: 8px;
  background: none; border: none; color: rgba(0,0,0,0.45);
  font-size: 0.68rem; font-weight: 300;
  letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; font-family: 'PP Neue Montreal', sans-serif; padding: 0;
  transition: color 0.3s ease;
  &:hover { color: rgba(0,0,0,0.9); }
  @media (max-width: 768px) {
    color: rgba(255,255,255,0.7);
    &:hover { color: #fff; }
  }
`;

const ScrollExplore = styled(motion.span)`
  font-size: 0.68rem; font-weight: 300;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(0,0,0,0.3);
  @media (max-width: 768px) { display: none; }
`;

const MobileOverlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block; position: absolute; inset: 0; z-index: 1; overflow: hidden;
  }
`;

const MobileOverlaySlide = styled(motion.div)`
  position: absolute; inset: 0; touch-action: pan-y;
  img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.6); pointer-events: none; }
`;

const MobileOverlayBar = styled.div`
  position: absolute; bottom: 5vh; left: 6%; right: 6%;
  z-index: 4; display: flex; align-items: center; justify-content: flex-end;
`;

// Loading skeleton
const SkeletonStage = styled.div`
  height: 100vh; width: 100%; background: #111;
  display: flex; align-items: center; justify-content: center;
`;

const SkeletonText = styled.div`
  color: rgba(255,255,255,0.2); font-family: 'PP Neue Montreal', sans-serif;
  font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase;
`;

// ─── Animation Variants (100% unchanged) ─────────────────────

const bgV = {
  enter: (d) => ({ clipPath: d > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)', scale: 1.08 }),
  center: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, transition: { clipPath: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }, scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } },
  exit: (d) => ({ clipPath: d > 0 ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)', scale: 0.96, transition: { clipPath: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }, scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }),
};

const thumbV = {
  enter: (d) => ({ y: d > 0 ? 50 : -50, opacity: 0, scale: 0.97 }),
  center: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
  exit: (d) => ({ y: d > 0 ? -50 : 50, opacity: 0, scale: 0.97, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }),
};

const titleV = {
  enter: (d) => ({ y: d > 0 ? '115%' : '-115%' }),
  center: { y: '0%', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
  exit: (d) => ({ y: d > 0 ? '-115%' : '115%', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }),
};

const subV = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.28 } },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};

const numV = {
  enter: { y: '100%', opacity: 0 },
  center: { y: '0%', opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: '-100%', opacity: 0, transition: { duration: 0.28 } },
};

const mobileSlideV = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-100%', scale: 0.96 }),
  center: { x: '0%', scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: (d) => ({ x: d > 0 ? '-100%' : '100%', scale: 0.96, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }),
};

const mobileTextV = {
  enter: (d) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
  exit: (d) => ({ x: d > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }),
};

const overlayV = {
  hidden:  { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } },
  exit:    { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};

const cardV = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.35 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

// ─── Component ────────────────────────────────────────────────

const WorkHero = () => {
  const wrapperRef = useRef(null);
  const [projects, setProjects]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [current, setCurrent]             = useState(0);
  const [dir, setDir]                     = useState(1);
  const [overlayOpen, setOverlayOpen]     = useState(false);
  const [overlayIdx, setOverlayIdx]       = useState(0);
  const [overlayDir, setOverlayDir]       = useState(1);
  const prev         = useRef(0);
  const dragStartX   = useRef(null);
  const overlayDragX = useRef(null);

  // ── Fetch projects from API ──────────────────────────────
  useEffect(() => {
    ProductsAPI.getAll({ limit: 20, page: 1 })
      .then((data) => setProjects(data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── Desktop scroll navigation ────────────────────────────
  useEffect(() => {
    if (projects.length === 0) return;
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const { top, height } = wrapperRef.current.getBoundingClientRect();
      const scrolled = -top;
      const slotH = height / projects.length;
      const idx = Math.max(0, Math.min(projects.length - 1, Math.floor(scrolled / slotH)));
      if (idx !== prev.current) {
        setDir(idx > prev.current ? 1 : -1);
        setCurrent(idx);
        prev.current = idx;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [projects]);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayOpen]);

  // ── Mobile swipe ─────────────────────────────────────────
  const handleTouchStart = (e) => { dragStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) { dragStartX.current = null; return; }
    if (delta > 0 && current < projects.length - 1) {
      setDir(1); setCurrent(c => c + 1); prev.current = current + 1;
    } else if (delta < 0 && current > 0) {
      setDir(-1); setCurrent(c => c - 1); prev.current = current - 1;
    }
    dragStartX.current = null;
  };

  // ── Loading state ────────────────────────────────────────
  if (loading) {
    return (
      <SkeletonStage>
        <SkeletonText>Loading projects...</SkeletonText>
      </SkeletonStage>
    );
  }

  if (projects.length === 0) {
    return (
      <SkeletonStage>
        <SkeletonText>No projects found</SkeletonText>
      </SkeletonStage>
    );
  }

  const p        = projects[current];
  const image    = p.images?.[0]?.url || '';
  const progress = (current + 1) / projects.length;

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────── */}
      <DesktopWrapper ref={wrapperRef} count={projects.length}>
        <Stage>
          <AnimatePresence custom={dir} mode="sync">
            <Bg key={`bg-${p.id}`} custom={dir} variants={bgV} initial="enter" animate="center" exit="exit">
              <img src={image} alt="" />
            </Bg>
          </AnimatePresence>
          <Scrim />

          <Thumb>
            <AnimatePresence custom={dir} mode="wait">
              <ThumbImg key={`thumb-${p.id}`} src={image} alt={p.title}
                custom={dir} variants={thumbV} initial="enter" animate="center" exit="exit" />
            </AnimatePresence>
          </Thumb>

          <TitleBlock>
            <AnimatePresence mode="wait">
              <Subtitle key={`sub-${p.id}`} as={motion.span} variants={subV} initial="enter" animate="center" exit="exit">
                {p.category}
              </Subtitle>
            </AnimatePresence>
            <TitleClip>
              <AnimatePresence custom={dir} mode="wait">
                <Title key={`title-${p.id}`} custom={dir} variants={titleV} initial="enter" animate="center" exit="exit">
                  {p.title}
                </Title>
              </AnimatePresence>
            </TitleClip>
          </TitleBlock>

          <BottomBar>
            <AllProjectsBtn
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              onClick={() => setOverlayOpen(true)}
            >
              <Dots><span /><span /><span /><span /></Dots>
              All Projects
            </AllProjectsBtn>
            <Counter>
              <CountWrap>
                <AnimatePresence custom={dir} mode="wait">
                  <CountNum key={`n-${p.id}`} custom={dir} variants={numV} initial="enter" animate="center" exit="exit">
                    {String(current + 1).padStart(2, '0')}
                  </CountNum>
                </AnimatePresence>
              </CountWrap>
              <Sep>/</Sep>
              <Total>{String(projects.length).padStart(2, '0')}</Total>
            </Counter>
          </BottomBar>

          <AnimatePresence>
            {current === 0 && (
              <ScrollHint initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.4, duration: 0.8 }}>
                <ScrollLine animate={{ scaleY: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
                <ScrollLabel>Scroll</ScrollLabel>
              </ScrollHint>
            )}
          </AnimatePresence>

          <ProgressBar>
            <ProgressFill animate={{ scaleX: progress }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} />
          </ProgressBar>
        </Stage>
      </DesktopWrapper>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <MobileWrapper onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AnimatePresence custom={dir} mode="wait">
          <MobileSlide key={`m-${p.id}`} custom={dir} variants={mobileSlideV} initial="enter" animate="center" exit="exit">
            <img src={image} alt={p.title} />
            <MobileScrim />
            <MobileTitleBlock>
              <AnimatePresence custom={dir} mode="wait">
                <motion.div key={`mt-${p.id}`} custom={dir} variants={mobileTextV} initial="enter" animate="center" exit="exit">
                  <MobileSubtitle>{p.category}</MobileSubtitle>
                  <MobileTitle>{p.title}</MobileTitle>
                </motion.div>
              </AnimatePresence>
            </MobileTitleBlock>
          </MobileSlide>
        </AnimatePresence>

        <MobileProgressDots>
          {projects.map((_, i) => <ProgDot key={i} active={i === current} />)}
        </MobileProgressDots>

        <MobileBottomBar>
          <AllProjectsBtn initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} onClick={() => setOverlayOpen(true)}>
            <Dots><span /><span /><span /><span /></Dots>
            All Projects
          </AllProjectsBtn>
          <AnimatePresence>
            {current === 0 ? (
              <SwipeHint key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.4, duration: 0.8 }}>
                Swipe to explore
              </SwipeHint>
            ) : (
              <Counter key="counter">
                <CountWrap>
                  <AnimatePresence custom={dir} mode="wait">
                    <CountNum key={`mn-${p.id}`} custom={dir} variants={numV} initial="enter" animate="center" exit="exit">
                      {String(current + 1).padStart(2, '0')}
                    </CountNum>
                  </AnimatePresence>
                </CountWrap>
                <Sep>/</Sep>
                <Total>{String(projects.length).padStart(2, '0')}</Total>
              </Counter>
            )}
          </AnimatePresence>
        </MobileBottomBar>

        <ProgressBar>
          <ProgressFill animate={{ scaleX: progress }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} />
        </ProgressBar>
      </MobileWrapper>

      {/* ── All Projects Overlay ─────────────────────────────── */}
      <AnimatePresence>
        {overlayOpen && (
          <Overlay variants={overlayV} initial="hidden" animate="visible" exit="exit">

            {/* Desktop horizontal grid */}
            <GridArea>
              <Grid>
                {projects.map((proj, i) => (
                  <GridCard key={proj.id} custom={i} variants={cardV} initial="hidden" animate="visible" onClick={() => setOverlayOpen(false)}>
                    <img src={proj.images?.[0]?.url || ''} alt={proj.title} loading="lazy" />
                    <CardLabel>
                      <CardTitle>{proj.title}</CardTitle>
                      <CardSub>{proj.category}</CardSub>
                    </CardLabel>
                  </GridCard>
                ))}
              </Grid>
            </GridArea>

            {/* Mobile full-screen slider */}
            <MobileOverlay
              onTouchStart={(e) => { overlayDragX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (overlayDragX.current === null) return;
                const delta = overlayDragX.current - e.changedTouches[0].clientX;
                if (Math.abs(delta) < 40) { overlayDragX.current = null; return; }
                if (delta > 0 && overlayIdx < projects.length - 1) {
                  setOverlayDir(1); setOverlayIdx(i => i + 1);
                } else if (delta < 0 && overlayIdx > 0) {
                  setOverlayDir(-1); setOverlayIdx(i => i - 1);
                }
                overlayDragX.current = null;
              }}
            >
              <AnimatePresence custom={overlayDir} mode="wait">
                <MobileOverlaySlide key={`ov-${overlayIdx}`} custom={overlayDir} variants={mobileSlideV} initial="enter" animate="center" exit="exit">
                  <img src={projects[overlayIdx]?.images?.[0]?.url || ''} alt={projects[overlayIdx]?.title} />
                  <MobileScrim />
                  <MobileTitleBlock>
                    <AnimatePresence custom={overlayDir} mode="wait">
                      <motion.div key={`ovt-${overlayIdx}`} custom={overlayDir} variants={mobileTextV} initial="enter" animate="center" exit="exit">
                        <MobileSubtitle>{projects[overlayIdx]?.category}</MobileSubtitle>
                        <MobileTitle>{projects[overlayIdx]?.title}</MobileTitle>
                      </motion.div>
                    </AnimatePresence>
                  </MobileTitleBlock>
                </MobileOverlaySlide>
              </AnimatePresence>

              <MobileProgressDots>
                {projects.map((_, i) => <ProgDot key={i} active={i === overlayIdx} />)}
              </MobileProgressDots>

              <MobileOverlayBar>
                <Counter>
                  <CountWrap>
                    <AnimatePresence custom={overlayDir} mode="wait">
                      <CountNum key={`on-${overlayIdx}`} custom={overlayDir} variants={numV} initial="enter" animate="center" exit="exit" style={{ color: '#fff' }}>
                        {String(overlayIdx + 1).padStart(2, '0')}
                      </CountNum>
                    </AnimatePresence>
                  </CountWrap>
                  <Sep>/</Sep>
                  <Total>{String(projects.length).padStart(2, '0')}</Total>
                </Counter>
              </MobileOverlayBar>
            </MobileOverlay>

            <OverlayBar>
              <CloseBtn onClick={() => setOverlayOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Close
              </CloseBtn>
              <ScrollExplore initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                Scroll to explore
              </ScrollExplore>
            </OverlayBar>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkHero;