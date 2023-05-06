import { useState, useRef, useEffect } from 'react';

const useSongPreview = (songs) => {
    const [currentSong, setCurrentSong] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();

    function handlePlay(song) {
        const audio = audioRef.current;
        if (song === currentSong && isPlaying) {
            setIsPlaying(false);
            audio?.pause();
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
            audio?.pause();
            audio?.setAttribute('src', song.previewUrl);
            audio?.play();
        }
    }
    useEffect(() => {
        const audio = audioRef.current;
        function handleEnded() {
            setIsPlaying(false);
        }
        audio?.addEventListener('ended', handleEnded);
        return () => {
            audio?.removeEventListener('ended', handleEnded);
        };
    }, []);
}