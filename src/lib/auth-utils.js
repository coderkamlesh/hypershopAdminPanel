export const clearAuthData = () => {
  const authKeys = ['token', 'auth-storage'];
  
  authKeys.forEach(key => {
    localStorage.removeItem(key);
  });
};