import React from 'react';
import WellnessScoreCard from '../components/dashboard/WellnessScoreCard';
import NextBestActionCard from '../components/dashboard/NextBestActionCard';
import TopPrioritiesCard from '../components/dashboard/TopPrioritiesCard';
import BmiGauge from '../components/dashboard/BmiGauge';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import HealthStatusBanner from '../components/dashboard/HealthStatusBanner';
import AssessmentDetailsView from '../components/dashboard/AssessmentDetailsView';
import ExercisePlanView from '../components/exercise/ExercisePlanView';
import NutritionPlanView from '../components/nutrition/NutritionPlanView';
import LifestyleView from '../components/lifestyle/LifestyleView';
import ProgressTrackerView from '../components/progress/ProgressTrackerView';
import KnowledgeBaseView from '../components/knowledge/KnowledgeBaseView';

import { 
  HeartPulse, 
  Dumbbell, 
  Utensils, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  ClipboardList, 
  RotateCcw
} from 'lucide-react';

export default function DashboardPage({ 
  assessment, 
  activeTab, 
  setActiveTab, 
  onRetakeAssessment,
  onSelectAssessment 
}) {
  if (!assessment) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <HeartPulse className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Assessment Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Complete the assessment to generate your personalized health metrics and workout routines.
          </p>
          <button
            onClick={onRetakeAssessment}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm cursor-pointer"
          >
            Start Fitness Assessment
          </button>
        </div>
      </div>
    );
  }

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: HeartPulse },
    { id: 'details', label: 'My Assessment', icon: ClipboardList },
    { id: 'exercise', label: 'Exercise Plan', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'lifestyle', label: 'Lifestyle', icon: Sparkles },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] pb-16 transition-colors duration-200">
      
      {/* Top Welcome Bar */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                FitGuide Portal
              </span>
              <span className="text-sm text-slate-300 dark:text-slate-700">•</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Goal: {assessment.primaryGoal}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Hey, {assessment.name || 'Friend'}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
              Personalized insights based on your lifestyle and goals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRetakeAssessment}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Update Profile</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* OVERVIEW TAB - REORGANIZED VISUAL HIERARCHY */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 1. Health Status Banner */}
            <HealthStatusBanner 
              healthStatus={assessment.healthStatus} 
              name={assessment.name} 
            />

            {/* 2. Hero Wellness Score Card (Animated Count-Up) */}
            <WellnessScoreCard 
              wellnessScore={assessment.wellnessScore} 
            />

            {/* 3. Key Metrics: Dominant Numerical Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <BmiGauge bmi={assessment.bmi} />
              </div>
              <div className="lg:col-span-2">
                <MetricsGrid assessment={assessment} />
              </div>
            </div>

            {/* 4. Your Top Priorities */}
            <TopPrioritiesCard 
              top3Priorities={assessment.top3Priorities} 
            />

            {/* 5. Next Best Action Hero Card */}
            <NextBestActionCard 
              nextBestAction={assessment.nextBestAction}
              onExploreAction={() => setActiveTab('exercise')}
            />

            {/* 6. Quick Deep-Dive Action Cards (Progressive Navigation) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <button
                onClick={() => setActiveTab('exercise')}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Exercise Split</span>
                  <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                  {assessment.workoutPlan?.splitName || 'Workout Routine'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {assessment.workoutPlan?.workoutDaysPerWeek || 3} days/wk • {assessment.workoutPlan?.workoutDuration || '30-45 min'}
                </p>
              </button>

              <button
                onClick={() => setActiveTab('nutrition')}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Nutrition</span>
                  <Utensils className="w-5 h-5 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                  {assessment.targetCalories} kcal/day
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {assessment.dietPreference} • {assessment.calorieStrategy}
                </p>
              </button>

              <button
                onClick={() => setActiveTab('progress')}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm text-left transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Habit Tracking</span>
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                  Progress Analytics
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Weight trend & daily adherence graphs
                </p>
              </button>
            </div>

          </div>
        )}

        {/* DETAILS / MY ASSESSMENT TAB */}
        {activeTab === 'details' && (
          <div className="animate-in fade-in duration-200">
            <AssessmentDetailsView assessment={assessment} />
          </div>
        )}

        {/* EXERCISE PLAN TAB */}
        {activeTab === 'exercise' && (
          <div className="animate-in fade-in duration-200">
            <ExercisePlanView workoutPlan={assessment.workoutPlan} />
          </div>
        )}

        {/* NUTRITION TAB */}
        {activeTab === 'nutrition' && (
          <div className="animate-in fade-in duration-200">
            <NutritionPlanView 
              nutritionPlan={assessment.nutritionPlan}
              targetCalories={assessment.targetCalories}
              macros={assessment.macros}
              goal={assessment.primaryGoal}
            />
          </div>
        )}

        {/* LIFESTYLE TAB */}
        {activeTab === 'lifestyle' && (
          <div className="animate-in fade-in duration-200">
            <LifestyleView lifestylePlan={assessment.lifestylePlan} />
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === 'progress' && (
          <div className="animate-in fade-in duration-200">
            <ProgressTrackerView 
              currentScore={assessment.wellnessScore?.totalScore || 75}
              onSelectAssessment={onSelectAssessment}
            />
          </div>
        )}

        {/* KNOWLEDGE BASE TAB */}
        {activeTab === 'knowledge' && (
          <div className="animate-in fade-in duration-200">
            <KnowledgeBaseView />
          </div>
        )}

      </main>

    </div>
  );
}
