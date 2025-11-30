import apiClient from '@/lib/axios';

export const categoryGroupService = {
  fetchAll: async () => {
    const res = await apiClient.get('/categoryGroup/fetchAll');
    return res.data;
  },

  create: async payload => {
    const res = await apiClient.post('/categoryGroup', payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await apiClient.put(`/categoryGroup/${id}`, payload);
    return res.data;
  },

  remove: async id => {
    const res = await apiClient.delete(`/categoryGroup/${id}`);
    return res.data;
  },
};
