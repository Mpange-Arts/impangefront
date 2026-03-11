import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import starSrc from '../assets/star.svg';
import logoSrc from '../assets/logo.png';

// ─── Reusable star image ─────────────────────────────────────
const Star = () => (
  <img
    src={starSrc}
    alt=""
    style={{ width: '20px', height: '20px', display: 'inline-block', verticalAlign: 'middle', opacity: 0.5 }}
  />
);

// ─── CTA Section ────────────────────────────────────────────────

const CTAWrapper = styled.section`
  background: #0a0a0a;
  font-family: 'PP Neue Montreal', sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CTALeft = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8vh 8% 8vh;
  background: #0d0d0d;
`;

const GhostText = styled.span`
  position: absolute;
  bottom: 4%;
  left: -2%;
  font-size: clamp(6rem, 18vw, 20rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  color: rgba(255, 255, 255, 0.03);
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
`;

const PhoneShell = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 260px;
  height: 520px;
  background: #111;
  border-radius: 44px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 60px 120px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.04),
    inset 0 0 0 2px rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: rotate(-5deg);
`;

const SideBtn = styled.div`
  position: absolute;
  right: -3px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;

  &.vol-up  { top: 100px; width: 3px; height: 36px; }
  &.vol-down { top: 148px; width: 3px; height: 36px; }
  &.power   { left: -3px; top: 120px; width: 3px; height: 52px; }
`;

const DynamicIsland = styled.div`
  width: 100px;
  height: 30px;
  background: #000;
  border-radius: 0 0 20px 20px;
  margin: 0 auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  .camera {
    width: 8px; height: 8px; border-radius: 50%;
    background: #1a1a1a; border: 1px solid rgba(255,255,255,0.08);
  }
  .mic {
    width: 4px; height: 4px; border-radius: 50%; background: #1a1a1a;
  }
`;

const PhoneScreen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px 28px;
  background: linear-gradient(160deg, #0f0f0f 0%, #161616 100%);
`;

const CallTime = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  margin-top: 10px;
  margin-bottom: 20px;
`;

const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 0.15; }
  70%  { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
`;

const AvatarRing = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  margin-bottom: 20px;

  &::before, &::after {
    content: '';
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    animation: ${pulse} 2s ease-out infinite;
  }
  &::after { animation-delay: 0.6s; }
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #222 0%, #1a1a1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const CallerName = styled.span`
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
  text-transform: none;
  margin-bottom: 6px;
`;

const CallerLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

const wave = keyframes`
  0%, 100% { height: 4px; }
  50%       { height: 16px; }
`;

const WaveBars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 28px;

  span {
    display: block;
    width: 3px;
    height: 4px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    animation: ${wave} 1.2s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.45s; }
    &:nth-child(5) { animation-delay: 0.6s; }
    &:nth-child(6) { animation-delay: 0.45s; }
    &:nth-child(7) { animation-delay: 0.3s; }
    &:nth-child(8) { animation-delay: 0.15s; }
    &:nth-child(9) { animation-delay: 0s; }
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: auto;
`;

const ActionBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .circle {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: ${p => p.decline ? 'rgba(220,60,60,0.18)' : 'rgba(255,255,255,0.07)'};
    border: 1px solid ${p => p.decline ? 'rgba(220,60,60,0.3)' : 'rgba(255,255,255,0.1)'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: ${p => p.decline ? 'rgba(220,60,60,0.28)' : 'rgba(255,255,255,0.12)'};
    }
  }

  .label {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.25);
  }
`;

const HomeBar = styled.div`
  width: 120px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  margin: 16px auto 0;
  flex-shrink: 0;
`;

const CTARight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10vh 10% 10vh 6%;
  border-left: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 8vh 6%;
  }
`;

const CTAEyebrow = styled(motion.span)`
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 3vh;
`;

const CTAHeadline = styled.h2`
  font-size: clamp(2.8rem, 5.5vw, 7rem);
  font-weight: 500;
  line-height: 0.92;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0 0 4vh;
`;

const CTAItalic = styled.em`
  font-family: 'PP Editorial Old', serif;
  font-style: italic;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
`;

const CTALine = styled(motion.span)`
  display: block;
`;

const CTADesc = styled(motion.p)`
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.4);
  max-width: 380px;
  text-transform: none;
  font-weight: 300;
  margin: 0 0 5vh;
  letter-spacing: 0.01em;
`;

const CTAActions = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  color: #000;
  text-decoration: none;
  padding: 16px 32px;
  border-radius: 4px;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'PP Neue Montreal', sans-serif;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.88);
    transform: translateY(-2px);
  }
`;

const CTASecondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: 'PP Neue Montreal', sans-serif;
  transition: color 0.3s ease;
  padding: 16px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

// ─── Footer ─────────────────────────────────────────────────────

const FooterWrapper = styled.footer`
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-family: 'PP Neue Montreal', sans-serif;
  padding: 10vh 6% 6vh;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 60px;
  padding-bottom: 10vh;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FooterLogo = styled(Link)`
  display: flex;
  text-decoration: none;

  img {
    height: 100px;
    width: auto;
    object-fit: contain;
    display: block;
  }
`;

const FooterTagline = styled.p`
  font-size: 0.85rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.35);
  max-width: 240px;
  text-transform: none;
  font-weight: 300;
  letter-spacing: 0.01em;
`;

const FooterBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 7px 14px;
  width: fit-content;
  margin-top: 4px;

  span:first-child {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
  }

  span:last-child {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FooterColTitle = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.22);
  margin-bottom: 4px;
`;

const FooterColLink = styled(Link)`
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0.01em;
  font-weight: 300;
  transition: color 0.25s ease;
  width: fit-content;

  &:hover { color: rgba(255, 255, 255, 0.9); }
`;

const FooterColA = styled.a`
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  text-transform: none;
  letter-spacing: 0.01em;
  font-weight: 300;
  transition: color 0.25s ease;
  width: fit-content;

  &:hover { color: rgba(255, 255, 255, 0.9); }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5vh;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterCopy = styled.span`
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.08em;
  text-transform: none;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 28px;

  a {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.2);
    text-decoration: none;
    text-transform: none;
    letter-spacing: 0.06em;
    transition: color 0.25s ease;

    &:hover { color: rgba(255, 255, 255, 0.55); }
  }
`;

const FooterMarqueeRow = styled.div`
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 2vh 0;
  margin: 8vh 0;
`;

const MarqueeTrack = styled(motion.div)`
  display: flex;
  gap: 80px;
  white-space: nowrap;
  width: max-content;
`;

const MarqueeItem = styled.span`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.07);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 80px;
`;

// ─── Animations ──────────────────────────────────────────────────

const clipUp = {
  hidden: { y: '105%' },
  visible: (i) => ({
    y: '0%',
    transition: { delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MARQUEE_ITEMS = [
  'Cinema', 'Photography', 'Web Dev', 'Motion Graphics',
  'Graphic Design', 'Digital Marketing', 'Consultancy', 'Mobile Apps',
];

// ─── CTA Component ───────────────────────────────────────────────

export const CallToAction = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <CTAWrapper ref={ref}>

      <CTALeft>
        <GhostText>Get In</GhostText>

        <PhoneShell
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SideBtn className="vol-up" />
          <SideBtn className="vol-down" />
          <SideBtn className="power" />

          <DynamicIsland>
            <div className="camera" />
            <div className="mic" />
          </DynamicIsland>

          <PhoneScreen>
            <CallTime>Incoming call</CallTime>

            <AvatarRing>
              <Avatar>
                <img
                  src={starSrc}
                  alt=""
                  style={{ width: '36px', height: '36px', opacity: 0.6 }}
                />
              </Avatar>
            </AvatarRing>

            <CallerName>Mpange Creative</CallerName>
            <CallerLabel>Let's talk...</CallerLabel>

            <WaveBars>
              <span /><span /><span /><span /><span />
              <span /><span /><span /><span />
            </WaveBars>

            <ActionRow>
              <ActionBtn decline>
                <div className="circle">✕</div>
                <span className="label">Decline</span>
              </ActionBtn>
              <ActionBtn>
                <div className="circle">↗</div>
                <span className="label">Accept</span>
              </ActionBtn>
            </ActionRow>
          </PhoneScreen>

          <HomeBar />
        </PhoneShell>
      </CTALeft>

      <CTARight>
        <CTAEyebrow
          variants={fadeUp} custom={0}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          <Star /> Contact Us
        </CTAEyebrow>

        <CTAHeadline>
          {['Get in', 'Touch'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <CTALine
                custom={i} variants={clipUp}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
              >
                {i === 1 ? <CTAItalic>{line}</CTAItalic> : line}
              </CTALine>
            </div>
          ))}
        </CTAHeadline>

        <CTADesc
          variants={fadeUp} custom={2}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          We are eager to hear from you about your next project. Any questions,
          ideas, or opportunities — we're ready to build something remarkable together.
        </CTADesc>

        <CTAActions
          variants={fadeUp} custom={3}
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
        >
          <CTAButton to="/contact">Send us a message</CTAButton>
          <CTASecondary to="/work">See our work →</CTASecondary>
        </CTAActions>
      </CTARight>

    </CTAWrapper>
  );
};

// ─── Footer Component ────────────────────────────────────────────

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterMarqueeRow>
        <MarqueeTrack
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <MarqueeItem key={i}>
              {item}
              <img
                src={starSrc}
                alt=""
                style={{ width: '36px', height: '36px', opacity: 0.2, verticalAlign: 'middle' }}
              />
            </MarqueeItem>
          ))}
        </MarqueeTrack>
      </FooterMarqueeRow>

      <FooterTop>
        <FooterBrand>
          <FooterLogo to="/"><img src={logoSrc} alt="Mpange" /></FooterLogo>
          <FooterTagline>
            A creative studio building cinematic brands, digital products, and bold visual identities.
          </FooterTagline>
          <FooterBadge>
            <span>Based in</span>
            <span>Lusaka, Zambia</span>
          </FooterBadge>
        </FooterBrand>

        <FooterCol>
          <FooterColTitle>Services</FooterColTitle>
          <FooterColLink to="/work">Cinema & Film</FooterColLink>
          <FooterColLink to="/work">Photography</FooterColLink>
          <FooterColLink to="/work">Web Development</FooterColLink>
          <FooterColLink to="/work">Mobile Apps</FooterColLink>
          <FooterColLink to="/work">Motion Graphics</FooterColLink>
          <FooterColLink to="/work">Graphic Design</FooterColLink>
        </FooterCol>

        <FooterCol>
          <FooterColTitle>Company</FooterColTitle>
          <FooterColLink to="/studio">Studio</FooterColLink>
          <FooterColLink to="/work">Work</FooterColLink>
          <FooterColLink to="/news">News</FooterColLink>
          <FooterColLink to="/contact">Contact</FooterColLink>
        </FooterCol>

        <FooterCol>
          <FooterColTitle>Connect</FooterColTitle>
          <FooterColA href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</FooterColA>
          <FooterColA href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</FooterColA>
          <FooterColA href="https://twitter.com" target="_blank" rel="noreferrer">X / Twitter</FooterColA>
          <FooterColA href="mailto:hello@mpange.com">hello@mpange.com</FooterColA>
        </FooterCol>
      </FooterTop>

      <FooterBottom>
        <FooterCopy>© {year} Mpange Creative Arts. All rights reserved.</FooterCopy>
        <FooterBottomLinks>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;