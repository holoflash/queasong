import { songSearch } from "../services/songSearch"
import { useState } from "react";

export const SongSearch = () => {
    const [query, setQuery] = useState('');
    return (
        <>
            <h3>Search:</h3>
            <input
                required
                type="text"
                placeholder='Search for song'
                maxLength={50}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={() => songSearch(query)}>Click to search</button>
        </>)
}