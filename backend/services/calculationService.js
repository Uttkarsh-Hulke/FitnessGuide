/**
 * FitGuide Calculation Service
 * Deterministic fitness and lifestyle calculations
 */

// 1. BMI Calculation & Categorization
function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let category = 'Normal weight';
  let color = 'emerald';
  let riskNote = 'Associated with optimal baseline risk for general populations.';

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'amber';
    riskNote = 'May indicate inadequate caloric intake or micronutrient deficiencies.';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    color = 'emerald';
    riskNote = 'Within the standard recommended demographic range.';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'amber';
    riskNote = 'Mildly elevated screening indicator. Consider body composition & waist-to-hip ratio.';
  } else {
    category = 'Obesity';
    color = 'rose';
    riskNote = 'Elevated screening marker. Sustainable lifestyle and movement adjustments recommended.';
  }

  return {
    value: bmi,
    category,
    color,
    riskNote,
    explanation: 'BMI is one general screening measure and does not provide a complete picture of fitness or health. It does not differentiate between lean muscle mass and adipose tissue.'
  };
}

// 2. BMR (Mifflin-St Jeor Equation)
function calculateBMR(weightKg, heightCm, age, gender) {
  const normalizedGender = (gender || '').toLowerCase();
  let bmr = 0;

  if (normalizedGender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else if (normalizedGender === 'female') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  } else {
    // Neutral average
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 78;
  }

  return Math.round(bmr);
}

// 3. Maintenance Calories (TDEE)
function calculateMaintenanceCalories(bmr, activityLevel, workoutDaysPerWeek = 0) {
  let multiplier = 1.2; // Sedentary default

  const level = (activityLevel || '').toLowerCase();
  if (level.includes('very')) {
    multiplier = 1.725;
  } else if (level.includes('moderately') || level.includes('moderate')) {
    multiplier = 1.55;
  } else if (level.includes('lightly') || level.includes('light')) {
    multiplier = 1.375;
  } else {
    multiplier = 1.2;
  }

  // Refine slightly if weekly workout days are high
  if (workoutDaysPerWeek >= 5 && multiplier < 1.6) {
    multiplier += 0.1;
  } else if (workoutDaysPerWeek >= 3 && multiplier < 1.45) {
    multiplier += 0.05;
  }

  return Math.round(bmr * multiplier);
}

// 4. Goal-Based Caloric & Macronutrient Guidance
function calculateTargetCaloriesAndMacros(tdee, goal, weightKg, gender) {
  const normGoal = (goal || '').toLowerCase();
  let targetCalories = tdee;
  let calorieAdjustment = 0;
  let strategy = 'Maintenance';
  let guidanceText = 'Maintain energy balance with consistent nutrient-dense whole foods.';

  if (normGoal.includes('lose weight') || normGoal.includes('fat loss')) {
    calorieAdjustment = -450;
    targetCalories = Math.max(gender === 'female' ? 1250 : 1500, tdee - 450);
    strategy = 'Sustainable Moderate Deficit';
    guidanceText = 'A moderate 400-500 kcal deficit supports steady fat loss while preserving lean muscle mass and metabolic rate.';
  } else if (normGoal.includes('build muscle')) {
    calorieAdjustment = +300;
    targetCalories = tdee + 300;
    strategy = 'Lean Hypertrophy Surplus';
    guidanceText = 'A controlled 250-350 kcal surplus fuels muscle protein synthesis and gym performance without excessive fat gain.';
  } else if (normGoal.includes('gain healthy weight')) {
    calorieAdjustment = +400;
    targetCalories = tdee + 400;
    strategy = 'Consistent Calorie Surplus';
    guidanceText = 'A steady caloric surplus paired with resistance training ensures progressive weight gain centered on lean mass.';
  } else if (normGoal.includes('strength')) {
    calorieAdjustment = +150;
    targetCalories = tdee + 150;
    strategy = 'Performance Surplus / Maintenance';
    guidanceText = 'Slight surplus or maintenance calories to maximize neuromuscular recovery and heavy strength training adaptations.';
  } else if (normGoal.includes('stamina') || normGoal.includes('endurance')) {
    calorieAdjustment = +100;
    targetCalories = tdee + 100;
    strategy = 'Glycogen Replenishment';
    guidanceText = 'Ensures full glycogen replenishment for sustained cardiovascular and endurance sessions.';
  }

  // Macronutrient calculation
  let proteinPerKg = 1.6;
  if (normGoal.includes('muscle') || normGoal.includes('strength')) {
    proteinPerKg = 1.8;
  } else if (normGoal.includes('lose weight')) {
    proteinPerKg = 2.0; // Higher protein for satiety and muscle sparing during deficit
  } else {
    proteinPerKg = 1.4;
  }

  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const proteinCalories = proteinGrams * 4;

  // Healthy Fats: 25-30% of total target calories
  const fatCalories = targetCalories * 0.28;
  const fatGrams = Math.round(fatCalories / 9);

  // Carbohydrates: Remaining calories
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  return {
    targetCalories: Math.round(targetCalories),
    calorieAdjustment,
    strategy,
    guidanceText,
    macros: {
      protein: { grams: proteinGrams, percentage: Math.round((proteinCalories / targetCalories) * 100) },
      carbs: { grams: carbGrams, percentage: Math.round((carbCalories / targetCalories) * 100) },
      fats: { grams: fatGrams, percentage: Math.round((fatCalories / targetCalories) * 100) }
    }
  };
}

// 5. FitGuide Wellness Score Engine (0-100)
function calculateWellnessScore(userData, bmiValue) {
  const breakdown = [];

  // Pillar 1: BMI Health Range (Max 15 pts)
  let bmiScore = 0;
  let bmiExplanation = '';
  if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    bmiScore = 15;
    bmiExplanation = 'Optimal screening range.';
  } else if ((bmiValue >= 17.5 && bmiValue < 18.5) || (bmiValue >= 25 && bmiValue <= 27.5)) {
    bmiScore = 11;
    bmiExplanation = 'Slightly outside typical demographic range.';
  } else if (bmiValue > 27.5 && bmiValue <= 32) {
    bmiScore = 8;
    bmiExplanation = 'Elevated screening value; focus on movement and nutrition composition.';
  } else {
    bmiScore = 5;
    bmiExplanation = 'Significant variance from standard screening range.';
  }
  breakdown.push({
    category: 'BMI Health Range',
    score: bmiScore,
    maxScore: 15,
    status: bmiScore >= 12 ? 'optimal' : bmiScore >= 8 ? 'moderate' : 'needs_attention',
    feedback: bmiExplanation
  });

  // Pillar 2: Exercise Frequency & Routine (Max 20 pts)
  let exerciseScore = 0;
  const freq = (userData.exerciseFrequency || '').toLowerCase();
  if (freq.includes('5+')) {
    exerciseScore = 20;
  } else if (freq.includes('3–4') || freq.includes('3-4')) {
    exerciseScore = 18;
  } else if (freq.includes('1–2') || freq.includes('1-2')) {
    exerciseScore = 11;
  } else {
    exerciseScore = 4;
  }
  breakdown.push({
    category: 'Exercise Frequency',
    score: exerciseScore,
    maxScore: 20,
    status: exerciseScore >= 16 ? 'optimal' : exerciseScore >= 10 ? 'moderate' : 'needs_attention',
    feedback: exerciseScore >= 16 ? 'Consistent weekly training frequency.' : exerciseScore >= 10 ? 'Moderate activity; room to build progressive consistency.' : 'Sedentary baseline; start with manageable weekly movement.'
  });

  // Pillar 3: Daily Physical Activity & Sitting (Max 15 pts)
  let activityScore = 0;
  const activityLevel = (userData.dailyActivityLevel || '').toLowerCase();
  const sittingHours = Number(userData.sittingHours) || 8;

  if (activityLevel.includes('very active')) activityScore += 9;
  else if (activityLevel.includes('moderately active')) activityScore += 7;
  else if (activityLevel.includes('lightly active')) activityScore += 5;
  else activityScore += 2;

  // Sitting deduction/bonus (Max 6 pts)
  if (sittingHours <= 5) activityScore += 6;
  else if (sittingHours <= 8) activityScore += 4;
  else if (sittingHours <= 10) activityScore += 2;
  else activityScore += 1;

  activityScore = Math.min(15, Math.max(0, activityScore));
  breakdown.push({
    category: 'Daily Physical Activity',
    score: activityScore,
    maxScore: 15,
    status: activityScore >= 12 ? 'optimal' : activityScore >= 8 ? 'moderate' : 'needs_attention',
    feedback: sittingHours > 8 ? `Prolonged sitting (${sittingHours}h/day) limits non-exercise thermogenesis.` : 'Good balance of everyday ambulation and posture variation.'
  });

  // Pillar 4: Sleep Duration & Recovery (Max 15 pts)
  let sleepScore = 0;
  const sleepHours = Number(userData.sleepHours) || 7;
  if (sleepHours >= 7 && sleepHours <= 8.5) {
    sleepScore = 15;
  } else if ((sleepHours >= 6.5 && sleepHours < 7) || (sleepHours > 8.5 && sleepHours <= 9.5)) {
    sleepScore = 12;
  } else if (sleepHours >= 5.5 && sleepHours < 6.5) {
    sleepScore = 8;
  } else {
    sleepScore = 4;
  }
  breakdown.push({
    category: 'Sleep Duration & Recovery',
    score: sleepScore,
    maxScore: 15,
    status: sleepScore >= 12 ? 'optimal' : sleepScore >= 8 ? 'moderate' : 'needs_attention',
    feedback: sleepHours < 6.5 ? `Reported ${sleepHours} hours is below restorative cellular and cognitive recovery guidelines.` : 'Restorative sleep schedule supporting training adaptations.'
  });

  // Pillar 5: Nutrition & Food Quality (Max 15 pts)
  let nutritionScore = 0;
  const foodQuality = (userData.foodQuality || '').toLowerCase();
  const junkFreq = (userData.junkFoodFrequency || '').toLowerCase();

  if (foodQuality.includes('excellent') || foodQuality.includes('mostly whole')) nutritionScore += 8;
  else if (foodQuality.includes('balanced') || foodQuality.includes('average')) nutritionScore += 6;
  else nutritionScore += 3;

  if (junkFreq.includes('rarely') || junkFreq.includes('never')) nutritionScore += 7;
  else if (junkFreq.includes('1–2') || junkFreq.includes('1-2') || junkFreq.includes('sometimes')) nutritionScore += 5;
  else if (junkFreq.includes('3–4') || junkFreq.includes('3-4')) nutritionScore += 3;
  else nutritionScore += 1;

  nutritionScore = Math.min(15, Math.max(0, nutritionScore));
  breakdown.push({
    category: 'Nutrition & Food Quality',
    score: nutritionScore,
    maxScore: 15,
    status: nutritionScore >= 12 ? 'optimal' : nutritionScore >= 8 ? 'moderate' : 'needs_attention',
    feedback: junkFreq.includes('frequent') || junkFreq.includes('daily') ? 'Frequent ultra-processed intake impacts micronutrient density and glycemic control.' : 'Nutritious whole-food baseline.'
  });

  // Pillar 6: Hydration Habits (Max 10 pts)
  let hydrationScore = 0;
  const waterLiters = Number(userData.waterIntakeLiters) || 2;
  if (waterLiters >= 2.5 && waterLiters <= 4.0) {
    hydrationScore = 10;
  } else if (waterLiters >= 2.0 && waterLiters < 2.5) {
    hydrationScore = 8;
  } else if (waterLiters >= 1.2 && waterLiters < 2.0) {
    hydrationScore = 5;
  } else {
    hydrationScore = 2;
  }
  breakdown.push({
    category: 'Hydration',
    score: hydrationScore,
    maxScore: 10,
    status: hydrationScore >= 8 ? 'optimal' : hydrationScore >= 5 ? 'moderate' : 'needs_attention',
    feedback: waterLiters < 2.0 ? `Reported intake (~${waterLiters}L) is sub-optimal for circulation and recovery.` : 'Sufficient fluid volume supporting metabolic waste elimination.'
  });

  // Pillar 7: Goal & Lifestyle Alignment (Max 10 pts)
  let alignmentScore = 0;
  const userGoal = (userData.primaryGoal || '').toLowerCase();
  const gymAccess = userData.gymAccess === true || userData.gymAccess === 'yes';

  // Check synergy between goal and current habit investment
  if ((userGoal.includes('muscle') || userGoal.includes('strength')) && (gymAccess || (userData.equipment || []).length > 0)) {
    alignmentScore += 5;
  } else if (userGoal.includes('lose weight') && !activityLevel.includes('sitting')) {
    alignmentScore += 5;
  } else {
    alignmentScore += 3;
  }

  if (exerciseScore >= 11 && sleepScore >= 8) {
    alignmentScore += 5;
  } else {
    alignmentScore += 3;
  }
  alignmentScore = Math.min(10, Math.max(0, alignmentScore));

  breakdown.push({
    category: 'Goal Alignment',
    score: alignmentScore,
    maxScore: 10,
    status: alignmentScore >= 8 ? 'optimal' : alignmentScore >= 5 ? 'moderate' : 'needs_attention',
    feedback: alignmentScore >= 8 ? 'Daily habits strongly align with stated target.' : 'Discrepancy between stated goal and current activity/recovery patterns.'
  });

  // Sum total
  const totalScore = breakdown.reduce((sum, item) => sum + item.score, 0);

  let tier = 'Good foundation';
  let badgeClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (totalScore >= 85) {
    tier = 'Optimal Foundation';
    badgeClass = 'text-teal-700 bg-teal-50 border-teal-200';
  } else if (totalScore >= 70) {
    tier = 'Good Foundation';
    badgeClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (totalScore >= 55) {
    tier = 'Moderate Foundation';
    badgeClass = 'text-amber-700 bg-amber-50 border-amber-200';
  } else {
    tier = 'Needs Focused Attention';
    badgeClass = 'text-rose-700 bg-rose-50 border-rose-200';
  }

  return {
    totalScore,
    maxScore: 100,
    tier,
    badgeClass,
    breakdown,
    disclaimer: 'This FitGuide Wellness Score is an educational assessment based on the information you provided. It is not a medically validated clinical measurement.'
  };
}

module.exports = {
  calculateBMI,
  calculateBMR,
  calculateMaintenanceCalories,
  calculateTargetCaloriesAndMacros,
  calculateWellnessScore
};
