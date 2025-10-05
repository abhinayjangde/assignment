import { create } from "zustand";

export const useAuthStore = create(
    (set) => ({
        isLoggedIn: false,
        role: "",
        token: null,

        setToken: (newToken) => set({ token: newToken }),
        setIsLoggedIn: (newState) => set({ isLoggedIn: newState }),
        setRole: (newRole) => set({ role: newRole }),
    })
);

