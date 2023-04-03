import axios from 'axios';

export const getParty = async (party_id) => {
    try {
        return (await axios.get(`/api/party/${party_id}`)).data;
    } catch (err) {
        console.error(err);
        return null;
    }
};
