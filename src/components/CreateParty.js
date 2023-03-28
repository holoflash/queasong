import { submitParty } from '../services/createParty';
import { useState, useEffect } from 'react';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { useNavigate } from "react-router-dom";

const MAX_GUESTS = 10;
const MAX_SONGS_PER_GUEST = 25;

export const CreateParty = () => {
    const navigate = useNavigate()
    const profile = useSpotifyProfile()
    const [numMembers, setNumMembers] = useState(1);
    const [songsPerMember, setSongsPerMember] = useState(1);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        setMembers(Array.from({ length: numMembers }, () => ({ name: '', songs_to_suggest: songsPerMember })));
    }, [numMembers, songsPerMember]);

    const handleMemberNameChange = (index, value) => {
        setMembers(members.map((member, i) => i === index ? { ...member, name: value } : member));
    };

    const handleSubmit = () => {
        const newParty = {
            host_name: profile.display_name,
            settings: {
                number_of_members: numMembers + 1,
                songs_per_member: songsPerMember
            },
            members: [{ name: profile.display_name, is_choosing: false, is_done: false, songs_to_suggest: songsPerMember }, ...members],
        };
        submitParty(newParty);
        navigate('/submit')
    };

    return (
        <div id="form" className='flex-col-center add-space'>
            {profile && <div>Party hosted by: {profile.display_name}</div>}
            <label>
                Number of Guests:
                <select value={numMembers} onChange={(e) => setNumMembers(parseInt(e.target.value))}>
                    {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </label>
            <label>
                Songs per Guest:
                <select value={songsPerMember} onChange={(e) => setSongsPerMember(parseInt(e.target.value))}>
                    {Array.from({ length: MAX_SONGS_PER_GUEST }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </label>
            {members.map((member, i) => (
                <label key={i}>
                    Guest {i + 1} Name:
                    <input type="text" value={member.name} onChange={(e) => handleMemberNameChange(i, e.target.value)} />
                </label>
            ))}
            <button onClick={handleSubmit}>CREATE PARTY</button>
        </div>
    );
};
