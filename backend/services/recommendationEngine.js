/**
 * FitGuide Recommendation Engine
 * Analyzes inputs and produces explainable recommendations:
 * Condition -> Why It Matters -> What You Can Do
 * Top 3 Priorities & Next Best Action
 */

function generateRecommendations(userData, calculations) {
  const recommendations = [];
  const candidatePriorities = [];

  const sleepHours = Number(userData.sleepHours) || 7;
  const sittingHours = Number(userData.sittingHours) || 8;
  const waterLiters = Number(userData.waterIntakeLiters) || 2;
  const exerciseFreq = (userData.exerciseFrequency || '').toLowerCase();
  const junkFreq = (userData.junkFoodFrequency || '').toLowerCase();
  const primaryGoal = userData.primaryGoal || 'Improve overall lifestyle';
  const hasInjuries = Boolean(userData.hasPhysicalLimitations || userData.limitationsNotes);
  const limitationsNotes = userData.limitationsNotes || '';
  const bmiData = calculations.bmi;
  const wellnessScore = calculations.wellnessScore.totalScore;

  // 1. SLEEP ANALYSIS
  if (sleepHours < 6.5) {
    recommendations.push({
      category: 'Sleep & Recovery',
      severity: sleepHours < 5.5 ? 'critical' : 'warning',
      condition: `You reported approximately ${sleepHours} hours of sleep per night.`,
      why: 'Adequate sleep is the primary physiological window for cellular repair, growth hormone release, central nervous system recovery, and hormonal appetite regulation (ghrelin/leptin balance).',
      action: [
        'Establish a consistent sleep-wake schedule, even on weekends (±30 minutes).',
        'Create a 45-minute digital sunset by dimming bright overhead lighting and turning off phone/laptop screens before bed.',
        'Keep the sleeping environment cool (around 18-20°C / 65-68°F), dark, and quiet.'
      ]
    });

    candidatePriorities.push({
      priorityWeight: sleepHours < 5.5 ? 95 : 85,
      title: 'Improve Sleep Duration & Quality',
      why: `At ${sleepHours} hours, chronic sleep deficits impair insulin sensitivity, elevate cortisol, and severely blunt muscle recovery and fat loss efforts.`,
      action: 'Shift bedtime 30 minutes earlier over the next 7 days and set a strict screen curfew.',
      firstStep: 'Tonight: Set a phone alarm 45 minutes before bedtime to turn off screens and dim ambient room lights.'
    });
  } else if (sleepHours > 9.5) {
    recommendations.push({
      category: 'Sleep & Recovery',
      severity: 'info',
      condition: `You reported ${sleepHours} hours of sleep, which is on the higher end.`,
      why: 'Prolonged time in bed without feeling energized can indicate sleep fragmentation, lack of deep REM cycles, or underlying sluggishness.',
      action: [
        'Expose your eyes to natural morning sunlight within 30 minutes of waking.',
        'Evaluate sleep quality rather than pure duration; avoid heavy late meals before sleep.'
      ]
    });
  }

  // 2. EXERCISE & MOVEMENT FREQUENCY
  if (exerciseFreq.includes('never') || exerciseFreq.includes('1–2') || exerciseFreq.includes('1-2')) {
    const isZero = exerciseFreq.includes('never');
    recommendations.push({
      category: 'Exercise Habits',
      severity: isZero ? 'critical' : 'warning',
      condition: isZero 
        ? 'You currently do not engage in structured weekly exercise.' 
        : 'You reported exercising only 1 to 2 days per week.',
      why: 'Cardiovascular and muscular systems require regular stimulus to maintain mitochondrial density, bone mineral density, joint mobility, and glucose clearance.',
      action: [
        'Start with 3 dedicated 25-minute movement sessions spread evenly throughout the week (e.g., Mon/Wed/Fri).',
        'Focus on foundational movement patterns: pushing, pulling, squatting, and brisk walking before escalating intensity.',
        'Prioritize exercise adherence and consistency over high-intensity fatigue in the first 4 weeks.'
      ]
    });

    candidatePriorities.push({
      priorityWeight: isZero ? 92 : 80,
      title: 'Establish a Regular Movement Routine',
      why: `Your goal to "${primaryGoal}" requires progressive physical stimulus to build baseline cardiovascular and muscular conditioning.`,
      action: 'Schedule 3 weekly non-negotiable 25-minute physical activity sessions.',
      firstStep: 'Pick 3 days this week on your calendar and block out 25 minutes for a brisk walk or beginner bodyweight session.'
    });
  }

  // 3. SEDENTARY / SCREEN TIME ANALYSIS
  if (sittingHours >= 9) {
    recommendations.push({
      category: 'Daily Activity & Posture',
      severity: sittingHours >= 11 ? 'critical' : 'warning',
      condition: `You spend approximately ${sittingHours} hours per day sitting or in front of screens.`,
      why: 'Prolonged static sitting slows lipoprotein lipase activity, stiffens hip flexors, deactivates gluteal muscles, and elevates metabolic disease risk even if you do a 30-minute workout.',
      action: [
        'Adopt the 50/10 rule: For every 50 minutes of focused desk work, take a 5-10 minute posture reset and walking break.',
        'Incorporate standing phone calls or walking meetings whenever practical.',
        'Perform gentle hip flexor stretches and spinal rotations during midday breaks.'
      ]
    });

    candidatePriorities.push({
      priorityWeight: sittingHours >= 11 ? 88 : 75,
      title: 'Break Up Prolonged Sitting Time',
      why: `${sittingHours} daily sedentary hours suppress non-exercise activity thermogenesis (NEAT) and stiffen spine and hip kinematics.`,
      action: 'Integrate frequent micro-movements throughout your workday to keep circulation and metabolic enzyme activity elevated.',
      firstStep: 'Set an hourly vibrating timer on your phone or smartwatch to stand up, drink water, and do 10 gentle air squats.'
    });
  }

  // 4. HYDRATION ANALYSIS
  if (waterLiters < 2.0) {
    recommendations.push({
      category: 'Hydration',
      severity: waterLiters < 1.5 ? 'warning' : 'info',
      condition: `You reported drinking approximately ${waterLiters} liters of water daily.`,
      why: 'Even mild dehydration (1-2% body weight loss) reduces mental concentration, lowers physical exercise endurance by up to 15%, and slows nutrient transport.',
      action: [
        'Target a progressive intake of 2.5 to 3.0 liters per day distributed steadily between waking and dinner.',
        'Drink 1 glass of water immediately upon rising to counter overnight respiratory fluid loss.',
        'Keep a reusable 1-liter bottle at your desk and aim to finish the first bottle before 1:00 PM.'
      ]
    });

    if (waterLiters < 1.5) {
      candidatePriorities.push({
        priorityWeight: 72,
        title: 'Optimize Baseline Hydration',
        why: `Consuming ~${waterLiters}L fluids daily impairs cognitive focus, joint lubrication, and cellular nutrient delivery during exercise.`,
        action: 'Gradually increase daily fluid intake to 2.5–3.0 liters of water or unsweetened infusions.',
        firstStep: 'Keep a 1-liter water bottle at your workspace and commit to drinking one full glass right after waking.'
      });
    }
  }

  // 5. NUTRITION & ULTRA-PROCESSED FOOD
  if (junkFreq.includes('3–4') || junkFreq.includes('3-4') || junkFreq.includes('daily') || junkFreq.includes('frequently')) {
    recommendations.push({
      category: 'Dietary Quality',
      severity: 'warning',
      condition: 'You reported consuming highly processed or junk foods several times a week or daily.',
      why: 'Ultra-processed items are hyper-palatable yet calorie-dense and micronutrient-poor, leading to blood sugar spikes, subsequent energy crashes, and persistent cravings.',
      action: [
        'Use swap strategies rather than strict elimination: replace fried packaged snacks with roasted legumes (chana), pumpkin seeds, or mixed nuts.',
        'Replace sugary sodas and packaged sweetened beverages with water infused with lemon, mint, or unsweetened herbal teas.',
        'Ensure every main meal includes a recognizable whole-food protein source and vegetable fiber.'
      ]
    });

    candidatePriorities.push({
      priorityWeight: 78,
      title: 'Upgrade Snack Quality & Whole Foods',
      why: 'Frequent ultra-processed snacks disrupt appetite hormones and dilute your dietary micronutrient density.',
      action: 'Replace 2 packaged snacks this week with whole-food nutrient-dense alternatives (e.g. roasted chana, fresh fruit, Greek yogurt/curd).',
      firstStep: 'Stock your workspace or pantry with healthy grab-and-go options like roasted chana, almonds, or whole fruits.'
    });
  }

  // 6. HEALTH LIMITATIONS & INJURY GUARDRAIL
  if (hasInjuries) {
    recommendations.unshift({
      category: 'Safety & Physical Limitations',
      severity: 'critical',
      condition: `You reported physical limitations, injuries, or joint concerns: "${limitationsNotes || 'General reported joint/mobility limitation'}".`,
      why: 'Training through acute pain or improper rehabilitation can exacerbate structural inflammation and lead to compensatory movement dysfunctions.',
      action: [
        'Before initiating any new training regimen, consult a certified physical therapist or qualified physician.',
        'Avoid high-impact plyometrics, maximal loads, or exercises that reproduce joint sharp pain.',
        'Focus on controlled isometric contractions, gentle active mobility, and pain-free ranges of motion.'
      ]
    });
  }

  // 7. BMI SCREENING CONTEXT
  if (bmiData.category === 'Overweight' || bmiData.category === 'Obesity') {
    recommendations.push({
      category: 'Body Composition Context',
      severity: 'info',
      condition: `Your calculated BMI is ${bmiData.value} (${bmiData.category}).`,
      why: 'BMI is an epidemiological population screening metric. It does not measure visceral fat vs subcutaneous fat or muscular skeletal frame.',
      action: [
        'Focus on measurable healthy habits (strength gains, daily step count, fiber intake) rather than rapid scale fluctuations.',
        'Prioritize resistance training to preserve lean tissue while creating a moderate, sustainable caloric deficit.'
      ]
    });
  } else if (bmiData.category === 'Underweight') {
    recommendations.push({
      category: 'Energy Balance Context',
      severity: 'warning',
      condition: `Your calculated BMI is ${bmiData.value} (Underweight).`,
      why: 'Insufficient energy intake can impair immune function, bone density, and hormonal resilience.',
      action: [
        'Focus on calorically dense, nutrient-rich foods such as nuts, seeds, nut butters, avocados, and dairy/plant milks.',
        'Incorporate progressive resistance training to stimulate healthy lean tissue accretion rather than pure sedentary weight gain.'
      ]
    });
  }

  // Ensure candidatePriorities has at least 3 items with diverse fallbacks
  if (candidatePriorities.length < 3) {
    const fallbacks = [
      {
        priorityWeight: 60,
        title: 'Maintain Consistent Hydration & Electrolytes',
        why: 'Consistent fluid intake optimizes nutrient transport, joint cushioning, and thermoregulation during physical activity.',
        action: 'Sustain a steady intake of 2.5–3.0 liters of water daily.',
        firstStep: 'Start your morning with a tall 350ml glass of room-temperature water before coffee or breakfast.'
      },
      {
        priorityWeight: 58,
        title: 'Prioritize Whole-Food Protein at Every Meal',
        why: 'Distributing protein across 3–4 meals maximizes muscle protein synthesis and promotes prolonged satiety.',
        action: 'Include 20–30g of protein (lentils, paneer, tofu, eggs, chicken) with every main meal.',
        firstStep: 'Review your upcoming lunch and dinner to ensure each has a designated high-protein anchor food.'
      },
      {
        priorityWeight: 55,
        title: 'Daily Posture & Hip Mobility Practice',
        why: 'Brief daily mobility drills preserve spinal health and open tight hip flexors caused by seated work.',
        action: 'Perform 5 minutes of cat-cow, thoracic rotations, and 90/90 hip stretches daily.',
        firstStep: 'Do 3 minutes of gentle deep breathing and seated spinal twists during your next work break.'
      },
      {
        priorityWeight: 52,
        title: 'Progressive Overload Tracking',
        why: 'Gradual progression in reps, sets, or walking distance ensures continuous neuromuscular adaptation over time.',
        action: 'Log your workout sessions and aim for small incremental improvements week over week.',
        firstStep: 'Note down your completed reps or walking time in the FitGuide progress tracker after your next session.'
      }
    ];

    for (const fb of fallbacks) {
      if (!candidatePriorities.some(p => p.title === fb.title) && candidatePriorities.length < 3) {
        candidatePriorities.push(fb);
      }
    }
  }

  // Sort candidate priorities by priority weight descending and take top 3
  candidatePriorities.sort((a, b) => b.priorityWeight - a.priorityWeight);
  const top3Priorities = candidatePriorities.slice(0, 3).map((p, idx) => ({
    rank: idx + 1,
    title: p.title,
    why: p.why,
    action: p.action,
    firstStep: p.firstStep
  }));

  // GENERATE "NEXT BEST ACTION" HERO CARD
  let nextBestAction = null;
  const topP = top3Priorities[0];
  if (topP) {
    nextBestAction = {
      title: topP.title,
      why: topP.why,
      startHere: topP.firstStep,
      category: topP.title.includes('Sleep') ? 'Sleep & Recovery' : topP.title.includes('Movement') || topP.title.includes('Sitting') ? 'Physical Movement' : 'Nutrition & Wellness'
    };
  } else {
    nextBestAction = {
      title: 'Complete a 25-minute brisk walk today',
      why: 'Low-impact cardiovascular movement activates cellular glucose uptake and jumpstarts metabolism.',
      startHere: 'Lace up comfortable shoes and take a brisk 25-minute walk outdoors or on a treadmill after lunch or dinner.',
      category: 'Physical Movement'
    };
  }

  // GENERATE HEALTH STATUS BANNER (Nuanced messaging)
  let healthStatus = {};
  if (wellnessScore >= 75) {
    healthStatus = {
      type: 'positive',
      headline: "You're doing well in several key areas.",
      subtext: 'Your current lifestyle reflects several positive habits and a solid health baseline.',
      balancedReminder: 'Being in a healthy BMI range or having good habits does not mean everything is permanently optimized. Continue exercising regularly, eating nutrient-dense whole foods, staying active throughout the day, and prioritizing deep restorative sleep.'
    };
  } else if (wellnessScore >= 55) {
    healthStatus = {
      type: 'moderate',
      headline: "Good baseline with clear growth opportunities.",
      subtext: 'You have solid building blocks, and small consistent tweaks will make a noticeable difference in your everyday energy and fitness.',
      balancedReminder: 'Focus on your Top 3 Priorities one week at a time. Sustainable fitness is built through small, repeatable adjustments rather than drastic overnight overhauls.'
    };
  } else {
    healthStatus = {
      type: 'needs_improvement',
      headline: "Let's improve your routine step-by-step.",
      subtext: 'Several daily habits are currently running below their potential, which can leave you feeling fatigued or stalled.',
      balancedReminder: 'There is no shame or rush here. We will start with small, realistic steps that fit your actual schedule and build momentum naturally.'
    };
  }

  return {
    recommendations,
    top3Priorities,
    nextBestAction,
    healthStatus
  };
}

module.exports = {
  generateRecommendations
};
