import '../styles/create-party.scss';
import { createPartyDb } from '../services/createPartyDb';
import { useState, useEffect } from 'react';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { usePartyData } from '../hooks/usePartyData'
import { useNavigate } from 'react-router-dom';
import { createPlaylist } from '../services/createPlaylist';
import { playlistDescription } from '../utils/playlistDescription'
import { Greeting } from './Greeting';
import { PartyTitle } from './PartyTitle';
import { GuestList } from './GuestList';
import { PartyOptions } from './PartyOptions';
import { PartyInstructions } from './PartyInstructions';
import { PartyLink } from './PartyLink';
import { DeleteParty } from './DeleteParty';
import { AllLinks } from './AllLinks';

export const CreateParty = () => {
    const navigate = useNavigate();
    const profile = useSpotifyProfile();
    const [numMembers, setNumMembers] = useState(1);
    const [songsPerMember, setSongsPerMember] = useState(1);
    const [members, setMembers] = useState([]);
    const [partyTitle, setPartyTitle] = useState("")
    const [party_id, setPartyId] = useState(localStorage.getItem("party_id") || null);
    const partyData = usePartyData(party_id)

    useEffect(() => {
        setMembers(
            Array.from({ length: numMembers }, () => ({
                name: '',
            }))
        );
    }, [numMembers]);

    const handleMemberNameChange = (index, value) => {
        setMembers(
            members.map((member, i) =>
                i === index ? { ...member, name: value } : member
            )
        );
    };

    const handleSubmit = async () => {
        const newParty = {
            host_name: profile.display_name,
            party_title: partyTitle.trim() === "" ? "Untitled Party" : partyTitle,
            settings: {
                number_of_members: numMembers + 1,
                songs_per_member: songsPerMember,
            },
            members: [
                {
                    name: profile.display_name,
                    is_choosing: false,
                    is_done: false,
                    songs_to_suggest: songsPerMember,
                },
                ...members.map((member, index) => {
                    const name = member.name.trim() === "" ? `Guest ${index + 1}` : member.name;
                    return {
                        ...member,
                        name: name,
                        songs_to_suggest: songsPerMember,
                    };
                }),
            ],
        };
        setPartyId(await createPartyDb(newParty));
        // createPlaylist(profile.id, partyTitle, playlistDescription(profile.display_name, members))
    };

    return (
        <>
            {!party_id && profile &&
                <div id="create-party">
                    <Greeting profile={profile} />
                    <PartyTitle
                        partyTitle={partyTitle}
                        setPartyTitle={setPartyTitle}
                    />
                    <PartyInstructions partyTitle={partyTitle} />
                    <PartyOptions
                        numMembers={numMembers}
                        setNumMembers={setNumMembers}
                        songsPerMember={songsPerMember}
                        setSongsPerMember={setSongsPerMember}
                    />
                    <GuestList
                        members={members}
                        handleMemberNameChange={handleMemberNameChange}
                    />

                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                    >CREATE PARTY</button>

                </div >}
            {party_id && profile && partyData && <>
                <AllLinks partyData={partyData} profile={profile} party_id={party_id} />
                <DeleteParty party_id={party_id} />
            </>
            }
        </>
    );
}
