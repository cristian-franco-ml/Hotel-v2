import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './components/Dashboard';
import HotelsPage from './components/HotelsPage';
import PerformancePage from './components/PerformancePage';
import StrategiesPage from './components/StrategiesPage';
import PreciosPage from './components/PreciosPage';
import MarketAnalysisPage from './components/MarketAnalysisPage';
export function App() {
  return <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/rendimiento" element={<PerformancePage />} />
          <Route path="/estrategias" element={<StrategiesPage />} />
          <Route path="/precios" element={<PreciosPage />} />
          <Route path="/mercado" element={<MarketAnalysisPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>;
}