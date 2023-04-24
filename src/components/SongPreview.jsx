import { useState, useRef } from "react";

export const SongPreview = ({ result, addSong, index }) => {
    const prevAudioRef = useRef(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const handleMouseOver = (previewUrl) => {
        if (prevAudioRef.current) {
            prevAudioRef.current.pause();
        }
        const audio = new Audio(previewUrl);
        setCurrentAudio(audio);
        audio.addEventListener('canplay', () => {
            audio.play();
        });
        prevAudioRef.current = audio;
    };

    const handleMouseLeave = () => {
        currentAudio.pause();
        setCurrentAudio(null);
    };
    return (
        <img
            src={result.album.images[0].url}
            height="100"
            alt=""
            onMouseOver={() => handleMouseOver(result.preview_url)}
            onMouseLeave={handleMouseLeave}
            onClick={() => addSong(result, index, currentAudio)}
        />
    )
}