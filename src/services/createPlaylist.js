import axios from 'axios';
import { accessToken } from './spotifyAuthLocalStorage';

export const createPlaylist = async (user_id, partyTitle, description) => {
    const token = accessToken;
    const body = {
        name: partyTitle,
        description: description,
        public: true,
    };
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.post(`/api/create-playlist/${user_id}`, body, { headers });
        localStorage.setItem("playlist_id", response.data.id);
        return response.data.id
    } catch (err) {
        return err;
    }
};

