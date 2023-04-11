import '../styles/song-search.scss';
import { songSearch } from '../services/songSearch';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { addSuggestion } from '../services/addSuggestion';

export const SongSearchList = ({ n, party_id, suggested_by }) => {
    const [selectedSongs, setSelectedSongs] = useState([]);

    const addSong = (song, index) => {
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
        setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id));
        setSongSearchResults((prevState) => {
            const newState = [...prevState];
            newState.forEach((song, index) => {
                if (selectedSongs.find((s) => s.id === song.searchResults.id)) {
                    newState[index].showInput = false;
                } else {
                    newState[index].showInput = true;
                }
            });
            return newState;
        });
    };

    const submitSuggestions = () => {
        selectedSongs.forEach((song) => {
            addSuggestion(party_id, song.name, song.id, suggested_by);
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
        Array.from({ length: n }).map(() => ({
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
                            <button onClick={() => updateQuery(index, song.query)}>
                                <FontAwesomeIcon icon={faEye} size="xl" />
                            </button>
                            <input
                                required
                                type="text"
                                placeholder="Search for song"
                                maxLength={50}
                                value={song.query}
                                onChange={(e) => {
                                    const query = e.target.value;
                                    setSongSearchResults((prevState) => {
                                        const newState = [...prevState];
                                        newState[index].query = query;
                                        return newState;
                                    });
                                    updateQuery(index, query);
                                }}
                            />
                        </div>
                    )}
                    {song.searchResults.length > 0 && (
                        <div className="dropdown">
                            <div className="dropdown-content">
                                {song.searchResults.map((result) => (
                                    <div className="result" key={result.id}>
                                        <p id="track-name">{result.name}</p>
                                        {result.artists.map((artist) => (
                                            <p id="track-artist" key={artist.id}>
                                                {artist.name}
                                            </p>
                                        ))}
                                        {selectedSongs.some((song) => song.id === result.id) ? (
                                            <button onClick={() => removeSong(result)}>Remove</button>
                                        ) : (
                                            <button id="add" onClick={() => addSong(result, index)}>
                                                <FontAwesomeIcon icon={faFloppyDisk} /> Add
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            ))}
            {selectedSongs.length > 0 && (
                <div id="selected-songs">
                    <p>Selected songs:</p>
                    {selectedSongs.map((song) => (
                        <div key={song.id}>
                            <p>{song.name}</p>
                            <button onClick={() => removeSong(song)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={submitSuggestions}>Submit suggestions</button>
                </div>
            )}
        </div>
    );
};
