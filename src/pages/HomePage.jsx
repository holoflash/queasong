import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className='page'>
            <div className='logo'>que-a-song</div>
            <div id="home">
                <div>
                    <div>Create a Spotify playlist with your friends, using just one Spotify account!</div>
                    <p>1. Log in with your Spotify account.</p>
                    <p>2. Create a playlist and specify the number of guests, their names, and the number of songs each guest can add.</p>
                    <p>3. Share the unique song submission links with your guests. They do not require a Spotify account to participate.</p>
                    <p>4. Once all guests have added their chosen songs, add them to the playlist with a single click.</p>
                    <p>5. Enjoy your newly created playlist on Spotify!</p>
                </div>
                <div className='action'>
                    <h3>Ready to get started?</h3>
                    <button onClick={() => navigate("/party")}>LET'S GO!</button>
                </div>
            </div >
        </div>
    );
};
