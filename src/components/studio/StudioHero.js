import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "../../assets/image/2.jpg";
import starSrc from "../../assets/star.png";

const ScrollDriver = styled.section`
  position: relative;
  height: 350vh;
  font-family: 'PP Neue Montreal', sans-serif;

  @media (max-width: 768px) {
    height: 250vh;
  }
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
    linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, rgba(0,0,0,0.75) 100%),
    linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 55%);
`;

const HeroTitleWrap = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 5%;
  z-index: 3;
  pointer-events: none;

  @media (max-width: 768px) {
    bottom: 36vh;
    left: 5%;
    right: 5%;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(4rem, 13vw, 16rem);
  font-weight: 500;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0;

  em {
    font-family: 'PP Editorial Old', serif;
    font-style: italic;
    font-weight: 400;
    color: rgba(255,255,255,0.42);
  }

  @media (max-width: 768px) {
    font-size: clamp(3.2rem, 16vw, 5rem);
    line-height: 0.9;
  }
`;

const TagLine = styled(motion.div)`
  position: absolute;
  top: 14vh;
  left: 5%;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    top: 10vh;
  }
`;

const TagIcon = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 12px;
    height: 12px;
    opacity: 0.5;
  }
`;

const TagText = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.42);
  text-transform: none;

  @media (max-width: 768px) {
    font-size: 0.62rem;
  }
`;

const Manifesto = styled(motion.div)`
  position: absolute;
  bottom: 10vh;
  right: 5%;
  z-index: 4;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 768px) {
    right: 5%;
    left: 5%;
    bottom: 4vh;
    max-width: 100%;
    gap: 10px;
  }
`;

const ManifestoHeading = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.5rem);
  font-weight: 400;
  line-height: 1.45;
  color: #fff;
  margin: 0;
  letter-spacing: -0.01em;
  text-transform: none;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ManifestoBody = styled.p`
  font-size: 0.82rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.38);
  margin: 0;
  font-weight: 300;
  text-transform: none;
  letter-spacing: 0.01em;

  @media (max-width: 768px) {
    display: none;
  }
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
  bottom: 4vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.26);
  white-space: nowrap;
`;

const StudioHero = () => {
  const driverRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: driverRef,
    offset: ["start start", "end end"],
  });

  const titleY            = useTransform(scrollYProgress, [0, 1],       ["0vh",   "-40vh"]);
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
        <HeroTitleWrap style={{ y: titleY }}>
          <HeroTitle>
            Crafting<br />
            Creative<br />
            <em>Presence</em>
          </HeroTitle>
        </HeroTitleWrap>
        <TagLine style={{ opacity: tagOpacity }}>
          <TagIcon>
            <img src={starSrc} alt="" />
          </TagIcon>
          <TagText>Creative experiences with intentional emotional impact</TagText>
        </TagLine>
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