export const PartyTitle = ({ partyTitle, setPartyTitle }) => {
    return (
        <label className="party-title">
            Party title:
            <input
                placeholder="Untitled Party"
                type="text"
                maxLength={100}
                value={partyTitle}
                onChange={(e) => setPartyTitle(e.target.value)}
            />
        </label>
    );
};

