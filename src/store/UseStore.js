import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import persist middleware

const useStore = create(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,

      // Sign up function
      signup: (user) => {
        if (user && user.role) {
          set({ user, isAuthenticated: true });
        } else {
          console.error("Signup failed: User data is required");
        }
      },

      // Login function
      login: (user) => {
        if (user && user.role) {
          set({ user, isAuthenticated: true });
        } else {
          console.error("Login failed: User data is required");
        }
      },

      // Logout function
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "user-storage", // Unique name for the storage in localStorage
      getStorage: () => localStorage, // You can customize this if you want to use sessionStorage or another storage solution
    }
  )
);

export default useStore;
