import '../styles/song-search.scss';
import { songSearch } from '../services/songSearch';
import { useState } from 'react';
import { useSongsLeft } from '../hooks/useSongsLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { addSuggestion } from '../services/addSuggestion';
import { SongPreview } from './SongPreview';

export const SongSearch = ({ songs_to_suggest, party_id, suggested_by }) => {
    const [searchResults, setSearchResults] = useState([])
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [submittedSongs, setSubmittedSongs] = useState(0);
    const [query, setQuery] = useState("")
    const songsLeft = useSongsLeft(songs_to_suggest, submittedSongs);

    const submitSuggestions = () => {
        selectedSongs.forEach((song) => {
            addSuggestion(party_id, song.name, song.uri, suggested_by);
        });
        setSubmittedSongs(selectedSongs.length)
        setSelectedSongs([])
    };

    return (<>
        <div>
            <p>Hello {suggested_by}!! Go ahead and add your songs.</p>
            <p>Songs left to suggest: {songsLeft}</p>
        </div>
        <div id="song-search">
            {(songsLeft !== 0 && (songsLeft - selectedSongs.length !== 0))
                ? <>
                    <div id="searchbar">
                        <FontAwesomeIcon icon={faEye} size="xl" />
                        <input
                            type="text"
                            placeholder="Search for song"
                            maxLength={50}
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
                        <div className="dropdown">
                            <div className="dropdown-content">
                                {searchResults.map((result) => (
                                    <div className="result" key={result.uri}>
                                        <SongPreview result={result} />
                                        <p id="track-name">{result.name}</p>
                                        {result.artists.map((artist) => (
                                            <p id="track-artist" key={artist.id}>
                                                {artist.name}
                                            </p>
                                        ))}
                                        {selectedSongs.some((song) => song.uri === result.uri)
                                            ? (< button onClick={() => setSelectedSongs(selectedSongs.filter((s) => s.uri !== result.uri))}>Remove</button>)
                                            : (<button id="add" onClick={() => setSelectedSongs([...selectedSongs, result])}>
                                                <FontAwesomeIcon icon={faFloppyDisk} /> Add</button>)
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
                : <div>UR DONE!</div>}
            {
                selectedSongs.length > 0 && (
                    <div id="selected-songs">
                        <p>Selected songs:</p>
                        {selectedSongs.map((song) => (
                            <div key={song.uri}>
                                <SongPreview result={song} />
                                <p>{song.name}</p>
                                < button onClick={() => setSelectedSongs(selectedSongs.filter((s) => s.uri !== song.uri))}>Remove</button>
                            </div>
                        ))}
                        <button onClick={submitSuggestions}>Submit suggestions</button>
                    </div>
                )
            }
        </div >
    </>
    )
};
