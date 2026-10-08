import React from 'react';
import { Moon, Droplets, Monitor, Activity, Footprints } from 'lucide-react';

const EXERCISE_FREQUENCIES = [
  { id: 'Never', label: 'Never / Sedentary', sub: 'No regular workouts' },
  { id: '1–2 days/week', label: '1–2 days / week', sub: 'Occasional workouts' },
  { id: '3–4 days/week', label: '3–4 days / week', sub: 'Consistent routine' },
  { id: '5+ days/week', label: '5+ days / week', sub: 'Dedicated athletic schedule' }
];

const ACTIVITY_LEVELS = [
  { id: 'Mostly sitting', label: 'Mostly Sitting', desc: 'Desk worker, minimal steps' },
  { id: 'Lightly active', label: 'Lightly Active', desc: 'Light walking, ~5k steps/day' },
  { id: 'Moderately active', label: 'Moderately Active', desc: 'Active job, ~8–10k steps/day' },
  { id: 'Very active', label: 'Very Active', desc: 'Heavy physical work/training' }
];

export default function StepLifestyle({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Lifestyle & Activity</h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5">
          Daily habits dictate recovery and non-exercise energy burn.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Exercise Frequency */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <label className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>How often do you currently exercise? *</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXERCISE_FREQUENCIES.map((freq) => (
              <button
                type="button"
                key={freq.id}
                onClick={() => updateFormData({ exerciseFrequency: freq.id })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.exerciseFrequency === freq.id
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500 font-semibold text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white text-base">{freq.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{freq.sub}</div>
              </button>
            ))}
          </div>
          {errors.exerciseFrequency && <p className="text-xs text-rose-600 dark:text-rose-400">{errors.exerciseFrequency}</p>}
        </div>

        {/* Daily Activity Level */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <label className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Footprints className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Daily Activity Level (Excluding workouts) *</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACTIVITY_LEVELS.map((act) => (
              <button
                type="button"
                key={act.id}
                onClick={() => updateFormData({ dailyActivityLevel: act.id })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.dailyActivityLevel === act.id
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500 font-semibold text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white text-base">{act.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{act.desc}</div>
              </button>
            ))}
          </div>
          {errors.dailyActivityLevel && <p className="text-xs text-rose-600 dark:text-rose-400">{errors.dailyActivityLevel}</p>}
        </div>

        {/* Sleep, Water, Sitting Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Sleep */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Moon className="w-4 h-4 text-indigo-500" />
              <span>Sleep *</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="3"
                max="16"
                step="0.5"
                value={formData.sleepHours}
                onChange={(e) => updateFormData({ sleepHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">hours</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Target: 7–8.5h</p>
          </div>

          {/* Water */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Droplets className="w-4 h-4 text-sky-500" />
              <span>Water *</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.1"
                value={formData.waterIntakeLiters}
                onChange={(e) => updateFormData({ waterIntakeLiters: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">liters</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Target: 2.5–3.5L</p>
          </div>

          {/* Sitting */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <label className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Monitor className="w-4 h-4 text-amber-500" />
              <span>Sitting *</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={formData.sittingHours}
                onChange={(e) => updateFormData({ sittingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">hours</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Desk / screen time</p>
          </div>
        </div>

      </div>
    </div>
  );
}
