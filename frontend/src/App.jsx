import React, { useState, useEffect } from 'react';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import LandingPage from './pages/LandingPage';
import AssessmentWizard from './components/assessment/AssessmentWizard';
import DashboardPage from './pages/DashboardPage';
import { useTheme } from './hooks/useTheme';
import { getLatestAssessment, getAssessmentById } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [assessment, setAssessment] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Dark / Light Theme hook
  const { isDark, toggleTheme } = useTheme();

  // Load existing assessment on startup if available
  useEffect(() => {
    async function init() {
      try {
        const latest = await getLatestAssessment();
        if (latest) {
          setAssessment(latest);
        }
      } catch (err) {
        console.warn('Init error fetching latest assessment:', err);
      } finally {
        setLoadingInitial(false);
      }
    }
    init();
  }, []);

  const handleAssessmentCompleted = (result) => {
    setAssessment(result);
    setCurrentView('dashboard');
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoricalAssessment = async (id) => {
    try {
      const data = await getAssessmentById(id);
      if (data) {
        setAssessment(data);
        setCurrentView('dashboard');
        setActiveTab('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('Error loading assessment by id:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 font-sans selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-200">
      
      {/* Sticky Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAssessment={Boolean(assessment)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Body Routing */}
      <div className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartAssessment={() => {
              setCurrentView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'assessment' && (
          <AssessmentWizard
            onComplete={handleAssessmentCompleted}
            onCancel={() => {
              setCurrentView(assessment ? 'dashboard' : 'landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            assessment={assessment}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onRetakeAssessment={() => {
              setCurrentView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectAssessment={handleSelectHistoricalAssessment}
          />
        )}
      </div>

      {/* Global Footer */}
      <Footer
        setCurrentView={setCurrentView}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

    </div>
  );
}
