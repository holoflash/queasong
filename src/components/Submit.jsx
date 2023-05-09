import { SongSearch } from '../components/SongSearch'
import { useParams } from 'react-router-dom';
import { usePartyData } from '../hooks/usePartyData';

export const Submit = () => {
    const { party_member, party_id } = useParams();
    const party = usePartyData(party_id);
    const thisMember = party?.members.find(member => member.name === party_member);

    return (
        <>
            <div className='logo'>que-a-song</div>
            {party && (
                <div id='submit'>
                    <h1>Hey {thisMember.name}!</h1>
                    <SongSearch songs_to_suggest={thisMember.songs_to_suggest} party_id={party_id} suggested_by={party_member} />
                </div>
            )
            }
        </>
    );
};
