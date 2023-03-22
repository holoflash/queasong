import axios from 'axios';
import { party } from './party'

export const submitParty = async () => {
    try {
        const response = await axios.post('/api/party', party);
        localStorage.setItem("party_id", response.data._id);
    } catch (err) {
        console.error(err);
    }
};
