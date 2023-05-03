import { HostMain } from '../components/HostMain';
import { HostLogin } from '../components/HostLogIn';
import NavBar from '../components/NavBar';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';

export const PartyPage = () => {
    return (
        <div className="page">
            <NavBar />
            {!useSpotifyProfile() ? <HostLogin /> : <HostMain />}
        </div>
    );
};
