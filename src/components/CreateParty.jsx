import { useState } from 'react';
import { useMembers } from '../hooks/useMembers';
import { PartyOptions } from "./PartyOptions";
import { createPartyDb } from '../services/createPartyDb';
import { createPlaylist } from '../services/createPlaylist';
import { playlistDescription } from '../utils/playlistDescription';
import { hostToken } from "../services/hostToken";
import { duplicateCheck } from '../utils/duplicateCheck';

export const CreateParty = ({ profile, setParty_id, setPlaylist_id }) => {
    const { members, numMembers, setNumMembers, handleMemberNameChange } = useMembers(1);
    const [songsPerMember, setSongsPerMember] = useState(1);
    const [partyTitle, setPartyTitle] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async () => {
        if (isCreating) return;

        setIsCreating(true);

        const party_title = partyTitle.trim() === "" ? "Untitled Party" : partyTitle;
        const updatedMembers = [
            { name: profile.display_name, is_done: false, songs_to_suggest: songsPerMember },
            ...members
        ].map((member, index) => ({
            ...member,
            name: duplicateCheck(member.name.trim(), index),
            songs_to_suggest: songsPerMember
        }));

        const newParty = {
            host_name: profile.display_name,
            party_title: encodeURIComponent(party_title),
            settings: { number_of_members: numMembers + 1, songs_per_member: songsPerMember },
            members: updatedMembers
        };

        try {
            await hostToken();
            const partyId = await createPartyDb(newParty);
            const playlistId = await createPlaylist(profile.id, party_title, playlistDescription(updatedMembers));

            setParty_id(partyId);
            setPlaylist_id(playlistId);
        } catch (error) {
            console.error("Error creating party:", error);
        }
    };

    return (
        <div className='party-container'>
            <div id="create-party">
                <PartyOptions
                    numMembers={numMembers}
                    members={members}
                    handleMemberNameChange={handleMemberNameChange}
                    setNumMembers={setNumMembers}
                    songsPerMember={songsPerMember}
                    setSongsPerMember={setSongsPerMember}
                    partyTitle={partyTitle}
                    setPartyTitle={setPartyTitle}
                />
                {isCreating ? (
                    <p>Creating Party...</p>
                ) : (
                    <button onClick={handleSubmit}>
                        Create Party
                    </button>
                )}
            </div>
        </div>
    );
};