import { Logout } from './Logout';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';

export const SpotifyProfile = () => {
    const profile = useSpotifyProfile()

    return (
        <>
            {profile && (
                <div className='flex-col-center add-space'>
                    <div className='img-frame'>
                        <img src={profile.images[0].url} alt="Avatar" />
                    </div>

                    <div>{profile.display_name}</div>
                    <div>{profile.followers.total} Followers</div>
                    <Logout />
                </div>
            )}
        </>)
}