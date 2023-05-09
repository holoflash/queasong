import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className='page'>
            <div className='logo'>que-a-song</div>
            <div id="home">
                <div>
                    <div>Create a Spotify playlist together with your friends - using only one Spotify account!</div>
                    <p>1. Log in with your Spotify account</p>
                    <p>2. Create a playlist and choose the number of guests, their names - and the number of songs each guest may add.</p>
                    <p>3. Send the unique song submission links to each guest. They DO NOT need to have a Spotify account!</p>
                    <p>4. When all guests are done - add all of their songs to the playlist with one click.</p>
                    <p>5. Enjoy your new playlist on Spotify!</p>
                    <h3>Ready?</h3>
                    <button onClick={() => navigate("/party")}>LETS GO!</button>
                </div>
            </div >
        </div>
    );
};
