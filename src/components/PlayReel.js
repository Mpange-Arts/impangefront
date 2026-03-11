import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

import mpangeReel from '../assets/mpange1.mp4';

// --- STYLED COMPONENTS ---

const SectionWrapper = styled.section`
  position: relative;
  height: 300vh;
  background-color: #0a0a0a;
  color: #f0ece3;
  font-family: "PP Neue Montreal", sans-serif;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TopLabel = styled(motion.div)`
  position: absolute;
  top: 12vh;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.8;
  z-index: 10;
`;

/**
 * KEY FIX: Both words sit in a single centered flex row.
 * We then push them apart with translateX on each word individually.
 * This means they can only ever meet — never overlap.
 */
const WordRow = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25em;
  width: 100%;
  z-index: 5;
  pointer-events: none;
`;

const Word = styled(motion.h2)`
  font-size: clamp(3rem, 10vw, 11rem);
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1;
  white-space: nowrap;
`;

const MediaCanvas = styled(motion.div)`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  background: #111;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const BottomCaption = styled(motion.p)`
  position: absolute;
  bottom: 8vh;
  max-width: 350px;
  text-align: center;
  font-size: 0.8rem;
  line-height: 1.6;
  opacity: 0.6;
  z-index: 10;
  margin: 0;
`;

// --- COMPONENT ---

const PlayReel = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /**
   * SCROLL PHASES
   * 0.00 → 0.65 : Text spreads apart, video expands (synced)
   * 0.65 → 0.85 : Everything fades as video goes full screen
   */
  const SPREAD_END = 0.65;
  const FADE_END = 0.85;

  // Words start pushed far apart, converge to their natural flex positions (0)
  const xPlay = useTransform(scrollYProgress, [0, SPREAD_END], ['-38vw', '0vw']);
  const xReel = useTransform(scrollYProgress, [0, SPREAD_END], ['38vw', '0vw']);

  // Video synced to exactly same range as text convergence
  const canvasWidth  = useTransform(scrollYProgress, [0, SPREAD_END], ['26vw', '100vw']);
  const canvasHeight = useTransform(scrollYProgress, [0, SPREAD_END], ['29vh', '100vh']);

  // Fade text + UI once video is nearly full screen
  const textOpacity = useTransform(scrollYProgress, [SPREAD_END, FADE_END], [1, 0]);
  const uiOpacity   = useTransform(scrollYProgress, [SPREAD_END * 0.85, FADE_END], [1, 0]);

  return (
    <SectionWrapper ref={containerRef}>
      <StickyContainer>

        <TopLabel style={{ opacity: uiOpacity }}>
          <span>✦</span> Work in motion
        </TopLabel>

        {/* Words share ONE centered row — translateX spreads them, gap keeps them clean */}
        <WordRow>
          <Word style={{ x: xPlay, opacity: textOpacity }}>Play</Word>
          <Word style={{ x: xReel, opacity: textOpacity }}>Reel</Word>
        </WordRow>

        {/* Video box sits behind the text and expands in the same scroll window */}
        <MediaCanvas style={{ width: canvasWidth, height: canvasHeight }}>
          <video autoPlay loop muted playsInline>
            <source src={mpangeReel} type="video/mp4" />
          </video>
        </MediaCanvas>

        <BottomCaption style={{ opacity: uiOpacity }}>
          Our work is best experienced in motion. Don't forget to put on your headphones.
        </BottomCaption>

      </StickyContainer>
    </SectionWrapper>
  );
};

export default PlayReel;