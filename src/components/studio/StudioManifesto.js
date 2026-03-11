import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";

// ─── Styled ───────────────────────────────────────────────────

const Wrapper = styled.section`
  background: #f5f5f3;
  padding: 14vh 6% 16vh;
  font-family: 'PP Neue Montreal', sans-serif;
`;

// ── Giant headline ────────────────────────────────────────────

const Headline = styled(motion.h2)`
  font-size: clamp(4rem, 13vw, 15rem);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: #111;
  margin: 0 0 14vh;
  text-transform: none;

  /* Second and third lines indent right like the reference */
  span.indent {
    display: block;
    padding-left: 18%;

    @media (max-width: 768px) {
      padding-left: 0;
    }
  }

  em {
    font-family: 'PP Editorial Old', serif;
    font-style: italic;
    font-weight: 400;
    color: rgba(0,0,0,0.35);
  }
`;

// ── Lower body ────────────────────────────────────────────────

const Body = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 6vw;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 4vw;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 5vh;
  }
`;

const SideLabel = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding-top: 6px;

  &::before {
    content: '+';
    font-size: 0.75rem;
    color: rgba(0,0,0,0.35);
    line-height: 1;
    margin-top: 1px;
  }

  span {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.4);
    font-weight: 300;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const BodyText = styled(motion.p)`
  font-size: clamp(1rem, 1.8vw, 1.5rem);
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.01em;
  color: #1a1a1a;
  margin: 0;
  text-transform: none;
  max-width: 560px;
`;

const QuoteWrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 4px;
  border-top: 1px solid rgba(0,0,0,0.12);
  max-width: 300px;
  align-self: flex-end;
  justify-self: end;

  @media (max-width: 600px) {
    justify-self: start;
  }
`;

const QuoteText = styled.p`
  font-size: 0.8rem;
  line-height: 1.7;
  color: rgba(0,0,0,0.45);
  font-weight: 300;
  text-transform: none;
  margin: 0;
  letter-spacing: 0.01em;
`;

// ─── Component ────────────────────────────────────────────────

const StudioManifesto = () => {
  const bodyRef = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, amount: 0.3 });

  return (
    <Wrapper>

      {/* Giant headline — staggered lines */}
      <Headline
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        Craft
        <span className="indent">Informs,</span>
        <span className="indent">— <em>Emotion</em></span>
        <span className="indent">Converts</span>
      </Headline>

      {/* Label + body + quote */}
      <Body ref={bodyRef}>
        <SideLabel
          initial={{ opacity: 0, x: -12 }}
          animate={bodyInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>What we believe</span>
        </SideLabel>

        <BodyText
          initial={{ opacity: 0, y: 24 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          We believe the most enduring work happens when strategic
          thinking meets emotional storytelling. When a brand makes
          people feel something — that is when it truly converts.
          Leading to deeper loyalty, longer relationships, and creative
          work that outlasts the moment it was made in.
        </BodyText>

        <QuoteWrap
          initial={{ opacity: 0, y: 16 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <QuoteText>
            "Our work is informed by research and strategy, but at the
            end of the day we focus on making people feel something
            they won't forget."
          </QuoteText>
        </QuoteWrap>
      </Body>

    </Wrapper>
  );
};

export default StudioManifesto;