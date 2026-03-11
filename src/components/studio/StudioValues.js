import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";

// ─── Styled ───────────────────────────────────────────────────

const Wrapper = styled.section`
  background: #0a0a0a;
  padding: 12vh 6% 16vh;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const TopLabel = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10vh;

  &::before {
    content: '+';
    font-size: 0.75rem;
    color: rgba(255,255,255,0.35);
  }

  span {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
  }
`;

const Intro = styled(motion.p)`
  font-size: clamp(1.4rem, 3vw, 2.6rem);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #fff;
  max-width: 680px;
  margin: 0 0 16vh;
  text-transform: none;
`;

// ── Values grid — 2 columns, pairs stack vertically ──────────

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 8vw;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueItem = styled(motion.div)`
  padding: 8vh 0;
  border-top: 1px solid rgba(255,255,255,0.07);

  /* Right column items offset slightly so pairs read diagonal */
  &.right {
    margin-top: 18vh;

    @media (max-width: 768px) {
      margin-top: 0;
    }
  }
`;

const ValueNum = styled.span`
  display: block;
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  color: rgba(255,255,255,0.22);
  text-transform: uppercase;
  margin-bottom: 2.5vh;
`;

const ValueTitle = styled.h3`
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 3.5vh;
  text-transform: none;
  max-width: 480px;
`;

const ValueText = styled.p`
  font-size: 0.88rem;
  line-height: 1.78;
  color: rgba(255,255,255,0.38);
  font-weight: 300;
  text-transform: none;
  margin: 0;
  max-width: 380px;
  letter-spacing: 0.01em;
`;

// ─── Data ─────────────────────────────────────────────────────

const VALUES = [
  {
    num: "01",
    title: "Craft that speaks across all senses",
    text: "We ensure the depth and sophistication of your brand is felt at every touchpoint — visual, digital, and physical. We go deep into detail to deliver holistic experiences that leave a lasting impression and fit seamlessly into your world.",
    col: "left",
  },
  {
    num: "02",
    title: "To be human is our greatest quality",
    text: "We believe intuition is the most advanced technology we have, and curiosity is our most powerful tool. Our studio is guided by compassion and honesty — because people value feeling more than information, and we pour soul into every piece of work we deliver.",
    col: "right",
  },
  {
    num: "03",
    title: "Simplicity is the dot on our horizon",
    text: "In a world that is information-rich and time-poor, it is those who focus on what truly matters that set the tone. We approach every project with a keen eye for simplicity and elegance — stripping away the frivolous to reveal what is essential.",
    col: "left",
  },
  {
    num: "04",
    title: "Uncompromising standard of excellence",
    text: "We aim to push boundaries and exceed expectations with every project. True craft lives in the details — so we approach each brief with a meticulous eye and a commitment to producing work that is genuinely extraordinary, every single time.",
    col: "right",
  },
];

// ─── Sub-component — each item owns its ref ──────────────────

const Item = ({ value, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <ValueItem
      ref={ref}
      className={value.col}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: value.col === "right" ? 0.15 : 0 }}
    >
      <ValueNum>{value.num}</ValueNum>
      <ValueTitle>{value.title}</ValueTitle>
      <ValueText>{value.text}</ValueText>
    </ValueItem>
  );
};

// ─── Component ────────────────────────────────────────────────

const StudioValues = () => {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.3 });

  return (
    <Wrapper>
      <TopLabel
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>How we work</span>
      </TopLabel>

      <Intro
        ref={introRef}
        initial={{ opacity: 0, y: 28 }}
        animate={introInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        We believe that all great things are achieved by those willing
        to put in passion, courage, and craftsmanship.
      </Intro>

      <ValuesGrid>
        {VALUES.map((value, i) => (
          <Item key={i} value={value} index={i} />
        ))}
      </ValuesGrid>
    </Wrapper>
  );
};

export default StudioValues;