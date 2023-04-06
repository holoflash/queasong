import '../styles/create-party.scss';
import { useState } from 'react';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { usePartyData } from '../hooks/usePartyData'
import { DeleteParty } from './DeleteParty';
import { AllLinks } from './AllLinks';
import { CreateParty } from './CreateParty';

export const HostMain = () => {
    const profile = useSpotifyProfile();
    const [party_id, setParty_id] = useState(localStorage.getItem("party_id") || null);
    const partyData = usePartyData(party_id)

    return (
        <>
            {!party_id && profile &&
                <CreateParty profile={profile} setParty_id={setParty_id} />
            }
            {party_id && profile && partyData && <>
                <AllLinks partyData={partyData} profile={profile} party_id={party_id} />
                <DeleteParty party_id={party_id} />
            </>
            }
        </>
    );
}
