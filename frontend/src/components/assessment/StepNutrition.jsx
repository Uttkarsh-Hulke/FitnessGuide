import React from 'react';
import { Utensils, Apple, Sparkles } from 'lucide-react';

const DIET_PREFERENCES = [
  { id: 'Vegetarian', label: 'Vegetarian', desc: 'Plant foods, dairy (paneer, curd, dal, legumes)' },
  { id: 'Non-vegetarian', label: 'Non-Vegetarian', desc: 'Eggs, poultry, fish alongside whole grains' },
  { id: 'Vegan', label: 'Vegan', desc: 'Plant-based (tofu, tempeh, lentils, seeds)' },
  { id: 'Other', label: 'Other', desc: 'Flexitarian / Custom preferences' }
];

const FOOD_QUALITIES = [
  { id: 'Mostly whole foods & home cooked', label: 'Mostly Whole Foods', desc: 'Fresh home cooking' },
  { id: 'Balanced mix', label: 'Balanced Mix', desc: 'Home meals + dining out' },
  { id: 'Frequent restaurant/takeout meals', label: 'Convenience / Takeout', desc: 'Commercial restaurant heavy' }
];

const JUNK_FREQUENCIES = [
  { id: 'Rarely/Never', label: 'Rarely / Never', desc: 'Special occasions only' },
  { id: '1–2 days/week', label: '1–2 days / week', desc: 'Weekend treat' },
  { id: '3–4 days/week', label: '3–4 days / week', desc: 'Multiple times weekly' },
  { id: 'Daily', label: 'Almost Daily', desc: 'Regular habit' }
];

export default function StepNutrition({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Food & Nutrition</h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5">
          Personalized whole-food protein targets and practical craving swaps.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Diet Preference */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
          <label className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Utensils className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Primary Diet Pattern *</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DIET_PREFERENCES.map((diet) => (
              <button
                type="button"
                key={diet.id}
                onClick={() => updateFormData({ dietPreference: diet.id })}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.dietPreference === diet.id
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white text-base">{diet.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{diet.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quality & Junk Frequency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Apple className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Typical Food Quality *</span>
            </label>
            <div className="space-y-2">
              {FOOD_QUALITIES.map((q) => (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => updateFormData({ foodQuality: q.id })}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.foodQuality === q.id
                      ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 font-bold text-slate-900 dark:text-white ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm">{q.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{q.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Processed / Junk Food *</span>
            </label>
            <div className="space-y-2">
              {JUNK_FREQUENCIES.map((j) => (
                <button
                  type="button"
                  key={j.id}
                  onClick={() => updateFormData({ junkFoodFrequency: j.id })}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.junkFoodFrequency === j.id
                      ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 font-bold text-slate-900 dark:text-white ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm">{j.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{j.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Meals per Day & Notes */}
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Daily Meal Frequency
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Allocates target energy per meal.</span>
            </div>
            <select
              value={formData.mealsPerDay}
              onChange={(e) => updateFormData({ mealsPerDay: Number(e.target.value) })}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value={2}>2 Meals (Intermittent fasting)</option>
              <option value={3}>3 Meals (Standard)</option>
              <option value={4}>4 Meals (3 meals + fitness snack)</option>
              <option value={5}>5 Meals (Frequent smaller portions)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Foods Avoided (Optional)
              </label>
              <input
                type="text"
                value={formData.foodsAvoided}
                onChange={(e) => updateFormData({ foodsAvoided: e.target.value })}
                placeholder="e.g., mushrooms, seafood"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-base text-slate-900 dark:text-white bg-white dark:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Allergies / Restrictions (Optional)
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => updateFormData({ allergies: e.target.value })}
                placeholder="e.g., lactose, gluten"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-base text-slate-900 dark:text-white bg-white dark:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
