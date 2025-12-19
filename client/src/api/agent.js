import client from "./client";

export const searchJobs = async (query = "") => {
    try {
        const response = await client.get(`/agent/jobs?query=${query}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch jobs";
    }
};

export const getJobDetails = async (id) => {
    try {
        const response = await client.get(`/agent/jobs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch job details";
    }
};

export const applyForJob = async (jobId) => {
    try {
        const response = await client.post("/agent/apply", { jobId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to apply for job";
    }
};

export const getMyApplications = async () => {
    try {
        const response = await client.get("/agent/my-applications");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch applications";
    }
};
