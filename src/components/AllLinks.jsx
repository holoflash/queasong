import { PartyLink } from "./PartyLink"

export const AllLinks = ({ partyData, party_id }) => {
    return (
        <>
            <div id="submission-links">
                {partyData.members.map((member, i) =>
                    <div key={i} id="submission-link">
                        {partyData.members.indexOf(member) !== 0 &&
                            <>
                                {member.name}'s submission link
                                <PartyLink party_member={member.name} party_id={party_id} />
                            </>}
                    </div>
                )}
            </div>
        </>
    )
}
