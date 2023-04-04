import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HostHomePage } from './pages/HostHomePage';
import { HostLoginPage } from './pages/HostLoginPage';
import { SubmitPage } from './pages/SubmitPage';
import { VotingPage } from './pages/VotingPage';
import { ResultsPage } from './pages/ResultsPage';
import NavBar from './components/NavBar';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HostHomePage />} />
                <Route path="/login" element={<HostLoginPage />} />
                <Route path="/vote" element={<VotingPage />} />
                <Route path="/share" element={<ResultsPage />} />
                <Route path="/:party_member/:party_id" element={<SubmitPage />} />
                {/* For development */}
                <Route path="/submit" element={<SubmitPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
