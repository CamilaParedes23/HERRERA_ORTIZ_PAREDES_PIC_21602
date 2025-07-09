import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventario from './components/Inventario/Inventario';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<h2>Bienvenido al sistema</h2>} />
          <Route path="/inventario" element={<Inventario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
