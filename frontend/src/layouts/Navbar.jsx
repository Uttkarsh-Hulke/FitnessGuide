import React, { useState } from 'react';
import { 
  Activity, 
  Dumbbell, 
  Utensils, 
  TrendingUp, 
  BookOpen, 
  Sparkles, 
  Menu, 
  X,
  Compass,
  HeartPulse,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  activeTab, 
  setActiveTab, 
  hasAssessment,
  isDark,
  toggleTheme
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view, tab = 'overview') => {
    setCurrentView(view);
    if (tab) setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">FitGuide</span>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Platform
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Intelligent Lifestyle & Fitness Assessment</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-base font-semibold">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                currentView === 'landing' 
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </button>

            {hasAssessment && (
              <>
                <button
                  onClick={() => handleNavClick('dashboard', 'overview')}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                    currentView === 'dashboard' && activeTab === 'overview'
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Dashboard
                </button>

                <button
                  onClick={() => handleNavClick('dashboard', 'exercise')}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                    currentView === 'dashboard' && activeTab === 'exercise'
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Exercise Plan
                </button>

                <button
                  onClick={() => handleNavClick('dashboard', 'nutrition')}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                    currentView === 'dashboard' && activeTab === 'nutrition'
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Nutrition
                </button>

                <button
                  onClick={() => handleNavClick('dashboard', 'progress')}
                  className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                    currentView === 'dashboard' && activeTab === 'progress'
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Progress
                </button>
              </>
            )}

            <button
              onClick={() => handleNavClick('dashboard', 'knowledge')}
              className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                currentView === 'dashboard' && activeTab === 'knowledge'
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Knowledge Base
            </button>
          </nav>

          {/* Right Controls: Prominent Dark/Light Toggle + Assessment CTA */}
          <div className="flex items-center gap-3">
            
            {/* Desktop Segmented Theme Switcher */}
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700/80 shadow-xs">
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  !isDark 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Light Mode"
                aria-label="Light mode"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Switch to Dark Mode"
                aria-label="Dark mode"
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dark</span>
              </button>
            </div>

            {/* Mobile / Tablet Quick Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500" />
              )}
            </button>

            {/* Desktop Primary CTA */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => handleNavClick('assessment')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 active:translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{hasAssessment ? 'Retake Assessment' : 'Start Assessment'}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => handleNavClick('assessment')}
                className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              >
                {hasAssessment ? 'Retake' : 'Assess'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1.5 shadow-lg">
          
          {/* Mobile Theme Toggle Banner */}
          <div className="pb-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                {isDark ? (
                  <Moon className="w-5 h-5 text-indigo-400" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500" />
                )}
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {isDark ? 'Dark Mode' : 'Light Mode'} Active
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Switch color appearance
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                Switch to {isDark ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold flex items-center gap-3 cursor-pointer ${
              currentView === 'landing' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-5 h-5" />
            Home
          </button>

          {hasAssessment && (
            <>
              <button
                onClick={() => handleNavClick('dashboard', 'overview')}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold flex items-center gap-3 cursor-pointer ${
                  currentView === 'dashboard' && activeTab === 'overview' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <HeartPulse className="w-5 h-5" />
                Overview
              </button>

              <button
                onClick={() => handleNavClick('dashboard', 'exercise')}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold flex items-center gap-3 cursor-pointer ${
                  currentView === 'dashboard' && activeTab === 'exercise' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Dumbbell className="w-5 h-5" />
                Exercise Plan
              </button>

              <button
                onClick={() => handleNavClick('dashboard', 'nutrition')}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold flex items-center gap-3 cursor-pointer ${
                  currentView === 'dashboard' && activeTab === 'nutrition' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Utensils className="w-5 h-5" />
                Nutrition Guidance
              </button>

              <button
                onClick={() => handleNavClick('dashboard', 'progress')}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold flex items-center gap-3 cursor-pointer ${
                  currentView === 'dashboard' && activeTab === 'progress' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                Progress Tracking
              </button>
            </>
          )}

          <button
            onClick={() => handleNavClick('dashboard', 'knowledge')}
            className={`w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold flex items-center gap-3 cursor-pointer ${
              currentView === 'dashboard' && activeTab === 'knowledge' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Fitness Knowledge Base
          </button>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => handleNavClick('assessment')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>{hasAssessment ? 'Retake Assessment' : 'Start Full Assessment'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
