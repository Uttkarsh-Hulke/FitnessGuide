import React from 'react';
import { Utensils, RefreshCw, ShieldAlert } from 'lucide-react';

export default function NutritionPlanView({ nutritionPlan, targetCalories, macros, goal }) {
  if (!nutritionPlan) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        No nutrition plan generated. Please complete your assessment first.
      </div>
    );
  }

  const {
    dietaryPreference,
    strategy,
    proteinSources = [],
    foodSwaps = [],
    mealPattern = [],
    safetyNotes = []
  } = nutritionPlan;

  const prot = macros?.protein || { grams: 120, percentage: 25 };
  const carb = macros?.carbs || { grams: 220, percentage: 48 };
  const fat = macros?.fats || { grams: 60, percentage: 27 };

  return (
    <div className="space-y-6">
      
      {/* Target Calories & Strategy Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors duration-200 animate-reveal">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                {dietaryPreference}
              </span>
              <span className="text-sm text-slate-400">•</span>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{strategy}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Target Energy & Macronutrients
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-emerald-700 dark:text-emerald-400 uppercase text-xs font-bold block mb-0.5">Daily Target</span>
              <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">{targetCalories}</span>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1.5">kcal/day</span>
            </div>
          </div>
        </div>

        {/* Macronutrient Bars */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
            <span>Macronutrient Ratio</span>
            <span>Protein {prot.percentage}% • Carbs {carb.percentage}% • Fats {fat.percentage}%</span>
          </div>

          {/* Stacked macro bar */}
          <div className="h-4 sm:h-5 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
            <div 
              className="h-full bg-emerald-500 transition-all duration-700" 
              style={{ width: `${prot.percentage}%` }}
              title={`Protein: ${prot.grams}g (${prot.percentage}%)`}
            />
            <div 
              className="h-full bg-teal-400 transition-all duration-700" 
              style={{ width: `${carb.percentage}%` }}
              title={`Carbohydrates: ${carb.grams}g (${carb.percentage}%)`}
            />
            <div 
              className="h-full bg-amber-400 transition-all duration-700" 
              style={{ width: `${fat.percentage}%` }}
              title={`Healthy Fats: ${fat.grams}g (${fat.percentage}%)`}
            />
          </div>

          {/* 3 Macro Cards with Large Dominant Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            
            {/* Protein */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">Protein</span>
                <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  {prot.percentage}%
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{prot.grams}g</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Supports muscle repair and appetite regulation.
              </p>
            </div>

            {/* Carbohydrates */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider">Carbohydrates</span>
                <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300">
                  {carb.percentage}%
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{carb.grams}g</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Replenishes glycogen for training and focus.
              </p>
            </div>

            {/* Fats */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Healthy Fats</span>
                <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                  {fat.percentage}%
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">{fat.grams}g</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Crucial for steroid hormones and cellular membranes.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Recommended Protein Anchors */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Curated Protein Anchors ({dietaryPreference})
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Whole-food options matched to your dietary pattern.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            High Bioavailability
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {proteinSources.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.name}</h4>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {item.protein}
                </span>
              </div>
              <span className="text-xs text-slate-400 block font-medium">Serving: {item.serving}</span>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {item.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Food Swaps Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Smart Food Swaps
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Replace ultra-processed items with satisfying whole-food upgrades.
            </p>
          </div>
          <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Practical Swaps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodSwaps.map((swap, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                {swap.category}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-1">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase block">Instead of:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{swap.traditional}</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase block">Upgrade to:</span>
                  <p className="font-bold text-emerald-950 dark:text-emerald-200">{swap.smartSwap}</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1.5 border-t border-slate-100 dark:border-slate-800">
                <strong className="text-slate-700 dark:text-slate-300 font-semibold">Why it works:</strong> {swap.whyBetter}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Meal Rhythm */}
      {mealPattern.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Meal Timing Distribution
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {mealPattern.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{m.meal}</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    ~{m.calories} kcal
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 pt-0.5 leading-relaxed">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition Disclaimers */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1 leading-relaxed">
          {safetyNotes.map((note, i) => (
            <p key={i}>{note}</p>
          ))}
        </div>
      </div>

    </div>
  );
}
