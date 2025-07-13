import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StatsProvider } from './contexts/StatsContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <StatsProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/ordenes" element={<OrdersPage />} />
              <Route path="/detalles-orden" element={<OrderDetailsPage />} />
              <Route path="/acerca-de" element={<AboutPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </StatsProvider>
  );
}

export default App;
