import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='add-space add-mass'>
            <Link to="/login">LOGIN</Link>
            <Link to="/">HOME</Link>
            <Link to="/submit">GUEST</Link>
            <Link to="/vote">VOTE</Link>
            <Link to="/share">SHARE</Link>
        </nav>
    );
};

export default NavBar;