import axios from 'axios';

export const addSuggestion = async (party_id, song_info, song_uri, suggested_by) => {
    const suggestion = {
        song_info: song_info,
        song_uri: song_uri,
        suggested_by: suggested_by
    }

    try {
        const response = await axios.put(`/api/party/${party_id}/suggestions/${suggested_by}`, suggestion);
        console.log(response.data)
    } catch (err) {
        console.error(err);
    }
};