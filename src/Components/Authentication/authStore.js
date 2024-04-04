// authStore.js
import create from 'zustand';
import { auth } from '../../services/authService'; // Import your Firebase configuration

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  initAuth: () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      set({ isAuthenticated: !!user, isLoading: false });
    });

    return unsubscribe;
  },
}));

export default useAuthStore;