import { useState, useEffect } from 'react';
import { getCurrentUserProfile } from '../services/getCurrentUserProfile';
import { accessToken } from '../services/spotifyAuthLocalStorage'
import { catchErrors } from '../utils/catchErrors';

export const useSpotifyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(accessToken)
        if (token) {
            const fetchData = async () => {
                const { data } = await getCurrentUserProfile(token);
                setProfile(data);
            };
            catchErrors(fetchData());
        }
    }, [token]);

    return profile
}