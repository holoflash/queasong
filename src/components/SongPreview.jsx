import { useState, useRef } from "react";

export const SongPreview = ({ result }) => {
    const prevAudioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    console.log(isHovered)

    const handleAudio = (previewUrl) => {
        if (prevAudioRef.current) {
            prevAudioRef.current.pause();
        }

        const audio = new Audio(previewUrl);

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.addEventListener('canplay', () => {
                audio.play();
                setIsPlaying(true);
            });
        }

        prevAudioRef.current = audio;
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        handleAudio(result.preview_url);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsPlaying(false);
        if (prevAudioRef.current) {
            prevAudioRef.current.pause();
        }
    };

    return (

        <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            src={result.album.images[0].url}
            height="40"
            alt=""
        />
    )
}
