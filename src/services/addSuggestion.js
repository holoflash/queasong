import axios from 'axios';

export const addSuggestion = async (party_id, song_uri, suggested_by) => {
    const suggestion = {
        song_uri: song_uri,
        suggested_by: suggested_by
    }

    try {
        const response = await axios.put(`/api/party/${party_id}/suggestions/${suggested_by}`, suggestion);
        return response
    } catch (err) {
        return err
    }
};