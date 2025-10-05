import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            role: "",
            token: null,

            setToken: (newToken) => set({ token: newToken }),
            setIsLoggedIn: (newState) => set({ isLoggedIn: newState }),
            setRole: (newRole) => set({ role: newRole }),
        }),
        {
            name: "auth-storage", // name of item in localStorage
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                role: state.role,
                token: state.token,
            }),
        }
    )
);

