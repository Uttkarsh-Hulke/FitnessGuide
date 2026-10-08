import React from 'react';
import { ListOrdered } from 'lucide-react';

export default function TopPrioritiesCard({ top3Priorities }) {
  if (!top3Priorities || top3Priorities.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-7 space-y-5 transition-colors duration-200 animate-reveal">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Your Top 3 Priorities</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Ranked by impact. Focus on these 3 adjustments first.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Ranked by Impact
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3Priorities.map((p, idx) => (
          <div
            key={p.rank}
            className={`p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-card transition-all duration-200 flex flex-col justify-between space-y-4 animate-reveal stagger-${idx + 1}`}
          >
            {/* Top header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                  {p.rank}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Priority {p.rank}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-snug">
                {p.title}
              </h4>

              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                <strong className="text-slate-700 dark:text-slate-200 block font-bold mb-0.5 text-xs uppercase tracking-wider">Why:</strong>
                {p.why}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-3 border-t border-slate-200/80 dark:border-slate-700/60">
              <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 text-sm text-emerald-950 dark:text-emerald-200">
                <strong className="font-bold block text-emerald-800 dark:text-emerald-300 text-xs uppercase tracking-wider mb-0.5">Next Step:</strong>
                {p.firstStep}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
