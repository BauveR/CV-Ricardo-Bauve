import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./components /welcome/Welcome";
import { MainContent } from "./components /MainContent";
import { PortafolioGrid } from "./components /portafolio/Portafolio"; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/presupuesto" element={<MainContent />} />
        <Route path="/portafolio" element={<PortafolioGrid />} /> {/* NUEVA */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
