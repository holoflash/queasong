import { LS_KEYS } from '../services/spotifyAuthLocalStorage';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();
    const logout = () => {
        for (const property in LS_KEYS) {
            localStorage.removeItem(LS_KEYS[property]);
            localStorage.removeItem("token")
        }
        navigate('/');
    };
    return (
        <div id="logout">
            <div onClick={logout}>Log out</div>
        </div>
    );
};
