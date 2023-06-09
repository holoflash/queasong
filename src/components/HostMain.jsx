import { useState } from 'react';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { usePartyData } from '../hooks/usePartyData'
import { CreateParty } from './CreateParty';
import { PartyData } from './PartyData';
import { SpotifyProfile } from "./SpotifyProfile";

export const HostMain = () => {
    const profile = useSpotifyProfile();
    const [party_id, setParty_id] = useState(localStorage.getItem("party_id") || null);
    const [playlist_id, setPlaylist_id] = useState(localStorage.getItem("playlist_id") || null);
    const partyData = usePartyData(party_id)

    return (
        <>
            {(!partyData && profile) &&
                <>
                    <SpotifyProfile />
                    <CreateParty profile={profile} setParty_id={setParty_id} setPlaylist_id={setPlaylist_id} />
                </>
            }
            {(party_id && profile && partyData) &&
                <>
                    <SpotifyProfile />
                    <PartyData partyData={partyData} party_id={party_id} playlist_id={playlist_id} />
                </>
            }
        </>
    );
}
