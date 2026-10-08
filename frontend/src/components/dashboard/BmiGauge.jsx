import React, { useState } from 'react';
import { Scale, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function BmiGauge({ bmi }) {
  const [showExplanation, setShowExplanation] = useState(false);

  if (!bmi) return null;

  const value = bmi.value || 22.5;
  const category = bmi.category || 'Normal weight';

  // Calculate position percentage along 15 to 35 scale
  const minScale = 15;
  const maxScale = 35;
  const clampedVal = Math.min(maxScale, Math.max(minScale, value));
  const pointerPercent = ((clampedVal - minScale) / (maxScale - minScale)) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4 transition-colors duration-200 animate-reveal">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">BMI Screening</h3>
        </div>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${
          category === 'Normal weight'
            ? 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
            : category === 'Underweight' || category === 'Overweight'
            ? 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800'
            : 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800'
        }`}>
          {category}
        </span>
      </div>

      {/* Prominent Large Number Display */}
      <div className="flex items-baseline gap-2 pt-1">
        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{value}</span>
        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">kg / m²</span>
      </div>

      {/* Visual Multi-Segment Bar Scale */}
      <div className="space-y-1.5 pt-1">
        <div className="relative w-full h-3.5 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
          <div className="h-full bg-amber-400 dark:bg-amber-500 w-[17.5%]" title="Underweight (<18.5)" />
          <div className="h-full bg-emerald-500 dark:bg-emerald-600 w-[32%]" title="Normal (18.5–24.9)" />
          <div className="h-full bg-amber-400 dark:bg-amber-500 w-[25%]" title="Overweight (25–29.9)" />
          <div className="h-full bg-rose-400 dark:bg-rose-500 w-[25.5%]" title="Obesity (>=30)" />
        </div>

        {/* Pointer indicator */}
        <div className="relative w-full h-4">
          <div 
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-700"
            style={{ left: `${pointerPercent}%` }}
          >
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-slate-900 dark:border-b-white" />
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-none mt-0.5">{value}</span>
          </div>
        </div>

        {/* Range Labels */}
        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 px-0.5">
          <span>&lt; 18.5</span>
          <span>18.5–24.9 (Standard)</span>
          <span>25–29.9</span>
          <span>≥ 30</span>
        </div>
      </div>

      {/* Progressive Disclosure: Concise summary with toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center justify-between w-full text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <span className="flex items-center gap-2 font-medium">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Why BMI is a screening ratio, not a diagnosis</span>
          </span>
          {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showExplanation && (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 animate-in fade-in duration-200">
            {bmi.explanation || 'BMI is one general screening measure and does not provide a complete picture of fitness or health. It does not measure lean muscle mass versus adipose tissue distribution.'}
          </p>
        )}
      </div>

    </div>
  );
}
