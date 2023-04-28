import { useNavigate } from 'react-router-dom';
import { deleteParty } from '../services/deleteParty'

export const DeleteParty = ({ party_id, playlist_id }) => {
    const navigate = useNavigate();

    const deleteAllPartyData = async () => {
        await deleteParty(party_id, playlist_id)
        localStorage.removeItem("party_id");
        localStorage.removeItem("playlist_id");
        localStorage.removeItem("token")
        navigate('/');
        window.location.reload();
    };

    return (
        <div id="logout">
            <button onClick={() => deleteAllPartyData()}>DELETE PARTY</button>
        </div>
    );
};
