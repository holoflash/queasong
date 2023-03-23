import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HostHomePage } from './pages/HostHomePage';
import { HostLoginPage } from './pages/HostLoginPage';
import { GuestHomePage } from './pages/GuestHomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HostHomePage />} />
        <Route path='/login' element={<HostLoginPage />} />
        <Route path='/submit' element={<GuestHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
