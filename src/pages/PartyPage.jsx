import { HostMain } from '../components/HostMain';
import { HostLogin } from '../components/HostLogIn';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { Footer } from '../components/Footer'

export const PartyPage = () => {
    return (
        <div className="page">
            <h1>que-a-song</h1>
            {!useSpotifyProfile() ? <HostLogin /> : <HostMain />}
            <Footer />
        </div>
    );
};
