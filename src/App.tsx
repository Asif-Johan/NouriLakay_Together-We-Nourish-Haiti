import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApplicationProvider } from './context/ApplicationContext';
import { InformProvider } from './context/InformContext';
import { HeatmapProvider } from './context/HeatmapContext';
import HomePage from './pages/HomePage';
import NGODashboard from './pages/ngo/NGODashboard';
import NGOInform from './pages/ngo/NGOInform';
import NGOApplication from './pages/ngo/NGOApplication';
import NGOProfile from './pages/ngo/NGOProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInform from './pages/admin/AdminInform';
import AdminApplications from './pages/admin/AdminApplications';
import AdminHeatmapManagement from './pages/admin/AdminHeatmapManagement';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <HeatmapProvider>
      <ApplicationProvider>
        <InformProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/ngo/dashboard" element={<NGODashboard />} />
                <Route path="/ngo/inform" element={<NGOInform />} />
                <Route path="/ngo/application" element={<NGOApplication />} />
                <Route path="/ngo/profile" element={<NGOProfile />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/inform" element={<AdminInform />} />
                <Route path="/admin/applications" element={<AdminApplications />} />
                <Route path="/admin/heatmap-management" element={<AdminHeatmapManagement />} />
              </Routes>
            </div>
          </Router>
        </InformProvider>
      </ApplicationProvider>
    </HeatmapProvider>
  );
}

export default App;