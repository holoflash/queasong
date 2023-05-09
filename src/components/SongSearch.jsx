import { useState } from 'react';
import { addSuggestion } from '../services/addSuggestion';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useSongsLeft } from '../hooks/useSongsLeft';
import { SearchResult } from './SearchResult';
import { Searchbar } from './Searchbar';
import { useNavigate } from 'react-router-dom';

export const SongSearch = ({ songs_to_suggest, party_id, suggested_by }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const songsLeft = useSongsLeft(songs_to_suggest, selectedSongs);
    const [query, setQuery] = useState("");
    const { play, pause } = useAudioPlayer();
    const navigate = useNavigate();

    document.addEventListener("click", (e) => {
        if (e.target.tagName !== "IMG") {
            pause()
        }
    })

    const submitSuggestions = () => {
        selectedSongs.forEach((song) => {
            addSuggestion(party_id, song.uri, suggested_by);
        });
        setSelectedSongs([])
        if ((localStorage.getItem("spotify_access_token") !== null) && songsLeft === 0) {
            navigate('/party');
            window.location.reload()
            return
        }
    };

    const chooseSong = (e, result) => {
        setSearchResults([])
        e.currentTarget.classList.toggle("selected");
        setSelectedSongs((prev) =>
            prev.some((song) => song.uri === result.uri)
                ? prev.filter((song) => song.uri !== result.uri)
                : [...prev, result]
        );
    }

    return (<>
        <div id="song-search">
            {(songs_to_suggest !== 0) && (songsLeft !== 0)
                && <>
                    <div className='songs-left'>You have {songsLeft} song/s left to choose</div>
                    <Searchbar query={query} setQuery={setQuery} setSearchResults={setSearchResults} />
                    {(searchResults.length > 0 && query !== "") && (
                        <div className="search-results">
                            {searchResults
                                .filter((result) => !selectedSongs.some((s) => (s.uri === result.uri) || ((s.name === result.name) && (s.artists[0].name === result.artists[0].name))))
                                .map((result) => (
                                    <SearchResult key={result.uri} play={play} chooseSong={chooseSong} result={result} action={"ADD"} />
                                ))
                            }
                        </div>
                    )} </>
            }
            {selectedSongs.length > 0 && (
                <div className="selected">
                    <p className='suggestions'>SUGGESTIONS</p>
                    {selectedSongs.map((result) => (
                        <SearchResult key={result.uri} play={play} chooseSong={chooseSong} result={result} action={"DEL"} />
                    ))}
                    <button onClick={submitSuggestions}>Submit suggestions</button>
                </div>
            )}
            {songs_to_suggest === 0 &&
                <div className='complete'>Your songs have been submited.</div>}
        </div >
    </>
    )
};
