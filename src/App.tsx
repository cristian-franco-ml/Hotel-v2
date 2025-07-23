import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

export function App() {
  const { user, loading } = useUser();
  if (loading) return null; // O un loader si prefieres
  return <ThemeProvider>
      <LanguageProvider>
        <DateRangeProvider>
          <OverlayProvider>
            <BrowserRouter>
              <OfflineBanner />
              <Routes>
                <Route path="/register" element={!user ? <RegisterForm /> : <Navigate to="/dashboard" replace />} />
                <Route path="/auth" element={!user ? <AuthForm /> : <Navigate to="/dashboard" replace />} />
                <Route path="/" element={!user ? <AuthForm /> : <Navigate to="/dashboard" replace />} />
                {!user && <Route path="*" element={<Navigate to="/auth" replace />} />}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/rendimiento" element={<PerformancePage />} />
                <Route path="/estrategias" element={<StrategiesPage />} />
                <Route path="/precios" element={<PreciosPage />} />
                <Route path="/mercado" element={<MarketAnalysisPage />} />
              </Routes>
            </BrowserRouter>
          </OverlayProvider>
        </DateRangeProvider>
      </LanguageProvider>
    </ThemeProvider>;
}