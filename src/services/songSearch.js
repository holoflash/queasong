import axios from 'axios';

export const songSearch = async (query) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await axios.get(`/api/search/${encodedQuery}`);
        return response.data.tracks.items;
    } catch (err) {
        return err;
    }
};
