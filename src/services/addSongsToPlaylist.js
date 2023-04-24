import axios from 'axios';
import { accessToken } from './spotifyAuthLocalStorage';

export const addSongsToPlaylist = async (playlist_id, uris) => {
    const token = accessToken;
    const body = {
        uris: uris,
    };
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.post(`/api/add-songs-to-playlist/${playlist_id}`, body, { headers });
        console.log(response)
        return response.data.id
    } catch (err) {
        console.log(err)
        return err;
    }
};

