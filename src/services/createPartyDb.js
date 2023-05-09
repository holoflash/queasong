import axios from 'axios';

export const createPartyDb = async (party) => {
    try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.post('/api/party', party);
        localStorage.setItem("party_id", response.data._id);
        localStorage.setItem("active", true)
        return response.data._id
    } catch (err) {
        console.error(err);
    }
};