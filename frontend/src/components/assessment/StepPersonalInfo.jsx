import React, { useMemo } from 'react';
import { User, Calendar, Ruler, Weight, Info } from 'lucide-react';

export default function StepPersonalInfo({ formData, updateFormData, errors }) {
  const bmiPreview = useMemo(() => {
    const h = Number(formData.heightCm);
    const w = Number(formData.weightKg);
    if (h >= 100 && h <= 250 && w >= 30 && w <= 300) {
      const hm = h / 100;
      const val = Number((w / (hm * hm)).toFixed(1));
      let category = 'Normal weight';
      let colorClass = 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
      if (val < 18.5) {
        category = 'Underweight';
        colorClass = 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
      } else if (val >= 25 && val < 30) {
        category = 'Overweight';
        colorClass = 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
      } else if (val >= 30) {
        category = 'Obesity range';
        colorClass = 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
      }
      return { val, category, colorClass };
    }
    return null;
  }, [formData.heightCm, formData.weightKg]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Personal Information</h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5">
          Used to calculate your BMR and baseline energy requirements.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="e.g., Jordan Miller"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base text-slate-900 dark:text-white dark:bg-slate-800/80 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.name 
                  ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.name}</p>}
        </div>

        {/* Age & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Age (Years) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="14"
                max="100"
                value={formData.age}
                onChange={(e) => updateFormData({ age: e.target.value })}
                placeholder="26"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base text-slate-900 dark:text-white dark:bg-slate-800/80 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.age 
                    ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              />
            </div>
            {errors.age && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Biological Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => updateFormData({ gender: e.target.value })}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-base text-slate-900 dark:text-white bg-white dark:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other / Neutral Average</option>
            </select>
          </div>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Height (cm) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Ruler className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="100"
                max="250"
                step="0.5"
                value={formData.heightCm}
                onChange={(e) => updateFormData({ heightCm: e.target.value })}
                placeholder="175"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border text-base text-slate-900 dark:text-white dark:bg-slate-800/80 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.heightCm 
                    ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              />
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-sm font-medium text-slate-400">
                cm
              </span>
            </div>
            {errors.heightCm && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.heightCm}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Weight (kg) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Weight className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="30"
                max="300"
                step="0.5"
                value={formData.weightKg}
                onChange={(e) => updateFormData({ weightKg: e.target.value })}
                placeholder="72"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border text-base text-slate-900 dark:text-white dark:bg-slate-800/80 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.weightKg 
                    ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              />
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-sm font-medium text-slate-400">
                kg
              </span>
            </div>
            {errors.weightKg && <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.weightKg}</p>}
          </div>
        </div>

        {/* Live BMI Preview */}
        {bmiPreview && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block">BMI Preview</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{bmiPreview.val} kg/m²</span>
              </div>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full border ${bmiPreview.colorClass}`}>
              {bmiPreview.category}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
