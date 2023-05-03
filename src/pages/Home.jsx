import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="navigation">
            <button onClick={() => navigate("/party")}>PARTY</button>
            <p>Login using your Spotify account, create a playlist and let your friends add songs to it via personalized links. Your friends don't need to have a Spotify account.</p>
            <button disabled onClick={() => navigate("/curate")}>CURATE</button>
            <p>Coming soon!</p>
            <p>Sign up as a currator using your Sotify account and let anyone suggest songs to your chosen playlists. Either via a private link or by finding your public profile on this website if you choose to opt in.</p>
            <button disabled onClick={() => navigate("/submit")}>SUBMIT</button>
            <p>Coming soon!</p>
            <p>Send songs to playlist curators that are on the platform. Find by genre or by private code.</p>
        </div>
    );
};
