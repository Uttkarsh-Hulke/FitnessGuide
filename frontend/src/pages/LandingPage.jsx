import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';

export default function LandingPage({ onStartAssessment }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 pb-20 transition-colors duration-200">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Soft atmospheric background gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-100/60 dark:from-emerald-950/30 to-teal-100/40 dark:to-teal-950/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Deterministic Health & Biometric Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Understand Your Fitness. <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Build Better Habits.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                FitGuide analyzes your lifestyle, fitness habits and goals to create personalized guidance for exercise, nutrition and everyday wellness.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onStartAssessment}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 active:translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all duration-200 cursor-pointer"
                >
                  <span>How It Works</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Credibility badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-8 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Explainable advice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Mifflin-St Jeor BMR</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Educational & Safe</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Dashboard Mockup Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card */}
                <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 space-y-5 transition-colors duration-200">
                  
                  {/* Top card row */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">FitGuide Live Preview</div>
                        <div className="text-[10px] text-slate-400">Diagnostic Synthesis</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      Score: 78 / 100
                    </span>
                  </div>

                  {/* Hero Metric: Next Best Action Preview */}
                  <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                      <span>Next Best Action</span>
                      <span>High Impact</span>
                    </div>
                    <div className="text-sm font-bold leading-snug">
                      Increase weekly physical activity
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Start here: 25-minute brisk walk, 4 days/week to build cardiovascular baseline.
                    </p>
                  </div>

                  {/* 3 Metrics Mini Grid with Dominant Numbers */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">BMI</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white">22.4</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block">Normal</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">BMR</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white">1,680</span>
                      <span className="text-[10px] text-slate-400 font-medium block">kcal/day</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target</span>
                      <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">2,050</span>
                      <span className="text-[10px] text-slate-400 font-medium block">Balance</span>
                    </div>
                  </div>

                  {/* Top Priority Preview */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      <strong className="text-emerald-900 dark:text-emerald-300 font-bold block">Explainable Standard:</strong>
                      Condition → Why It Matters → Actionable First Step.
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM / PURPOSE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sm:p-12 space-y-8 transition-colors duration-200">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              The Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Generic Fitness Advice Fails
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Standard plans assume everyone has endless time, zero injuries, and a commercial gym. Real adherence requires personalized, explainable guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold text-base">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Unexplained Prescriptions</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Generic plans tell users what to do without explaining why it matters or how their habits create friction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold text-base">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Resource Mismatch</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Beginners without gym access get handed barbell routines, while desk workers get zero posture guidance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold text-base">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">FitGuide Approach</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Deterministic calculations, condition-reason-action logic, and practical small changes that stick.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS (4 CLEAN STEPS) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How FitGuide Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Four simple steps to transform your habits into actionable clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-2xl font-black text-slate-300 dark:text-slate-700 block">01</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tell Us About You</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Biometrics, sleep duration, sitting hours, hydration, and equipment access.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-2xl font-black text-slate-300 dark:text-slate-700 block">02</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Set Your Goal</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Select fat loss, muscle building, stamina, strength, or everyday vitality.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-2xl font-black text-slate-300 dark:text-slate-700 block">03</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Get Your Assessment</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculates BMI, Mifflin-St Jeor BMR, TDEE, and your 7-pillar Wellness Score.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-2xl font-black text-slate-300 dark:text-slate-700 block">04</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Get Your Plan</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Receive your workout schedule, macro targets, and top 3 priorities.
            </p>
          </div>
        </div>

      </section>

      {/* BOTTOM FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-8 sm:p-12 shadow-panel text-center space-y-5 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to See Where You Stand?
            </h2>
            <p className="text-base sm:text-lg text-emerald-100 leading-relaxed">
              Takes less than 3 minutes to complete. No registration hurdles, zero spam.
            </p>

            <div className="pt-3">
              <button
                onClick={onStartAssessment}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-slate-900 bg-white hover:bg-slate-100 shadow-lg active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Take the Free Assessment</span>
                <ArrowRight className="w-5 h-5 text-emerald-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
