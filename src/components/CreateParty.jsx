import { useState } from 'react';
import { useMembers } from '../hooks/useMembers';
import { Greeting } from "./Greeting";
import { PartyTitle } from "./PartyTitle";
import { PartyInstructions } from "./PartyInstructions";
import { PartyOptions } from "./PartyOptions";
import { GuestList } from "./GuestList";
import { createPartyDb } from '../services/createPartyDb';
import { createPlaylist } from '../services/createPlaylist';
import { playlistDescription } from '../utils/playlistDescription'
import { hostToken } from "../services/hostToken";

export const CreateParty = ({ profile, setParty_id, setPlaylist_id }) => {
    const { members, numMembers, setNumMembers, handleMemberNameChange } = useMembers(1);
    const [songsPerMember, setSongsPerMember] = useState(5);
    const [partyTitle, setPartyTitle] = useState("")

    const handleSubmit = async () => {
        const duplicates = {};
        const duplicateCheck = (name, index, members) => {
            if (name === "") {
                return `Guest_${index}`;
            } else if (members.some((n) => n.name === name)) {
                if (duplicates[name]) {
                    duplicates[name]++;
                } else {
                    duplicates[name] = 1;
                }
                return encodeURIComponent(name + '_' + duplicates[name]);

            } else {
                return encodeURIComponent(name);
            }
        };

        const party_title = partyTitle.trim() === "" ? "Untitled Party" : partyTitle;
        const updatedMembers = [
            { name: profile.display_name, is_done: false, songs_to_suggest: songsPerMember },
            ...members
        ].map((member, index) => ({
            ...member,
            name: duplicateCheck(member.name.trim(), index, members),
            songs_to_suggest: songsPerMember
        }));

        const newParty = {
            host_name: profile.display_name,
            party_title: encodeURIComponent(party_title),
            settings: { number_of_members: numMembers + 1, songs_per_member: songsPerMember },
            members: updatedMembers
        };
        await hostToken();
        setParty_id(await createPartyDb(newParty));
        setPlaylist_id(await createPlaylist(profile.id, party_title, playlistDescription(updatedMembers)));
    };

    return (
        <>
            <div id="create-party">
                <Greeting profile={profile} />
                <PartyTitle partyTitle={partyTitle} setPartyTitle={setPartyTitle} />
                <PartyInstructions partyTitle={partyTitle} />
                <PartyOptions numMembers={numMembers} setNumMembers={setNumMembers} songsPerMember={songsPerMember} setSongsPerMember={setSongsPerMember} />
                <GuestList members={members} handleMemberNameChange={handleMemberNameChange} />
                <button className="submit-button" onClick={handleSubmit}>CREATE PARTY</button>
            </div>
        </>)
};