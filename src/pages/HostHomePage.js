import { SpotifyProfile } from './../components/SpotifyProfile';
import { CreateParty } from '../components/CreateParty';

export const HostHomePage = () => {
    return (
        <div className="flex-col-center">
            <SpotifyProfile />
            <CreateParty />
        </div>
    )
}