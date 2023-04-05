import { LS_KEYS } from '../services/spotifyAuthLocalStorage';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();
    const logout = () => {
        for (const property in LS_KEYS) {
            localStorage.removeItem(LS_KEYS[property]);
        }
        navigate('/');
        window.location.reload();
    };
    return (
        <div id="logout">
            <button onClick={logout}>Log Out</button>
        </div>
    );
};
