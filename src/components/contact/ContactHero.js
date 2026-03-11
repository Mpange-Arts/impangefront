import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import heroBg from "../../assets/image/2.jpg";

// ─── Styled ───────────────────────────────────────────────────

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  font-family: 'PP Neue Montreal', sans-serif;
`;

// Full-bleed background
const BgImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    display: block;
    filter: brightness(0.55);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.3) 0%,
      transparent 40%,
      rgba(0,0,0,0.72) 100%
    );
  }
`;

// Hero content — bottom left
const HeroContent = styled.div`
  position: absolute;
  bottom: 10vh;
  left: 6%;
  z-index: 2;
`;

const EyebrowLabel = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 3vh;

  &::before {
    content: '✦';
    font-size: 0.6rem;
    color: rgba(255,255,255,0.4);
  }

  span {
    font-size: 0.62rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    font-weight: 300;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 9vw, 11rem);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0 0 5vh;
  text-transform: none;

  em {
    font-family: 'PP Editorial Old', serif;
    font-style: italic;
    font-weight: 400;
    color: rgba(255,255,255,0.4);
  }
`;

const StartBtn = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  color: #0a0a0a;
  border: none;
  border-radius: 100px;
  padding: 16px 32px;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  font-family: 'PP Neue Montreal', sans-serif;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #f0ede8;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

// Bottom right — contact details
const ContactInfo = styled(motion.div)`
  position: absolute;
  bottom: 10vh;
  right: 6%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
`;

const InfoLine = styled.a`
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  text-transform: none;
  transition: color 0.3s ease;

  &:hover { color: rgba(255,255,255,0.85); }
`;

// ── Form overlay ──────────────────────────────────────────────

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: stretch;
  pointer-events: none;
`;

const OverlayScrim = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  pointer-events: all;
  cursor: pointer;
`;

const FormPanel = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(580px, 100vw);
  background: #f5f5f3;
  overflow-y: auto;
  pointer-events: all;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8vh 6% 4vh;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  position: sticky;
  top: 0;
  background: #f5f5f3;
  z-index: 1;
`;

const FormTitle = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #1a1a1a;
  margin: 0;
  line-height: 1;

  em {
    font-family: 'PP Editorial Old', serif;
    font-style: italic;
    font-weight: 400;
    color: rgba(0,0,0,0.28);
  }
`;

const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.12);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(0,0,0,0.5);
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 4px;
  transition: background 0.25s ease, color 0.25s ease;

  &:hover {
    background: #1a1a1a;
    color: #fff;
  }
`;

const FormBody = styled.div`
  padding: 5vh 6% 8vh;
  display: flex;
  flex-direction: column;
  gap: 3.5vh;
  flex: 1;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
  font-weight: 400;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.14);
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 400;
  color: #1a1a1a;
  font-family: 'PP Neue Montreal', sans-serif;
  outline: none;
  transition: border-color 0.25s ease;
  text-transform: none;

  &::placeholder { color: rgba(0,0,0,0.22); }
  &:focus { border-color: rgba(0,0,0,0.5); }
`;

const Textarea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.14);
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 400;
  color: #1a1a1a;
  font-family: 'PP Neue Montreal', sans-serif;
  outline: none;
  resize: none;
  min-height: 100px;
  transition: border-color 0.25s ease;
  text-transform: none;

  &::placeholder { color: rgba(0,0,0,0.22); }
  &:focus { border-color: rgba(0,0,0,0.5); }
`;

// Project type pills
const TypeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TypePill = styled.button`
  padding: 8px 18px;
  border-radius: 100px;
  border: 1px solid ${p => p.$active ? "#1a1a1a" : "rgba(0,0,0,0.14)"};
  background: ${p => p.$active ? "#1a1a1a" : "transparent"};
  color: ${p => p.$active ? "#fff" : "rgba(0,0,0,0.5)"};
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  cursor: pointer;
  font-family: 'PP Neue Montreal', sans-serif;
  transition: all 0.25s ease;
  text-transform: none;

  &:hover {
    border-color: #1a1a1a;
    color: ${p => p.$active ? "#fff" : "#1a1a1a"};
  }
`;

// Budget options
const BudgetGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const BudgetPill = styled(TypePill)``;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 18px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  cursor: pointer;
  font-family: 'PP Neue Montreal', sans-serif;
  margin-top: 2vh;
  transition: background 0.3s ease;

  &:hover { background: #333; }
`;

// ── Success state ─────────────────────────────────────────────

const SuccessWrap = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8vh 6%;
  text-align: center;
  gap: 16px;
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const SuccessTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #1a1a1a;
  margin: 0;
`;

const SuccessText = styled.p`
  font-size: 0.88rem;
  line-height: 1.72;
  color: rgba(0,0,0,0.42);
  font-weight: 300;
  margin: 0;
  max-width: 320px;
  text-transform: none;
`;

// ─── Data ─────────────────────────────────────────────────────

const PROJECT_TYPES = [
  "Brand Identity", "Film & Photography", "Digital Experience",
  "Motion Design", "Campaign", "Other",
];

const BUDGETS = [
  "Under $5k", "$5k – $15k", "$15k – $30k", "$30k – $60k", "$60k+",
];

// ─── Component ────────────────────────────────────────────────

const ContactHero = () => {
  const [open, setOpen]         = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget]     = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Wrapper>
        <BgImage>
          <img src={heroBg} alt="Contact Mpange" />
        </BgImage>

        {/* ── Hero text — bottom left ─────────────────────── */}
        <HeroContent>
          <EyebrowLabel
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <span>Get in touch</span>
          </EyebrowLabel>

          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Let's make<br />
            something<br />
            <em>great</em>
          </HeroTitle>

          <StartBtn
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a project
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </StartBtn>
        </HeroContent>

        {/* ── Contact info — bottom right ─────────────────── */}
        <ContactInfo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <InfoLine href="mailto:hello@mpange.com">hello@mpange.com</InfoLine>
          <InfoLine href="tel:+260 972276257">+260 972276257</InfoLine>
          <InfoLine href="https://web.facebook.com/profile.php?id=100063714974128" target="_blank" rel="noopener noreferrer">Facebook</InfoLine>
          <InfoLine href="https://www.instagram.com/mpange/" target="_blank" rel="noopener noreferrer">Instagram</InfoLine>
          <InfoLine href="https://www.linkedin.com/company/mpange" target="_blank" rel="noopener noreferrer">LinkedIn</InfoLine>
        </ContactInfo>
      </Wrapper>

      {/* ── Form overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <Overlay
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OverlayScrim onClick={() => setOpen(false)} />

            <FormPanel
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <FormHeader>
                <FormTitle>
                  Tell us<br />about your <em>project</em>
                </FormTitle>
                <CloseBtn onClick={() => setOpen(false)}>✕</CloseBtn>
              </FormHeader>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessWrap
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SuccessIcon>✦</SuccessIcon>
                    <SuccessTitle>Message received</SuccessTitle>
                    <SuccessText>
                      Thank you for reaching out. We'll review your brief
                      and be in touch within 2 business days.
                    </SuccessText>
                  </SuccessWrap>
                ) : (
                  <FormBody
                    key="form"
                    as={motion.form}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Name */}
                    <FieldGroup>
                      <Label htmlFor="name">Your name</Label>
                      <Input id="name" type="text" placeholder="First & last name" required />
                    </FieldGroup>

                    {/* Email */}
                    <FieldGroup>
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" placeholder="you@company.com" required />
                    </FieldGroup>

                    {/* Project type */}
                    <FieldGroup>
                      <Label>Project type</Label>
                      <TypeGrid>
                        {PROJECT_TYPES.map(t => (
                          <TypePill
                            key={t}
                            type="button"
                            $active={projectType === t}
                            onClick={() => setProjectType(t)}
                          >
                            {t}
                          </TypePill>
                        ))}
                      </TypeGrid>
                    </FieldGroup>

                    {/* Budget */}
                    <FieldGroup>
                      <Label>Estimated budget</Label>
                      <BudgetGrid>
                        {BUDGETS.map(b => (
                          <BudgetPill
                            key={b}
                            type="button"
                            $active={budget === b}
                            onClick={() => setBudget(b)}
                          >
                            {b}
                          </BudgetPill>
                        ))}
                      </BudgetGrid>
                    </FieldGroup>

                    {/* Brief */}
                    <FieldGroup>
                      <Label htmlFor="brief">Tell us about your project</Label>
                      <Textarea
                        id="brief"
                        placeholder="Share your vision, goals, and any relevant details..."
                        rows={5}
                        required
                      />
                    </FieldGroup>

                    <SubmitBtn
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Send brief →
                    </SubmitBtn>
                  </FormBody>
                )}
              </AnimatePresence>
            </FormPanel>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactHero;