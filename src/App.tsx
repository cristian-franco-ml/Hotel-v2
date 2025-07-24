import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DateRangeProvider } from './contexts/DateRangeContext';
import { OverlayProvider } from './contexts/OverlayContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Dashboard from './components/Dashboard';
import HotelsPage from './components/HotelsPage';
import PerformancePage from './components/PerformancePage';
import StrategiesPage from './components/StrategiesPage';
import PreciosPage from './components/PreciosPage';
import MarketAnalysisPage from './components/MarketAnalysisPage';
import OfflineBanner from './components/ui/OfflineBanner';
import AuthForm from './components/AuthForm';
import RegisterForm from './components/RegisterForm';
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { UserProvider, useUser } from './contexts/UserContext';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';

function AppRoutes() {
  const { user, loading } = useUser();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  if (loading) return null;
  const isAuthRoute = !user && (location.pathname === '/auth' || location.pathname === '/register' || location.pathname === '/');
  // Centrado vertical para login/register
  const authContainerClass = isAuthRoute ? 'flex items-center justify-center min-h-screen' : '';
  return (
    <>
      {isAuthRoute && (
        <button
          type="button"
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          aria-label={darkMode ? 'Desactivar modo oscuro' : 'Activar modo oscuro'}
          title={darkMode ? 'Desactivar modo oscuro' : 'Activar modo oscuro'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}
      <OfflineBanner />
      <div className={(darkMode ? 'min-h-screen bg-gray-900 transition-colors duration-300 ' : 'min-h-screen bg-gray-50 transition-colors duration-300 ') + authContainerClass}>
        <Routes>
          <Route path="/register" element={!user ? <RegisterForm noMargin /> : <Navigate to="/dashboard" replace />} />
          <Route path="/auth" element={!user ? <AuthForm noMargin /> : <Navigate to="/dashboard" replace />} />
          <Route path="/" element={!user ? <AuthForm noMargin /> : <Navigate to="/dashboard" replace />} />
          {!user && <Route path="*" element={<Navigate to="/auth" replace />} />}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/rendimiento" element={<PerformancePage />} />
          <Route path="/estrategias" element={<StrategiesPage />} />
          <Route path="/precios" element={<PreciosPage />} />
          <Route path="/mercado" element={<MarketAnalysisPage />} />
        </Routes>
      </div>
    </>
  );
}

export function App() {
  return <ThemeProvider>
      <LanguageProvider>
        <DateRangeProvider>
          <OverlayProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </OverlayProvider>
        </DateRangeProvider>
      </LanguageProvider>
    </ThemeProvider>;
}