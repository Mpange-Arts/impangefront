import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    id: '01',
    title: 'Zara Campaign',
    subtitle: 'Film Direction',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: '02',
    title: 'Lusaka Portraits',
    subtitle: 'Editorial Photography',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: '03',
    title: 'Velt Studio',
    subtitle: 'Digital Experience',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: '04',
    title: 'Nomad App',
    subtitle: 'Product Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: '05',
    title: 'Pulse Motion',
    subtitle: 'Brand Animation',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: '06',
    title: 'Kente Identity',
    subtitle: 'Visual Identity',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: '07',
    title: 'Reach Campaign',
    subtitle: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: '08',
    title: 'Meridian Brand',
    subtitle: 'Brand System',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=900',
  },
];

// ─── Main Stage Styled ────────────────────────────────────────

const Wrapper = styled.section`
  position: relative;
  height: ${PROJECTS.length * 100}vh;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const Stage = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #000;
`;

const Bg = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.65);
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.38) 0%,
    rgba(0,0,0,0.08) 45%,
    transparent 100%
  );
`;

const Thumb = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-8%, -50%);
  z-index: 3;
  width: clamp(200px, 20vw, 310px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
`;

const ThumbImg = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const TitleBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 38vw;
  @media (max-width: 768px) { max-width: 65vw; }
`;

const TitleClip = styled.div`
  overflow: hidden;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: #fff;
  margin: 0;
`;

const Subtitle = styled(motion.span)`
  display: block;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.45);
  text-transform: none;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 7vh;
  left: 5%;
  right: 5%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AllProjectsBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.68rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: 'PP Neue Montreal', sans-serif;
  transition: color 0.3s ease;
  &:hover { color: rgba(255,255,255,0.9); }
`;

const Dots = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5px;
  span {
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const CountWrap = styled.div`
  position: relative;
  width: 1.8rem;
  height: 1.2rem;
  overflow: hidden;
`;

const CountNum = styled(motion.span)`
  position: absolute;
  right: 0;
  font-size: 0.82rem;
  font-weight: 300;
  color: #fff;
  letter-spacing: 0.06em;
  line-height: 1;
`;

const Sep = styled.span`
  font-size: 0.7rem;
  color: rgba(255,255,255,0.2);
`;

const Total = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.06em;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.05);
  z-index: 4;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: rgba(255,255,255,0.28);
  transform-origin: left;
`;

const ScrollHint = styled(motion.div)`
  position: absolute;
  bottom: 7vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  pointer-events: none;
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 34px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.35), transparent);
`;

const ScrollLabel = styled.span`
  font-size: 0.56rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.22);
`;

// ─── Overlay Styled ───────────────────────────────────────────

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const OverlayPlus = styled(motion.div)`
  position: absolute;
  top: 5vh;
  right: 5%;
  font-size: 1.1rem;
  color: rgba(0,0,0,0.3);
  z-index: 2;
  pointer-events: none;
`;

const GridArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  padding: 0 3%;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70vh;
  width: max-content;
  gap: 10px;
`;

const GridCard = styled(motion.div)`
  position: relative;
  height: 100%;
  width: clamp(220px, 22vw, 340px);
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.4s ease;
    filter: brightness(0.92);
  }

  &:hover img {
    transform: scale(1.04);
    filter: brightness(1);
  }
`;

const CardLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 16px 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.35s ease, transform 0.35s ease;

  ${GridCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardTitle = styled.p`
  font-size: 0.85rem;
  font-weight: 300;
  color: #fff;
  margin: 0 0 2px;
  text-transform: none;
  letter-spacing: 0;
`;

const CardSub = styled.p`
  font-size: 0.62rem;
  font-weight: 300;
  color: rgba(255,255,255,0.5);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const OverlayBar = styled.div`
  position: absolute;
  bottom: 6vh;
  left: 4%;
  right: 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
  pointer-events: none;
  button { pointer-events: all; }
`;

const CloseBtn = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: rgba(0,0,0,0.45);
  font-size: 0.68rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: 'PP Neue Montreal', sans-serif;
  padding: 0;
  transition: color 0.3s ease;
  &:hover { color: rgba(0,0,0,0.9); }
`;

const ScrollExplore = styled(motion.span)`
  font-size: 0.68rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
`;

// ─── Variants ─────────────────────────────────────────────────

const bgV = {
  enter: (d) => ({
    clipPath: d > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
    scale: 1.08,
  }),
  center: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: {
      clipPath: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      scale:    { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: (d) => ({
    clipPath: d > 0 ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
    scale: 0.96,
    transition: {
      clipPath: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      scale:    { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }),
};

const thumbV = {
  enter: (d) => ({ y: d > 0 ? 50 : -50, opacity: 0, scale: 0.97 }),
  center: {
    y: 0, opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
  exit: (d) => ({
    y: d > 0 ? -50 : 50, opacity: 0, scale: 0.97,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const titleV = {
  enter: (d) => ({ y: d > 0 ? '115%' : '-115%' }),
  center: {
    y: '0%',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
  exit: (d) => ({
    y: d > 0 ? '-115%' : '115%',
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  }),
};

const subV = {
  enter: { opacity: 0, y: 8 },
  center: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.28 },
  },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};

const numV = {
  enter: { y: '100%', opacity: 0 },
  center: {
    y: '0%', opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { y: '-100%', opacity: 0, transition: { duration: 0.28 } },
};

const overlayV = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
};

const cardV = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: {
      delay: 0.35 + i * 0.05,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Component ────────────────────────────────────────────────

const WorkHero = () => {
  const wrapperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const prev = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const { top, height } = wrapperRef.current.getBoundingClientRect();
      const scrolled = -top;
      const slotH = height / PROJECTS.length;
      const idx = Math.max(0, Math.min(PROJECTS.length - 1, Math.floor(scrolled / slotH)));
      if (idx !== prev.current) {
        setDir(idx > prev.current ? 1 : -1);
        setCurrent(idx);
        prev.current = idx;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayOpen]);

  const p = PROJECTS[current];
  const progress = (current + 1) / PROJECTS.length;

  return (
    <Wrapper ref={wrapperRef}>
      <Stage>

        {/* Background wipe */}
        <AnimatePresence custom={dir} mode="sync">
          <Bg key={`bg-${p.id}`} custom={dir} variants={bgV} initial="enter" animate="center" exit="exit">
            <img src={p.image} alt="" />
          </Bg>
        </AnimatePresence>

        <Scrim />

        {/* Floating thumbnail */}
        <Thumb>
          <AnimatePresence custom={dir} mode="wait">
            <ThumbImg
              key={`thumb-${p.id}`}
              src={p.thumb}
              alt={p.title}
              custom={dir}
              variants={thumbV}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>
        </Thumb>

        {/* Title — vertically centered left */}
        <TitleBlock>
          <AnimatePresence mode="wait">
            <Subtitle
              key={`sub-${p.id}`}
              as={motion.span}
              variants={subV}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {p.subtitle}
            </Subtitle>
          </AnimatePresence>
          <TitleClip>
            <AnimatePresence custom={dir} mode="wait">
              <Title
                key={`title-${p.id}`}
                custom={dir}
                variants={titleV}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {p.title}
              </Title>
            </AnimatePresence>
          </TitleClip>
        </TitleBlock>

        {/* Bottom bar */}
        <BottomBar>
          <AllProjectsBtn
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            onClick={() => setOverlayOpen(true)}
          >
            <Dots><span /><span /><span /><span /></Dots>
            All Projects
          </AllProjectsBtn>

          <Counter>
            <CountWrap>
              <AnimatePresence custom={dir} mode="wait">
                <CountNum
                  key={`n-${p.id}`}
                  custom={dir}
                  variants={numV}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {String(current + 1).padStart(2, '0')}
                </CountNum>
              </AnimatePresence>
            </CountWrap>
            <Sep>/</Sep>
            <Total>{String(PROJECTS.length).padStart(2, '0')}</Total>
          </Counter>
        </BottomBar>

        {/* Scroll hint */}
        <AnimatePresence>
          {current === 0 && (
            <ScrollHint
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <ScrollLine
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <ScrollLabel>Scroll</ScrollLabel>
            </ScrollHint>
          )}
        </AnimatePresence>

        {/* Progress hairline */}
        <ProgressBar>
          <ProgressFill
            animate={{ scaleX: progress }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </ProgressBar>

      </Stage>

      {/* ── All Projects Overlay ─────────────────────────────── */}
      <AnimatePresence>
        {overlayOpen && (
          <Overlay variants={overlayV} initial="hidden" animate="visible" exit="exit">

            <OverlayPlus
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              +
            </OverlayPlus>

            {/* Horizontal scroll grid — centered vertically */}
            <GridArea>
              <Grid>
                {PROJECTS.map((proj, i) => (
                  <GridCard
                    key={proj.id}
                    custom={i}
                    variants={cardV}
                    initial="hidden"
                    animate="visible"
                    onClick={() => setOverlayOpen(false)}
                  >
                    <img src={proj.thumb} alt={proj.title} loading="lazy" />
                    <CardLabel>
                      <CardTitle>{proj.title}</CardTitle>
                      <CardSub>{proj.subtitle}</CardSub>
                    </CardLabel>
                  </GridCard>
                ))}
              </Grid>
            </GridArea>

            {/* Bottom bar */}
            <OverlayBar>
              <CloseBtn
                onClick={() => setOverlayOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Close
              </CloseBtn>

              <ScrollExplore
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Scroll to explore
              </ScrollExplore>
            </OverlayBar>

          </Overlay>
        )}
      </AnimatePresence>

    </Wrapper>
  );
};

export default WorkHero;