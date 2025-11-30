import axios from 'axios';
import { clearAuthData } from '@/lib/auth-utils';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRedirecting = false;

const handleAuthFailure = () => {
  if (isRedirecting) return;
  isRedirecting = true;
  clearAuthData();
  window.location.href = '/login';
};

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data.status === 3) {
      handleAuthFailure();
      return Promise.reject({
        message: response.data.message || 'Invalid token',
        status: 3
      });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      handleAuthFailure();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
