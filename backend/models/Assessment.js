const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  // Personal Info
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 14, max: 100 },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  heightCm: { type: Number, required: true, min: 100, max: 250 },
  weightKg: { type: Number, required: true, min: 30, max: 300 },

  // Goal
  primaryGoal: { type: String, required: true },

  // Lifestyle
  exerciseFrequency: { type: String, required: true },
  dailyActivityLevel: { type: String, required: true },
  sleepHours: { type: Number, required: true, min: 3, max: 16 },
  waterIntakeLiters: { type: Number, required: true, min: 0.5, max: 10 },
  sittingHours: { type: Number, required: true, min: 0, max: 24 },

  // Gym & Exercise
  gymAccess: { type: Boolean, default: false },
  exerciseLocation: { type: String, default: 'Home' },
  equipment: { type: [String], default: [] },
  trainingTypes: { type: [String], default: [] },
  fitnessExperience: { type: String, default: 'Beginner' },
  workoutDuration: { type: String, default: '30–45 minutes' },
  workoutDaysPerWeek: { type: Number, default: 3, min: 1, max: 7 },

  // Nutrition
  dietPreference: { type: String, default: 'Vegetarian' },
  mealsPerDay: { type: Number, default: 3 },
  foodQuality: { type: String, default: 'Balanced' },
  junkFoodFrequency: { type: String, default: '1–2 days/week' },
  foodsAvoided: { type: String, default: '' },
  allergies: { type: String, default: '' },

  // Health Limitations
  hasPhysicalLimitations: { type: Boolean, default: false },
  limitationsNotes: { type: String, default: '' },

  // Calculated Results
  bmi: {
    value: Number,
    category: String,
    color: String,
    riskNote: String,
    explanation: String
  },
  bmr: Number,
  maintenanceCalories: Number,
  targetCalories: Number,
  calorieAdjustment: Number,
  calorieStrategy: String,
  calorieGuidanceText: String,
  macros: {
    protein: { grams: Number, percentage: Number },
    carbs: { grams: Number, percentage: Number },
    fats: { grams: Number, percentage: Number }
  },

  // Wellness Score
  wellnessScore: {
    totalScore: Number,
    maxScore: Number,
    tier: String,
    badgeClass: String,
    breakdown: [{
      category: String,
      score: Number,
      maxScore: Number,
      status: String,
      feedback: String
    }],
    disclaimer: String
  },

  // Recommendations
  recommendations: [{
    category: String,
    severity: String,
    condition: String,
    why: String,
    action: [String]
  }],
  top3Priorities: [{
    rank: Number,
    title: String,
    why: String,
    action: String,
    firstStep: String
  }],
  nextBestAction: {
    title: String,
    why: String,
    startHere: String,
    category: String
  },
  healthStatus: {
    type: { type: String },
    headline: String,
    subtext: String,
    balancedReminder: String
  },

  // Plans
  workoutPlan: { type: mongoose.Schema.Types.Mixed },
  nutritionPlan: { type: mongoose.Schema.Types.Mixed },
  lifestylePlan: { type: mongoose.Schema.Types.Mixed },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
