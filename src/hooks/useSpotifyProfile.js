import { useState, useEffect } from 'react';
import { getCurrentUserProfile } from '../services/getCurrentUserProfile';
import { accessToken } from '../services/spotifyAuthLocalStorage'
import { catchErrors } from '../utils/catchErrors';
import { useNavigate } from 'react-router-dom';

export const useSpotifyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
        setToken(accessToken)
        if (token) {
            const fetchData = async () => {
                const { data } = await getCurrentUserProfile(token);
                setProfile(data);
            };
            catchErrors(fetchData());
        }
    }, [token, navigate]);

    return profile
}