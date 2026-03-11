import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import img1 from "../../assets/image/3.jpg";
import img2 from "../../assets/image/1.jpg";
import img3 from "../../assets/image/woman-with-flowers-face-hand.jpg";

const Wrapper = styled.section`
  background: #f5f5f3;
  padding: 14vh 0 0;
  font-family: 'PP Neue Montreal', sans-serif;
  overflow: hidden;
`;

const ImageGrid = styled.div`
  position: relative;
  width: 100%;
  height: 680px;

  @media (max-width: 768px) {
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 220px 180px;
    gap: 8px;
    padding: 0 4%;
  }
`;

const ImgLeft = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 28%;
  height: 88%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover img { transform: scale(1.04); }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 100%;
    top: auto; left: auto;
    grid-column: 1;
    grid-row: 1 / 3;
  }
`;

const ImgCenter = styled(motion.div)`
  position: absolute;
  top: 14%;
  left: 38%;
  width: 38%;
  height: 72%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover img { transform: scale(1.04); }

  @media (max-width: 768px) {
    position: relative;
    top: auto; left: auto;
    width: 100%;
    height: 100%;
    grid-column: 2;
    grid-row: 1;
  }
`;

const ImgRight = styled(motion.div)`
  position: absolute;
  top: 52%;
  right: 0;
  width: 20%;
  height: 48%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover img { transform: scale(1.04); }

  @media (max-width: 768px) {
    position: relative;
    top: auto; right: auto;
    width: 100%;
    height: 100%;
    grid-column: 2;
    grid-row: 2;
  }
`;

const StatementWrap = styled.div`
  padding: 10vh 6% 14vh;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 6vw;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4vh;
    padding: 8vh 6% 10vh;
  }
`;

const SideLabel = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding-top: 10px;

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

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatementRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5vh;
`;

const Statement = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: #1a1a1a;
  margin: 0;
  text-transform: none;
  max-width: 820px;
`;

const Industries = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Industry = styled.span`
  display: block;
  font-size: 0.82rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  color: rgba(0,0,0,0.4);
  text-transform: none;
  line-height: 1.4;
`;

const INDUSTRIES = [
  "Brand Identity & Strategy",
  "Film Direction & Photography",
  "Digital Experience & Web",
  "Motion Design & Animation",
  "Campaign & Marketing",
];

const StudioAbout = () => {
  const wrapperRef    = useRef(null);
  const statementRef  = useRef(null);
  const statementInView = useInView(statementRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const yLeft   = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const yCenter = useTransform(scrollYProgress, [0, 1], ["0px", "-24px"]);
  const yRight  = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);

  return (
    <Wrapper id="studio-about" ref={wrapperRef}>
      <ImageGrid>
        <ImgLeft
          style={{ y: yLeft }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={img1} alt="Studio work" />
        </ImgLeft>

        <ImgCenter
          style={{ y: yCenter }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <img src={img2} alt="Studio session" />
        </ImgCenter>

        <ImgRight
          style={{ y: yRight }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        >
          <img src={img3} alt="Creative detail" />
        </ImgRight>
      </ImageGrid>

      <StatementWrap ref={statementRef}>
        <SideLabel
          initial={{ opacity: 0, x: -12 }}
          animate={statementInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <span>Partners</span>
        </SideLabel>

        <StatementRight>
          <Statement
            initial={{ opacity: 0, y: 30 }}
            animate={statementInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            We partner with brands and businesses that create
            exceptional experiences — beautiful, intentional,
            and built to endure.
          </Statement>

          <Industries
            initial={{ opacity: 0, y: 16 }}
            animate={statementInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {INDUSTRIES.map((item, i) => (
              <Industry key={i}>{item}</Industry>
            ))}
          </Industries>
        </StatementRight>
      </StatementWrap>
    </Wrapper>
  );
};

export default StudioAbout;