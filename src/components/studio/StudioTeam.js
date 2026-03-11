import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import img1 from "../../assets/image/3.jpg";
import img2 from "../../assets/image/woman-with-flowers-face-hand.jpg";

const Wrapper = styled.section`
  background: #0a0a0a;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const TitleBlock = styled.div`
  position: relative;
  padding: 14vh 6% 12vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 10vh 6% 8vh;
  }
`;

const SideLabel = styled(motion.div)`
  position: absolute;
  bottom: 14vh;
  left: 6%;
  display: flex;
  align-items: center;
  gap: 8px;

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

  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    left: auto;
    margin-bottom: 4vh;
  }
`;

const BigTitle = styled(motion.h2)`
  font-size: clamp(3.2rem, 11vw, 14rem);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: #f0ede8;
  margin: 0;
  text-align: right;
  text-transform: none;
  max-width: 80%;

  em {
    font-family: 'PP Editorial Old', serif;
    font-style: italic;
    font-weight: 400;
    color: rgba(240,237,232,0.35);
  }

  @media (max-width: 768px) {
    text-align: left;
    max-width: 100%;
    font-size: clamp(2.8rem, 14vw, 5rem);
  }
`;

const ContentBlock = styled.div`
  padding: 4vh 6% 16vh;
  position: relative;

  @media (max-width: 768px) {
    padding: 4vh 6% 10vh;
  }
`;

const BodyText = styled(motion.p)`
  font-size: clamp(1.1rem, 2.4vw, 2.2rem);
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.02em;
  color: rgba(255,255,255,0.88);
  text-transform: none;
  margin: 0 0 10vh auto;
  max-width: 580px;

  @media (max-width: 768px) {
    margin: 0 0 6vh 0;
    max-width: 100%;
  }
`;

const ImagesRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2vw;
  align-items: end;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const ImgWrap = styled(motion.div)`
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover img { transform: scale(1.04); }

  &.left {
    margin-top: 14vh;
    img { height: 65vh; }

    @media (max-width: 600px) {
      margin-top: 0;
      img { height: 100vw; }
    }
  }

  &.right {
    img { height: 52vh; }

    @media (max-width: 600px) {
      img { height: 100vw; }
    }
  }
`;

const StudioTeam = () => {
  const bodyRef = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, amount: 0.25 });

  return (
    <Wrapper>
      <TitleBlock>
        <SideLabel
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <span>The Team</span>
        </SideLabel>

        <BigTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Creative &<br />
          Visual<br />
          <em>Enthusiasts</em>
        </BigTitle>
      </TitleBlock>

      <ContentBlock ref={bodyRef}>
        <BodyText
          initial={{ opacity: 0, y: 30 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          We are a studio of like-minded creatives and visual
          storytellers who explore the space between art and
          strategy with grit and intention. Intrigued by beauty,
          driven by craft, and fuelled by an everlasting devotion
          to work that moves people.
        </BodyText>

        <ImagesRow>
          <ImgWrap
            className="left"
            initial={{ opacity: 0, y: 60 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <img src={img1} alt="Team at work" />
          </ImgWrap>

          <ImgWrap
            className="right"
            initial={{ opacity: 0, y: 40 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          >
            <img src={img2} alt="Creative detail" />
          </ImgWrap>
        </ImagesRow>
      </ContentBlock>
    </Wrapper>
  );
};

export default StudioTeam;