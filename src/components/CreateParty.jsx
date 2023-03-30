import { submitParty } from '../services/createParty';
import { useState, useEffect } from 'react';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { useNavigate } from 'react-router-dom';
import '../styles/create-party.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { createPlaylist } from '../services/createPlaylist';
import { playlistDescription } from '../utils/playlistDescription'

const MAX_GUESTS = 10;
const MAX_SONGS_PER_GUEST = 25;

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
        // submitParty(newParty);
        createPlaylist(profile.id, partyTitle, playlistDescription(profile.display_name, members), "https://picsum.photos/300")
        navigate('/submit');
    };

    return (
        <div id="create-party">
            {profile && <h1>Hello {profile.display_name}!</h1>}
            <label>Party title:
                <input
                    placeholder="Untitled Party"
                    type="text"
                    value={partyTitle}
                    onChange={(e) =>
                        setPartyTitle(e.target.value)
                    }
                />
            </label>
            <p>Select how many guests will be joining the party and how many songs each of you can pick.
                A playlist titled {partyTitle ? <span>{partyTitle} </span> : (<span>Untitled Party </span>)}
                will be created, and a special party link will be generated. Make sure to give each guest
                a unique name, as it will be used by your guests to sign in via the party link.
            </p>
            <div id="party-options">
                <label>
                    Number of Guests:
                    <select
                        value={numMembers}
                        onChange={(e) => setNumMembers(parseInt(e.target.value))}
                    >
                        {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1)
                            .map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                    </select>
                </label>
                <label>
                    Songs per Guest:
                    <select
                        value={songsPerMember}
                        onChange={(e) => setSongsPerMember(parseInt(e.target.value))}
                    >
                        {Array.from({ length: MAX_SONGS_PER_GUEST }, (_, i) => i + 1)
                            .map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                    </select>
                </label>
            </div>
            {members.map((member, i) => (
                <label id="guests" key={i}>
                    <FontAwesomeIcon icon={faUser} size="xl" />
                    <input
                        placeholder={'Guest ' + (i + 1) + ' name'}
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                            handleMemberNameChange(i, e.target.value)
                        }
                    />
                </label>
            ))}
            <button onClick={handleSubmit}>CREATE PARTY</button>
        </div>
    );
};
