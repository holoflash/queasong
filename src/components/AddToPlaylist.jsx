import { usePartyData } from "../hooks/usePartyData";
import { addSongsToPlaylist } from "../services/addSongsToPlaylist";

export const AddToPlaylist = ({ party_id, playlist_id }) => {
    const party = usePartyData(party_id);
    const uris = party?.suggestions.map((song) => song.song_uri)

    const letsGo = async () => {
        await addSongsToPlaylist(playlist_id, uris)
    }

    return (
        <div id="addSongs">
            <button onClick={async () => await letsGo()}>ADD SONGS</button>
        </div>
    );
};
