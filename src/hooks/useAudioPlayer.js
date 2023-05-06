import { useState, useEffect, useRef } from 'react';

export const useAudioPlayer = () => {
    const audioRef = useRef(new Audio());
    const [currentSong, setCurrentSong] = useState(null);
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
    }, [isPlaying]);

    function play(song) {
        const audio = audioRef.current;
        audio.pause();
        if (song === currentSong && isPlaying) {
            setCurrentSong(null);
            setIsPlaying(false);
            audio.pause();
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
            audio.setAttribute('src', song.preview_url);
            audio.play();
        }
    }

    return { play, currentSong, isPlaying };
}