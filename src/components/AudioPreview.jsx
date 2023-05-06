import { useState, useEffect } from 'react';

export const AudioPreview = ({ index, song, audioRef }) => {
    const [currentSong, setCurrentSong] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        function handleEnded() {
            setIsPlaying(false);
        }

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audioRef]);


    useEffect(() => {
        if (!isPlaying) {
            audioRef.current.removeAttribute('src');
        }
    }, [isPlaying, audioRef]);

    function handlePlay(song) {
        const audio = audioRef.current;
        audio?.pause();
        if (song === currentSong && isPlaying) {
            setCurrentSong();
            setIsPlaying(false);
            audio?.pause();
            return
        }
        setCurrentSong(song);
        setIsPlaying(true);
        audio?.setAttribute('src', song.preview_url);
        audio?.play();
    }

    return (
        <>
            {/* {isPlaying && song === currentSong ?
                <div
                    onClick={() => handlePlay(song)}
                    className='loader'>
                    <div className="loading">
                        <div className="load"></div>
                        <div className="load"></div>
                        <div className="load"></div>
                        <div className="load"></div>
                    </div>
                </div>
                : */}
            <div
                onClick={() => handlePlay(song)}
                id="number">{index}</div>

        </>
    );
};
