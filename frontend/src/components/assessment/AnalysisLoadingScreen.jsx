import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, ShieldCheck, Check } from 'lucide-react';

const STAGES = [
  { message: 'Analyzing your profile...', progress: 18, pose: 'stride' },
  { message: 'Calculating your wellness metrics...', progress: 42, pose: 'stretch' },
  { message: 'Reviewing your activity & recovery...', progress: 68, pose: 'lift' },
  { message: 'Personalizing your recommendations...', progress: 88, pose: 'power' },
  { message: 'Building your FitGuide plan...', progress: 100, pose: 'finish' }
];

export default function AnalysisLoadingScreen({ onComplete }) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(12);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Total animation cycle ~3.2s
    const stageDurations = [650, 700, 700, 650, 600];
    let timeoutId;
    let progressInterval;

    // Smooth progress counter tick
    progressInterval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = STAGES[currentStageIdx]?.progress || 100;
        if (prev < target) {
          return Math.min(target, prev + 1);
        }
        return prev;
      });
    }, 25);

    const advanceStage = (idx) => {
      if (idx < STAGES.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStageIdx(idx + 1);
          advanceStage(idx + 1);
        }, stageDurations[idx]);
      } else {
        // Final stage complete, fade out
        timeoutId = setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
        }, stageDurations[idx]);
      }
    };

    advanceStage(0);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, [currentStageIdx, onComplete]);

  const currentStage = STAGES[currentStageIdx] || STAGES[0];
  const pose = currentStage.pose;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-slate-950 text-white transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center space-y-8">
        
        {/* Brand Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-sm font-bold">
          <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
          <span>FitGuide Intelligence Engine</span>
        </div>

        {/* Minimalist Athletic Male Character Vector Graphics */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          
          {/* Radial Biometric HUD Scan Rings */}
          <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping opacity-25" />
          <div className="absolute inset-2 rounded-full border border-dashed border-teal-500/40 animate-spin duration-10000" />
          <div className="absolute inset-4 rounded-full bg-slate-900/90 border border-slate-800 shadow-2xl flex items-center justify-center" />

          {/* Clean Vector Fitness Silhouette Poses */}
          <div className="relative z-10 transition-all duration-300 transform scale-110">
            {pose === 'stride' && (
              /* Running / Athletic Forward Stride Pose */
              <svg className="w-24 h-24 text-emerald-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Head */}
                <circle cx="56" cy="22" r="7" className="fill-emerald-400 stroke-none" />
                {/* Torso */}
                <path d="M54 29 L48 52" strokeWidth="4.5" />
                {/* Left Arm (forward drive) */}
                <path d="M52 35 L66 42 L72 36" />
                {/* Right Arm (backward drive) */}
                <path d="M50 35 L38 43 L32 40" />
                {/* Left Leg (forward stride) */}
                <path d="M48 52 L62 65 L58 84" strokeWidth="4" />
                {/* Right Leg (back extension) */}
                <path d="M48 52 L34 62 L22 66" strokeWidth="4" />
                {/* Ground stride marker */}
                <path d="M18 88 L82 88" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-emerald-500/40" />
              </svg>
            )}

            {pose === 'stretch' && (
              /* Dynamic Overhead Stretch Pose */
              <svg className="w-24 h-24 text-teal-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Head */}
                <circle cx="50" cy="20" r="7" className="fill-teal-300 stroke-none" />
                {/* Torso */}
                <path d="M50 27 L50 54" strokeWidth="4.5" />
                {/* Left Arm (overhead reach) */}
                <path d="M50 33 L62 20 L66 12" />
                {/* Right Arm (overhead reach) */}
                <path d="M50 33 L38 20 L34 12" />
                {/* Left Leg (grounded) */}
                <path d="M50 54 L58 68 L60 86" strokeWidth="4" />
                {/* Right Leg (slight side point) */}
                <path d="M50 54 L42 68 L40 86" strokeWidth="4" />
                {/* Ground marker */}
                <path d="M25 88 L75 88" stroke="currentColor" strokeWidth="1.5" className="text-teal-500/40" />
              </svg>
            )}

            {pose === 'lift' && (
              /* Free-Weight Training / Overhead Press Pose */
              <svg className="w-24 h-24 text-emerald-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Head */}
                <circle cx="50" cy="24" r="7" className="fill-emerald-400 stroke-none" />
                {/* Torso */}
                <path d="M50 31 L50 56" strokeWidth="4.5" />
                {/* Left Arm pressing dumbbell */}
                <path d="M50 37 L66 32 L68 18" />
                {/* Dumbbell left */}
                <path d="M62 16 L74 16" strokeWidth="4" className="text-teal-300" />
                {/* Right Arm pressing dumbbell */}
                <path d="M50 37 L34 32 L32 18" />
                {/* Dumbbell right */}
                <path d="M26 16 L38 16" strokeWidth="4" className="text-teal-300" />
                {/* Left Leg (athletic stable base) */}
                <path d="M50 56 L62 70 L64 86" strokeWidth="4" />
                {/* Right Leg (athletic stable base) */}
                <path d="M50 56 L38 70 L36 86" strokeWidth="4" />
                {/* Ground */}
                <path d="M22 88 L78 88" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500/40" />
              </svg>
            )}

            {(pose === 'power' || pose === 'finish') && (
              /* Ready / Confident Athletic Victory Stance */
              <svg className="w-24 h-24 text-emerald-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Head */}
                <circle cx="50" cy="22" r="7" className="fill-emerald-300 stroke-none" />
                {/* Torso */}
                <path d="M50 29 L50 55" strokeWidth="4.5" />
                {/* Hands on hips / confident stance */}
                <path d="M50 35 L64 42 L58 52" />
                <path d="M50 35 L36 42 L42 52" />
                {/* Legs planted firmly */}
                <path d="M50 55 L62 70 L64 86" strokeWidth="4" />
                <path d="M50 55 L38 70 L36 86" strokeWidth="4" />
                {/* Ground */}
                <path d="M20 88 L80 88" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500/50" />
              </svg>
            )}
          </div>
        </div>

        {/* Dynamic Stage Message (Fade transition) */}
        <div className="h-16 flex flex-col items-center justify-center">
          <p 
            key={currentStageIdx}
            className="text-xl sm:text-2xl font-black text-white tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {currentStage.message}
          </p>
          <span className="text-sm text-slate-300 mt-1">
            Synthesizing 7 wellness pillars & personalized split
          </span>
        </div>

        {/* Clean Minimalist Progress Bar */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-sm font-bold text-slate-400">
            <span>Analyzing Data</span>
            <span className="text-emerald-400 font-mono font-bold text-base">{displayProgress}%</span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
