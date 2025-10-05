import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

const useTokenStore = create(
    devtools(
        persist(
            (set) => ({
                token: null,
                setToken: (newToken) => set({ token: newToken }),
                clearToken: () => set({ token: null }),
            }),
            { name: "token-store" }
        )
    )
);

export default useTokenStore;
