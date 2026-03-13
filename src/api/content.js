// src/api/content.js
import client from './client';

const ContentAPI = {
  // Get all sections at once (most efficient — one request on app load)
  getAll: async () => {
    const { data } = await client.get('/content');
    return data.content; // { hero: {...}, news: {...}, playreel: {...}, services: {...} }
  },

  // Get a single section
  getSection: async (section) => {
    const { data } = await client.get(`/content/${section}`);
    return data.data;
  },
};

export default ContentAPI;
