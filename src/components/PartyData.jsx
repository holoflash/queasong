import { playlistDescription } from '../utils/playlistDescription';
import { AddToPlaylist } from './AddToPlaylist';
import { DeleteParty } from './DeleteParty';
import { useState, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { SongSearch } from '../components/SongSearch'

export const PartyData = ({ partyData, party_id, playlist_id }) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const { settings, party_title, members } = partyData;
    const [host, ...otherMembers] = members;
    const copyRef = useRef(null);
    const description = playlistDescription(members);

    const numberOfSongsSuggested = (allowed, left) => {
        return allowed - left;
    };
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

    return (
        <div id='party-data'>
            <h2>{party_title}</h2>
            <p>{description}</p>
            <ul className="members">
                <h4>PARTY HOST</h4>
                <div
                    className="submission-link host"
                    key={host._id}
                >
                    <h3>{host.name}</h3>
                    {host.is_done ?
                        <span>{numberOfSongsSuggested(settings.songs_per_member, host.songs_to_suggest)} songs submitted</span>
                        : <span>0 songs submitted</span>}
                    <SongSearch songs_to_suggest={host.songs_to_suggest} party_id={party_id} suggested_by={host} />
                </div>
            </ul>
            <ul className="members">
                <h4>GUESTS</h4>
                {otherMembers.map((member) => {
                    const fullUrl = `${URL}/${encodeURIComponent(member.name)}/${party_id}`;
                    return (
                        <div
                            className="submission-link"
                            key={member._id}
                            ref={copyRef}
                        >
                            <h3>{encodeURIComponent(member.name)}</h3>
                            {member.is_done ?
                                <span>{numberOfSongsSuggested(settings.songs_per_member, member.songs_to_suggest)} songs submitted</span>
                                : <span>0 songs submitted</span>}
                            {linkCopied ? (
                                <p className="copy">Link copied to clipboard!</p>
                            ) : (
                                <button
                                    onClick={() => copyToClipboard(fullUrl)} className="copy-link">
                                    COPY LINK
                                </button>
                            )}
                        </div>
                    );
                })}

                <li className='options'>
                    <AddToPlaylist party_id={party_id} playlist_id={playlist_id} />
                    <DeleteParty party_id={party_id} />
                </li>

            </ul>
        </div >
    );
};
