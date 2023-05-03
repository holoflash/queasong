import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export const PartyOptions = ({ numMembers, songsPerMember, members, handleMemberNameChange, setNumMembers, setSongsPerMember }) => {
    const MAX_GUESTS = 10;
    const MAX_SONGS_PER_GUEST = 10;

    return (
        <div className="party-options">
            <label className='number-of-guests'>
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
            <label className='songs-per-guest'>
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
            <div className="guests">
                {members.map((member, i) => (
                    <div className='guest' key={i}>
                        <FontAwesomeIcon icon={faUser} size="xl" />
                        <input
                            placeholder={'Guest ' + (i + 1) + ' name'}
                            type="text"
                            maxLength={50}
                            value={member.name}
                            onChange={(e) => handleMemberNameChange(i, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
