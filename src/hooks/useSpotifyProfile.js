import { useState, useEffect } from 'react';
import { getCurrentUserProfile } from '../services/getCurrentUserProfile';
import { accessToken } from '../services/spotifyAuthLocalStorage'

export const useSpotifyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(accessToken);
        if (token) {
            const fetchData = async () => {
                try {
                    const { data } = await getCurrentUserProfile(token);
                    setProfile(data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchData();
        }
    }, [token]);

    return profile;
};