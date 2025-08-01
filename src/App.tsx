// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './components /welcome/Welcome';
import { MainContent } from './components /MainContent';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/presupuesto" element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
