import { SongSearch } from '../components/SongSearch'
import { useParams } from 'react-router-dom';
import { usePartyData } from '../hooks/usePartyData';

const SongSearchList = ({ n, party_id, suggested_by }) => {
    const songSearchComponents = Array.from({ length: n }).map((_, index) => (
        <SongSearch key={index} party_id={party_id} suggested_by={suggested_by} />
    ));
    return <div>{songSearchComponents}</div>;
};

export const SubmitPage = () => {
    const { party_member, party_id } = useParams();
    const party = usePartyData(party_id);

    const thisMember = party?.members.find(member => member.name === party_member);
    return (
        <>
            {party && (
                <div className="page">
                    <div>
                        <p>Hello {thisMember.name}!! Go ahead and add your songs.</p>
                        <p>Songs left to suggest: {thisMember.songs_to_suggest}</p>
                    </div>
                    <SongSearchList n={thisMember.songs_to_suggest} party_id={party_id} suggested_by={party_member} />
                </div>
            )
            }

        </>
    );
};
