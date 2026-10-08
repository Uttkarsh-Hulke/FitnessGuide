import React from 'react';
import { Sparkles, Moon, Droplets, Clock } from 'lucide-react';

export default function LifestyleView({ lifestylePlan }) {
  if (!lifestylePlan) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        No lifestyle plan generated. Please complete your assessment first.
      </div>
    );
  }

  const { smallChanges = [], sleepProtocol, hydrationSchedule } = lifestylePlan;

  return (
    <div className="space-y-6">
      
      {/* Small Changes, Big Difference Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors duration-200 animate-reveal">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Small Changes, Big Difference</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Micro-adjustments that compound into major health dividends over time.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Compound Impact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {smallChanges.map((change, idx) => (
            <div 
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{change.title}</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {change.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
                <strong className="text-emerald-800 dark:text-emerald-400 block mb-0.5 font-bold">Why it works:</strong>
                {change.whyItWorks}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep Protocol Section */}
      {sleepProtocol && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Circadian Sleep Protocol
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Target: {sleepProtocol.recommendedDuration}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {sleepProtocol.pillars.map((pillar, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <span className="text-sm font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider block">
                  {pillar.name}
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hydration Schedule */}
      {hydrationSchedule && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Hydration Pacing Rhythm
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Target: {hydrationSchedule.dailyTarget}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {hydrationSchedule.pacing.map((slot, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-400 text-xs font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{slot.time}</span>
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">{slot.amount}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{slot.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
