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

export const getAnalyticsGrowth = async () => {
    try {
        const response = await client.get("/admin/analytics/growth");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch growth stats";
    }
};

export const getAnalyticsStats = async () => {
    try {
        const response = await client.get("/admin/analytics/stats");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch analytics stats";
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

export const updateUserStatus = async (id, status) => {
    try {
        const response = await client.patch(`/admin/users/${id}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update user status";
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

export const updateJobStatus = async (id, status) => {
    try {
        const response = await client.patch(`/admin/jobs/${id}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update job status";
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

export const createUser = async (userData) => {
    try {
        const response = await client.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to create user";
    }
};
