import { usePartyData } from "../hooks/usePartyData";
import { useNavigate } from 'react-router-dom';
import { addSongsToPlaylist } from "../services/addSongsToPlaylist";
import { deleteParty } from '../services/deleteParty'

export const AddToPlaylist = ({ party_id, playlist_id }) => {
    const party = usePartyData(party_id);
    const uris = party?.suggestions.map((song) => song.song_uri)
    const navigate = useNavigate();

    const letsGo = async () => {
        await addSongsToPlaylist(playlist_id, uris)
        await deleteParty(party_id)
        localStorage.removeItem("party_id");
        localStorage.removeItem("playlist_id");
        navigate('/');
        window.location.reload();
    }

    return (
        <button onClick={async () => await letsGo()}>Add all to playlist</button>
    );
};
