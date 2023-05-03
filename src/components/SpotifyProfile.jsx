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
                    <p>{greeting}</p>
                    <img src={profile.images[0].url} alt="Avatar" />
                    <h1>que-a-song</h1>
                    <Logout />
                </div>
            )}
        </>
    );
};
