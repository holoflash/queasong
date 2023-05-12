import { usePartyData } from "../hooks/usePartyData";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSongsToPlaylist } from "../services/addSongsToPlaylist";
import { deleteParty } from '../services/deleteParty'

export const AddToPlaylist = ({ party_id, playlist_id }) => {
    const [confirmed, setConfirmed] = useState(false);
    const party = usePartyData(party_id);
    const uris = party?.suggestions.map((song) => song.song_uri)
    const navigate = useNavigate();

    const addToPlaylist = async () => {
        await addSongsToPlaylist(playlist_id, uris)
        await deleteParty(party_id)
        localStorage.removeItem("party_id")
        localStorage.removeItem("playlist_id")
        navigate('/end');
        window.location.reload();
    }

    return (

        <div className="custom-modal">
            {!confirmed && (
                <button className="add-button" onClick={() => setConfirmed(true)}>Add all to playlist</button>
            )}
            {confirmed && (
                <div className="yes-no">
                    <p>Are you sure? Once you add all songs to the playlist, you will not be able to add any more songs.
                        This action cannot be undone.</p>
                    <hr></hr>
                    <div className='buttons'>
                        <button className="yes" onClick={async () => await addToPlaylist()}>Yes</button>
                        <button className="no" onClick={() => setConfirmed(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};
