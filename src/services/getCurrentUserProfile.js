import axios from "axios";

export const getCurrentUserProfile = async (token) => {
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    try {
        return await axios.get('/api/spotify/user', { headers })
    } catch (error) {
        return error
    }
};