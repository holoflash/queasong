import { useState, useEffect } from 'react';

export const usePartyId = () => {
    const [partyId, setPartyId] = useState(localStorage.getItem("party_id"))

    useEffect(() => {
        setPartyId(localStorage.getItem("party_id"));
    }, [])

    return partyId
}