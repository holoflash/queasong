import axios from 'axios';

export const addSuggestion = async (suggestion) => {
    try {
        const partyId = window.localStorage.getItem("party_id");
        const response = await axios.put(`/api/party/${partyId}/suggestions/`, suggestion);
        console.log(response.data)
    } catch (err) {
        console.error(err);
    }
};