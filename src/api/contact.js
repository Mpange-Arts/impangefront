import client from './client';

const ContactAPI = {
  submit: async ({ name, email, phone, projectType, budget, brief }) => {
    const { data } = await client.post('/contact', {
      name, email, phone, projectType, budget, brief,
    });
    return data;
  },
};

export default ContactAPI;