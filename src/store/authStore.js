import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    set => ({
      // ==================== STATE ====================
      user: null,
      isAuthenticated: false,

      // ==================== ACTIONS ====================
      setAuth: data => {
        // Token localStorage me rakho (axios interceptor ke liye)
        localStorage.setItem('token', data.token);

        set({
          user: {
            userId: data.userId,
            mobile: data.mobile,
            name: data.name,
            role: data.role,
          },
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // localStorage key name
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // token persist nahi karna - localStorage me already hai
      }),
    }
  )
);

// ==================== SELECTORS ====================
export const selectUser = state => state.user;
export const selectIsAuthenticated = state => state.isAuthenticated;
export const selectIsAdmin = state =>
  state.user?.role === 'ADMIN' || state.user?.role === 'SUPER_ADMIN';
export const selectIsCatalogAdmin = state =>
  state.user?.role === 'CATALOG_ADMIN';

// Actions selectors
export const selectSetAuth = state => state.setAuth;
export const selectLogout = state => state.logout;

export default useAuthStore;
