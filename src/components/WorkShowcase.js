import React from 'react';
import styled from 'styled-components';
import ParallaxImage from './ParallaxImage';

// --- STYLED COMPONENTS ---

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

// Flexible container to handle the different sizes and shapes of your images
const DynamicImageContainer = styled.div`
  width: ${(props) => props.width || '100%'};
  aspect-ratio: ${(props) => props.aspectRatio || 'auto'};
  margin-bottom: ${(props) => props.marginBottom || '120px'};
  margin-left: ${(props) => props.marginLeft || '0'};
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 200px;
  
  @media (max-width: 900px) {
    padding-top: 0px;
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

// Updated to the small caps, tightly tracked agency style
const Description = styled.p`
  font-size: 0.85rem; 
  text-transform: uppercase; 
  letter-spacing: 0.08em; 
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
  color: #555; 
  max-width: 300px; 
`;

// --- BOTTOM BROWSE LINK ---
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

  /* The small ring that expands into a black circle */
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

  /* The arrow that slides in */
  .arrow-svg {
    width: 14px;
    height: 14px;
    color: #fff;
    opacity: 0;
    transform: translateX(-15px);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* The hover animation magic */
  &:hover {
    span.text {
      border-bottom: 2px solid #000;
    }
    
    .icon-container {
      width: 36px;
      height: 36px;
      background-color: #000;
      border-color: #000;
    }

    .arrow-svg {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// --- COMPONENT ---

const WorkShowcase = () => {
  return (
    <PageWrapper>
      <MainGrid>
        
        {/* LEFT PANEL */}
        <LeftColumn>
          <PageTitle>Work</PageTitle>
          
          {/* 1. Main Face Image */}
          <DynamicImageContainer aspectRatio="4/5">
             <ParallaxImage 
               src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000" 
               alt="Portrait of a woman" 
             />
          </DynamicImageContainer>

          {/* 2. Dark Shoulder Image */}
          <DynamicImageContainer aspectRatio="4/3" width="95%">
             <ParallaxImage 
               src="https://images.unsplash.com/photo-1506643171804-0985c490bc8e?auto=format&fit=crop&q=80&w=1000" 
               alt="Dark skin shoulder profile" 
             />
          </DynamicImageContainer>

          {/* 3. Modern House Image */}
          <DynamicImageContainer aspectRatio="1/1" width="70%" marginBottom="0">
             <ParallaxImage 
               src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000" 
               alt="Modern black house exterior" 
             />
          </DynamicImageContainer>
        </LeftColumn>

        {/* RIGHT PANEL */}
        <RightColumn>
          <TextSection>
            <Subtitle>
              <span>✦</span> Mpange Creative Arts
            </Subtitle>
            {/* Updated concise text */}
            <Description>
              Merging visual storytelling with robust IT. We elevate brands through cinema, photography, and custom web & mobile apps.
            </Description>
          </TextSection>
          
          {/* 4. Blue Profile Image */}
          <DynamicImageContainer aspectRatio="3/4" width="85%" marginBottom="160px">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
              alt="Abstract lighting profile" 
            />
          </DynamicImageContainer>

          {/* 5. Massive Torch Painting */}
          <DynamicImageContainer aspectRatio="2/3" width="100%" marginBottom="0">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&q=80&w=1000" 
              alt="Classical painting of woman holding torch" 
            />
          </DynamicImageContainer>
        </RightColumn>

      </MainGrid>

      {/* BOTTOM BROWSE LINK */}
      <BrowseWrapper>
        <BrowseLink href="/work">
          <div className="icon-container">
            <svg 
              className="arrow-svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <span className="text">Browse all work</span>
        </BrowseLink>
      </BrowseWrapper>

    </PageWrapper>
  );
};

export default WorkShowcase;