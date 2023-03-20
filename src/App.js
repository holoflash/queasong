import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile, getCurrentUserPlaylist } from './spotify';
import { catchErrors } from './utils';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    if (accessToken) {
      const fetchData = async () => {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      };
      catchErrors(fetchData());
    }
  }, []);


  useEffect(() => {
    if (accessToken && profile) {
      const fetchData = async () => {
        const { data } = await getCurrentUserPlaylist(profile.id);
        setPlaylists(data.items);
      };
      catchErrors(fetchData());
    }
  }, [profile]);
  console.log(playlists)

  return (<>
    <header className="header">
      {!token ? (
        <a className="App-link" href="http://localhost:8888/login">
          Log in to Spotify
        </a>
      ) : (
        <>
          <button onClick={logout}>Log Out</button>
          {profile && (
            <div className='profile'>
              {profile.images.length && profile.images[0].url && (
                <img id="profile-pic" src={profile.images[0].url} alt="Avatar" />
              )}
              <div>{profile.display_name}</div>
              <div>{profile.followers.total} Followers</div>
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
