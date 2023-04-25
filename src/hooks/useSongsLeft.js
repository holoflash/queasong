import { useState, useEffect } from 'react';

export const useSongsLeft = (songsToSuggest, selectedSongs) => {
    const [songsLeft, setSongsLeft] = useState(songsToSuggest);

    useEffect(() => {
        setSongsLeft(songsToSuggest - selectedSongs.length);
    }, [songsToSuggest, selectedSongs]);

    return songsLeft;
};
