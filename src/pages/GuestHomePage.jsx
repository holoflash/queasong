import { AddSuggestion } from '../components/AddSuggestion';
import { SongSearch } from '../components/SongSearch';

export const GuestHomePage = () => {
    return (
        <div className="page">
            <SongSearch />
            <AddSuggestion />
        </div>
    );
};