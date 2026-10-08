import React from 'react';
import { Dumbbell, Home, MapPin, Clock, Calendar, CheckSquare, Square } from 'lucide-react';

const TRAINING_TYPES = [
  'Weight training',
  'Cardio',
  'Strength training',
  'Functional training',
  'Cross-training',
  'Mixed training'
];

const LOCATIONS = [
  'Home',
  'Outdoors',
  'Walking/running',
  'I currently don\'t exercise'
];

const EQUIPMENT_OPTIONS = [
  'No equipment (Bodyweight)',
  'Dumbbells',
  'Resistance bands',
  'Home gym equipment'
];

const DURATIONS = [
  '20–30 minutes',
  '30–45 minutes',
  '45–60 minutes',
  '60+ minutes'
];

export default function StepGymExercise({ formData, updateFormData, errors }) {
  const hasGym = formData.gymAccess === true;

  const toggleTrainingType = (type) => {
    const current = Array.isArray(formData.trainingTypes) ? formData.trainingTypes : [];
    if (current.includes(type)) {
      updateFormData({ trainingTypes: current.filter(t => t !== type) });
    } else {
      updateFormData({ trainingTypes: [...current, type] });
    }
  };

  const toggleEquipment = (item) => {
    const current = Array.isArray(formData.equipment) ? formData.equipment : [];
    if (current.includes(item)) {
      updateFormData({ equipment: current.filter(e => e !== item) });
    } else {
      updateFormData({ equipment: [...current, item] });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Gym & Equipment</h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5">
          Workouts calibrate to your real environment and available gear.
        </p>
      </div>

      {/* Gym Access Toggle */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
        <label className="block text-base font-bold text-slate-900 dark:text-white">
          Do you currently go to a gym? *
        </label>
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => updateFormData({ gymAccess: true })}
            className={`p-4 sm:p-5 rounded-xl border flex items-center justify-center gap-2.5 font-bold text-base transition-all cursor-pointer ${
              hasGym
                ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Yes, Gym Access</span>
          </button>

          <button
            type="button"
            onClick={() => updateFormData({ gymAccess: false })}
            className={`p-4 sm:p-5 rounded-xl border flex items-center justify-center gap-2.5 font-bold text-base transition-all cursor-pointer ${
              !hasGym
                ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <Home className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>Home / Outdoors</span>
          </button>
        </div>
      </div>

      {/* CONDITIONAL: IF NO GYM */}
      {!hasGym && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
            <label className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Where do you usually exercise? *</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOCATIONS.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => updateFormData({ exerciseLocation: loc })}
                  className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
                    formData.exerciseLocation === loc
                      ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-slate-900 dark:text-white ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
            <label className="block text-base font-bold text-slate-900 dark:text-white">
              Available equipment (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EQUIPMENT_OPTIONS.map((item) => {
                const isChecked = (formData.equipment || []).includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleEquipment(item)}
                    className={`p-3.5 rounded-xl border text-left text-sm flex items-center gap-3 transition-all cursor-pointer ${
                      isChecked
                        ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 font-bold text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
                    )}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CONDITIONAL: IF GYM */}
      {hasGym && (
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 animate-in fade-in duration-200">
          <label className="block text-base font-bold text-slate-900 dark:text-white">
            Training preferences (Select multiple)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRAINING_TYPES.map((type) => {
              const isSelected = (formData.trainingTypes || []).includes(type);
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => toggleTrainingType(type)}
                  className={`p-3 rounded-xl border text-center text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Duration & Days Parameters */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Experience Level *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => updateFormData({ fitnessExperience: lvl })}
                className={`py-2.5 px-3 rounded-xl border text-center text-sm font-bold transition-all cursor-pointer ${
                  formData.fitnessExperience === lvl
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Target Duration *</span>
            </label>
            <select
              value={formData.workoutDuration}
              onChange={(e) => updateFormData({ workoutDuration: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {DURATIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Available Days (1–7) *</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="7"
                value={formData.workoutDaysPerWeek}
                onChange={(e) => updateFormData({ workoutDaysPerWeek: Number(e.target.value) })}
                className="w-full accent-emerald-600"
              />
              <span className="w-12 text-center font-bold text-slate-900 dark:text-white text-sm px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {formData.workoutDaysPerWeek}d
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
