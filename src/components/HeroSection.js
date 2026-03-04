import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// --- STYLED COMPONENTS ---

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif;
  overflow: hidden;
  background-color: #000;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  /* Dark overlay for text contrast */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainContent = styled.div`
  padding: 18vh 5% 0 5%;
  position: relative;
  z-index: 2;
  max-width: 900px;
`;

const Headline = styled.h1`
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  font-weight: 400;
  line-height: 1.3;
  margin: 0;
  letter-spacing: -0.01em;
  color: #fff;
  text-transform: none;
`;

// Bottom navigation
const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 5% 40px 5%;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
  gap: 30px;
`;

const LeftNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    position: relative;
    padding-bottom: 4px;
    width: fit-content;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #fff;
      transition: transform 0.3s ease;
      transform-origin: right;
    }

    &:hover::after {
      transform: scaleX(0);
      transform-origin: left;
    }
  }
`;

const RightNav = styled.div`
  display: flex;
  gap: 60px;
  font-size: 1rem;
  line-height: 1.8;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    text-align: right;
  }
`;

const NavCol = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: #fff;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.6;
    }
  }
`;

// --- MAIN COMPONENT ---

const HeroSection = () => {
  return (
    <HeroContainer>
      <Background>
        <img
          src="https://images.unsplash.com/photo-1516483638261-f40af5aa3161?auto=format&fit=crop&q=80&w=2000"
          alt="Cinematic landscape"
        />
      </Background>

      <MainContent>
        <Headline>
          We help experience-driven companies thrive<br />
          by making their audience feel the refined<br />
          intricacies of their brand and product in the<br />
          digital space. Unforgettable journeys start<br />
          with a click.
        </Headline>
      </MainContent>

      <BottomNav>
        {/* Left side: Work + email */}
        <LeftNav>
          <Link to="/work">Work</Link>
          <a href="mailto:hello@exoape.com">hello@exoape.com</a>
        </LeftNav>

        {/* Right side: two columns with Studio, phone, The Studio, News, Contact */}
        <RightNav>
          <NavCol>
            <Link to="/studio">Studio</Link>
            <a href="tel:+31772086200">+31772086200</a>
          </NavCol>
          <NavCol>
            <Link to="/the-studio">The Studio</Link>
            <Link to="/news">News</Link>
            <Link to="/contact">Contact</Link>
          </NavCol>
        </RightNav>
      </BottomNav>
    </HeroContainer>
  );
};

export default HeroSection;