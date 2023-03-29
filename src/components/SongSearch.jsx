import '../styles/song-search.scss';
import { songSearch } from '../services/songSearch';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

export const SongSearch = () => {
    const [query, setQuery] = useState('');
    return (
        <div id="song-search">
            <button onClick={() => songSearch(query)}><FontAwesomeIcon icon={faEye} size="xl" /></button>
            <input
                required
                type="text"
                placeholder="Search for song"
                maxLength={50}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};
