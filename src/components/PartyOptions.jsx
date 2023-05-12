export const PartyOptions = ({ numMembers, songsPerMember, members, handleMemberNameChange, setNumMembers, setSongsPerMember, partyTitle, setPartyTitle }) => {
    const MAX_GUESTS = 10;
    const MAX_SONGS_PER_GUEST = 25;

    return (
        <>
            <h1>Create a New party:</h1>
            <p className="party-instructions">
                Title your playlist and add your friends. When you click "Create Party", a Spotify playlist will be generated in your account and unique submission
                links will be created to share with your friends.
            </p>
            <label className="title-label">
                Title:
                <input
                    className="party-title"
                    placeholder="Untitled Party"
                    type="text"
                    maxLength={100}
                    value={partyTitle}
                    onChange={(e) => setPartyTitle(e.target.value)}
                />
            </label>
            <div className="party-options">
                <label className='songs-per-guest'>
                    Number of songs per guest:
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
                <label className='number-of-guests'>
                    Number of guests:
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
            </div>
            <div className="guests">
                {members.map((member, i) => (
                    <label className='guest' key={member.name}>
                        Name:
                        <div>
                            <input
                                placeholder={'Guest ' + (i + 1)}
                                type="text"
                                maxLength={50}
                                value={member.name}
                                onChange={(e) => handleMemberNameChange(i, e.target.value)}
                            />
                        </div>
                    </label>
                ))}
            </div>
        </>
    );
};
