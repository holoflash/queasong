import { SongSearchList } from '../components/SongSearch'
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
                    <div>
                        <p>Hello {thisMember.name}!! Go ahead and add your songs.</p>
                        <p>Songs left to suggest: {thisMember.songs_to_suggest}</p>
                    </div>
                    <SongSearchList n={thisMember.songs_to_suggest} party_id={party_id} suggested_by={party_member} />
                </>
            )
            }
        </>
    );
};
