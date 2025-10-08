import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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

// fetch all products
export const products = async () => {
    return api.get("/api/product");
}

// Add product (for sellers)
export const addProduct = async (formData) => {
    return api.post("/api/product", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

// Get all users (for admin)
export const getAllUsers = async () => {
    return api.get("/api/admin/users");
}

// Get all sellers (for admin)
export const getAllSellers = async () => {
    return api.get("/api/admin/sellers");
}

// Get payment details (for admin)
export const getPayments = async () => {
    return api.get("/api/admin/payments");
}

// get single product details
export const getSingleProduct = async (id) => {
    return api.get(`/api/product/${id}`);
}