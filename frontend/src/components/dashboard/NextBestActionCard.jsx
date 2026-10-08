import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

export default function NextBestActionCard({ nextBestAction, onExploreAction }) {
  if (!nextBestAction) return null;

  return (
    <div className="rounded-3xl bg-slate-900 dark:bg-slate-900/90 text-white p-6 sm:p-8 shadow-panel border border-emerald-500/30 dark:border-emerald-500/40 relative overflow-hidden transition-all animate-reveal">
      
      {/* Decorative ambient radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        
        {/* Header tag */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Highest Leverage Action</span>
          </div>
          <span className="text-sm text-slate-300 font-medium">Your Next Step</span>
        </div>

        {/* Action Title */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            {nextBestAction.title}
          </h2>
        </div>

        {/* Concise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          
          {/* Why Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Why it matters
            </span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {nextBestAction.why}
            </p>
          </div>

          {/* Start Here Card */}
          <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-xs space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
              Start Here
            </span>
            <p className="text-sm text-emerald-100 font-medium leading-relaxed">
              {nextBestAction.startHere}
            </p>
          </div>

        </div>

        {/* Footer info note */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-sm text-slate-300 gap-3 border-t border-slate-800">
          <span>Commit to this one single habit for 7 consecutive days.</span>
          {onExploreAction && (
            <button
              onClick={onExploreAction}
              className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-bold transition-colors cursor-pointer text-sm"
            >
              <span>View Exercise Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
