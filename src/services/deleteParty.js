import axios from 'axios';

export const deleteParty = async (party_id) => {
    try {
        return (await axios.delete(`/api/party/${party_id}`));
    } catch (err) {
        return err;
    }
};
