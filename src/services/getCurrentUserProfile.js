import axios from "axios";

export const getCurrentUserProfile = async (token) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    try {
        return await axios.get('https://api.spotify.com/v1/me', config)
    } catch (error) {
        return error
    }
};