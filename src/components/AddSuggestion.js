import { addSuggestion } from '../services/addSuggestion';

export const AddSuggestion = () => {
    return (
        <>
            <button onClick={() => addSuggestion(
                {
                    song_info: 'Pooo Sonh',
                    song_url: 'a website',
                    approved_by: ["Billy", "Yoma Ma"],
                    suggested_by: 'Billy'
                }
            )}>addSuggestion</button>
        </>)
}