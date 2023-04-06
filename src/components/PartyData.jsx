import '../styles/party-data.scss';
import { playlistDescription } from '../utils/playlistDescription';

export const PartyData = ({ partyData }) => {
    const { settings, party_title, members } = partyData;
    const description = playlistDescription(members);

    const host = members[0];
    const guests = members.slice(1);

    const numberOfSongsSuggested = (allowed, left) => {
        return allowed - left;
    };

    return (
        <div id="party-data">
            <div className="party-title">{party_title}</div>
            <p>{description}</p>

            <div className="members">
                <div key={host._id} className="member first-member">
                    <div className="member-name">{host.name}</div>
                    <div className="member-detail">
                        {host.is_done ?
                            <span>Submitted {numberOfSongsSuggested(settings.songs_per_member, host.songs_to_suggest)} songs</span>
                            : <span>You haven't decided</span>}
                    </div>
                </div>
                {guests.map((member) => (
                    <div key={member._id} className="member">
                        <div className="member-name">{member.name}</div>
                        <div className="member-detail">
                            {member.is_done ?
                                <span>Submitted {numberOfSongsSuggested(settings.songs_per_member, member.songs_to_suggest)} songs</span>
                                : <span>Has not decided</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
