import { useState, useEffect } from 'react';
import { accessToken, logout } from './services/spotifyAuthLocalStorage'
import { getCurrentUserProfile } from './services/getCurrentUserProfile';
import { getCurrentUserPlaylists } from './services/getCurrentUserPlaylists'
import { catchErrors } from './utils';
import { submitParty } from './services/createParty';
import { addSuggestion } from './services/addSuggestion';
import { usePartyId } from './hooks/usePartyId'
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    setToken(accessToken)
    if (token) {
      const fetchData = async () => {
        const { data } = await getCurrentUserProfile(token);
        setProfile(data);
      };
      catchErrors(fetchData());
    }
  }, [token]);


  useEffect(() => {
    if (token && profile) {
      const fetchData = async () => {
        const { data } = await getCurrentUserPlaylists(profile.id, token);
        setPlaylists(data.items);
      };
      catchErrors(fetchData());
    }
  }, [profile, token]);

  return (<>
    <header className="header">
      <div>{usePartyId()}</div>
      {!token ? (
        <a className="App-link" href="http://localhost:8888/login">
          Log in to Spotify
        </a>
      ) : (
        <>
          {profile && (
            <div className='profile'>
              {profile.images.length && profile.images[0].url && (
                <img id="profile-pic" src={profile.images[0].url} alt="Avatar" />
              )}
              <div>{profile.display_name}</div>
              <div>{profile.followers.total} Followers</div>
              <button onClick={logout}>Log Out</button>
              <button onClick={submitParty}>postParty</button>
              <button onClick={() => addSuggestion(
                {
                  song_info: 'Pooo Sonh',
                  song_url: 'a website',
                  approved_by: ["Billy", "Yoma Ma"],
                  suggested_by: 'Billy'
                }
              )}>addSuggestion</button>
            </div>
          )}
        </>
      )}
    </header>
    {
      playlists && (
        <div className='playlists'>
          {playlists.map((playlist) => (
            <div className='playlist' key={playlist.id}>
              <h2>{playlist.name}</h2>
              <a href={playlist.external_urls.spotify}>
                <img src={playlist.images[0].url} alt="playlist" width="400" height="400" />
              </a>
              <p>{playlist.description}</p>
            </div>

          ))}
        </div>
      )
    }
  </>
  );
}

export default App;
