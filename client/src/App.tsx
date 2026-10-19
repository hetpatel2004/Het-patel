import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PortfolioPage } from './pages/PortfolioPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { trackVisit } from './services/analytics';

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Silently track public page visits (exclude admin & login routes)
    if (!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/login')) {
      trackVisit();
    }
  }, [location.pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        {/* Public Portfolio (No login button or info in UI) */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Secret / Direct URL Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Dashboard routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Catch-all redirect to public portfolio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
