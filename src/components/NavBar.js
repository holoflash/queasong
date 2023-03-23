import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to="/login">LOGIN</Link>
            <Link to="/">HOME</Link>
            <Link to="/submit">GUEST</Link>
            <Link to="/vote">vote</Link>
            <Link to="/share">share</Link>
        </nav>
    );
};

export default NavBar;