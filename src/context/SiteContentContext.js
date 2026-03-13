import React, { createContext, useContext, useEffect, useState } from 'react';
import ContentAPI from '../api/content';

const SiteContentContext = createContext(null);

// ── Shown instantly — replaced when API responds ──────────
const FALLBACK_CONTENT = {
  hero: {
    headline:      "We help experience-driven companies thrive by making their audience feel the refined intricacies of their brand and product.",
    imageUrl:      '',
    imagePublicId: '',
  },
  news: {
    title:    "Spread\nthe News",
    subtitle: "Find out more about our work on these leading design and technology platforms.",
  },
  playreel: {
    caption: "Our work is best experienced in motion. Don't forget to put on your headphones.",
    label:   "Work in motion",
  },

  
  services: {
    services: [
      { id: 's1', title: 'Cinema & Film',   description: 'Brand films, reels, and motion content that move people.' },
      { id: 's2', title: 'Photography',     description: 'Editorial, product, and portrait photography.' },
      { id: 's3', title: 'Web Development', description: 'Scroll-driven, interactive web experiences.' },
      { id: 's4', title: 'Mobile Apps',     description: 'iOS and Android apps built for real people.' },
    ],
  },

  contact: {
    imageUrl:   '',
    imagePubId: '',
    email:      'hello@mpange.com',
    phone:      '+260 972276257',
    socials: [
      { label: 'Facebook',  url: 'https://web.facebook.com/profile.php?id=100063714974128' },
      { label: 'Instagram', url: 'https://www.instagram.com/mpange/' },
      { label: 'LinkedIn',  url: 'https://www.linkedin.com/company/mpange' },
    ],
    budgets: ['Under K5k', 'K5k – K15k', 'K15k – K30k', 'K30k – K60k', 'K60k+'],
  },
};

export const SiteContentProvider = ({ children }) => {
  // Start with fallback so page renders immediately even on slow connections
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ContentAPI.getAll()
      .then((data) => setContent(data))  // replace fallback with real API data
      .catch(() => {})                   // silently keep fallback on network error
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = (section) => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used inside SiteContentProvider');
  if (section) return ctx.content?.[section] || null;
  return ctx;
};