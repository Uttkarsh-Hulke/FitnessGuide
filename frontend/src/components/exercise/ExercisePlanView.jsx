import React, { useState } from 'react';
import { Dumbbell, Clock, ShieldAlert, Activity, ChevronDown, ChevronUp } from 'lucide-react';

export default function ExercisePlanView({ workoutPlan }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [expandedExerciseIdx, setExpandedExerciseIdx] = useState(null);

  if (!workoutPlan || !workoutPlan.weeklySchedule) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        No workout plan generated. Please complete your assessment first.
      </div>
    );
  }

  const {
    splitName,
    workoutDaysPerWeek,
    workoutDuration,
    experienceLevel,
    environment,
    injuryPrecautions,
    weeklySchedule,
    cardioRecommendation
  } = workoutPlan;

  const currentDay = weeklySchedule[selectedDayIndex] || weeklySchedule[0];

  const toggleExpand = (idx) => {
    setExpandedExerciseIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-5 transition-colors duration-200 animate-reveal">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Weekly Split
              </span>
              <span className="text-sm text-slate-400">•</span>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{environment}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {splitName}
            </h2>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <span className="text-slate-400 uppercase text-xs block font-bold">Frequency</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{workoutDaysPerWeek} d/wk</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <span className="text-slate-400 uppercase text-xs block font-bold">Duration</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{workoutDuration}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <span className="text-slate-400 uppercase text-xs block font-bold">Level</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{experienceLevel}</span>
            </div>
          </div>
        </div>

        {/* Injury Warning if present */}
        {injuryPrecautions && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3.5">
            <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
              <strong className="text-amber-900 dark:text-amber-300 font-bold block mb-0.5">Joint Guardrail Active:</strong>
              {injuryPrecautions}
            </div>
          </div>
        )}

        {/* Days Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {weeklySchedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all cursor-pointer ${
                selectedDayIndex === idx
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Day {day.dayNumber} : {day.dayTitle.split('—')[1] || day.dayTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Workout Details */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors duration-200 animate-reveal">
        
        {/* Day Header */}
        <div className="space-y-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Activity className="w-4 h-4" />
            <span>Day Focus</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {currentDay.dayTitle}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {currentDay.focus} • {currentDay.targetDuration}
          </p>
        </div>

        {/* Warmup & Cooldown Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Warm-Up (5–8 min)
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
              {currentDay.warmup}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Cool-Down (3–5 min)
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
              {currentDay.cooldown}
            </p>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Prescribed Movement Sequence ({currentDay.exercises.length} Exercises)
          </h4>

          <div className="grid grid-cols-1 gap-3.5">
            {currentDay.exercises.map((ex, exIdx) => {
              const isExpanded = expandedExerciseIdx === exIdx;

              return (
                <div
                  key={exIdx}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-card transition-all bg-white dark:bg-slate-900 space-y-3.5"
                >
                  {/* Top Exercise Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {exIdx + 1}
                      </span>
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white text-lg">{ex.name}</h5>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Target: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{ex.targetArea}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {ex.setsReps}
                      </span>
                      {ex.rest && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400">
                          Rest: {ex.rest}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary 1-line form cue */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-sm text-emerald-950 dark:text-emerald-200">
                    <strong className="font-bold text-emerald-800 dark:text-emerald-400 mr-2">Form Cue:</strong>
                    {ex.formCue}
                  </div>

                  {/* Progressive Disclosure for Deep Details */}
                  <div className="pt-1">
                    <button
                      onClick={() => toggleExpand(exIdx)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'Why recommended & Safety notes'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-sm animate-in fade-in duration-200">
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <strong className="text-slate-700 dark:text-slate-300 block font-bold text-xs uppercase tracking-wider mb-1">
                            Why Recommended:
                          </strong>
                          <p className="text-slate-600 dark:text-slate-400 leading-snug">{ex.why}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                          <strong className="text-amber-800 dark:text-amber-400 block font-semibold text-[10px] uppercase tracking-wider mb-0.5">
                            Safety Reminder:
                          </strong>
                          <p className="text-slate-700 dark:text-slate-300 leading-snug">{ex.safetyReminder}</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Aerobic / Cardio Guidance Card */}
      {cardioRecommendation && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-3 transition-colors duration-200 animate-reveal">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Cardiovascular Strategy: {cardioRecommendation.type}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">Frequency</span>
              <span className="text-slate-900 dark:text-white font-semibold">{cardioRecommendation.frequency}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">Duration</span>
              <span className="text-slate-900 dark:text-white font-semibold">{cardioRecommendation.duration}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">Modality</span>
              <span className="text-slate-900 dark:text-white font-semibold">{cardioRecommendation.modality}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            <strong>Training Cue:</strong> {cardioRecommendation.guideline}
          </p>
        </div>
      )}

    </div>
  );
}
