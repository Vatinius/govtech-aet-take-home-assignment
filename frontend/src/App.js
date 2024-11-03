import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import GameMenu from './pages/GameMenu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/home' element={<LandingPage />} />
          <Route path='/GameOne' element={<GameMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
