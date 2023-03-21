import axios from "axios";

export const getCurrentUserPlaylists = async (user_id, token) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    try {
        return await axios.get(`https://api.spotify.com/v1/users/${user_id}/playlists`, config)
    } catch (error) {
        return error
    }
};