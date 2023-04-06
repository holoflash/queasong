import '../styles/song-search.scss';
import { songSearch } from '../services/songSearch';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { addSuggestion } from '../services/addSuggestion';

const SongSearch = ({ party_id, suggested_by }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null)

    const displayResults = async (query) => {
        setSearchResults(await songSearch(query))
    }

    return (
        <div id="song-search">
            {!searchResults &&
                <div id="searchbar">
                    <button onClick={() => displayResults(query)}><FontAwesomeIcon icon={faEye} size="xl" /></button>
                    <input
                        required
                        type="text"
                        placeholder="Search for song"
                        maxLength={50}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>}
            {searchResults && (
                searchResults.map((result, i) =>

                    <div id="search-results" key={i}
                        onClick={() => addSuggestion(party_id, result.name, result.id, suggested_by)}>
                        <p id="track-name"> {result.name}</p>
                        {result.artists.map((artist, i) =>
                            <p id="track-artist" key={i}>{artist.name}</p>
                        )}
                    </div>)
            )}
        </div>
    );
};

export const SongSearchList = ({ n, party_id, suggested_by }) => {
    const songSearchComponents = Array.from({ length: n }).map((_, index) => (
        <SongSearch key={index} party_id={party_id} suggested_by={suggested_by} />
    ));

    return (
        <div>
            {songSearchComponents}
        </div>
    );
};
