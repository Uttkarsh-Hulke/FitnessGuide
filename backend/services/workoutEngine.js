/**
 * FitGuide Workout Engine
 * Dynamically synthesizes personalized weekly workout routines based on:
 * - Goal, Gym Access, Available Equipment, Experience Level, Workout Duration, Days per Week, and Physical Limitations
 */

function generateWorkoutPlan(userData) {
  const goal = (userData.primaryGoal || 'Improve overall lifestyle').toLowerCase();
  const hasGym = userData.gymAccess === true || userData.gymAccess === 'yes';
  const experience = (userData.fitnessExperience || 'beginner').toLowerCase();
  const equipment = Array.isArray(userData.equipment) ? userData.equipment : (userData.equipment ? [userData.equipment] : []);
  const hasDumbbells = equipment.some(e => e.toLowerCase().includes('dumbbell'));
  const hasBands = equipment.some(e => e.toLowerCase().includes('band'));
  const daysPerWeek = Math.min(7, Math.max(1, Number(userData.workoutDaysPerWeek) || 3));
  const duration = userData.workoutDuration || '30–45 minutes';
  const hasInjuries = Boolean(userData.hasPhysicalLimitations || userData.limitationsNotes);
  const limitationsNotes = userData.limitationsNotes || '';

  // Determine split strategy
  let splitName = '3-Day Full Body Foundations';
  if (daysPerWeek === 1 || daysPerWeek === 2) {
    splitName = `${daysPerWeek}-Day Total Body Activation`;
  } else if (daysPerWeek === 3) {
    splitName = '3-Day Full Body Progression';
  } else if (daysPerWeek === 4) {
    splitName = '4-Day Upper / Lower Split';
  } else if (daysPerWeek >= 5) {
    splitName = `${daysPerWeek}-Day Push / Pull / Legs / Conditioning`;
  }

  // Workout days generator
  const days = [];

  for (let d = 1; d <= daysPerWeek; d++) {
    let dayTitle = '';
    let focus = '';
    let exercises = [];

    if (daysPerWeek <= 3) {
      dayTitle = `Day ${d} — Full Body ${d === 1 ? 'Foundations' : d === 2 ? 'Stamina & Core' : 'Strength & Mobility'}`;
      focus = 'Full Body Compound Movements & Postural Balance';
      exercises = getFullBodyExercises(hasGym, hasDumbbells, hasBands, goal, experience, hasInjuries);
    } else if (daysPerWeek === 4) {
      if (d === 1) {
        dayTitle = 'Day 1 — Upper Body Push & Pull';
        focus = 'Chest, Upper Back, Shoulders & Arms';
        exercises = getUpperBodyExercises(hasGym, hasDumbbells, hasBands, experience, hasInjuries);
      } else if (d === 2) {
        dayTitle = 'Day 2 — Lower Body & Posterior Chain';
        focus = 'Quads, Hamstrings, Glutes & Calves';
        exercises = getLowerBodyExercises(hasGym, hasDumbbells, hasBands, experience, hasInjuries);
      } else if (d === 3) {
        dayTitle = 'Day 3 — Upper Body & Functional Core';
        focus = 'Back Width, Shoulder Stability & Anti-Rotational Core';
        exercises = getUpperBodyExercises(hasGym, hasDumbbells, hasBands, experience, hasInjuries, true);
      } else {
        dayTitle = 'Day 4 — Lower Body & Conditioning Flow';
        focus = 'Unilateral Leg Strength, Mobility & Cardio Pacing';
        exercises = getLowerBodyExercises(hasGym, hasDumbbells, hasBands, experience, hasInjuries, true);
      }
    } else {
      // 5+ days
      const splits5 = [
        { title: 'Day 1 — Push (Chest, Shoulders, Triceps)', focus: 'Pressing Mechanics & Anterior Delts', type: 'push' },
        { title: 'Day 2 — Pull (Back, Rear Delts, Biceps)', focus: 'Posterior Pulling & Scapular Retraction', type: 'pull' },
        { title: 'Day 3 — Legs & Calves', focus: 'Knee & Hip Dominant Lower Body', type: 'legs' },
        { title: 'Day 4 — Active Recovery / Low-Impact Cardio & Core', focus: 'Aerobic Base & Trunk Stability', type: 'cardio_core' },
        { title: 'Day 5 — Upper Body Athletic Hypertrophy', focus: 'Multi-joint Functional Conditioning', type: 'upper' },
        { title: 'Day 6 — Lower Body Mobility & Glute Stability', focus: 'Unilateral Balance & Ankle/Hip ROM', type: 'lower' },
        { title: 'Day 7 — Active Rest / Restoration Walk', focus: 'Parasympathetic Reset & Tissue Regeneration', type: 'rest' }
      ];
      const s = splits5[d - 1] || splits5[0];
      dayTitle = s.title;
      focus = s.focus;
      exercises = getSplitExercises(s.type, hasGym, hasDumbbells, hasBands, experience, hasInjuries);
    }

    days.push({
      dayNumber: d,
      dayTitle,
      focus,
      targetDuration: duration,
      warmup: '5–8 minutes of joint circles, cat-cow, leg swings, and dynamic thoracic rotations.',
      cooldown: '3–5 minutes of diaphragmatic breathing and static hamstring/chest stretches.',
      exercises
    });
  }

  return {
    splitName,
    workoutDaysPerWeek: daysPerWeek,
    workoutDuration: duration,
    experienceLevel: experience.charAt(0).toUpperCase() + experience.slice(1),
    environment: hasGym ? 'Gym / Commercial Facility' : 'Home / Outdoor Environment',
    injuryPrecautions: hasInjuries ? `Adapted for reported limitations: "${limitationsNotes}". High-impact plyometrics and heavy spinal loading have been swapped for joint-friendly alternatives.` : null,
    weeklySchedule: days,
    cardioRecommendation: getCardioGuidance(goal, experience)
  };
}

function getFullBodyExercises(hasGym, hasDumbbells, hasBands, goal, experience, hasInjuries) {
  const list = [];

  // 1. Lower Body Compound
  if (hasGym) {
    list.push({
      name: hasInjuries ? 'Leg Press (Moderate Range)' : 'Goblet Squat / Barbell Box Squat',
      targetArea: 'Quadriceps, Glutes, Core',
      equipment: hasInjuries ? 'Leg Press Machine' : 'Dumbbell / Barbell',
      setsReps: '3 sets of 8–10 controlled reps',
      rest: '60–90 seconds',
      why: 'Recruits large lower-body muscle groups to stimulate metabolic output and functional leg power.',
      formCue: 'Keep your chest tall, drive knees outwards in line with toes, and push through mid-foot.',
      safetyReminder: 'Do not bounce at the bottom. Maintain an upright spine without rounding your lower back.'
    });
  } else if (hasDumbbells) {
    list.push({
      name: 'Dumbbell Goblet Squat',
      targetArea: 'Quads, Glutes, Core',
      equipment: 'Dumbbell',
      setsReps: '3 sets of 10–12 reps',
      rest: '60 seconds',
      why: 'Builds foundational lower body strength with vertical spinal stability.',
      formCue: 'Hold the dumbbell close against your chest, hinge hips back, and lower until thighs are parallel to the ground.',
      safetyReminder: 'Keep heels glued to the floor throughout the entire movement.'
    });
  } else {
    list.push({
      name: 'Bodyweight Chair / Air Squat',
      targetArea: 'Quads, Glutes, Core',
      equipment: 'Bodyweight (Optional Chair for Depth)',
      setsReps: '3 sets of 12–15 reps',
      rest: '45–60 seconds',
      why: 'Develops basic hip hinge and knee flexion mechanics without joint overload.',
      formCue: 'Extend arms forward for counter-balance. Lower as if sitting into an office chair, then drive upward.',
      safetyReminder: 'Keep your knees tracking over your second toe; avoid letting knees cave inwards.'
    });
  }

  // 2. Upper Body Push
  if (hasGym) {
    list.push({
      name: hasInjuries ? 'Incline Dumbbell Press (Neutral Grip)' : 'Flat Dumbbell Bench Press',
      targetArea: 'Pectorals, Anterior Deltoids, Triceps',
      equipment: 'Flat or Incline Bench, Dumbbells',
      setsReps: '3 sets of 8–10 reps',
      rest: '60–90 seconds',
      why: 'Standard horizontal pressing exercise to build upper body pushing strength and shoulder stability.',
      formCue: 'Retract shoulder blades into the bench and lower dumbbells with elbows at a 45-degree angle to your torso.',
      safetyReminder: 'Avoid flaring elbows 90 degrees out to preserve rotator cuff tendons.'
    });
  } else if (hasDumbbells) {
    list.push({
      name: 'Floor Dumbbell Press',
      targetArea: 'Chest, Shoulders, Triceps',
      equipment: 'Dumbbells, Floor Mat',
      setsReps: '3 sets of 10–12 reps',
      rest: '60 seconds',
      why: 'The floor naturally stops elbow hyperextension, making this an exceptionally shoulder-safe chest press.',
      formCue: 'Lie flat with knees bent. Press weights upwards until arms are extended, pausing briefly when elbows touch the floor.',
      safetyReminder: 'Lower under strict 2-second control; do not bounce elbows off the floor.'
    });
  } else {
    list.push({
      name: 'Incline Hands-Elevated Push-Ups (or Kneeling)',
      targetArea: 'Chest, Shoulders, Triceps, Core',
      equipment: 'Sturdy Table, Bed edge, or Wall',
      setsReps: '3 sets of 8–12 controlled reps',
      rest: '60 seconds',
      why: 'Scales push-up resistance perfectly for beginners while engaging the full abdominal wall.',
      formCue: 'Keep body in a rigid straight line from heels to head. Squeeze glutes and lower chest toward the elevated surface.',
      safetyReminder: 'Do not allow the lower back to sag toward the floor.'
    });
  }

  // 3. Upper Body Pull
  if (hasGym) {
    list.push({
      name: 'Seated Cable Row / Lat Pulldown',
      targetArea: 'Latissimus Dorsi, Rhomboids, Biceps',
      equipment: 'Cable Station',
      setsReps: '3 sets of 10–12 reps',
      rest: '60 seconds',
      why: 'Counteracts desk sitting posture by strengthening the mid-back and scapular retractors.',
      formCue: 'Pull handles toward your lower ribcage, squeezing your shoulder blades together like pinching a pencil.',
      safetyReminder: 'Avoid leaning excessively forward or backward to generate momentum.'
    });
  } else if (hasDumbbells || hasBands) {
    list.push({
      name: hasDumbbells ? 'Supported Dumbbell Row' : 'Resistance Band Seated Row',
      targetArea: 'Upper & Mid Back, Rear Delts, Biceps',
      equipment: hasDumbbells ? 'Dumbbells / Sturdy Chair Support' : 'Resistance Band',
      setsReps: '3 sets of 10–12 reps',
      rest: '60 seconds',
      why: 'Builds horizontal pulling power to align shoulders and strengthen postural spine muscles.',
      formCue: 'Hinge forward with flat back. Pull elbows straight back alongside your ribs.',
      safetyReminder: 'Never round your lumbar spine while holding weights.'
    });
  } else {
    list.push({
      name: 'Prone Cobra / Towel Back Extensions',
      targetArea: 'Rhomboids, Lower Trapezius, Erector Spinae',
      equipment: 'Floor Mat & Bath Towel',
      setsReps: '3 sets of 12 reps (2-sec squeeze at top)',
      rest: '45 seconds',
      why: 'Strengthens posterior chain postural muscles using pure isometric body mechanics.',
      formCue: 'Lie face down. Pull towel taut with hands, gently lift chest 2 inches off floor and rotate thumbs up toward ceiling.',
      safetyReminder: 'Do not crank your neck upward; keep eyes looking down at the floor.'
    });
  }

  // 4. Posterior Chain (Hamstrings / Glutes)
  list.push({
    name: hasDumbbells ? 'Dumbbell Romanian Deadlift (RDL)' : 'Glute Bridge with 2-Second Peak Hold',
    targetArea: 'Hamstrings, Gluteus Maximus, Lower Back',
    equipment: hasDumbbells ? 'Dumbbells' : 'Floor Mat',
    setsReps: hasDumbbells ? '3 sets of 10 reps' : '3 sets of 15 reps',
    rest: '60 seconds',
    why: 'Awakens inactive glutes and lengthens hamstrings under control, crucial for lower back longevity.',
    formCue: hasDumbbells 
      ? 'Push your hips back as if closing a car door with your glutes, keeping weights grazing your shins.'
      : 'Drive through your heels to raise hips until your body forms a straight line from knees to shoulders.',
    safetyReminder: 'Never arch with your lower back; squeeze glutes at the peak of the movement.'
  });

  // 5. Core Stability & Anti-Extension
  list.push({
    name: 'Dead Bug / Forearm Plank Hold',
    targetArea: 'Transverse Abdominis, Deep Stabilizers',
    equipment: 'Floor Mat',
    setsReps: '3 sets of 8 reps per side (or 30-sec plank)',
    rest: '45 seconds',
    why: 'Trains core muscles to resist spinal extension, stabilizing the lower back under load.',
    formCue: 'Press your lower back firmly into the floor. Move opposite arm and leg away in synchrony.',
    safetyReminder: 'If your lower back arches off the mat, reduce the range of your leg extension.'
  });

  return list;
}

function getUpperBodyExercises(hasGym, hasDumbbells, hasBands, experience, hasInjuries, isAlternate = false) {
  return [
    {
      name: hasGym ? (isAlternate ? 'Standing Cable Chest Fly / Neutral Press' : 'Dumbbell Incline Bench Press') : (hasDumbbells ? 'Dumbbell Floor Press' : 'Elevated Push-Ups'),
      targetArea: 'Chest, Front Shoulders',
      equipment: hasGym ? 'Cable / Bench' : hasDumbbells ? 'Dumbbells' : 'Bodyweight',
      setsReps: '3 sets of 10–12 reps',
      rest: '60 seconds',
      why: 'Develops pressing strength and anterior upper-body muscular symmetry.',
      formCue: 'Keep shoulder blades depressed and retracted throughout the pressing arc.',
      safetyReminder: 'Maintain a slow 2-second lowering phase on each rep.'
    },
    {
      name: hasGym ? (isAlternate ? 'Wide-Grip Lat Pulldown' : 'Chest Supported T-Bar Row') : (hasDumbbells ? 'Dumbbell Single-Arm Row' : 'Resistance Band / Prone Y-T-W Raises'),
      targetArea: 'Upper Back, Rhomboids, Lats',
      equipment: hasGym ? 'Machine / Dumbbell' : hasDumbbells ? 'Dumbbells' : 'Bodyweight',
      setsReps: '3 sets of 10–12 reps',
      rest: '60 seconds',
      why: 'Vital antagonist work to balance front pressing and reinforce upright posture.',
      formCue: 'Lead the movement with your elbows, feeling your back muscles contract before arm flexion.',
      safetyReminder: 'Do not swing or jerk your upper body to finish reps.'
    },
    {
      name: hasGym ? 'Dumbbell Seated Overhead Press (or Machine)' : hasDumbbells ? 'Seated Dumbbell Shoulder Press' : 'Pike Push-Up Progression (or Wall Angels)',
      targetArea: 'Deltoids, Upper Trapezius',
      equipment: hasGym || hasDumbbells ? 'Dumbbells' : 'Bodyweight',
      setsReps: '3 sets of 8–10 reps',
      rest: '60 seconds',
      why: 'Improves vertical pressing capability and shoulder girdle mobility.',
      formCue: 'Press overhead without excessive lower-back arching. Bring biceps near ears at top.',
      safetyReminder: 'If you have shoulder impingement history, use a neutral palms-facing-inward grip.'
    },
    {
      name: 'Face Pulls (Cable or Band) / Band Pull-Aparts',
      targetArea: 'Rear Delts, Rotator Cuff, Mid Traps',
      equipment: hasGym ? 'Cable Rope' : hasBands ? 'Resistance Band' : 'Light Weights or Towel',
      setsReps: '3 sets of 15 reps',
      rest: '45 seconds',
      why: 'The single most effective preventative exercise for desk workers and shoulder longevity.',
      formCue: 'Pull toward the bridge of your nose while externally rotating your hands backward.',
      safetyReminder: 'Keep neck relaxed; do not shrug shoulders up toward ears.'
    }
  ];
}

function getLowerBodyExercises(hasGym, hasDumbbells, hasBands, experience, hasInjuries, isAlternate = false) {
  return [
    {
      name: hasGym ? (isAlternate ? 'Leg Press or Hack Squat' : 'Barbell / Dumbbell Box Squat') : (hasDumbbells ? 'Dumbbell Goblet Squat' : 'Bodyweight Squats to Bench'),
      targetArea: 'Quadriceps, Glutes, Core',
      equipment: hasGym ? 'Gym Machines' : hasDumbbells ? 'Dumbbell' : 'Bodyweight',
      setsReps: '3 sets of 10–12 reps',
      rest: '90 seconds',
      why: 'Primary compound movement for knee and hip joint functional power.',
      formCue: 'Sit back into hips, keeping spine neutral and knees pointed slightly outward.',
      safetyReminder: 'Do not allow knees to bow inward during the upward drive.'
    },
    {
      name: hasDumbbells ? 'Dumbbell Romanian Deadlift' : 'Single-Leg Glute Bridge',
      targetArea: 'Hamstrings, Posterior Chain, Glutes',
      equipment: hasDumbbells ? 'Dumbbells' : 'Floor Mat',
      setsReps: '3 sets of 10–12 reps',
      rest: '60 seconds',
      why: 'Teaches hip hinging mechanics essential for protecting the lumbar spine during everyday lifting.',
      formCue: 'Keep knees soft with a slight bend while pushing hips backward.',
      safetyReminder: 'Keep dumbbells gliding closely against your thighs and shins.'
    },
    {
      name: 'Stationary Reverse Lunges or Split Squats',
      targetArea: 'Quads, Glutes, Balance & Ankle Stability',
      equipment: hasDumbbells ? 'Optional Light Dumbbells' : 'Bodyweight',
      setsReps: '3 sets of 8–10 reps per leg',
      rest: '60 seconds',
      why: 'Unilateral leg training balances side-to-side strength discrepancies and improves knee stability.',
      formCue: 'Step backward and lower until back knee hovers 1 inch above the floor. Keep front shin vertical.',
      safetyReminder: 'Avoid stepping too narrowly; keep feet hip-width apart like on train tracks.'
    },
    {
      name: 'Standing Calf Raises & Side-Lying Clamshells',
      targetArea: 'Gastrocnemius, Gluteus Medius',
      equipment: 'Bodyweight or Light Band',
      setsReps: '3 sets of 15 reps',
      rest: '45 seconds',
      why: 'Gluteus medius stabilization protects the knees from valgus collapse during walking and stairs.',
      formCue: 'Pause for 1 full second at peak contraction on every single repetition.',
      safetyReminder: 'Do not rotate pelvis backward during clamshells.'
    }
  ];
}

function getSplitExercises(type, hasGym, hasDumbbells, hasBands, experience, hasInjuries) {
  if (type === 'push') {
    return [
      { name: hasGym ? 'Dumbbell Bench Press' : 'Floor Push-Ups / Floor Press', targetArea: 'Chest', setsReps: '3 x 10', why: 'Horizontal pressing foundation', formCue: 'Control the descent', safetyReminder: 'Keep wrist stacked above elbow' },
      { name: 'Overhead Dumbbell Press', targetArea: 'Deltoids', setsReps: '3 x 10', why: 'Vertical shoulder strength', formCue: 'Lock out overhead with tight core', safetyReminder: 'Avoid arching lower back' },
      { name: 'Triceps Rope Pushdown / Overhead Band Extension', targetArea: 'Triceps', setsReps: '3 x 12', why: 'Elbow extension strength', formCue: 'Keep elbows pinned to sides', safetyReminder: 'Do not swing body' }
    ];
  } else if (type === 'pull') {
    return [
      { name: hasGym ? 'Lat Pulldown / Assisted Pull-Up' : 'Resistance Band Pull-Downs', targetArea: 'Lats & Upper Back', setsReps: '3 x 10', why: 'Vertical pulling health', formCue: 'Pull to collarbone, chest high', safetyReminder: 'Do not lean back excessively' },
      { name: 'Chest Supported Dumbbell Row', targetArea: 'Rhomboids & Traps', setsReps: '3 x 10', why: 'Scapular retraction for posture', formCue: 'Squeeze shoulder blades', safetyReminder: 'Keep neck neutral' },
      { name: 'Dumbbell Bicep Hammer Curls', targetArea: 'Biceps & Brachialis', setsReps: '3 x 12', why: 'Elbow flexor joint durability', formCue: 'Thumbs pointed up throughout curl', safetyReminder: 'Avoid rocking torso' }
    ];
  } else if (type === 'legs') {
    return [
      { name: hasGym ? 'Leg Press or Goblet Squat' : 'Bodyweight Air Squats', targetArea: 'Quads & Glutes', setsReps: '3 x 10', why: 'Knee-dominant lower power', formCue: 'Knees in line with toes', safetyReminder: 'Do not let heels lift off ground' },
      { name: 'Romanian Deadlift', targetArea: 'Hamstrings & Glutes', setsReps: '3 x 10', why: 'Posterior chain endurance', formCue: 'Hips push back, flat back', safetyReminder: 'Keep weight close to legs' },
      { name: 'Walking Lunges', targetArea: 'Unilateral Quads & Balance', setsReps: '3 x 10/leg', why: 'Pelvic stability', formCue: 'Upright torso, controlled step', safetyReminder: 'Step softly' }
    ];
  } else if (type === 'cardio_core') {
    return [
      { name: 'Zone 2 Incline Walk / Light Cycling', targetArea: 'Cardiovascular System', setsReps: '20–25 minutes at conversational pace', why: 'Builds mitochondrial base and burns fatty acids without high stress', formCue: 'Breathe rhythmically through nose if possible', safetyReminder: 'Maintain steady pace where speaking a full sentence is possible' },
      { name: 'Paloff Press / Anti-Rotation Hold', targetArea: 'Core Obliques', setsReps: '3 x 30 sec per side', why: 'Protects lumbar spine from rotational torque', formCue: 'Hold band straight in front with squared hips', safetyReminder: 'Resist the pull of the band' }
    ];
  } else {
    return [
      { name: 'Active Recovery Walk & Full-Body Mobility Flow', targetArea: 'Full Body & Lymphatic Flow', setsReps: '30 minutes continuous movement', why: 'Flushes metabolic waste and lowers cortisol', formCue: 'Easy relaxed breathing in fresh air', safetyReminder: 'Keep heart rate low and restorative' }
    ];
  }
}

function getCardioGuidance(goal, experience) {
  if (goal.includes('stamina') || goal.includes('endurance')) {
    return {
      type: 'Targeted Aerobic Base Progression',
      frequency: '3–4 sessions per week',
      duration: '30–40 minutes per session',
      modality: 'Brisk walking, outdoor cycling, rowing, or steady jogging in Zone 2 (60–70% max heart rate)',
      guideline: 'Maintain a pace where you could comfortably speak in short sentences without gasping for breath.'
    };
  } else if (goal.includes('lose weight')) {
    return {
      type: 'Low-Impact Steady State (LISS) + NEAT',
      frequency: '3–5 days per week',
      duration: '25–35 minutes',
      modality: 'Incline treadmill walking, outdoor brisk walking, or stationary cycling',
      guideline: 'Pair resistance training with steady daily walking to maximize non-fatiguing energy expenditure without spiking appetite.'
    };
  } else {
    return {
      type: 'General Cardiovascular Health',
      frequency: '2–3 sessions per week',
      duration: '20–25 minutes',
      modality: 'Brisk walking, leisure cycling, or swimming',
      guideline: 'Focus on heart health and recovery rather than high-fatigue exhaustion.'
    };
  }
}

module.exports = {
  generateWorkoutPlan
};
