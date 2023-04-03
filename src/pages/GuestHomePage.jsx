import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SongSearch } from '../components/SongSearch'
import { AddSuggestion } from '../components/AddSuggestion'
import { getParty } from '../services/getParty';

export const GuestHomePage = () => {
    const { party_id } = useParams();
    const [party, setParty] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await getParty(party_id);
                setParty(response);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [party_id]);

    return (
        <div className="page">
            <label> Party ID:
                <h1>{party_id}</h1>
            </label>

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

            <SongSearch />
            <AddSuggestion />
        </div>
    );
};
