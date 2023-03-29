import { Logout } from './Logout';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import '../styles/profile.scss'

export const SpotifyProfile = () => {
    const profile = useSpotifyProfile();

    return (
        <>
            {profile && (
                <div id="profile">
                    <img src={profile.images[0].url} alt="Avatar" />
                    <h1>que-a-song</h1>
                    <Logout />
                </div>
            )}
        </>
    );
};
