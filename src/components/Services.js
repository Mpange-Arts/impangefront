import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Data ---
const SERVICES = [
  {
    id: '01',
    title: 'Cinema\n& Film',
    tag: 'Motion Picture',
    description: 'From concept to final cut — cinematic stories that move audiences.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '02',
    title: 'Photo-\ngraphy',
    tag: 'Visual Arts',
    description: 'Still moments with lasting impact. Editorial and commercial work.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '03',
    title: 'Web\nDev',
    tag: 'Digital Craft',
    description: 'Performant, beautiful digital experiences built with precision.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '04',
    title: 'Mobile\nApps',
    tag: 'Digital Product',
    description: 'Native applications designed for real people. Clean. Fast. Alive.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '05',
    title: 'Motion\nGraphics',
    tag: 'Animation',
    description: 'Dynamic visuals that breathe life into brands. From logo reveals to full explainer animations.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '06',
    title: 'Graphic\nDesign',
    tag: 'Visual Identity',
    description: 'Logos, brand systems, and print collateral crafted with intention and precision.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '07',
    title: 'Digital\nMarketing',
    tag: 'Growth',
    description: 'Strategy-led campaigns that connect with real audiences and drive measurable results.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: '08',
    title: 'Consul-\ntance',
    tag: 'Strategy',
    description: 'Senior-level creative and technology guidance to help your business move with clarity.',
    link: '/work',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2400',
  },
];

// --- Styled Components ---

const Wrapper = styled.section`
  font-family: 'PP Neue Montreal', 'Helvetica Neue', sans-serif;
  background: #000;
`;

const ScrollContainer = styled.div`
  position: relative;
  height: ${SERVICES.length * 100}vh;
`;

const StickyStage = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const FullImage = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Scrim = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
`;

/* ← increased top padding so 01 — Services clears the navbar */
const ContentLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 14vh 6% 6vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

/* ← bigger font, pinned to top of its row, nudged down slightly */
const ServiceNumber = styled(motion.span)`
  font-size: 1rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  align-self: flex-start;
  margin-top: 2vh;
`;

const TagPill = styled(motion.div)`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 16px;
  border-radius: 100px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.06);
`;

const BottomBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const BigTitle = styled(motion.h2)`
  font-size: clamp(5rem, 12vw, 14rem);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0;
  white-space: pre-line;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-bottom: 6px;
`;

const Description = styled(motion.p)`
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 320px;
  font-weight: 300;
  letter-spacing: 0.01em;
`;

const WorkLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  width: fit-content;

  .line {
    width: 32px;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      background 0.4s ease;
  }

  span {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  &:hover .line {
    width: 56px;
    background: #fff;
  }

  &:hover span {
    opacity: 1;
  }
`;

const ScrollHint = styled(motion.div)`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent);
`;

const ScrollText = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

const Counter = styled.div`
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
`;

const CounterCurrent = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3rem;
  overflow: hidden;
`;

const CounterDivider = styled.div`
  width: 24px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin-left: auto;
`;

const CounterTotal = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.08em;
`;

// --- CounterItem ---
const CounterItem = ({ index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const fadeDur = Math.min(0.08, (end - start) / 4);

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeDur, end - fadeDur, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, start + fadeDur, end - fadeDur, end],
    ['100%', '0%', '0%', '-100%']
  );

  return (
    <motion.span
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: '2.5rem',
        fontWeight: 300,
        color: 'rgba(255,255,255,0.9)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        opacity,
        y,
      }}
    >
      {String(index + 1).padStart(2, '0')}
    </motion.span>
  );
};

// --- Service Panel ---
const ServicePanel = ({ service, index, totalCards, scrollYProgress }) => {
  const start = index / totalCards;
  const end = (index + 1) / totalCards;
  const fadeDur = Math.min(0.08, (end - start) / 4);
  const innerFade = Math.min(fadeDur + 0.02, (end - start) / 3);

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeDur, end - fadeDur, end],
    [0, 1, 1, 0]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [start, end],
    [1.06, 1.0]
  );

  const titleY = useTransform(
    scrollYProgress,
    [start, end],
    ['18px', '-18px']
  );

  const descY = useTransform(
    scrollYProgress,
    [start, end],
    ['12px', '-12px']
  );

  const elementsOpacity = useTransform(
    scrollYProgress,
    [start, start + innerFade, end - innerFade, end],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: opacity === 0 ? 'none' : 'auto',
      }}
    >
      <FullImage
        src={service.image}
        alt={service.title}
        loading={index === 0 ? 'eager' : 'lazy'}
        style={{ scale: imageScale }}
      />

      <Scrim />

      <ContentLayer>
        <TopBar>
          <ServiceNumber style={{ opacity: elementsOpacity }}>
            {service.id} — Services
          </ServiceNumber>
          <TagPill style={{ opacity: elementsOpacity }}>
            {service.tag}
          </TagPill>
        </TopBar>

        <BottomBar>
          <BigTitle style={{ y: titleY, opacity: elementsOpacity }}>
            {service.title}
          </BigTitle>

          <RightContent>
            <Description style={{ y: descY, opacity: elementsOpacity }}>
              {service.description}
            </Description>
            <WorkLink to={service.link}>
              <div className="line" />
              <span>See related work</span>
            </WorkLink>
          </RightContent>
        </BottomBar>
      </ContentLayer>

      {index === 0 && (
        <ScrollHint
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <ScrollLine
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
          <ScrollText>Scroll</ScrollText>
        </ScrollHint>
      )}
    </motion.div>
  );
};

// --- Main Component ---
const Services = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <Wrapper>
      <ScrollContainer ref={containerRef}>
        <StickyStage>

          {SERVICES.map((service, index) => (
            <ServicePanel
              key={service.id}
              service={service}
              index={index}
              totalCards={SERVICES.length}
              scrollYProgress={scrollYProgress}
            />
          ))}

          <Counter>
            <CounterCurrent>
              {SERVICES.map((s, i) => (
                <CounterItem
                  key={s.id}
                  index={i}
                  total={SERVICES.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </CounterCurrent>
            <CounterDivider />
            <CounterTotal>
              {String(SERVICES.length).padStart(2, '0')}
            </CounterTotal>
          </Counter>

        </StickyStage>
      </ScrollContainer>
    </Wrapper>
  );
};

export default Services;