// src/api/products.js
import client from './client';

const ProductsAPI = {
  // Get all published products (paginated + filterable)
  getAll: async ({ page = 1, limit = 10, category, search, featured } = {}) => {
    const params = new URLSearchParams({ page, limit });
    if (category) params.append('category', category);
    if (search)   params.append('search',   search);
    if (featured) params.append('featured', true);

    const { data } = await client.get(`/products?${params}`);
    return data; // { success, total, page, pages, products }
  },

  // Get single product by ID
  getOne: async (id) => {
    const { data } = await client.get(`/products/${id}`);
    return data.product;
  },
};

export default ProductsAPI;
