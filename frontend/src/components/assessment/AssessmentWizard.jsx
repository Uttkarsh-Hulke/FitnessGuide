import React, { useState } from 'react';
import StepGoal from './StepGoal';
import StepPersonalInfo from './StepPersonalInfo';
import StepLifestyle from './StepLifestyle';
import StepGymExercise from './StepGymExercise';
import StepNutrition from './StepNutrition';
import StepHealthLimitations from './StepHealthLimitations';
import AnalysisLoadingScreen from './AnalysisLoadingScreen';
import { createAssessment } from '../../services/api';
import { ArrowLeft, ArrowRight, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

const TOTAL_STEPS = 6;

const INITIAL_FORM_DATA = {
  primaryGoal: 'Lose weight',
  name: '',
  age: 26,
  gender: 'male',
  heightCm: 175,
  weightKg: 72,
  exerciseFrequency: '1–2 days/week',
  dailyActivityLevel: 'Lightly active',
  sleepHours: 7.0,
  waterIntakeLiters: 2.2,
  sittingHours: 8.0,
  gymAccess: true,
  exerciseLocation: 'Gym',
  equipment: ['Dumbbells'],
  trainingTypes: ['Weight training', 'Cardio'],
  fitnessExperience: 'Beginner',
  workoutDuration: '30–45 minutes',
  workoutDaysPerWeek: 3,
  dietPreference: 'Vegetarian',
  mealsPerDay: 3,
  foodQuality: 'Balanced mix',
  junkFoodFrequency: '1–2 days/week',
  foodsAvoided: '',
  allergies: '',
  hasPhysicalLimitations: false,
  limitationsNotes: ''
};

export default function AssessmentWizard({ onComplete, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnalysisScreen, setShowAnalysisScreen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    const keys = Object.keys(fields);
    if (keys.some(k => errors[k])) {
      setErrors((prev) => {
        const next = { ...prev };
        keys.forEach(k => delete next[k]);
        return next;
      });
    }
  };

  const validateStep = (step) => {
    const errs = {};

    if (step === 1) {
      if (!formData.primaryGoal) {
        errs.primaryGoal = 'Please choose a primary fitness goal to continue.';
      }
    } else if (step === 2) {
      if (!formData.name || formData.name.trim().length < 2) {
        errs.name = 'Please enter a name with at least 2 characters.';
      }
      const age = Number(formData.age);
      if (isNaN(age) || age < 14 || age > 100) {
        errs.age = 'Age must be between 14 and 100.';
      }
      const h = Number(formData.heightCm);
      if (isNaN(h) || h < 100 || h > 250) {
        errs.heightCm = 'Height must be between 100 cm and 250 cm.';
      }
      const w = Number(formData.weightKg);
      if (isNaN(w) || w < 30 || w > 300) {
        errs.weightKg = 'Weight must be between 30 kg and 300 kg.';
      }
    } else if (step === 3) {
      if (!formData.exerciseFrequency) {
        errs.exerciseFrequency = 'Please indicate your current exercise frequency.';
      }
      if (!formData.dailyActivityLevel) {
        errs.dailyActivityLevel = 'Please select your daily activity level.';
      }
      const sleep = Number(formData.sleepHours);
      if (isNaN(sleep) || sleep < 3 || sleep > 16) {
        errs.sleepHours = 'Please enter realistic sleep hours (3–16).';
      }
      const water = Number(formData.waterIntakeLiters);
      if (isNaN(water) || water < 0.5 || water > 10) {
        errs.waterIntakeLiters = 'Please enter water intake between 0.5 and 10 L.';
      }
      const sitting = Number(formData.sittingHours);
      if (isNaN(sitting) || sitting < 0 || sitting > 24) {
        errs.sittingHours = 'Please enter sitting hours between 0 and 24.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onCancel) {
      onCancel();
    }
  };

  const handleSubmit = async () => {
    // Prevent repeated clicks
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setShowAnalysisScreen(true);

    try {
      const assessmentResult = await createAssessment(formData);
      setAnalysisResult(assessmentResult);
    } catch (err) {
      setIsSubmitting(false);
      setShowAnalysisScreen(false);
      setSubmitError(err.message || 'Failed to submit assessment. Please try again.');
    }
  };

  const handleAnalysisAnimationComplete = () => {
    setIsSubmitting(false);
    setShowAnalysisScreen(false);
    if (analysisResult && onComplete) {
      onComplete(analysisResult);
    }
  };

  const stepTitles = [
    'Primary Goal',
    'Personal Biometrics',
    'Lifestyle Habits',
    'Exercise & Equipment',
    'Food & Nutrition',
    'Health Guardrails'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1220] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      
      {/* Full-Screen Analysis Loading Screen */}
      {showAnalysisScreen && (
        <AnalysisLoadingScreen onComplete={handleAnalysisAnimationComplete} />
      )}

      <div className="max-w-3xl mx-auto">
        
        {/* Step Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="uppercase tracking-wider">
              Step {currentStep} of {TOTAL_STEPS} — {stepTitles[currentStep - 1]}
            </span>
            <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete</span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-panel p-6 sm:p-10 mb-8 transition-all">
          
          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm">
              {submitError}
            </div>
          )}

          {currentStep === 1 && (
            <StepGoal 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}

          {currentStep === 2 && (
            <StepPersonalInfo 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}

          {currentStep === 3 && (
            <StepLifestyle 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}

          {currentStep === 4 && (
            <StepGymExercise 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}

          {currentStep === 5 && (
            <StepNutrition 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}

          {currentStep === 6 && (
            <StepHealthLimitations 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-base font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 active:translate-y-0.5 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-200" />
                  <span>Synthesizing Assessment...</span>
                </>
              ) : currentStep === TOTAL_STEPS ? (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                  <span>Generate My Assessment</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </div>

        {/* Bottom Educational Disclaimer */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-500 max-w-lg mx-auto leading-relaxed">
          FitGuide calculates deterministic metrics using Mifflin-St Jeor and WHO reference equations. All guidance is educational and does not constitute medical diagnosis.
        </p>

      </div>
    </div>
  );
}
