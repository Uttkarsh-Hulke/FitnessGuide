const Assessment = require('../models/Assessment');
const ProgressLog = require('../models/ProgressLog');
const {
  calculateBMI,
  calculateBMR,
  calculateMaintenanceCalories,
  calculateTargetCaloriesAndMacros,
  calculateWellnessScore
} = require('../services/calculationService');
const { generateRecommendations } = require('../services/recommendationEngine');
const { generateWorkoutPlan } = require('../services/workoutEngine');
const { generateNutritionPlan } = require('../services/nutritionEngine');
const { generateLifestylePlan } = require('../services/lifestyleEngine');

// In-memory fallback cache if MongoDB is offline or in disconnected state
let memoryAssessments = [];

exports.createAssessment = async (req, res) => {
  try {
    const data = req.body;

    // 1. Validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please provide a valid name (at least 2 characters).' });
    }

    const age = Number(data.age);
    if (isNaN(age) || age < 14 || age > 100) {
      return res.status(400).json({ success: false, message: 'Please enter a valid age between 14 and 100.' });
    }

    const heightCm = Number(data.heightCm);
    if (isNaN(heightCm) || heightCm < 100 || heightCm > 250) {
      return res.status(400).json({ success: false, message: 'Please enter a realistic height between 100 cm and 250 cm.' });
    }

    const weightKg = Number(data.weightKg);
    if (isNaN(weightKg) || weightKg < 30 || weightKg > 300) {
      return res.status(400).json({ success: false, message: 'Please enter a realistic weight between 30 kg and 300 kg.' });
    }

    const sleepHours = Number(data.sleepHours);
    if (isNaN(sleepHours) || sleepHours < 3 || sleepHours > 16) {
      return res.status(400).json({ success: false, message: 'Please enter realistic sleep hours between 3 and 16.' });
    }

    const waterIntakeLiters = Number(data.waterIntakeLiters);
    if (isNaN(waterIntakeLiters) || waterIntakeLiters < 0.5 || waterIntakeLiters > 10) {
      return res.status(400).json({ success: false, message: 'Please enter realistic daily water intake between 0.5 L and 10 L.' });
    }

    const sittingHours = Number(data.sittingHours);
    if (isNaN(sittingHours) || sittingHours < 0 || sittingHours > 24) {
      return res.status(400).json({ success: false, message: 'Please enter daily sitting hours between 0 and 24.' });
    }

    // Normalized user inputs
    const userData = {
      name: data.name.trim(),
      age,
      gender: (data.gender || 'other').toLowerCase(),
      heightCm,
      weightKg,
      primaryGoal: data.primaryGoal || 'Improve overall lifestyle',
      exerciseFrequency: data.exerciseFrequency || 'Never',
      dailyActivityLevel: data.dailyActivityLevel || 'Mostly sitting',
      sleepHours,
      waterIntakeLiters,
      sittingHours,
      gymAccess: Boolean(data.gymAccess === true || data.gymAccess === 'yes' || data.gymAccess === 'true'),
      exerciseLocation: data.exerciseLocation || (data.gymAccess ? 'Gym' : 'Home'),
      equipment: Array.isArray(data.equipment) ? data.equipment : (data.equipment ? [data.equipment] : []),
      trainingTypes: Array.isArray(data.trainingTypes) ? data.trainingTypes : (data.trainingTypes ? [data.trainingTypes] : []),
      fitnessExperience: data.fitnessExperience || 'Beginner',
      workoutDuration: data.workoutDuration || '30–45 minutes',
      workoutDaysPerWeek: Math.min(7, Math.max(1, Number(data.workoutDaysPerWeek) || 3)),
      dietPreference: data.dietPreference || 'Vegetarian',
      mealsPerDay: Number(data.mealsPerDay) || 3,
      foodQuality: data.foodQuality || 'Balanced',
      junkFoodFrequency: data.junkFoodFrequency || '1–2 days/week',
      foodsAvoided: data.foodsAvoided || '',
      allergies: data.allergies || '',
      hasPhysicalLimitations: Boolean(data.hasPhysicalLimitations),
      limitationsNotes: data.limitationsNotes || ''
    };

    // 2. Calculations
    const bmi = calculateBMI(userData.weightKg, userData.heightCm);
    const bmr = calculateBMR(userData.weightKg, userData.heightCm, userData.age, userData.gender);
    const maintenanceCalories = calculateMaintenanceCalories(bmr, userData.dailyActivityLevel, userData.workoutDaysPerWeek);
    const calorieMacros = calculateTargetCaloriesAndMacros(maintenanceCalories, userData.primaryGoal, userData.weightKg, userData.gender);
    const wellnessScore = calculateWellnessScore(userData, bmi.value);

    // 3. Recommendation, Workout, Nutrition & Lifestyle Engines
    const recommendationOutputs = generateRecommendations(userData, { bmi, wellnessScore });
    const workoutPlan = generateWorkoutPlan(userData);
    const nutritionPlan = generateNutritionPlan(userData, calorieMacros);
    const lifestylePlan = generateLifestylePlan(userData);

    const fullAssessmentObject = {
      ...userData,
      bmi,
      bmr,
      maintenanceCalories,
      targetCalories: calorieMacros.targetCalories,
      calorieAdjustment: calorieMacros.calorieAdjustment,
      calorieStrategy: calorieMacros.strategy,
      calorieGuidanceText: calorieMacros.guidanceText,
      macros: calorieMacros.macros,
      wellnessScore,
      recommendations: recommendationOutputs.recommendations,
      top3Priorities: recommendationOutputs.top3Priorities,
      nextBestAction: recommendationOutputs.nextBestAction,
      healthStatus: recommendationOutputs.healthStatus,
      workoutPlan,
      nutritionPlan,
      lifestylePlan,
      createdAt: new Date()
    };

    // 4. Persistence in MongoDB
    let savedDoc = null;
    try {
      savedDoc = await Assessment.create(fullAssessmentObject);

      // Create or update progress entry for today
      await ProgressLog.create({
        weightKg: userData.weightKg,
        exerciseMinutes: userData.workoutDaysPerWeek > 0 ? 35 : 0,
        exerciseType: userData.primaryGoal,
        waterIntakeLiters: userData.waterIntakeLiters,
        sleepHours: userData.sleepHours,
        wellnessScore: wellnessScore.totalScore,
        notes: `Assessment completed for ${userData.primaryGoal}.`
      });
    } catch (dbErr) {
      console.warn(`[AssessmentController] MongoDB write failed/offline (${dbErr.message}). Saving to memory fallback.`);
      fullAssessmentObject._id = 'mem_' + Date.now();
      savedDoc = fullAssessmentObject;
      memoryAssessments.unshift(fullAssessmentObject);
    }

    return res.status(201).json({
      success: true,
      message: 'Assessment completed and analyzed successfully.',
      data: savedDoc
    });
  } catch (error) {
    console.error('[AssessmentController] Error processing assessment:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while calculating the assessment.',
      error: error.message
    });
  }
};

exports.getLatestAssessment = async (req, res) => {
  try {
    let latest = null;
    try {
      latest = await Assessment.findOne().sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn('[AssessmentController] DB error in getLatest, checking memory cache.');
      latest = memoryAssessments[0] || null;
    }

    if (!latest && memoryAssessments.length > 0) {
      latest = memoryAssessments[0];
    }

    if (!latest) {
      return res.status(404).json({
        success: false,
        message: 'No assessments found. Complete your first assessment to view results.'
      });
    }

    return res.status(200).json({
      success: true,
      data: latest
    });
  } catch (error) {
    console.error('[AssessmentController] Error fetching latest assessment:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssessmentHistory = async (req, res) => {
  try {
    let history = [];
    try {
      history = await Assessment.find({}, 'name primaryGoal wellnessScore bmi createdAt')
        .sort({ createdAt: -1 })
        .limit(20);
    } catch (dbErr) {
      history = memoryAssessments.map(a => ({
        _id: a._id,
        name: a.name,
        primaryGoal: a.primaryGoal,
        wellnessScore: a.wellnessScore,
        bmi: a.bmi,
        createdAt: a.createdAt
      }));
    }

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    console.error('[AssessmentController] Error fetching assessment history:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;
    let assessment = null;

    if (id.startsWith('mem_')) {
      assessment = memoryAssessments.find(a => a._id === id);
    } else {
      try {
        assessment = await Assessment.findById(id);
      } catch (dbErr) {
        assessment = memoryAssessments.find(a => a._id === id);
      }
    }

    if (!assessment) {
      return res.status(404).json({ success: false, message: 'Assessment not found.' });
    }

    return res.status(200).json({ success: true, data: assessment });
  } catch (error) {
    console.error('[AssessmentController] Error fetching assessment by id:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
