import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

const Wrapper = styled.div`
  background: #0a0a0a;
  min-height: 100vh;
  font-family: 'PP Neue Montreal', sans-serif;
`;

const Hero = styled.div`
  padding: 22vh 8% 10vh;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const Eyebrow = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  display: block;
  margin-bottom: 3vh;
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 9vw, 10rem);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: #fff;
  margin: 0 0 4vh;

  em {
    font-family: 'PP Editorial Old', serif;
    font-style: italic;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const LastUpdated = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.08em;
  text-transform: none;
`;

const Body = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: 10vh 8% 14vh;
  display: flex;
  flex-direction: column;
  gap: 6vh;
`;

const Section = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
  margin: 0;
`;

const SectionText = styled.p`
  font-size: 0.95rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.45);
  text-transform: none;
  font-weight: 300;
  margin: 0;
  letter-spacing: 0.01em;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
`;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    text: 'We collect information you provide directly to us, such as when you fill out a contact form, subscribe to updates, or reach out via email. This may include your name, email address, phone number, and any project details you share. We do not collect any personal data without your knowledge or consent.',
  },
  {
    title: '2. How We Use Your Information',
    text: 'We use the information we collect solely to respond to your inquiries, deliver services you have requested, and improve your experience with Mpange Creative Arts. We do not sell, trade, or rent your personal information to third parties under any circumstances.',
  },
  {
    title: '3. Cookies & Tracking',
    text: 'Our website may use cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how visitors use our site. You can choose to disable cookies through your browser settings at any time without affecting your ability to use the site.',
  },
  {
    title: '4. Third-Party Services',
    text: 'We may use third-party services such as analytics providers to help us understand site usage. These services have their own privacy policies and we encourage you to review them. We ensure that any third-party tools we use meet acceptable standards of data protection.',
  },
  {
    title: '5. Data Security',
    text: 'We take the security of your personal information seriously and implement appropriate technical measures to protect it. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    title: '6. Your Rights',
    text: 'You have the right to request access to the personal data we hold about you, to request correction or deletion of that data, and to withdraw any consent you have given at any time. To exercise any of these rights, please contact us at hello@mpange.com.',
  },
  {
    title: '7. Changes to This Policy',
    text: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.',
  },
  {
    title: '8. Contact',
    text: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us at hello@mpange.com or write to us at Mpange Creative Arts, Lusaka, Zambia.',
  },
];

const PrivacyPolicy = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <Wrapper>
      <Navbar />

      <Hero ref={heroRef}>
        <Eyebrow>✦ Legal</Eyebrow>
        <PageTitle
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Privacy <em>Policy</em>
        </PageTitle>
        <LastUpdated>Last updated: March 2026</LastUpdated>
      </Hero>

      <Body>
        {SECTIONS.map((s, i) => (
          <React.Fragment key={i}>
            <SectionItem section={s} index={i} />
            {i < SECTIONS.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Body>

      <Footer />
    </Wrapper>
  );
};

const SectionItem = ({ section, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section
      ref={ref}
      custom={0}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <SectionTitle>{section.title}</SectionTitle>
      <SectionText>{section.text}</SectionText>
    </Section>
  );
};

export default PrivacyPolicy;