import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const login = async (data) => {
    return api.post("/api/auth/login", data);
}

export const register = async (data) => {
    return api.post("/api/auth/register", data);
}

export const profile = async () => {
    return api.get("/api/auth/profile");
}

export const logout = async () => {
    return api.get("/api/auth/logout");
}
