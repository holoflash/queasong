import { useNavigate } from 'react-router-dom';
import { deleteParty } from '../services/deleteParty'

export const DeleteParty = ({ party_id }) => {
    const navigate = useNavigate();

    const deleteAllPartyData = async () => {
        await deleteParty(party_id)
        localStorage.removeItem("party_id");
        localStorage.removeItem("playlist_id");
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="delete-party">
            <button onClick={() => deleteAllPartyData()}>Delete party</button>
        </div>
    );
};
