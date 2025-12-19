import client from "./client";

export const postJob = async (jobData) => {
    try {
        const response = await client.post("/recruiter/jobs", jobData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to post job";
    }
};

export const getMyJobs = async () => {
    try {
        const response = await client.get("/recruiter/jobs");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch jobs";
    }
};

export const getJobDetails = async (id) => {
    try {
        const response = await client.get(`/recruiter/jobs/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch job details";
    }
};

export const getJobApplications = async (filters = {}) => {
    try {
        const { jobId } = filters;
        let url = "/recruiter/applications";
        if (jobId) {
            url += `?jobId=${jobId}`;
        }
        const response = await client.get(url);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch applications";
    }
};
