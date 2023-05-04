import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer'

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='page'>
            <h1 className='logo'>que-a-song</h1>
            <div id="home">
                <div>
                    <p>Login using your Spotify account, create a playlist and let your friends add songs to it via personalized links. Your friends don't need to have a Spotify account.</p>
                    <button onClick={() => navigate("/party")}>PARTY</button>
                </div>
                <div className='dead'>
                    <p>Sign up as a currator using your Sotify account and let anyone suggest songs to your chosen playlists. Either via a private link or by finding your public profile on this website if you choose to opt in. Coming soon!</p>
                    <button disabled onClick={() => navigate("/curate")}>CURATE</button>

                </div>
                <div className='dead'>
                    <p>Send songs to playlist curators that are on the platform. Find by genre or by private code. Coming soon!</p>
                    <button disabled onClick={() => navigate("/submit")}>SUBMIT</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};
