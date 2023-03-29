import '../styles/navigation.scss';
import { Link } from 'react-router-dom';
import { SpotifyProfile } from './SpotifyProfile';

const NavBar = () => {
    return (
        <div id="navbar">
            <SpotifyProfile />
            <nav>
                <Link to="/login">LOGIN</Link>
                <Link to="/">HOME</Link>
                <Link to="/submit">GUEST</Link>
                <Link to="/vote">VOTE</Link>
                <Link to="/share">SHARE</Link>
            </nav>
        </div>
    );
};

export default NavBar;
