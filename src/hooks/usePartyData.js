import { useEffect, useState } from 'react';
import { getParty } from '../services/getParty';

export const usePartyData = (party_id) => {
    const [party, setParty] = useState(null);
    useEffect(() => {
        if (!party_id) {
            return
        }
        (async () => {
            try {
                const response = await getParty(party_id);
                setParty(response);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [party_id]);

    return party;
};