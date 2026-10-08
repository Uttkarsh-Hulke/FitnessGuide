import React from 'react';
import { 
  Flame, 
  Dumbbell, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Footprints, 
  Sparkles,
  Check
} from 'lucide-react';

const GOALS = [
  {
    id: 'Lose weight',
    title: 'Lose Weight',
    icon: Flame,
    description: 'Calibrate a sustainable caloric deficit while maintaining lean muscle.',
    target: 'Fat loss focus'
  },
  {
    id: 'Build muscle',
    title: 'Build Muscle',
    icon: Dumbbell,
    description: 'Progressive resistance training with a lean caloric surplus and high protein.',
    target: 'Hypertrophy focus'
  },
  {
    id: 'Gain healthy weight',
    title: 'Gain Healthy Weight',
    icon: TrendingUp,
    description: 'Calorie surplus paired with lifting to build lean mass safely.',
    target: 'Mass accretion'
  },
  {
    id: 'Improve strength',
    title: 'Improve Strength',
    icon: ShieldCheck,
    description: 'Compound resistance movements to move heavier loads efficiently.',
    target: 'Force production'
  },
  {
    id: 'Improve stamina',
    title: 'Improve Stamina',
    icon: Zap,
    description: 'Aerobic capacity and mitochondrial density via Zone 2 conditioning.',
    target: 'Endurance & VO2 max'
  },
  {
    id: 'Maintain fitness',
    title: 'Maintain Fitness',
    icon: Heart,
    description: 'Preserve body composition and cardiovascular health with balance.',
    target: 'Energy equilibrium'
  },
  {
    id: 'Become more active',
    title: 'Become More Active',
    icon: Footprints,
    description: 'Transition from sedentary habits to enjoyable regular movement.',
    target: 'Daily activity'
  },
  {
    id: 'Improve overall lifestyle',
    title: 'Improve Lifestyle',
    icon: Sparkles,
    description: 'Holistic balance across sleep, nutrition, hydration, and stress.',
    target: 'Holistic wellness'
  }
];

export default function StepGoal({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          What is your primary goal?
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5">
          Select one primary focus to calibrate your calorie targets and workout split.
        </p>
      </div>

      {errors.primaryGoal && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm text-center">
          {errors.primaryGoal}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {GOALS.map((g) => {
          const Icon = g.icon;
          const isSelected = formData.primaryGoal === g.id;

          return (
            <button
              type="button"
              key={g.id}
              onClick={() => updateFormData({ primaryGoal: g.id })}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 relative flex items-start gap-3.5 cursor-pointer ${
                isSelected
                  ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm ring-1 ring-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 pr-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-base">{g.title}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{g.description}</p>
                <span className="inline-block mt-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/80">
                  {g.target}
                </span>
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
