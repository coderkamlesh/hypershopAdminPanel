import apiClient from '@/lib/axios';

export const authService = {
  requestOtp: async (mobile) => {
    const response = await apiClient.post('/auth/admin/login/requestOtp', {
      mobile,
    });
    return response.data;
  },

  verifyOtp: async (mobile, otp) => {
    const response = await apiClient.post('/auth/admin/login/verifyOtp', {
      mobile,
      otp,
    });
    return response.data;
  },
};
