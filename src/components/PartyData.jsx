import { playlistDescription } from '../utils/playlistDescription';
import { AddToPlaylist } from './AddToPlaylist';
import { DeleteParty } from './DeleteParty';
import { AllLinks } from './AllLinks';

export const PartyData = ({ profile, partyData, party_id, playlist_id }) => {
    const { settings, party_title, members } = partyData;
    const description = playlistDescription(members);

    const numberOfSongsSuggested = (allowed, left) => {
        return allowed - left;
    };

    return (
        <div id='party-data'>
            <h2>{party_title}</h2>
            <p>{description}</p>
            <details open>
                <summary>Status</summary>
                <ul className="members">
                    {members.map((member) => (
                        <li className="status" key={member._id}>
                            {member.name}
                            <div className="member-detail">
                                {member.is_done ?
                                    <span>{numberOfSongsSuggested(settings.songs_per_member, member.songs_to_suggest)} songs submitted</span>
                                    : <span>0 songs submitted</span>}
                            </div>
                        </li>
                    ))}
                    <li className='add-to-playlist'>
                        <div className='member-detail'><AddToPlaylist party_id={party_id} playlist_id={playlist_id} /></div>
                    </li>
                </ul>
            </details>
            <AllLinks partyData={partyData} profile={profile} party_id={party_id} playlist_id={playlist_id} />
            <DeleteParty party_id={party_id} />
        </div>
    );
};
