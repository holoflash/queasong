import { DebounceInput } from 'react-debounce-input';
import { songSearch } from '../services/songSearch';

export const Searchbar = ({ query, setQuery, setSearchResults }) => {
    return (
        <div id="searchbar">
            <DebounceInput
                type="text"
                placeholder="What do you want to hear?"
                maxLength={800}
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck="false"
                value={query}
                debounceTimeout={400}
                onChange={async (e) => {
                    setQuery(e.target.value)
                    if (e.target.value !== "") {
                        setSearchResults(await songSearch(e.target.value))
                    }
                }}
            />
        </div>
    )
}