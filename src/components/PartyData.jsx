import { playlistDescription } from '../utils/playlistDescription';
import { AddToPlaylist } from './AddToPlaylist';
import { DeleteParty } from './DeleteParty';
import { useState, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

export const PartyData = ({ profile, partyData, party_id, playlist_id }) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const copyRef = useRef(null);
    const URL =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3000'
            : 'https://queasong.onrender.com';

    useClickOutside(copyRef, () => {
        setLinkCopied(false);
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            setLinkCopied(true);
        });
    }
    const { settings, party_title, members } = partyData;
    const description = playlistDescription(members);

    const numberOfSongsSuggested = (allowed, left) => {
        return allowed - left;
    };

    return (
        <div id='party-data'>
            <h2>{party_title}</h2>
            <p>{description}</p>
            <div className='status'>
                {linkCopied ? (
                    <p className="link-copied">Link copied to clipboard!</p>
                ) : (
                    <p className="copy-link">
                        Click on a name to copy link to clipboard.
                    </p>
                )}
                <ul className="members">
                    {partyData.members.map((member) => {
                        const fullUrl = `${URL}/${encodeURIComponent(member.name)}/${party_id}`;
                        return (
                            <div
                                className="submission-link"
                                key={member._id}
                                ref={copyRef}
                                onClick={() => copyToClipboard(fullUrl)}
                            >
                                <h3>{encodeURIComponent(member.name)}</h3>
                                {member.is_done ?
                                    <span>{numberOfSongsSuggested(settings.songs_per_member, member.songs_to_suggest)} songs submitted</span>
                                    : <span>0 songs submitted</span>}
                            </div>
                        );
                    })}

                    <li className='options'>
                        <AddToPlaylist party_id={party_id} playlist_id={playlist_id} />
                        <DeleteParty party_id={party_id} />
                    </li>

                </ul>
            </div>
        </div >
    );
};
