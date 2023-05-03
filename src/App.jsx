import './styles/App.scss';
import './fonts/NunitoSans_10pt-Regular.ttf'
import './fonts/NunitoSans_10pt-Bold.ttf'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PartyPage } from './pages/PartyPage';
import { PartySubmitPage } from './pages/PartySubmitPage';
import { CuratorPage } from './pages/CuratorPage';
import { SubmitToCuratorsPage } from './pages/SubmitToCuratorsPage';
import { Home } from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/party" element={<PartyPage />} />
                <Route path="/curate" element={<CuratorPage />} />
                <Route path="/submit" element={<SubmitToCuratorsPage />} />
                <Route path="/:party_member/:party_id" element={<PartySubmitPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
