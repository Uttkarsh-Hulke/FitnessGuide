import React from 'react';
import { Activity, ShieldAlert, Sun, Moon } from 'lucide-react';

export default function Footer({ setCurrentView, setActiveTab, isDark, toggleTheme }) {
  const navigateTo = (view, tab = 'overview') => {
    setCurrentView(view);
    if (tab) setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">FitGuide</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                SaaS Edition
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An intelligent personal fitness and lifestyle assessment platform. Providing deterministic calculations, explainable guidance, and tailored action plans.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
              <span>7-Pillar Scoring</span>
              <span>•</span>
              <span>Mifflin-St Jeor</span>
              <span>•</span>
              <span>Explainable AI</span>
            </div>

            {/* Quick theme toggle in footer */}
            {toggleTheme && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Switch to Light Appearance</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Switch to Dark Appearance</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => navigateTo('assessment')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Start Assessment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'overview')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Wellness Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'exercise')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Exercise Splits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'nutrition')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Target Nutrition
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'progress')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Progress Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Guides</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'knowledge')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Understanding BMI Nuances
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'knowledge')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Sleep & Recovery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'knowledge')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Strength vs. Cardio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('dashboard', 'knowledge')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Smart Food Swaps
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Health Disclaimer Callout */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-slate-200 font-bold block mb-1">Health & Educational Disclaimer</strong>
            FitGuide provides general fitness and wellness information for educational purposes. It does not diagnose medical conditions or replace advice from a qualified healthcare professional. Always consult a physician before beginning any strenuous physical exercise program or making drastic dietary modifications.
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} FitGuide Health Systems. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Deterministic Metrics</span>
            <span>Mifflin-St Jeor</span>
            <span>Privacy First</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
