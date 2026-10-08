import React from 'react';
import { ClipboardList, AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function AssessmentDetailsView({ assessment }) {
  if (!assessment) return null;

  const {
    name,
    age,
    gender,
    heightCm,
    weightKg,
    primaryGoal,
    exerciseFrequency,
    dailyActivityLevel,
    sleepHours,
    waterIntakeLiters,
    sittingHours,
    gymAccess,
    exerciseLocation,
    equipment = [],
    dietPreference,
    mealsPerDay,
    junkFoodFrequency,
    hasPhysicalLimitations,
    limitationsNotes,
    recommendations = []
  } = assessment;

  return (
    <div className="space-y-6">
      
      {/* Assessment Metadata Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Assessment Parameters</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Raw baseline attributes submitted for {name}'s assessment profile.
        </p>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Biometrics</span>
            <span className="font-semibold text-slate-900 dark:text-white">{gender}, {age} yrs</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{heightCm} cm • {weightKg} kg</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Focus</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{primaryGoal}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Exercise</span>
            <span className="font-semibold text-slate-900 dark:text-white">{exerciseFrequency}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{gymAccess ? 'Gym' : exerciseLocation}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Daily Activity</span>
            <span className="font-semibold text-slate-900 dark:text-white">{dailyActivityLevel}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{sittingHours}h sitting</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Sleep & Water</span>
            <span className="font-semibold text-slate-900 dark:text-white">{sleepHours}h • {waterIntakeLiters}L</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Nutrition</span>
            <span className="font-semibold text-slate-900 dark:text-white">{dietPreference}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{mealsPerDay} meals • {junkFoodFrequency} junk</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Equipment</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {equipment.length > 0 ? equipment.join(', ') : 'Bodyweight'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Limitations</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {hasPhysicalLimitations ? (limitationsNotes || 'Reported') : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Complete Explainable Recommendations List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Explainable Diagnostics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Condition → Why It Matters → What You Can Do
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {recommendations.length} Items
          </span>
        </div>

        <div className="space-y-3.5">
          {recommendations.map((rec, idx) => {
            const isCrit = rec.severity === 'critical';
            const isWarn = rec.severity === 'warning';

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isCrit ? (
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    ) : isWarn ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{rec.category}</h4>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isCrit 
                      ? 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' 
                      : isWarn 
                      ? 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' 
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                  }`}>
                    {rec.severity}
                  </span>
                </div>

                <div className="text-xs">
                  <strong className="text-slate-400 dark:text-slate-500 uppercase text-[10px] block font-bold">Condition:</strong>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{rec.condition}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <strong className="text-slate-700 dark:text-slate-300 uppercase text-[10px] block font-bold">Why It Matters:</strong>
                  <p className="leading-relaxed">{rec.why}</p>
                </div>

                <div className="space-y-1 pt-1">
                  <strong className="text-emerald-800 dark:text-emerald-400 uppercase text-[10px] block font-bold">
                    Action Plan:
                  </strong>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {rec.action.map((act, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
