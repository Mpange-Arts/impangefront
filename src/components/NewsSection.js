import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Styled Components --- (unchanged from original)

const SectionWrapper = styled.section`
  background-color: #fff;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const TextContent = styled.div`
  text-align: center;
  padding: 16vh 5% 18vh;
`;

const Title = styled(motion.h2)`
  font-size: clamp(4rem, 11vw, 13rem);
  font-weight: 500;
  line-height: 0.9;
  margin: 0 0 6vh;
  letter-spacing: -0.04em;
  color: #000;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  margin: 0 auto 4vh;
  max-width: 420px;
  line-height: 1.6;
  color: #333;
`;

const BrowseLinkWrapper = styled(motion.div)`
  display: inline-flex;
`;

const BrowseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #000;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border: 1px solid #000;
    border-radius: 50%;
    flex-shrink: 0;
  }

  span {
    border-bottom: 1px solid rgba(0, 0, 0, 0.35);
    padding-bottom: 2px;
  }
`;

// --- Animation Variants ---

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// --- Main Component ---
const NewsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });

  return (
    <SectionWrapper ref={sectionRef}>
      <TextContent>

        <Title
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Spread<br />the News
        </Title>

        <Subtitle
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Find out more about our work on these leading design and technology platforms.
        </Subtitle>

        <BrowseLinkWrapper
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <BrowseLink to="/news">
            <span>Browse all news</span>
          </BrowseLink>
        </BrowseLinkWrapper>

      </TextContent>
    </SectionWrapper>
  );
};

export default NewsSection;