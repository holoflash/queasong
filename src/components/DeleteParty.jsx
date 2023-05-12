import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteParty } from '../services/deleteParty'

export const DeleteParty = ({ party_id }) => {
    const navigate = useNavigate();
    const [confirmed, setConfirmed] = useState(false);

    const deleteAllPartyData = async () => {
        await deleteParty(party_id)
        localStorage.removeItem("party_id");
        localStorage.removeItem("playlist_id");
        localStorage.removeItem("playlist_url");
        localStorage.removeItem("active")
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="custom-modal">
            {!confirmed && (
                <button className="delete-button" onClick={() => setConfirmed(true)}>Delete party</button>
            )}
            {confirmed && (
                <div className="yes-no">
                    <p>Are you sure? This action will delete all que-a-song data.
                        <a href="https://developer.spotify.com/documentation/web-api/concepts/playlists#:~:text=We%20have%20no%20endpoint%20for,you%20are%20simply%20unfollowing%20it." target='_blank' rel="noreferrer">(your Spotify playlist will not be deleted)</a></p>
                    <hr></hr>
                    <div className='buttons'>
                        <button className="yes" onClick={() => deleteAllPartyData()}>Yes</button>
                        <button className="no" onClick={() => setConfirmed(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};
