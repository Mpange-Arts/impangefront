import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "../../assets/image/2.jpg";

// ─── Styled ───────────────────────────────────────────────────

const ScrollDriver = styled.section`
  position: relative;
  height: 350vh;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const StickyStage = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    display: block;
    filter: brightness(0.6);
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 35%, rgba(0,0,0,0.7) 100%),
    linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 55%);
`;

const HeroTitleWrap = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 5%;
  z-index: 3;
  pointer-events: none;
`;

const HeroTitle = styled.h1`
  font-size: clamp(5rem, 13vw, 16rem);
  font-weight: 500;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0;
  text-align: left;

  em {
    font-family: 'PP Editorial Old', serif;
    font-style: italic;
    font-weight: 400;
    color: rgba(255,255,255,0.42);
  }
`;

const TagLine = styled(motion.div)`
  position: absolute;
  top: 18vh;
  left: 5%;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TagIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  color: rgba(255,255,255,0.4);
`;

const TagText = styled.span`
  font-size: 0.72rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.42);
  text-transform: none;
`;

const Manifesto = styled(motion.div)`
  position: absolute;
  bottom: 10vh;
  right: 5%;
  z-index: 4;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ManifestoHeading = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.5rem);
  font-weight: 400;
  line-height: 1.45;
  color: #fff;
  margin: 0;
  letter-spacing: -0.01em;
  text-transform: none;
`;

const ManifestoBody = styled.p`
  font-size: 0.82rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.38);
  margin: 0;
  font-weight: 300;
  text-transform: none;
  letter-spacing: 0.01em;
`;

const OurStoryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.62);
  text-decoration: underline;
  text-underline-offset: 5px;
  cursor: pointer;
  text-transform: none;
  transition: color 0.3s ease;
  width: fit-content;
  &:hover { color: #fff; }
`;

const ScrollExplore = styled(motion.div)`
  position: absolute;
  bottom: 5vh;
  right: 5%;
  z-index: 4;
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.26);
`;

// ─── Component ────────────────────────────────────────────────

const StudioHero = () => {
  const driverRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: driverRef,
    offset: ["start start", "end end"],
  });

  const titleY            = useTransform(scrollYProgress, [0, 1],       ["0vh",   "-55vh"]);
  const tagOpacity        = useTransform(scrollYProgress, [0, 0.03],    [0, 1]);
  const manifestoOpacity  = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);
  const manifestoY        = useTransform(scrollYProgress, [0.05, 0.18], ["22px", "0px"]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08],    [1, 0]);

  return (
    <ScrollDriver ref={driverRef}>
      <StickyStage>

        <HeroBg>
          <img src={heroBg} alt="Mpange Studio" />
        </HeroBg>

        <Scrim />

        {/* Large title — parallaxes upward as you scroll */}
        <HeroTitleWrap style={{ y: titleY }}>
          <HeroTitle>
            Crafting<br />
            Creative<br />
            <em>Presence</em>
          </HeroTitle>
        </HeroTitleWrap>

        {/* Tagline — top left */}
        <TagLine style={{ opacity: tagOpacity }}>
          <TagIcon>✦</TagIcon>
          <TagText>Creative experiences with intentional emotional impact</TagText>
        </TagLine>

        {/* Manifesto — bottom right, reveals on scroll */}
        <Manifesto style={{ opacity: manifestoOpacity, y: manifestoY }}>
          <ManifestoHeading>
            We explore and push the boundaries of creativity
            for brands that strive to leave a lasting mark.
          </ManifestoHeading>
          <ManifestoBody>
            For over six years, we've been using profound design aesthetics,
            meticulously crafted details, and intentional storytelling to create
            work that sparks conversation, inspires action, and drives desirability.
          </ManifestoBody>
          <OurStoryLink href="#studio-about">Our Story →</OurStoryLink>
        </Manifesto>

        <ScrollExplore style={{ opacity: scrollHintOpacity }}>
          Scroll to explore
        </ScrollExplore>

      </StickyStage>
    </ScrollDriver>
  );
};

export default StudioHero;