import client from "./client";

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await client.post("/users/profile-picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to upload profile picture";
    }
};
