import { HostMain } from '../components/HostMain';
import { HostLogin } from '../components/HostLogIn';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { Footer } from '../components/Footer'

export const PartyPage = () => {
    return (
        <div className="page">
            {!useSpotifyProfile() ? <HostLogin /> : <HostMain />}
            <Footer />
        </div>
    );
};
