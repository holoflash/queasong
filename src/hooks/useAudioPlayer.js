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
        if (song === "stop") {
            setCurrentSong(null);
            setIsPlaying(false);
            audio.pause();
        }
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

    function pause() {
        const audio = audioRef.current;
        audio.pause()
        setCurrentSong(null);
        setIsPlaying(false);
    }

    return { play, pause, currentSong, isPlaying };
}