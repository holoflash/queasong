import { LOCALSTORAGE_KEYS } from "../services/spotifyAuthLocalStorage";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate()
    const logout = () => {
        for (const property in LOCALSTORAGE_KEYS) {
            localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
        }
        navigate('/login')
    }
    return (
        <>
            <button onClick={logout}>Log Out</button>
        </>
    )
}
