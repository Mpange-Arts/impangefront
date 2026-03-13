import client from './client';

const BlogsAPI = {
  getAll: async ({ page = 1, limit = 10, tag } = {}) => {
    const params = new URLSearchParams({ page, limit });
    if (tag) params.append('tag', tag);
    const { data } = await client.get(`/blogs?${params}`);
    return data;
  },
  getOne: async (slug) => {
    const { data } = await client.get(`/blogs/${slug}`);
    return data.blog;
  },
};

export default BlogsAPI;