export const PartyTitle = ({ partyTitle, setPartyTitle }) => {
    return (
        <label>
            Party title:
            <input
                placeholder="Untitled Party"
                type="text"
                value={partyTitle}
                onChange={(e) => setPartyTitle(e.target.value)}
            />
        </label>
    );
};

