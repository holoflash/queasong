import { Logout } from './Logout';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile';
import { useState } from 'react';

export const SpotifyProfile = () => {
    const profile = useSpotifyProfile();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {profile && (
                <div id="profile">
                    <div className='banner' onClick={handleToggle}>
                        <img src={profile.images[0].url} alt="Avatar" />
                        <span>{profile.display_name}</span>
                        <div className='toggle'>
                            {isOpen ? (
                                <svg role="img" height="16" width="16" aria-hidden="true" className="Svg-sc-ytk21e-0 ldgdZj eAXFT6yvz37fvS1lmt6k" viewBox="0 0 16 16" data-encore-id="icon">
                                    <path d="M14 10 8 4l-6 6h12z"></path>
                                </svg>
                            ) : (
                                <svg role="img" height="16" width="16" aria-hidden="true" className="Svg-sc-ytk21e-0 ldgdZj eAXFT6yvz37fvS1lmt6k" viewBox="0 0 16 16" data-encore-id="icon">
                                    <path d="M14 6L8 12 2 6h12z"></path>
                                </svg>
                            )}
                        </div>
                        {isOpen && (
                            <div className='menu'>
                                <ul>
                                    <li><Logout /></li>
                                </ul>

                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
