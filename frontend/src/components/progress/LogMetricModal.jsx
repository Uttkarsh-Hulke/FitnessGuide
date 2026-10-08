import React, { useState } from 'react';
import { X, Weight, Activity, Droplets, Moon, Loader2 } from 'lucide-react';
import { createProgressLog } from '../../services/api';

export default function LogMetricModal({ isOpen, onClose, onLogged, defaultScore = 75 }) {
  const [formData, setFormData] = useState({
    weightKg: 72,
    exerciseMinutes: 30,
    exerciseType: 'Full Body Resistance',
    waterIntakeLiters: 2.5,
    sleepHours: 7.5,
    wellnessScore: defaultScore,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const saved = await createProgressLog(formData);
      setLoading(false);
      onLogged(saved);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to save progress entry.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 relative text-slate-900 dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Record Daily Entry</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Log today's metrics to update your graphs.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          
          {/* Weight */}
          <div>
            <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <Weight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Weight (kg) *</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="30"
              max="300"
              required
              value={formData.weightKg}
              onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Exercise Minutes & Type */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Exercise (Minutes)</span>
              </label>
              <input
                type="number"
                min="0"
                max="300"
                value={formData.exerciseMinutes}
                onChange={(e) => setFormData({ ...formData, exerciseMinutes: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Activity Type
              </label>
              <input
                type="text"
                placeholder="Brisk Walk, Lifting"
                value={formData.exerciseType}
                onChange={(e) => setFormData({ ...formData, exerciseType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Water & Sleep */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <Droplets className="w-4 h-4 text-sky-500" />
                <span>Water (Liters)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.waterIntakeLiters}
                onChange={(e) => setFormData({ ...formData, waterIntakeLiters: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <Moon className="w-4 h-4 text-indigo-500" />
                <span>Sleep (Hours)</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={formData.sleepHours}
                onChange={(e) => setFormData({ ...formData, sleepHours: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Personal Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Hit 10k steps, energy was high"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />}
              <span>Save Entry</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
