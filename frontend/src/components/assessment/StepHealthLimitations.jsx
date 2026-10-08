import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function StepHealthLimitations({ formData, updateFormData }) {
  const hasLimitations = formData.hasPhysicalLimitations === true;

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Health & Safety</h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5">
          We protect joint longevity by adjusting load and volume around known limitations.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        <div>
          <label className="block text-base font-bold text-slate-900 dark:text-white mb-3">
            Do you have any current injuries, joint pain, or movement limitations?
          </label>
          <div className="grid grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => updateFormData({ hasPhysicalLimitations: false, limitationsNotes: '' })}
              className={`p-4 rounded-xl border flex items-center justify-center gap-2.5 text-base font-bold transition-all cursor-pointer ${
                !hasLimitations
                  ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>No Limitations</span>
            </button>

            <button
              type="button"
              onClick={() => updateFormData({ hasPhysicalLimitations: true })}
              className={`p-4 rounded-xl border flex items-center justify-center gap-2.5 text-base font-bold transition-all cursor-pointer ${
                hasLimitations
                  ? 'border-amber-600 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 ring-1 ring-amber-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>Yes, Limitations</span>
            </button>
          </div>
        </div>

        {hasLimitations && (
          <div className="space-y-2 pt-1 animate-in fade-in duration-200">
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Describe Affected Joints / Limitations
            </label>
            <textarea
              rows={3}
              value={formData.limitationsNotes}
              onChange={(e) => updateFormData({ limitationsNotes: e.target.value })}
              placeholder="e.g., Meniscus recovery, lower back tight during squats, shoulder impingement"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-base text-slate-900 dark:text-white bg-white dark:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exercises are automatically adjusted for joint-friendly biomechanics.
            </p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            <strong className="font-bold block text-amber-900 dark:text-amber-300 mb-0.5">Clinical Clearance</strong>
            If recovering from surgery or experiencing sharp pain, consult a physician or physical therapist prior to beginning.
          </div>
        </div>

      </div>
    </div>
  );
}
