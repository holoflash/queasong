import axios from 'axios';

export const submitParty = async (party) => {
    try {
        const response = await axios.post('/api/party', party);
        localStorage.setItem("party_id", response.data._id);
    } catch (err) {
        console.error(err);
    }
};
