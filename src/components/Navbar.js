import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// ── Import your logo ──────────────────────────────────────
import logoSrc from "../assets/logo.png";
import starSrc from "../assets/star.svg";

// --- Styled Components ---

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 0 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  transition: background 0.4s ease;
  background: ${(p) => (p.scrolled ? 'rgba(0,0,0,0.0)' : 'transparent')};
`;

const Logo = styled.div`
  a {
    display: flex;
    text-decoration: none;
  }

  img {
    height: 150px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Full nav links — visible before scroll
const NavLinks = styled(motion.div)`
  display: flex;
  gap: 1.5em;

  a {
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #fff;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Hamburger button — appears on scroll
const HamburgerBtn = styled(motion.button)`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const BurgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 16px;

  span {
    display: block;
    height: 1px;
    background: #fff;
    border-radius: 1px;
    transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: center;

    &:nth-child(1) {
      width: 100%;
      transform: ${(p) => p.open ? 'translateY(5px) rotate(45deg)' : 'none'};
    }
    &:nth-child(2) {
      width: 70%;
      opacity: ${(p) => p.open ? 0 : 1};
      transform: ${(p) => p.open ? 'scaleX(0)' : 'none'};
    }
    &:nth-child(3) {
      width: 100%;
      transform: ${(p) => p.open ? 'translateY(-5px) rotate(-45deg)' : 'none'};
    }
  }
`;

// Full-screen menu overlay
const MenuOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 99;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 8% 6vh;
  overflow: hidden;
`;

const MenuTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.25em 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuLogo = styled.div`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  img {
    height: 56px;
    width: auto;
    object-fit: contain;
    display: block;
  }
`;

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const MenuLinkItem = styled(motion.div)`
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.07);

  &:first-child {
    border-top: 1px solid rgba(255,255,255,0.07);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.2vh 0;
    text-decoration: none;
    color: #fff;
    font-size: clamp(2.8rem, 6vw, 6rem);
    font-weight: 400;
    letter-spacing: -0.03em;
    line-height: 1;
    font-family: 'PP Neue Montreal', sans-serif;
    transition: color 0.3s ease;

    .arrow {
      font-size: 1.5rem;
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity 0.3s, transform 0.3s;
    }

    &:hover {
      color: rgba(255,255,255,0.5);
    }

    &:hover .arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const MenuFooter = styled(motion.div)`
  position: absolute;
  bottom: 6vh;
  left: 8%;
  right: 8%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const FooterTag = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;

  a {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    transition: color 0.3s;

    &:hover { color: rgba(255,255,255,0.8); }
  }
`;

// --- Variants ---

const overlayVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkVariants = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: 0,
    transition: { delay: 0.15 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: (i) => ({
    y: '110%',
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

const LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
];

// --- Component ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Nav scrolled={scrolled}>
        <Logo>
          <Link to="/">
            <img src={logoSrc} alt="Mpange" />
          </Link>
        </Logo>

        <AnimatePresence>
          {!scrolled && (
            <NavLinks
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
            >
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to}>{l.label}</Link>
              ))}
            </NavLinks>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(scrolled || isMobile) && !menuOpen && (
            <HamburgerBtn
              onClick={() => setMenuOpen((o) => !o)}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3 }}
            >
              <BurgerIcon open={menuOpen}>
                <span />
                <span />
                <span />
              </BurgerIcon>
            </HamburgerBtn>
          )}
        </AnimatePresence>
      </Nav>

      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MenuTop>
              <MenuLogo>
                <Link to="/" onClick={closeMenu}>
                  <img src={logoSrc} alt="Mpange" />
                </Link>
              </MenuLogo>
              <HamburgerBtn onClick={closeMenu}>
                <BurgerIcon open={true}>
                  <span />
                  <span />
                  <span />
                </BurgerIcon>
              </HamburgerBtn>
            </MenuTop>

            <MenuLinks>
              {LINKS.map((l, i) => (
                <MenuLinkItem key={l.to}>
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link to={l.to} onClick={closeMenu}>
                      {l.label}
                      <span className="arrow">→</span>
                    </Link>
                  </motion.div>
                </MenuLinkItem>
              ))}
            </MenuLinks>

            <MenuFooter
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <FooterTag>
                <img src={starSrc} alt="" style={{ width: '36px', height: '36px', marginRight: '6px', verticalAlign: 'middle', opacity: 0.3 }} />
                Mpange Creative Arts
              </FooterTag>
              <FooterLinks>
                <Link to="/work" onClick={closeMenu}>Instagram</Link>
                <Link to="/work" onClick={closeMenu}>LinkedIn</Link>
                <Link to="/contact" onClick={closeMenu}>Get in touch</Link>
              </FooterLinks>
            </MenuFooter>
          </MenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;