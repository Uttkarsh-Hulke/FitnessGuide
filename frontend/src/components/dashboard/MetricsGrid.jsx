import React from 'react';
import { Flame, Activity, Moon, Droplets, Target, Utensils, Weight } from 'lucide-react';

export default function MetricsGrid({ assessment }) {
  if (!assessment) return null;

  const {
    bmr,
    maintenanceCalories,
    targetCalories,
    calorieStrategy,
    calorieAdjustment,
    sleepHours,
    waterIntakeLiters,
    exerciseFrequency,
    workoutDaysPerWeek,
    primaryGoal,
    weightKg
  } = assessment;

  const cards = [
    {
      title: 'Current Weight',
      value: `${weightKg || 70}`,
      unit: 'kg',
      sub: 'Recorded Body Mass',
      icon: Weight,
      colorClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
    },
    {
      title: 'Estimated BMR',
      value: `${bmr || 0}`,
      unit: 'kcal/day',
      sub: 'Mifflin-St Jeor Basal Rate',
      icon: Flame,
      colorClass: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800'
    },
    {
      title: 'Maintenance TDEE',
      value: `${maintenanceCalories || 0}`,
      unit: 'kcal/day',
      sub: 'Daily Energy Expenditure',
      icon: Activity,
      colorClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
    },
    {
      title: 'Target Calories',
      value: `${targetCalories || 0}`,
      unit: 'kcal/day',
      sub: calorieStrategy || 'Maintenance',
      icon: Target,
      colorClass: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60 dark:text-teal-400 border-teal-200 dark:border-teal-800'
    },
    {
      title: 'Sleep Recovery',
      value: `${sleepHours || 7}`,
      unit: 'hrs/night',
      sub: sleepHours >= 7 && sleepHours <= 8.5 ? 'Restorative Window' : 'Needs Optimization',
      icon: Moon,
      colorClass: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
    },
    {
      title: 'Daily Hydration',
      value: `${waterIntakeLiters || 2}`,
      unit: 'L/day',
      sub: waterIntakeLiters >= 2.5 ? 'Hydrated Baseline' : 'Room to Increase',
      icon: Droplets,
      colorClass: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-400 border-sky-200 dark:border-sky-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 space-y-2.5 animate-reveal stagger-${idx + 1}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl border ${card.colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Dominant Large Numbers */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {card.value}
              </span>
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase">
                {card.unit}
              </span>
            </div>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {card.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
