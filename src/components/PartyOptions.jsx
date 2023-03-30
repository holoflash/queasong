export const PartyOptions = ({ numMembers, songsPerMember, setNumMembers, setSongsPerMember }) => {
    const MAX_GUESTS = 10;
    const MAX_SONGS_PER_GUEST = 10;

    return (
        <div id="party-options">
            <label>
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
            <label>
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
        </div>
    );
};
