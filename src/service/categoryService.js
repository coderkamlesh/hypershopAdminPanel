// service/categoryService.js
import apiClient from '@/lib/axios';

export const categoryService = {
  fetchAll: async () => {
    const response = await apiClient.get('/categories/fetchAll');
    return response.data;
  },

  create: async data => {
    const formData = new FormData();

    // ✅ Image as multipart
    if (data.image) {
      formData.append('image', data.image);
    }

    // ✅ Baaki sab query params me
    const params = new URLSearchParams({
      groupId: data.groupId,
      name: data.name,
    });

    const response = await apiClient.post(
      `/categories?${params.toString()}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  update: async (id, data) => {
    const formData = new FormData();

    // ✅ Image as multipart (optional)
    if (data.image) {
      formData.append('image', data.image);
    }

    // ✅ Baaki sab query params me
    const params = new URLSearchParams();
    if (data.groupId) params.append('groupId', data.groupId);
    params.append('name', data.name);

    const response = await apiClient.put(
      `/categories/${id}?${params.toString()}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  remove: async id => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};
