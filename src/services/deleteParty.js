import axios from 'axios';

export const deleteParty = async (party_id) => {
    try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return (await axios.delete(`/api/party/${party_id}`));
    } catch (err) {
        return err;
    }
};
