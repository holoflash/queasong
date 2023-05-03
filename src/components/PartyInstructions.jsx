export function PartyInstructions({ partyTitle }) {
    return (
        <p className="party-instructions">
            Select how many guests will be joining the party and how many songs each of
            you can pick. A playlist titled{" "}
            {partyTitle ? <span>{partyTitle} </span> : <span>Untitled Party </span>}
            will be created, and a special party link will be generated. Make sure to
            give each guest a unique name, as it will be used by your guests to sign
            in via the party link.
        </p>
    );
}
