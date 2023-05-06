import { songSearch } from '../services/songSearch';
import { useState, useEffect, useRef } from 'react';
import { useSongsLeft } from '../hooks/useSongsLeft';
import { addSuggestion } from '../services/addSuggestion';
import { AudioPreview } from './AudioPreview';

export const SongSearch = ({ songs_to_suggest, party_id, suggested_by }) => {
    const [searchResults, setSearchResults] = useState([])
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [submittedSongs, setSubmittedSongs] = useState(0);
    const [query, setQuery] = useState("")
    const songsLeft = useSongsLeft(songs_to_suggest, submittedSongs);
    const audioRef = useRef(new Audio());

    const submitSuggestions = () => {
        selectedSongs.forEach((song) => {
            addSuggestion(party_id, song.name, song.uri, suggested_by);
        });
        setSubmittedSongs(selectedSongs.length)
        setSelectedSongs([])
    };

    useEffect(() => {
        function handleClickOutside(event) {
            const dropdown = document.querySelector('.dropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                setSearchResults([]);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [setSearchResults]);

    const chooseSong = (e, result) => {
        setSearchResults([]);
        e.currentTarget.classList.toggle("selected");
        setSelectedSongs((prev) =>
            prev.some((song) => song.uri === result.uri)
                ? prev.filter((song) => song.uri !== result.uri)
                : [...prev, result]
        );
    }

    return (<>
        <div id="song-search">
            {(songsLeft !== 0 && (songsLeft - selectedSongs.length !== 0))
                ? <>
                    <div id="searchbar">
                        <input
                            type="text"
                            placeholder="What do you want to hear?"
                            maxLength={800}
                            autoCorrect='off'
                            autoCapitalize='off'
                            spellCheck="false"
                            value={query}
                            onChange={async (e) => {
                                setQuery(e.target.value)
                                if (e.target.value !== "") {
                                    setSearchResults(await songSearch(e.target.value))
                                }
                            }}
                        />
                    </div>
                    {(searchResults.length > 0 && query !== "") && (
                        <div className="search-results">
                            {searchResults
                                .filter((result) => !selectedSongs.some((s) => (s.uri === result.uri) || ((s.name === result.name) && (s.artists[0].name === result.artists[0].name))))
                                .map((result, index) => (
                                    <div className="result" key={result.uri}>
                                        <AudioPreview audioRef={audioRef} index={index + 1} song={result} />
                                        <img
                                            src={result.album.images[0].url}
                                            height="40"
                                            alt=""
                                        />
                                        <div id="name-artist">
                                            <p id="name">{result.name}</p>
                                            <div id='artists'>
                                                {result.artists.map(artist => artist.name).join(', ')}
                                            </div>
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                chooseSong(e, result)
                                            }}
                                            className='add-song'
                                        >ADD</div>
                                    </div>
                                ))
                            }
                        </div>
                    )} </>
                : <div>
                    You are done!
                </div>}
            {selectedSongs.length > 0 && (
                <div className="selected-songs">
                    <p>Your suggestions:</p>
                    {selectedSongs.map((result, index) => (
                        <div
                            className="result"
                            key={result.uri}
                        >

                            <div id="number">{index + 1}</div>

                            <img
                                src={result.album.images[0].url}
                                height="40"
                                alt=""
                            />


                            <div id="name-artist">
                                <p id="name">{result.name}</p>
                                <div id="artists">
                                    {result.artists.map((artist, index) => (
                                        <div key={artist.id}>
                                            {artist.name}
                                            {index < result.artists.length - 1 && ", "}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                onClick={(e) => {
                                    chooseSong(e, result)

                                }}
                                className='add-song'
                            >REMOVE</div>
                        </div>
                    ))}
                    <button onClick={submitSuggestions}>Submit suggestions</button>
                </div>
            )}

        </div >
    </>
    )
};
