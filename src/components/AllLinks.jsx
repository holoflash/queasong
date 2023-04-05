import { useNavigate } from 'react-router-dom';
import { PartyLink } from "./PartyLink"

export const AllLinks = ({ partyData, profile, party_id }) => {
    const navigate = useNavigate();
    return (
        <div id="submission-links">
            <h1>{partyData.party_title}</h1>
            {partyData.members.map((member, i) =>
                <div key={i} id="submission-link">
                    {member.name}
                    {member.name !== profile.display_name &&
                        <PartyLink party_member={member.name} party_id={party_id} />}
                    {member.name === profile.display_name &&
                        <button onClick={() => navigate(`/${member.name}/${party_id}`)}>GO TO SUGGESTIONS PAGE</button>}

                </div>
            )}
        </div>
    )
}
