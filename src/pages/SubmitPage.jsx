import { SongSearch } from '../components/SongSearch'
import { AddSuggestion } from '../components/AddSuggestion'
import { useParams } from 'react-router-dom';
import { usePartyData } from '../hooks/usePartyData';

export const SubmitPage = () => {
    const { party_member, party_id } = useParams();
    const party = usePartyData(party_id);

    return (
        <>
            <p>Hello {party_member}!! Go ahead and add your songs!</p>

            <div className="page">
                <SongSearch />
                <AddSuggestion />
            </div>
            {party_id &&
                <label> Party ID:
                    <h1>{party_id}</h1>
                </label>
            }

            {party && (
                <>
                    <h2>Title: {party.party_title}</h2>
                    <h2>Hosted by: {party.host_name}</h2>
                    Members:
                    {party.members.map((member, i) => (
                        <div key={member._id}>
                            Name:
                            <div>{member.name}</div>
                            Songs to suggest:
                            <div>{member.songs_to_suggest}</div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};
