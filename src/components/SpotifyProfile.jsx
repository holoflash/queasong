import { Logout } from './Logout';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { getGreeting } from '../services/getGreeting';

export const SpotifyProfile = () => {
    const profile = useSpotifyProfile();
    const greeting = (profile) ? getGreeting(profile.country) : "Hello"

    return (
        <>
            {profile && (
                <div id="profile">
                    <div className='banner'>
                        <img src={profile.images[0].url} alt="Avatar" />
                        <Logout />
                    </div>
                    <p>{greeting}</p>
                </div>
            )}
        </>
    );
};
