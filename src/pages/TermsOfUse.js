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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    text: 'By accessing and using the Mpange Creative Arts website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website. We reserve the right to update these terms at any time without prior notice.',
  },
  {
    title: '2. Intellectual Property',
    text: 'All content on this website — including but not limited to text, images, videos, graphics, logos, and design elements — is the property of Mpange Creative Arts and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.',
  },
  {
    title: '3. Use of the Website',
    text: 'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the site. Prohibited uses include transmitting harmful content, attempting to gain unauthorised access, and using automated tools to scrape or harvest data.',
  },
  {
    title: '4. Client Work & Portfolio',
    text: 'Work displayed in our portfolio has been shared with client permission. Any resemblance to unreleased or confidential projects is coincidental. If you believe any content infringes your rights, please contact us immediately at hello@mpange.com and we will address the matter promptly.',
  },
  {
    title: '5. Disclaimer of Warranties',
    text: 'This website is provided on an "as is" basis without any warranties of any kind, either express or implied. Mpange Creative Arts does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
  },
  {
    title: '6. Limitation of Liability',
    text: 'To the fullest extent permitted by law, Mpange Creative Arts shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or inability to access it, even if we have been advised of the possibility of such damages.',
  },
  {
    title: '7. Links to Third-Party Sites',
    text: 'Our website may contain links to third-party websites for your convenience. We do not endorse or take responsibility for the content, privacy practices, or reliability of any third-party sites. Accessing these links is entirely at your own risk.',
  },
  {
    title: '8. Governing Law',
    text: 'These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of Zambia. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Zambia.',
  },
  {
    title: '9. Contact',
    text: 'If you have any questions about these Terms of Use, please contact us at hello@mpange.com or write to us at Mpange Creative Arts, Lusaka, Zambia.',
  },
];

const SectionItem = ({ section }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <SectionTitle>{section.title}</SectionTitle>
      <SectionText>{section.text}</SectionText>
    </Section>
  );
};

const TermsOfUse = () => {
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
          Terms <em>of Use</em>
        </PageTitle>
        <LastUpdated>Last updated: March 2026</LastUpdated>
      </Hero>

      <Body>
        {SECTIONS.map((s, i) => (
          <React.Fragment key={i}>
            <SectionItem section={s} />
            {i < SECTIONS.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Body>

      <Footer />
    </Wrapper>
  );
};

export default TermsOfUse;