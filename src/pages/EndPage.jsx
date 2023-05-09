import { SpotifyProfile } from "../components/SpotifyProfile";
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { useNavigate } from 'react-router-dom';

export const EndPage = () => {
    const navigate = useNavigate();
    const profile = useSpotifyProfile();
    const status = localStorage.getItem("active")

    return (<>
        {(profile && !status) && (
            <>
                <SpotifyProfile />
                <div className="page">
                    <div id="end">
                        <p>All of your submissions have been added to the playlist</p>
                        <a href={localStorage.getItem("playlist_url")} target='_blank' rel="noreferrer"><button>GO TO PLAYLIST</button></a>
                        <button onClick={() => navigate("/party")}>CREATE A NEW PLAYLIST</button>
                    </div>
                </div></>)}
    </>
    )
}