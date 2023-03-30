import { submitParty } from '../services/createParty';
import { useState, useEffect } from 'react';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { useNavigate } from 'react-router-dom';
import '../styles/create-party.scss';
import { createPlaylist } from '../services/createPlaylist';
import { playlistDescription } from '../utils/playlistDescription'
import { Greeting } from './Greeting';
import { PartyTitle } from './PartyTitle';
import { GuestList } from './GuestList';
import { PartyOptions } from './PartyOptions';
import { PartyInstructions } from './PartyInstructions';

export const CreateParty = () => {
    const navigate = useNavigate();
    const profile = useSpotifyProfile();
    const [numMembers, setNumMembers] = useState(1);
    const [songsPerMember, setSongsPerMember] = useState(1);
    const [members, setMembers] = useState([]);
    const [partyTitle, setPartyTitle] = useState("")

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

    const handleSubmit = () => {
        const newParty = {
            host_name: profile.display_name,
            party_title: partyTitle,
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
                ...members.map((member) => ({
                    ...member,
                    songs_to_suggest: songsPerMember,
                })),
            ],
        };
        submitParty(newParty);
        createPlaylist(profile.id, partyTitle, playlistDescription(profile.display_name, members))
        navigate('/submit');
    };

    return (
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

            {partyTitle ? (<button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!partyTitle}
            >CREATE PARTY</button>) :
                (<button
                    className="submit-button"
                    disabled={!partyTitle}
                >PARTY TITLE MISSING</button>)
            }


        </div >
    );
}
