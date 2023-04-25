import { SongSearch } from '../components/SongSearch'
import { useParams } from 'react-router-dom';
import { usePartyData } from '../hooks/usePartyData';

export const Submit = () => {
    const { party_member, party_id } = useParams();
    const party = usePartyData(party_id);
    const thisMember = party?.members.find(member => member.name === party_member);

    return (
        <>
            {party && (
                <>
                    <SongSearch songs_to_suggest={thisMember.songs_to_suggest} party_id={party_id} suggested_by={party_member} />
                </>
            )
            }
        </>
    );
};
