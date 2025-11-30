import { create } from 'zustand';

const useUserStore = create(set => ({
  // ==================== STATE ====================
  users: [],
  isLoading: false,
  error: null,

  // ==================== ACTIONS ====================
  setUsers: users => set({ users }),

  setLoading: isLoading => set({ isLoading }),

  setError: error => set({ error }),

  clearError: () => set({ error: null }),
}));

// ==================== SELECTORS ====================
export const selectUsers = state => state.users;
export const selectIsLoading = state => state.isLoading;
export const selectError = state => state.error;
export const selectSetUsers = state => state.setUsers;
export const selectSetLoading = state => state.setLoading;
export const selectSetError = state => state.setError;
export const selectClearError = state => state.clearError;

export default useUserStore;
