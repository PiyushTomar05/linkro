import client from "./client";

export const registerUser = async (userData) => {
    try {
        const response = await client.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await client.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

export const getMe = async () => {
    try {
        const response = await client.get("/auth/me");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch user";
    }
};
