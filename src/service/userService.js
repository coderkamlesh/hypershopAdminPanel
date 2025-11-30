import apiClient from '@/lib/axios';

export const userService = {
  fetchAllUsers: async (filters = {}) => {
    const response = await apiClient.post('/admin/fetchAllUsers', filters);
    return response.data;
  },

  addUser: async userData => {
    const response = await apiClient.post('/admin/addUser', userData);
    return response.data;
  },
};
