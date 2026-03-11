import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// --- Project Data ---
const PROJECTS = [
  {
    id: 'p1',
    title: 'Luminary\nBrand Film',
    category: 'Cinema & Film',
    year: '2024',
    tag: 'Motion Picture',
    description:
      'A full brand film for Luminary Agency — shot across three cities, blending documentary realism with cinematic visual language. Directed, shot, and edited in-house.',
    src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000',
    alt: 'Film camera on a cinema set',
    aspectRatio: '4/5',
    width: '100%',
  },
  {
    id: 'p2',
    title: 'Nour\nEditorial',
    category: 'Photography',
    year: '2024',
    tag: 'Visual Arts',
    description:
      'A high-fashion editorial campaign for Nour Studio, captured in natural light with minimal retouching. Twelve looks, one afternoon, zero wasted frames.',
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    alt: 'Photographer capturing a shot',
    aspectRatio: '4/3',
    width: '95%',
  },
  {
    id: 'p3',
    title: 'Velour\nWeb App',
    category: 'Web Development',
    year: '2023',
    tag: 'Digital Craft',
    description:
      'A scroll-driven product showcase for Velour — built with React and GSAP. Custom cursor, parallax imagery, and a checkout flow that reduced drop-off by 34%.',
    src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1000',
    alt: 'Web design on screen',
    aspectRatio: '1/1',
    width: '70%',
  },
  {
    id: 'p4',
    title: 'Kora\nMobile App',
    category: 'Mobile Apps',
    year: '2023',
    tag: 'Digital Product',
    description:
      'End-to-end design and development of Kora — a community finance app for the Zambian market. Launched on iOS and Android with 10k users in the first month.',
    src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    alt: 'Mobile app interface on a phone',
    aspectRatio: '3/4',
    width: '85%',
  },
  {
    id: 'p5',
    title: 'Soleil\nPortraits',
    category: 'Photography',
    year: '2023',
    tag: 'Visual Arts',
    description:
      'An ongoing portrait series exploring identity and light. Shot entirely on film, each subject was given full creative control over their representation.',
    src: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=2400',
    thumb: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=1000',
    alt: 'Editorial fashion photography shoot',
    aspectRatio: '2/3',
    width: '100%',
  },
];

// --- Grid Styles ---

const PageWrapper = styled.div`
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif;
  background-color: #ffffff;
  color: #000000;
  padding: 40px 5%;
  min-height: 100vh;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.div`
  font-size: clamp(8rem, 15vw, 15rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  margin: 0;
  line-height: 0.8;
  margin-bottom: 60px;
  color: #000;
`;

const ThumbWrapper = styled.div`
  width: ${(p) => p.width || '100%'};
  aspect-ratio: ${(p) => p.aspectRatio || 'auto'};
  margin-bottom: ${(p) => p.marginBottom || '120px'};
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover .thumb-overlay {
    opacity: 1;
  }
`;

const ThumbOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
  pointer-events: none;

  span {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #fff;
    font-family: 'Neue Haas Grotesk Display Pro', sans-serif;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 3px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 200px;

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const TextSection = styled.div`
  margin-bottom: 100px;
  max-width: 480px;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  margin-bottom: 30px;
  font-weight: 500;
`;

const GridDescription = styled.p`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
  color: #555;
  max-width: 300px;
`;

const BrowseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;
  padding-bottom: 100px;
  padding-right: 5%;
`;

const BrowseLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: 400;
  color: #000;
  text-decoration: none;
  cursor: pointer;

  span.text {
    border-bottom: 1px solid #000;
    padding-bottom: 2px;
    transition: border-width 0.2s ease;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    border-radius: 50px;
    background-color: transparent;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .arrow-svg {
    width: 14px;
    height: 14px;
    color: #fff;
    opacity: 0;
    transform: translateX(-15px);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover span.text { border-bottom: 2px solid #000; }
  &:hover .icon-container {
    width: 36px; height: 36px;
    background-color: #000; border-color: #000;
  }
  &:hover .arrow-svg { opacity: 1; transform: translateX(0); }
`;

// --- Lightbox Styles ---

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #080808;
  z-index: 1001;
`;

const FullscreenImage = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1002;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Scrim = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.12) 45%,
    rgba(0, 0, 0, 0.35) 100%
  );
  z-index: 1;
`;

const TextLayer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1003;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 6% 7vh;
  pointer-events: none;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const TagPill = styled.div`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 5px 14px;
  border-radius: 100px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.06);
`;

const YearTag = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
`;

const ProjectTitle = styled.h2`
  font-size: clamp(4rem, 10vw, 12rem);
  font-weight: 400;
  line-height: 0.88;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0 0 32px;
  white-space: pre-line;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  gap: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProjectDesc = styled.p`
  font-size: clamp(0.88rem, 1vw, 1rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  max-width: 360px;
  font-weight: 300;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif;
`;

const NavArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  pointer-events: all;
`;

const NavBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover:not(:disabled) {
    background: #fff;
    border-color: #fff;
    color: #000;
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const NavCount = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.3);
  min-width: 52px;
  text-align: center;
`;

// The elegant "Continue" pill that replaces → on the last slide
const ContinueBtn = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: none;
  border-radius: 100px;
  padding: 14px 24px 14px 18px;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif;
  transition: background 0.3s, transform 0.3s;

  .arrow-ring {
    width: 22px;
    height: 22px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
  }

  &:hover {
    background: #e8e8e8;
    transform: translateY(2px);
  }
`;

const CloseBtn = styled(motion.button)`
  position: fixed;
  top: 32px;
  right: 40px;
  z-index: 1010;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px 10px 14px;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif;
  transition: background 0.3s, color 0.3s;

  .x-ring {
    width: 22px;
    height: 22px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    transition: border-color 0.3s;
  }

  &:hover { background: rgba(255, 255, 255, 0.14); color: #fff; }
  &:hover .x-ring { border-color: rgba(255, 255, 255, 0.7); }
`;

const Strip = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1004;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px 6%;
  pointer-events: all;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
`;

const StripThumb = styled.button`
  width: ${(p) => (p.active ? '56px' : '36px')};
  height: 4px;
  border-radius: 2px;
  border: none;
  padding: 0;
  background: ${(p) => (p.active ? '#fff' : 'rgba(255,255,255,0.25)')};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover { background: rgba(255, 255, 255, 0.6); }
`;

// --- Lightbox Component ---
const Lightbox = ({ project, projectIndex, total, onClose, onNav }) => {
  const isLast = projectIndex === total - 1;

  return (
    <>
      {/* 1. Backdrop */}
      <Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* 2. Image — zooms from thumbnail origin via layoutId */}
      <FullscreenImage
        layoutId={`img-${project.id}`}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          key={project.id}
          src={project.src}
          alt={project.alt}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <Scrim
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </FullscreenImage>

      {/* 3. Text — fades in after image lands */}
      <TextLayer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <MetaRow>
          <TagPill>{project.tag}</TagPill>
          <YearTag>{project.year}</YearTag>
        </MetaRow>

        <ProjectTitle>{project.title}</ProjectTitle>

        <BottomRow>
          <ProjectDesc>{project.description}</ProjectDesc>

          <NavArea>
            <NavBtn
              onClick={() => onNav(projectIndex - 1)}
              disabled={projectIndex === 0}
            >
              ←
            </NavBtn>

            <NavCount>
              {String(projectIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </NavCount>

            {/* Last slide: swap → for Continue pill */}
            {!isLast ? (
              <NavBtn onClick={() => onNav(projectIndex + 1)}>→</NavBtn>
            ) : (
              <ContinueBtn
                onClick={() => onClose(true)}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="arrow-ring">↓</div>
                <span>Continue</span>
              </ContinueBtn>
            )}
          </NavArea>
        </BottomRow>
      </TextLayer>

      {/* 4. Close */}
      <CloseBtn
        onClick={() => onClose(false)}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <div className="x-ring">✕</div>
        <span>Close</span>
      </CloseBtn>

      {/* 5. Progress strip */}
      <Strip
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {PROJECTS.map((p, i) => (
          <StripThumb
            key={p.id}
            active={i === projectIndex}
            onClick={() => onNav(i)}
          />
        ))}
      </Strip>
    </>
  );
};

// --- Main WorkShowcase ---
const WorkShowcase = ({ nextSectionRef }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const open = (index) => {
    document.body.style.overflow = 'hidden';
    setActiveIndex(index);
  };

  // scrollNext = true when user clicks "Continue" on last slide
  const close = (scrollNext = false) => {
    document.body.style.overflow = '';
    setActiveIndex(null);
    if (scrollNext && nextSectionRef?.current) {
      setTimeout(() => {
        nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 400); // let lightbox close animation finish first
    }
  };

  const nav = (index) => {
    if (index >= 0 && index < PROJECTS.length) setActiveIndex(index);
  };

  const activeProject = activeIndex !== null ? PROJECTS[activeIndex] : null;

  return (
    <>
      <PageWrapper>
        <MainGrid>
          <LeftColumn>
            <PageTitle>Work</PageTitle>

            <ThumbWrapper aspectRatio="4/5" onClick={() => open(0)}>
              <motion.div layoutId={`img-${PROJECTS[0].id}`} style={{ width: '100%', height: '100%' }}>
                <img src={PROJECTS[0].thumb} alt={PROJECTS[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>
              <ThumbOverlay className="thumb-overlay"><span>View Project</span></ThumbOverlay>
            </ThumbWrapper>

            <ThumbWrapper aspectRatio="4/3" width="95%" onClick={() => open(1)}>
              <motion.div layoutId={`img-${PROJECTS[1].id}`} style={{ width: '100%', height: '100%' }}>
                <img src={PROJECTS[1].thumb} alt={PROJECTS[1].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>
              <ThumbOverlay className="thumb-overlay"><span>View Project</span></ThumbOverlay>
            </ThumbWrapper>

            <ThumbWrapper aspectRatio="1/1" width="70%" marginBottom="0" onClick={() => open(2)}>
              <motion.div layoutId={`img-${PROJECTS[2].id}`} style={{ width: '100%', height: '100%' }}>
                <img src={PROJECTS[2].thumb} alt={PROJECTS[2].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>
              <ThumbOverlay className="thumb-overlay"><span>View Project</span></ThumbOverlay>
            </ThumbWrapper>
          </LeftColumn>

          <RightColumn>
            <TextSection>
              <Subtitle>
                <span>✦</span> Mpange Creative Arts
              </Subtitle>
              <GridDescription>
                Merging visual storytelling with robust IT. We elevate brands through cinema, photography, and custom web & mobile apps.
              </GridDescription>
            </TextSection>

            <ThumbWrapper aspectRatio="3/4" width="85%" marginBottom="160px" onClick={() => open(3)}>
              <motion.div layoutId={`img-${PROJECTS[3].id}`} style={{ width: '100%', height: '100%' }}>
                <img src={PROJECTS[3].thumb} alt={PROJECTS[3].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>
              <ThumbOverlay className="thumb-overlay"><span>View Project</span></ThumbOverlay>
            </ThumbWrapper>

            <ThumbWrapper aspectRatio="2/3" width="100%" marginBottom="0" onClick={() => open(4)}>
              <motion.div layoutId={`img-${PROJECTS[4].id}`} style={{ width: '100%', height: '100%' }}>
                <img src={PROJECTS[4].thumb} alt={PROJECTS[4].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>
              <ThumbOverlay className="thumb-overlay"><span>View Project</span></ThumbOverlay>
            </ThumbWrapper>
          </RightColumn>
        </MainGrid>

        <BrowseWrapper>
          <BrowseLink href="/work">
            <div className="icon-container">
              <svg className="arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <span className="text">Browse all work</span>
          </BrowseLink>
        </BrowseWrapper>
      </PageWrapper>

      <AnimatePresence mode="wait">
        {activeProject && (
          <Lightbox
            key={activeProject.id}
            project={activeProject}
            projectIndex={activeIndex}
            total={PROJECTS.length}
            onClose={close}
            onNav={nav}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkShowcase;