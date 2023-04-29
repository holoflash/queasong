import './styles/App.scss';
import './fonts/NunitoSans_10pt-Regular.ttf'
import './fonts/NunitoSans_10pt-Bold.ttf'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HostHomePage } from './pages/HostHomePage';
import { SubmitPage } from './pages/SubmitPage';
import { VotingPage } from './pages/VotingPage';
import { ResultsPage } from './pages/ResultsPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HostHomePage />} />
                <Route path="/vote" element={<VotingPage />} />
                <Route path="/share" element={<ResultsPage />} />
                <Route path="/:party_member/:party_id" element={<SubmitPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
