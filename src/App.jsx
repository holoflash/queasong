import './styles/App.scss';
import './fonts/NunitoSans_10pt-Regular.ttf'
import './fonts/NunitoSans_10pt-Bold.ttf'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PartyPage } from './pages/PartyPage';
import { PartySubmitPage } from './pages/PartySubmitPage';
import { HomePage } from './pages/HomePage';
import { EndPage } from './pages/EndPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/party" element={<PartyPage />} />
                <Route path="/:party_member/:party_id" element={<PartySubmitPage />} />
                <Route path="/end" element={<EndPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
