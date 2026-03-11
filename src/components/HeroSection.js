import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 1. Importing your local image asset
import heroBg from '../assets/image/herosec.jpg';

// --- STYLED COMPONENTS ---

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12vh 5% 8vh 5%; 
  color: #fff;
  font-family: "PP Neue Montreal", sans-serif;
  overflow: hidden;
  background-color: #111;
  box-sizing: border-box;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  /* Premium cinematic overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom, 
      rgba(0, 0, 0, 0.4) 0%, 
      rgba(0, 0, 0, 0.1) 50%, 
      rgba(0, 0, 0, 0.6) 100%
    );
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainTextWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 500px;
`;

const Headline = styled.h1`
  /* Reduced and neatened typography */
  font-size: clamp(1.4rem, 2.2vw, 1.8rem); 
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  color: #fff;
  letter-spacing: -0.01em;
`;

const Footer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;
`;

const BottomLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }
`;

const BottomRight = styled.div`
  display: flex;
  gap: 150px; /* Spaced navigation columns */

  @media (max-width: 900px) {
    gap: 60px;
  }
`;

const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 400;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

// --- MAIN COMPONENT ---

const HeroSection = () => {
  return (
    <HeroContainer>
      <Background>
        {/* Using your local asset */}
        <img src={heroBg} alt="Mpange Cinematic Backdrop" />
      </Background>

      <MainTextWrapper>
        <Headline>
          We help experience-driven companies thrive by making their audience 
          feel the refined intricacies of their brand and product.
        </Headline>
      </MainTextWrapper>

      <Footer>
        <BottomLeft>
          <Link to="/studio">The Studio</Link>
        </BottomLeft>

        <BottomRight>
          <NavCol>
            <Link to="/work">Work</Link>
            <Link to="/studio">Studio</Link>
            <Link to="/news">News</Link>
            <Link to="/contact">Contact</Link>
          </NavCol>

          <NavCol>
            <a href="mailto:hello@exoape.com">hello@mpange.com</a>
            {/* Using your specific phone number */}
            <a href="tel:+260972276257">+260 972 276 257</a>
          </NavCol>
        </BottomRight>
      </Footer>
    </HeroContainer>
  );
};

export default HeroSection;