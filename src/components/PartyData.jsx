import { playlistDescription } from '../utils/playlistDescription';

export const PartyData = ({ partyData }) => {
    const { settings, party_title, members } = partyData;
    const description = playlistDescription(members);

    const numberOfSongsSuggested = (allowed, left) => {
        return allowed - left;
    };

    return (
        <div id='party-data'>
            <h2>{party_title}</h2>
            <p>{description}</p>
            <details>
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
                </ul>
            </details>
        </div>
    );
};
