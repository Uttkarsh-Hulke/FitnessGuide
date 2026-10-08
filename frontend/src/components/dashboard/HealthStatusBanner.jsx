import React, { useState } from 'react';
import { CheckCircle2, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';

export default function HealthStatusBanner({ healthStatus, name }) {
  const [showNote, setShowNote] = useState(false);

  if (!healthStatus) return null;

  const isPositive = healthStatus.type === 'positive';
  const isModerate = healthStatus.type === 'moderate';

  return (
    <div className={`p-5 rounded-3xl border transition-all animate-reveal ${
      isPositive
        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
        : isModerate
        ? 'bg-teal-50/70 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 text-teal-950 dark:text-teal-100'
        : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-100'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-2xl flex-shrink-0 ${
            isPositive ? 'bg-emerald-600 text-white' : isModerate ? 'bg-teal-600 text-white' : 'bg-amber-600 text-white'
          }`}>
            {isPositive ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <HeartHandshake className="w-5 h-5" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {healthStatus.headline}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              {healthStatus.subtext}
            </p>
          </div>
        </div>

        {/* Progressive Disclosure Toggle */}
        <button
          onClick={() => setShowNote(!showNote)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <span>Balanced Health Context</span>
          {showNote ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

      </div>

      {showNote && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-200/60 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic animate-in fade-in duration-200">
          <span className="font-semibold not-italic text-slate-800 dark:text-slate-200">Perspective: </span>
          {healthStatus.balancedReminder}
        </div>
      )}
    </div>
  );
}
