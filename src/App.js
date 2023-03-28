import './styles/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HostHomePage } from './pages/HostHomePage';
import { HostLoginPage } from './pages/HostLoginPage';
import { GuestHomePage } from './pages/GuestHomePage'
import { VotingPage } from './pages/VotingPage';
import { ResultsPage } from './pages/ResultsPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HostHomePage />} />
        <Route path='/login' element={<HostLoginPage />} />
        <Route path='/submit' element={<GuestHomePage />} />
        <Route path='/vote' element={<VotingPage />} />
        <Route path='/share' element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
