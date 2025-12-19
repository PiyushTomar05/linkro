import client from "./client";

export const getSystemStats = async () => {
    try {
        const response = await client.get("/admin/stats");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch stats";
    }
};

export const getSystemLogs = async () => {
    try {
        const response = await client.get("/admin/logs");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch logs";
    }
};

export const getUsers = async () => {
    try {
        const response = await client.get("/users");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch users";
    }
};

export const getUserById = async (id) => {
    try {
        const response = await client.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch user";
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await client.delete(`/admin/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete user";
    }
};

export const getJobs = async () => {
    try {
        const response = await client.get("/admin/jobs");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch jobs";
    }
};

export const deleteJob = async (id) => {
    try {
        const response = await client.delete(`/admin/jobs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to delete job";
    }
};

export const getJobDetails = async (id) => {
    try {
        // Use agent endpoint to view job details as it is public/accessible
        const response = await client.get(`/agent/jobs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch job details";
    }
};
