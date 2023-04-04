import axios from 'axios';

export const songSearch = async (query) => {
    try {
        const response = await axios.get(`/api/search/${query}`);
        return response.data.tracks.items
    } catch (err) {
        return err
    }
};