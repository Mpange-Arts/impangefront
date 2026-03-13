import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProductsAPI from '../api/products';

// --- Shimmer animation ---
const shimmer = keyframes`
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
`;

const SkeletonBox = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
  border-radius: 2px;
  width: ${(p) => p.width || '100%'};
  aspect-ratio: ${(p) => p.aspectRatio || 'auto'};
  margin-bottom: ${(p) => p.marginBottom || '120px'};
`;

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
  &:hover .thumb-overlay { opacity: 1; }
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 3px;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 200px;
  @media (max-width: 900px) { padding-top: 0; }
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
    width: 8px; height: 8px;
    border: 1px solid #000;
    border-radius: 50px;
    background-color: transparent;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .arrow-svg {
    width: 14px; height: 14px;
    color: #fff; opacity: 0;
    transform: translateX(-15px);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover span.text { border-bottom: 2px solid #000; }
  &:hover .icon-container { width: 36px; height: 36px; background-color: #000; border-color: #000; }
  &:hover .arrow-svg { opacity: 1; transform: translateX(0); }
`;

// --- Lightbox Styles ---
const Backdrop = styled(motion.div)`
  position: fixed; inset: 0; background: #080808; z-index: 1001;
`;

const FullscreenImage = styled(motion.div)`
  position: fixed; inset: 0; z-index: 1002; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

const Scrim = styled(motion.div)`
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.35) 100%);
  z-index: 1;
`;

const TextLayer = styled(motion.div)`
  position: fixed; inset: 0; z-index: 1003;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  padding: 0 6% 7vh;
  pointer-events: none;
`;

const MetaRow = styled.div`
  display: flex; align-items: center; gap: 16px; margin-bottom: 24px;
`;

const TagPill = styled.div`
  font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.14em;
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 5px 14px; border-radius: 100px;
  backdrop-filter: blur(6px);
  background: rgba(255,255,255,0.06);
`;

const YearTag = styled.span`
  font-size: 0.7rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(255,255,255,0.35);
`;

const ProjectTitle = styled.h2`
  font-size: clamp(4rem, 10vw, 12rem);
  font-weight: 400; line-height: 0.88;
  letter-spacing: -0.04em; color: #fff;
  margin: 0 0 32px; white-space: pre-line;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif;
`;

const BottomRow = styled.div`
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; gap: 60px;
  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 20px; }
`;

const ProjectDesc = styled.p`
  font-size: clamp(0.88rem, 1vw, 1rem);
  line-height: 1.75; color: rgba(255,255,255,0.6);
  margin: 0; max-width: 360px; font-weight: 300;
`;

const NavArea = styled.div`
  display: flex; align-items: center;
  justify-content: flex-end; gap: 12px;
  pointer-events: all;
`;

const NavBtn = styled.button`
  width: 52px; height: 52px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent; color: rgba(255,255,255,0.7);
  cursor: pointer; font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  &:hover:not(:disabled) { background: #fff; border-color: #fff; color: #000; }
  &:disabled { opacity: 0.2; cursor: not-allowed; }
`;

const NavCount = styled.span`
  font-size: 0.75rem; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.3);
  min-width: 52px; text-align: center;
`;

const ContinueBtn = styled(motion.button)`
  display: inline-flex; align-items: center; gap: 12px;
  background: #fff; border: none; border-radius: 100px;
  padding: 14px 24px 14px 18px;
  font-size: 0.72rem; letter-spacing: 0.16em;
  text-transform: uppercase; color: #000; cursor: pointer;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif;
  transition: background 0.3s, transform 0.3s;
  .arrow-ring {
    width: 22px; height: 22px;
    border: 1px solid rgba(0,0,0,0.15); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem;
  }
  &:hover { background: #e8e8e8; transform: translateY(2px); }
`;

const CloseBtn = styled(motion.button)`
  position: fixed; top: 32px; right: 40px; z-index: 1010;
  background: rgba(255,255,255,0.07); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15); border-radius: 100px;
  color: rgba(255,255,255,0.75); cursor: pointer;
  display: flex; align-items: center; gap: 10px;
  padding: 10px 20px 10px 14px;
  font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', sans-serif;
  transition: background 0.3s, color 0.3s;
  .x-ring {
    width: 22px; height: 22px;
    border: 1px solid rgba(255,255,255,0.25); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; transition: border-color 0.3s;
  }
  &:hover { background: rgba(255,255,255,0.14); color: #fff; }
  &:hover .x-ring { border-color: rgba(255,255,255,0.7); }
`;

const Strip = styled(motion.div)`
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 1004;
  display: flex; justify-content: center; gap: 10px; padding: 20px 6%;
  pointer-events: all;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
`;

const StripThumb = styled.button`
  width: ${(p) => (p.active ? '56px' : '36px')}; height: 4px;
  border-radius: 2px; border: none; padding: 0;
  background: ${(p) => (p.active ? '#fff' : 'rgba(255,255,255,0.25)')};
  cursor: pointer; transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  &:hover { background: rgba(255,255,255,0.6); }
`;

// Lazy image with blur-up
const LazyImage = ({ src, alt, style }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{
        ...style,
        transition: 'filter 0.6s ease',
        filter: loaded ? 'blur(0px)' : 'blur(8px)',
      }}
      onLoad={() => setLoaded(true)}
    />
  );
};

// --- Layout config ---
const LAYOUT = [
  { aspectRatio: '4/5', width: '100%', marginBottom: '120px', column: 'left'  },
  { aspectRatio: '4/3', width: '95%',  marginBottom: '120px', column: 'left'  },
  { aspectRatio: '1/1', width: '70%',  marginBottom: '0',     column: 'left'  },
  { aspectRatio: '3/4', width: '85%',  marginBottom: '160px', column: 'right' },
  { aspectRatio: '2/3', width: '100%', marginBottom: '0',     column: 'right' },
];

// --- Lightbox ---
const Lightbox = ({ project, projectIndex, total, projects, onClose, onNav }) => {
  const isLast = projectIndex === total - 1;
  return (
    <>
      <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
      <FullscreenImage layoutId={`img-${project.id}`} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <motion.img
          key={project.id}
          src={project.images?.[0]?.url}
          alt={project.title}
          initial={{ scale: 1.06 }} animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <Scrim initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} />
      </FullscreenImage>

      <TextLayer
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <MetaRow>
          <TagPill>{project.tags?.[0] || project.category}</TagPill>
          <YearTag>{project.tags?.[1] || ''}</YearTag>
        </MetaRow>
        <ProjectTitle>{project.title}</ProjectTitle>
        <BottomRow>
          <ProjectDesc>{project.description}</ProjectDesc>
          <NavArea>
            <NavBtn onClick={() => onNav(projectIndex - 1)} disabled={projectIndex === 0}>←</NavBtn>
            <NavCount>
              {String(projectIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </NavCount>
            {!isLast ? (
              <NavBtn onClick={() => onNav(projectIndex + 1)}>→</NavBtn>
            ) : (
              <ContinueBtn
                onClick={() => onClose(true)}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
              >
                <div className="arrow-ring">↓</div>
                <span>Continue</span>
              </ContinueBtn>
            )}
          </NavArea>
        </BottomRow>
      </TextLayer>

      <CloseBtn
        onClick={() => onClose(false)}
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <div className="x-ring">✕</div>
        <span>Close</span>
      </CloseBtn>

      <Strip initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.4 }}>
        {projects.map((_, i) => (
          <StripThumb key={i} active={i === projectIndex} onClick={() => onNav(i)} />
        ))}
      </Strip>
    </>
  );
};

// --- Main WorkShowcase ---
const WorkShowcase = ({ nextSectionRef }) => {
  const [projects, setProjects]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    ProductsAPI.getAll({ limit: 5, featured: true })
      .then((data) => setProjects(data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const open  = (i) => { document.body.style.overflow = 'hidden'; setActiveIndex(i); };
  const close = (scrollNext = false) => {
    document.body.style.overflow = '';
    setActiveIndex(null);
    if (scrollNext && nextSectionRef?.current) {
      setTimeout(() => nextSectionRef.current.scrollIntoView({ behavior: 'smooth' }), 400);
    }
  };
  const nav = (i) => { if (i >= 0 && i < projects.length) setActiveIndex(i); };

  // --- Skeleton loader ---
  if (loading) {
    return (
      <PageWrapper>
        <MainGrid>
          <LeftColumn>
            <PageTitle>Work</PageTitle>
            <SkeletonBox aspectRatio="4/5" width="100%"  marginBottom="120px" />
            <SkeletonBox aspectRatio="4/3" width="95%"   marginBottom="120px" />
            <SkeletonBox aspectRatio="1/1" width="70%"   marginBottom="0"     />
          </LeftColumn>
          <RightColumn>
            <TextSection>
              <Subtitle><span>✦</span> Mpange Creative Arts</Subtitle>
              <GridDescription>
                Merging visual storytelling with robust IT. We elevate brands through
                cinema, photography, and custom web & mobile apps.
              </GridDescription>
            </TextSection>
            <SkeletonBox aspectRatio="3/4" width="85%"   marginBottom="160px" />
            <SkeletonBox aspectRatio="2/3" width="100%"  marginBottom="0"     />
          </RightColumn>
        </MainGrid>
      </PageWrapper>
    );
  }

  const leftProjects  = projects.filter((_, i) => LAYOUT[i]?.column === 'left');
  const rightProjects = projects.filter((_, i) => LAYOUT[i]?.column === 'right');

  return (
    <>
      <PageWrapper>
        <MainGrid>
          <LeftColumn>
            <PageTitle>Work</PageTitle>
            {leftProjects.map((project, i) => {
              const layout = LAYOUT[i];
              return (
                <ThumbWrapper
                  key={project.id}
                  aspectRatio={layout.aspectRatio}
                  width={layout.width}
                  marginBottom={layout.marginBottom}
                  onClick={() => open(i)}
                >
                  <motion.div layoutId={`img-${project.id}`} style={{ width: '100%', height: '100%' }}>
                    <LazyImage
                      src={project.images?.[0]?.url}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </motion.div>
                  <ThumbOverlay className="thumb-overlay"><span>View Project</span></ThumbOverlay>
                </ThumbWrapper>
              );
            })}
          </LeftColumn>

          <RightColumn>
            <TextSection>
              <Subtitle><span>✦</span> Mpange Creative Arts</Subtitle>
              <GridDescription>
                Merging visual storytelling with robust IT. We elevate brands through
                cinema, photography, and custom web & mobile apps.
              </GridDescription>
            </TextSection>
            {rightProjects.map((project, i) => {
              const globalIndex = i + leftProjects.length;
              const layout = LAYOUT[globalIndex];
              return (
                <ThumbWrapper
                  key={project.id}
                  aspectRatio={layout?.aspectRatio}
                  width={layout?.width}
                  marginBottom={layout?.marginBottom || '0'}
                  onClick={() => open(globalIndex)}
                >
                  <motion.div layoutId={`img-${project.id}`} style={{ width: '100%', height: '100%' }}>
                    <LazyImage
                      src={project.images?.[0]?.url}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </motion.div>
                  <ThumbOverlay className="thumb-overlay"><span>View Project</span></ThumbOverlay>
                </ThumbWrapper>
              );
            })}
          </RightColumn>
        </MainGrid>

        <BrowseWrapper>
          <BrowseLink href="/work">
            <div className="icon-container">
              <svg className="arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <span className="text">Browse all work</span>
          </BrowseLink>
        </BrowseWrapper>
      </PageWrapper>

      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <Lightbox
            key={activeIndex}
            project={projects[activeIndex]}
            projectIndex={activeIndex}
            total={projects.length}
            projects={projects}
            onClose={close}
            onNav={nav}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkShowcase;