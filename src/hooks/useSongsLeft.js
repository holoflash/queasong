import { useState, useEffect } from 'react';

export const useSongsLeft = (songsToSuggest, submittedSongs) => {
    const [songsLeft, setSongsLeft] = useState(songsToSuggest);

    useEffect(() => {
        setSongsLeft(songsToSuggest - submittedSongs);
    }, [songsToSuggest, submittedSongs]);

    return songsLeft;
};
