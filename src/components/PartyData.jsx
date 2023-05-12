import { playlistDescription } from '../utils/playlistDescription';
import { AddToPlaylist } from './AddToPlaylist';
import { DeleteParty } from './DeleteParty';
import { useState, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

export const PartyData = ({ partyData, party_id, playlist_id }) => {
    const { settings, party_title, members, host_name } = partyData;
    const description = playlistDescription(members);
    const copyRef = useRef(null);
    const URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://queasong.onrender.com';
    const [linkCopied, setLinkCopied] = useState({ guests: members.reduce((acc, guest) => ({ ...acc, [guest._id]: false }), {}) });
    const numberOfSongsSuggested = (allowed, left) => allowed - left;

    useClickOutside(copyRef, () => setLinkCopied((prev) => ({ ...prev, guests: members.reduce((acc, guest) => ({ ...acc, [guest._id]: false }), {}) })));

    function copyToClipboard(text, memberId) {
        navigator.clipboard.writeText(text).then(() => setLinkCopied((prev) => ({ guests: { ...prev.guests, [memberId]: true } })));
    }

    return (
        <div id='party-data'>
            <h2>{party_title}</h2>
            <p>{description}</p>
            <ul className="members">
                <h4>LINKS</h4>
                {members.map(member => {
                    const fullUrl = `${URL}/${encodeURIComponent(member.name)}/${party_id}`;
                    if (member.name === host_name) {
                        return (
                            <div className="submission-link" key={member._id}>
                                <div className='name-info'>
                                    <h3>{member.name}</h3>
                                    <span>{member.is_done ? `${numberOfSongsSuggested(settings.songs_per_member, member.songs_to_suggest)} songs submitted` : '0 songs submitted'}</span>
                                </div>
                                {member.songs_to_suggest !== 0 &&
                                    <a href={fullUrl}><button className="copy link host">ADD SONGS</button></a>}
                            </div>
                        );
                    } else {
                        return (
                            <div className="submission-link" key={member._id} ref={copyRef}>
                                <div className='name-info'>
                                    <h3>{member.name}</h3>
                                    <span>{member.is_done ? `${numberOfSongsSuggested(settings.songs_per_member, member.songs_to_suggest)} songs submitted` : '0 songs submitted'}</span>
                                </div>
                                {(!member.is_done) &&
                                    (
                                        linkCopied.guests[member._id] ? <div className="copy">Link copied to clipboard!</div> :
                                            <button className="copy link" onClick={() => copyToClipboard(fullUrl, member._id)}>COPY LINK</button>
                                    )
                                }
                            </div>
                        );
                    }
                })}
                <li className='options'>
                    {members.some((member) => member.is_done === true) &&
                        <AddToPlaylist party_id={party_id} playlist_id={playlist_id} />}
                    <DeleteParty party_id={party_id} />
                </li>
                <button className='refresh' onClick={() => window.location.reload()}>REFRESH</button>
            </ul >
        </div >
    );
};
