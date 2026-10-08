/**
 * FitGuide Lifestyle Engine
 * Practical lifestyle optimization strategies:
 * - "Small Changes, Big Difference" actionable tips
 * - Sleep architecture & circadian rhythm protocol
 * - Hydration pacing guidelines
 * - Sedentary break strategies
 */

function generateLifestylePlan(userData) {
  const sittingHours = Number(userData.sittingHours) || 8;
  const sleepHours = Number(userData.sleepHours) || 7;
  const waterLiters = Number(userData.waterIntakeLiters) || 2;

  // "Small Changes, Big Difference" actionable tips
  const smallChanges = [
    {
      title: 'Take the Stairs for Trips Under 4 Floors',
      description: 'Climbing stairs engages your quadriceps, glutes, and calves while boosting heart rate instantaneously.',
      whyItWorks: 'Just 3 short bouts of 20-second stair climbs per day improve cardiorespiratory fitness in sedentary adults.'
    },
    {
      title: 'Practice the 50/10 Movement Rule',
      description: `With your reported ${sittingHours} hours of sitting, stand and move for 5–10 minutes after every 50 minutes of seated desk work.`,
      whyItWorks: 'Interrupting sitting preserves endothelial vascular dilation in your leg arteries and clears blood glucose.'
    },
    {
      title: 'Walk Destinations Under 1 Kilometer',
      description: 'Whenever weather and safety permit, opt for walking short errands rather than driving or hailing a cab.',
      whyItWorks: 'Accumulates non-exercise activity thermogenesis (NEAT) effortlessly without mental fatigue.'
    },
    {
      title: 'Keep a Dedicated 1L Water Bottle Visible',
      description: 'Visual cues trigger drinking habits without relying on delayed thirst sensations.',
      whyItWorks: 'Mild dehydration reduces cognitive vigilance and triggers false hunger signals.'
    },
    {
      title: 'Anchor Meals with 1 Whole Fruit or Vegetable Serving',
      description: 'Ensure at least half your plate or every midday snack features vibrant raw or steamed produce.',
      whyItWorks: 'Soluble and insoluble fiber feeds beneficial microbiome bacteria and slows glycemic absorption.'
    },
    {
      title: 'Protect Your Sleep Anchor Window',
      description: 'Wake up at the same hour every morning within a 30-minute window, even on weekends.',
      whyItWorks: 'Fixed wake times lock your circadian pacemaker, regulating evening melatonin secretion timing.'
    },
    {
      title: 'Choose Movement Modalities You Genuinely Enjoy',
      description: 'Exercise does not have to be miserable burpees. Dancing, badminton, swimming, or brisk nature walks are outstanding.',
      whyItWorks: 'Enjoyment is the single greatest predictor of 12-month exercise adherence.'
    }
  ];

  // Sleep Optimization Protocol
  const sleepProtocol = {
    currentDuration: `${sleepHours} hours`,
    recommendedDuration: '7 to 8.5 hours',
    status: sleepHours < 6.5 ? 'Requires Attention' : sleepHours > 9 ? 'Monitor Energy' : 'Optimal Window',
    pillars: [
      {
        name: 'Morning Light Influx',
        action: 'View outdoor natural sunlight for 10–15 minutes within 45 minutes of waking to set your circadian cortisol peak.'
      },
      {
        name: 'Caffeine Cutoff',
        action: 'Stop caffeine consumption 8 to 10 hours prior to your target bedtime (caffeine has a 5–7 hour half-life).'
      },
      {
        name: 'Digital Sunset',
        action: 'Dim ambient overhead room lights and disable high-stimulus digital feeds 45 minutes before sleep.'
      },
      {
        name: 'Cool Sleeping Chamber',
        action: 'Core body temperature needs to drop ~1°C to initiate deep slow-wave sleep. Keep your bedroom comfortably cool.'
      }
    ]
  };

  // Hydration Pacing Schedule
  const hydrationSchedule = {
    dailyTarget: `${Math.max(2.5, (waterLiters + 0.5).toFixed(1))} Liters`,
    pacing: [
      { time: 'Upon Waking (7:00 AM)', amount: '350 – 500 ml', purpose: 'Rehydrates tissues following overnight respiratory moisture loss.' },
      { time: 'Mid-Morning (10:30 AM)', amount: '500 ml', purpose: 'Maintains blood volume and prevents midday brain fog.' },
      { time: 'Lunch & Early Afternoon (1:30 PM)', amount: '500 ml', purpose: 'Aids digestive enzyme motility (sip slowly during meals).' },
      { time: 'Late Afternoon (4:30 PM)', amount: '500 ml', purpose: 'Prevents sluggish afternoon energy slumps often mistaken for sugar hunger.' },
      { time: 'Evening & Dinner (7:30 PM)', amount: '250 – 350 ml', purpose: 'Hydrates without inducing disruptive nighttime bladder awakenings.' }
    ]
  };

  return {
    smallChanges,
    sleepProtocol,
    hydrationSchedule
  };
}

module.exports = {
  generateLifestylePlan
};
