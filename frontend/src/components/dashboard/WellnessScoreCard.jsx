import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, Activity } from 'lucide-react';

export default function WellnessScoreCard({ wellnessScore }) {
  const [showDetails, setShowDetails] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  const targetScore = wellnessScore?.totalScore || 75;
  const breakdown = wellnessScore?.breakdown || [];

  // Animate count-up from 0 -> targetScore over 1.2s
  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimatedScore(targetScore);
      return;
    }

    let start = 0;
    const duration = 1200; // 1.2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = targetScore / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [targetScore]);

  // SVG Radial Geometry
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-7 relative overflow-hidden transition-colors duration-200 animate-reveal">
      
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Animated Score & Tier */}
        <div className="flex items-center gap-6">
          
          {/* Radial Circular Progress with Count-Up */}
          <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="9"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-emerald-500 transition-all duration-300 ease-out"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Prominent Large Number Display */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                {animatedScore}
              </span>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                / 100
              </span>
            </div>
          </div>

          {/* Text Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                FitGuide Wellness Score
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                wellnessScore?.badgeClass || 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
              }`}>
                {wellnessScore?.tier || 'Good Foundation'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {targetScore >= 80 ? 'Exceptional Habit Synergy' : targetScore >= 65 ? 'Solid Habit Foundation' : 'High Growth Opportunity'}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
              Synthesized across 7 physiological pillars: Biometrics, Movement, Non-Exercise Activity, Sleep, Nutrition, Hydration, and Alignment.
            </p>
          </div>

        </div>

        {/* Right Side: Progressive Disclosure Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>{showDetails ? 'Hide 7-Pillar Breakdown' : 'View 7-Pillar Breakdown'}</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Expandable 7-Pillars Detail Grid with Staggered Bar Animations */}
      {showDetails && (
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-300 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Category Pillar Breakdown
            </h4>
            <span className="text-xs text-slate-400">Score per component</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {breakdown.map((item, idx) => {
              const pct = Math.round((item.score / item.maxScore) * 100);

              return (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{item.category}</span>
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {item.score} / {item.maxScore} ({pct}%)
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        item.status === 'optimal' 
                          ? 'bg-emerald-500' 
                          : item.status === 'moderate' 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                      }`}
                      style={{ 
                        width: `${pct}%`,
                        transitionDelay: `${idx * 80}ms`
                      }}
                    />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                    {item.feedback}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-400 pt-1">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>{wellnessScore.disclaimer}</span>
          </div>
        </div>
      )}

    </div>
  );
}
