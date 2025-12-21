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

export const getApplicationDetails = async (id) => {
    try {
        const response = await client.get(`/recruiter/applications/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch application details";
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

export const updateApplicationStatus = async (id, status, note = '') => {
    try {
        const response = await client.patch(`/recruiter/applications/${id}/status`, { status, note });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update application status";
    }
};

export const updateJobStatus = async (id, status) => {
    try {
        const response = await client.patch(`/recruiter/jobs/${id}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update job status';
    }
};

export const updateJob = async (id, jobData) => {
    try {
        const response = await client.put(`/recruiter/jobs/${id}`, jobData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update job';
    }
};
