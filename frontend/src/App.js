import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/home' element={<LandingPage />} />
          <Route path='/GameOne' element={<h1>Game One</h1>} />
          <Route path='/GameTwo' element={<h1>Game Two</h1>} />
          <Route path='/GameThree' element={<h1>Game Three</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
