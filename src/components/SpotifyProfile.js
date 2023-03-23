import { logout } from '../services/spotifyAuthLocalStorage'
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';

export const SpotifyProfile = () => {
    const profile = useSpotifyProfile()

    return (
        <>
            {profile && (
                <div className='profile'>
                    {profile.images.length && profile.images[0].url && (
                        <img id="profile-pic" src={profile.images[0].url} alt="Avatar" />
                    )}
                    <div>{profile.display_name}</div>
                    <div>{profile.followers.total} Followers</div>
                    <button onClick={logout}>Log Out</button>
                </div>
            )}
        </>)
}