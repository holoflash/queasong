import '../styles/song-search.scss';
import { songSearch } from '../services/songSearch';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { addSuggestion } from '../services/addSuggestion';
import { SongPreview } from './SongPreview';

export const SongSearch = ({ songs_to_suggest, party_id, suggested_by }) => {
    const [selectedSongs, setSelectedSongs] = useState([]);

    const addSong = (song, index, currentAudio) => {
        currentAudio.pause()
        setSelectedSongs([...selectedSongs, song]);
        setSongSearchResults((prevState) => {
            const newState = [...prevState];
            newState[index].searchResults = [];
            newState[index].query = '';
            newState[index].showSearch = false;
            return newState;
        });
    };

    const removeSong = (song) => {
        setSelectedSongs(selectedSongs.filter((s) => s.uri !== song.uri));
        setSongSearchResults((prevState) => {
            const newState = [...prevState];
            newState.forEach((searchResult, index) => {
                if (searchResult.searchResults.some((s) => s.uri === song.uri)) {
                    newState[index].showInput = true;
                }
            });
            return newState;
        });
    };

    const submitSuggestions = () => {
        selectedSongs.forEach((song) => {
            addSuggestion(party_id, song.name, song.uri, suggested_by);
        });
        setSelectedSongs([]);
    };

    const updateQuery = async (index, query) => {
        const searchResults = await songSearch(query);
        setSongSearchResults((prevState) => {
            const newState = [...prevState];
            newState[index].searchResults = searchResults;
            newState[index].showSearch = true;
            return newState;
        });
    };

    const [songSearchResults, setSongSearchResults] = useState(
        Array.from({ length: songs_to_suggest }).map(() => ({
            query: '',
            searchResults: [],
            showSearch: true
        }))
    );

    return (
        <div id="song-search">
            {songSearchResults.map((song, index) => (
                <div key={index}>
                    {song.showSearch && (
                        <div id="searchbar">
                            <FontAwesomeIcon icon={faEye} size="xl" />
                            <input
                                required
                                type="text"
                                placeholder="Search for song"
                                maxLength={50}
                                value={song.query}
                                key={index}
                                onChange={(e) => {
                                    const query = e.target.value;
                                    setSongSearchResults((prevState) => {
                                        const newState = [...prevState];
                                        newState[index].query = query;
                                        return newState;
                                    });
                                    if (query !== "") {
                                        updateQuery(index, query)
                                    };
                                }}
                            />
                        </div>
                    )}
                    {song.searchResults.length > 0 && (
                        <div className="dropdown">
                            <div className="dropdown-content">
                                {song.searchResults.map((result) => (
                                    <div className="result" key={result.uri}>
                                        <SongPreview
                                            result={result}
                                            addSong={addSong}
                                            index={index} />
                                        <p id="track-name">{result.name}</p>
                                        {result.artists.map((artist) => (
                                            <p id="track-artist" key={artist.id}>
                                                {artist.name}
                                            </p>
                                        ))}
                                        {selectedSongs.some((song) => song.uri === result.uri) &&
                                            < button onClick={() => removeSong(result)}>Remove</button>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            ))
            }
            {
                selectedSongs.length > 0 && (
                    <div id="selected-songs">
                        <p>Selected songs:</p>
                        {selectedSongs.map((song) => (
                            <div key={song.uri}>
                                <p>{song.name}</p>
                                <button onClick={() => removeSong(song)}>Remove</button>
                            </div>
                        ))}
                        <button onClick={submitSuggestions}>Submit suggestions</button>
                    </div>
                )
            }
        </div >
    );
};
