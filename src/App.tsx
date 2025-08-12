import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./components /welcome/Welcome";
import { MainContent } from "./components /cv/MainContent";
import { ProductGrid } from "./components /portafolio/ProductGrid";
import { ProductDetailPage } from "./components /portafolio/ProductDetailPage"; // ← NUEVO

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/presupuesto" element={<MainContent />} />
        <Route path="/portafolio" element={<ProductGrid />} />
        <Route path="/product/:id" element={<ProductDetailPage />} /> {/* ← NUEVO */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
