import { useState } from 'react';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { usePartyData } from '../hooks/usePartyData'
import { DeleteParty } from './DeleteParty';
import { AllLinks } from './AllLinks';
import { CreateParty } from './CreateParty';
import { PartyData } from './PartyData';
import { AddToPlaylist } from './AddToPlaylist';
import { SongSearch } from './SongSearch';
import { SpotifyProfile } from "./SpotifyProfile";
import { Greeting } from './Greeting'

export const HostMain = () => {
    const profile = useSpotifyProfile();
    const [party_id, setParty_id] = useState(localStorage.getItem("party_id") || null);
    const [playlist_id, setPlaylist_id] = useState(localStorage.getItem("playlist_id") || null);
    const partyData = usePartyData(party_id)
    const hostData = partyData?.members[0]

    return (
        <>
            {(!partyData && profile) &&
                <>
                    <SpotifyProfile />
                    <Greeting profile={profile} />
                    <CreateParty profile={profile} setParty_id={setParty_id} setPlaylist_id={setPlaylist_id} />
                </>
            }
            {(party_id && profile && partyData) &&
                <>
                    <SongSearch songs_to_suggest={hostData.songs_to_suggest} party_id={party_id} suggested_by={hostData.name} />
                    <PartyData partyData={partyData} />
                    <AllLinks partyData={partyData} profile={profile} party_id={party_id} />
                    <DeleteParty party_id={party_id} />
                    <AddToPlaylist party_id={party_id} playlist_id={playlist_id} />
                </>
            }
        </>
    );
}
