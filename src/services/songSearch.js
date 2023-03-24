import axios from 'axios';

export const songSearch = async (query) => {
    try {
        const response = await axios.get(`/api/search/${query}`);
        console.log(response.data)
    } catch (err) {
        console.error(err);
    }
};