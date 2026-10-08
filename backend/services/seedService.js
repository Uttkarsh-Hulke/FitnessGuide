const Article = require('../models/Article');
const ProgressLog = require('../models/ProgressLog');

const defaultArticles = [
  {
    slug: 'understanding-bmi',
    title: 'Understanding BMI: Uses, Limits, and Nuance',
    category: 'Assessment & Metrics',
    readingTime: '4 min read',
    summary: 'Why Body Mass Index is a population-level screening gauge rather than a complete assessment of individual metabolic health.',
    content: `
### What BMI Actually Measures
Body Mass Index (BMI) was created in the 19th century as a simple ratio of weight relative to the square of height. In public health research, it remains useful for tracking broad population-level health trends and identifying statistical correlations with cardiovascular risk.

### The Clear Limitations of BMI
1. **Muscle vs. Adipose Tissue**: Muscle is approximately 18% denser than fat tissue. Muscular athletes often register in the "overweight" or "obese" categories despite having low visceral fat and pristine cardiovascular biomarkers.
2. **Fat Distribution Matters**: Subcutaneous fat (under the skin) carries vastly different health implications compared to visceral fat (surrounding internal abdominal organs). BMI provides zero information on where body mass is deposited.
3. **Bone Density & Skeletal Frame**: People with larger bone structures naturally carry more mass without elevated metabolic hazard.

### How to Use BMI Intelligently
Treat BMI as a preliminary screening prompt. If your BMI falls outside the typical 18.5–24.9 window, pair it with waist circumference, resting heart rate, sleep consistency, strength progression, and blood lipid panels rather than drawing immediate panic-driven conclusions.
    `.trim(),
    keyTakeaways: [
      'BMI is a screening tool, not a clinical diagnostic test.',
      'It cannot differentiate between lean muscle mass and visceral abdominal fat.',
      'Always evaluate body composition, waist circumference, and aerobic fitness alongside scale metrics.'
    ]
  },
  {
    slug: 'why-exercise-matters',
    title: 'Why Exercise Matters: Beyond Simply Burning Calories',
    category: 'Physical Activity',
    readingTime: '5 min read',
    summary: 'Discover how muscular contractions trigger cellular health, brain-derived neurotrophic factor (BDNF), and metabolic flexibility.',
    content: `
### The Misconception of "Working Out Just to Burn Calories"
Many fitness beginners approach workouts strictly as a mathematical calorie burner to "earn" or "burn off" food. This mindset leads to burnout and injury. In reality, structured exercise accounts for only roughly 5–15% of your total daily energy expenditure (TDEE).

### The True Physiological Superpowers of Exercise
- **Glucose Disposal Without Insulin**: When muscles contract, GLUT4 glucose transporters migrate to muscle cell surfaces independently of insulin. This lowers blood glucose immediately and protects pancreatic beta cells.
- **Myokine Secretion**: Contracting skeletal muscle functions as an active endocrine organ, releasing anti-inflammatory signaling proteins called myokines that reduce systemic inflammation.
- **Neuroplasticity & BDNF**: Cardiovascular and resistance training stimulate Brain-Derived Neurotrophic Factor (BDNF), enhancing memory consolidation, neurogenesis, and cognitive focus.
- **Mitochondrial Biogenesis**: Exercise forces cells to grow new, efficient cellular engines (mitochondria), raising baseline energy and stamina throughout your lifespan.
    `.trim(),
    keyTakeaways: [
      'Exercise is a powerful metabolic medicine, not just a calorie-burning tool.',
      'Muscle contraction clears blood glucose directly without straining insulin.',
      'Consistent training stimulates neurogenesis and elevates baseline cognitive vitality.'
    ]
  },
  {
    slug: 'importance-of-sleep',
    title: 'Sleep and Recovery: The Unsung Foundation of Fitness',
    category: 'Recovery & Sleep',
    readingTime: '5 min read',
    summary: 'How sleep architecture governs muscle protein synthesis, cortisol rhythm, and hormonal appetite regulation.',
    content: `
### Training Breaks Down Tissue; Sleep Builds It Back
You do not grow stronger or build muscle while lifting weights in the gym or running on a track; training creates microscopic muscular micro-tears and metabolic stress. It is during Stage 3 Slow-Wave Sleep (Deep Sleep) that the human body releases up to 70% of its daily pulsatile Human Growth Hormone (HGH) to repair tissues and rebuild glycogen stores.

### Sleep Deprivation and Appetite Hormones
Research consistently demonstrates that just 2–3 consecutive nights of restricted sleep (<6 hours) disrupts two primary appetite-regulating hormones:
- **Ghrelin** (the hunger-stimulating hormone) increases by 15–20%.
- **Leptin** (the satiety-signaling hormone) drops significantly.
This physiological imbalance drives intense cravings for hyper-palatable, calorie-dense refined carbohydrates and sugars.

### Practical Sleep Architecture Tips
1. **Light Exposure**: Get 10–15 minutes of outdoor sunlight within an hour of waking to anchor your circadian rhythm.
2. **Thermal Regulation**: Keep your bedroom temperature between 18–20°C (65–68°F).
3. **Caffeine Timing**: Terminate caffeine intake 8–10 hours before sleep to prevent adenosine receptor blockade during deep sleep cycles.
    `.trim(),
    keyTakeaways: [
      'Physical adaptation and tissue remodeling take place predominantly during deep sleep.',
      'Sleep deprivation elevates ghrelin and suppresses leptin, driving intense sugar cravings.',
      'Consistent wake times and morning sunlight exposure solidify your restorative sleep rhythm.'
    ]
  },
  {
    slug: 'strength-vs-cardio',
    title: 'Strength vs. Cardio: Why the Optimal Plan Integrates Both',
    category: 'Training Strategy',
    readingTime: '4 min read',
    summary: 'Stop treating resistance training and aerobic endurance as rivals. Learn how each provides irreplaceable physiological benefits.',
    content: `
### The Historic False Binary
Fitness culture has long pitted resistance training against cardiovascular training. In reality, both stimulate unique, complementary cellular adaptations necessary for long-term healthspan.

### What Resistance Training Delivers
- **Preserves Lean Mass & Resting Metabolic Rate**: Prevents age-related sarcopenia (muscle loss) and bone density degradation (osteopenia).
- **Joint & Tendon Resilience**: Strengthens connective tissues, reducing susceptibility to lower-back pain and posture strains.
- **Physical Autonomy**: Ensures you can carry heavy groceries, lift children, and navigate physical challenges with ease.

### What Cardiovascular Training Delivers
- **Cardiovascular & Endothelial Health**: Increases stroke volume, lowers resting heart rate, and enhances arterial elasticity.
- **Mitochondrial Density**: Improves the density and enzymatic capacity of cellular powerhouses, enabling faster recovery between sets and lower daily fatigue.
- **Longevity Marker**: High cardiorespiratory fitness (VO2 max) correlates strongly with reduced all-cause mortality across scientific literature.

### The Balanced Prescription
Aim for 2–4 resistance training sessions per week combined with 120–150 minutes of conversational Zone 2 low-impact cardio (brisk walking, cycling) and daily non-exercise movement.
    `.trim(),
    keyTakeaways: [
      'Strength training shields against muscle loss, metabolic slowdown, and joint pain.',
      'Cardiovascular training develops heart efficiency, arterial elasticity, and mitochondrial capacity.',
      'The healthiest humans combine structured lifting with regular daily aerobic walking.'
    ]
  },
  {
    slug: 'hydration-truths',
    title: 'Hydration: How Fluid & Electrolyte Balance Drives Performance',
    category: 'Nutrition & Hydration',
    readingTime: '4 min read',
    summary: 'Beyond the generic 8-glasses rule: understand cellular hydration, electrolyte balance, and workout performance.',
    content: `
### Why Hydration Dictates Exercise Capacity
Water constitutes roughly 60% of total adult body mass and up to 75% of skeletal muscle tissue. When you exercise or go about your day dehydrated by as little as 1.5–2% of body mass:
- Blood plasma volume decreases, forcing your heart to beat faster to pump the same volume of oxygenated blood.
- Core body temperature rises more quickly due to reduced sweat efficiency.
- Perceived rate of exertion (RPE) spikes sharply, making ordinary exercises feel grueling.

### Don't Forget Electrolytes
Hydration is not just about drinking distilled water; it is about cellular fluid balance regulated by electrolytes:
- **Sodium**: Maintains extracellular fluid volume and nerve transmission.
- **Potassium**: The primary intracellular electrolyte that works in tandem with sodium to power muscle contractions.
- **Magnesium**: Crucial for muscle relaxation and preventing cramping.

### Daily Practical Strategy
- Drink a tall 350ml glass of room-temperature water immediately upon waking.
- Use urine color as a practical guide: aim for pale straw-colored urine rather than crystal clear (over-diluted) or dark amber (under-hydrated).
    `.trim(),
    keyTakeaways: [
      'A 2% drop in hydration significantly increases cardiovascular strain and perceived exertion.',
      'True hydration requires both fluid volume and balanced dietary minerals (sodium, potassium).',
      'Aim for steady sipping throughout the day rather than chugging liters at night.'
    ]
  },
  {
    slug: 'balanced-nutrition',
    title: 'Balanced Nutrition: Whole Foods Over Extreme Restriction',
    category: 'Nutrition & Diet',
    readingTime: '5 min read',
    summary: 'A sustainable framework for macronutrient distribution, micronutrient density, and eliminating crash diet culture.',
    content: `
### The Trap of Chronic Crash Diets
Severe caloric restriction (<1200 kcal for active adults) or demonizing entire macronutrient classes (e.g., zero carbs or zero fats) produces swift short-term water loss at the expense of lean muscle tissue, metabolic rate down-regulation, and psychological rebound bingeing.

### The 80/20 Whole Food Foundation
Rather than seeking dogmatic perfection, aim for 80% of your daily calories to come from minimally processed, recognizable whole foods:
1. **Protein Anchor**: Include 20–35g of protein per main meal (paneer, tofu, lentils, eggs, chicken, fish) to support muscle repair and trigger satiety hormones like GLP-1 and PYY.
2. **Colorful Fiber**: Cover half your plate with colorful vegetables and whole fruits to supply phytonutrients and prebiotic fibers for a healthy microbiome.
3. **Complex Energy**: Pair proteins with sweet potatoes, brown or basmati rice, oats, or whole grain rotis to fuel workouts steadily.
4. **Essential Fatty Acids**: Add avocados, cold-pressed olive or mustard oils, nuts, and seeds to support steroid hormone synthesis.
    `.trim(),
    keyTakeaways: [
      'Crash diets strip away metabolically active muscle and trigger intense rebound cravings.',
      'Anchor every meal with a quality protein source and unprocessed dietary fiber.',
      'An 80/20 whole-food lifestyle is sustainable for years, not just weeks.'
    ]
  },
  {
    slug: 'sedentary-lifestyle',
    title: 'The Sedentary Desk Trap: Combating the Hidden Health Drain',
    category: 'Lifestyle & Movement',
    readingTime: '4 min read',
    summary: 'Why a 45-minute gym session cannot fully undo 10 hours of motionless sitting, and how to fix it with micro-movements.',
    content: `
### The Active Couch Potato Phenomenon
Researchers use the phrase "active couch potato" to describe individuals who work out for 30–45 minutes in the morning, but spend the remaining 10–12 waking hours seated at a computer, commute, and couch. Studies show that extended static sitting causes muscular enzymes that clear circulating fats and glucose (such as lipoprotein lipase) to drop dramatically within 90 minutes.

### The Power of NEAT (Non-Exercise Activity Thermogenesis)
NEAT comprises all the energy expended for everything we do that is not sleeping, eating, or sports-like exercise: pacing during phone calls, cleaning, walking the dog, using stairs, and moving around the house. NEAT can vary by up to 800 kcal per day between two individuals of identical body weight!

### Practical Workplace Strategies
- **Stand During Phone Calls**: Use calls as an automatic trigger to stand and pace your room.
- **The 50/10 Protocol**: Work for 50 minutes, then stand, stretch your hip flexors, and refill your water for 5 minutes.
- **Micro-Walks After Meals**: A gentle 10-minute walk after lunch or dinner blunts blood glucose spikes by up to 30%.
    `.trim(),
    keyTakeaways: [
      'Continuous uninterrupted sitting blunts metabolic enzymes regardless of gym attendance.',
      'NEAT (everyday unstructured movement) burns far more total energy than short workouts.',
      'Small 5-minute movement snacks throughout the day protect vascular and metabolic health.'
    ]
  },
  {
    slug: 'beginner-fitness-mistakes',
    title: 'Beginner Fitness Mistakes: How to Build Lifelong Adherence',
    category: 'Mindset & Habits',
    readingTime: '5 min read',
    summary: 'Avoid the common traps of over-enthusiasm, unrealistic expectations, and poor recovery that sideline new exercisers.',
    content: `
### Mistake 1: Doing Too Much, Too Fast
When motivation peaks on Day 1, beginners frequently attempt to work out 7 days a week, slash calories in half, and run 5 kilometers. Within 10 days, severe delayed onset muscle soreness (DOMS), joint aches, or sheer exhaustion cause them to quit entirely.
*Fix*: Start with 3 days per week. Leave 1–2 reps in reserve on every exercise set. Make consistency your primary metric.

### Mistake 2: Copying Advanced Influencer Routines
Attempting complex, high-volume splits designed for advanced athletes who have trained for a decade leads to poor movement mechanics and injury.
*Fix*: Master foundational human movement patterns first: the squat, the hip hinge, the horizontal push, the vertical pull, and the carry.

### Mistake 3: Relying on Motivation Instead of Friction-Free Systems
Motivation is a fleeting neurochemical state; habits and environmental friction determine consistency.
*Fix*: Prepare workout clothes the night before, schedule workouts in your digital calendar as immovable appointments, and make the first step laughably easy (e.g., "put on running shoes and step outside").
    `.trim(),
    keyTakeaways: [
      'Consistency at 70% effort beats sporadic bursts of 100% effort that end in burnout.',
      'Focus on mastering compound foundational movement patterns before chasing advanced variety.',
      'Build environmental systems and calendar appointments rather than waiting for motivation.'
    ]
  }
];

async function seedDatabase() {
  try {
    // 1. Seed articles if empty
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      console.log('[Seed] Seeding Knowledge Base articles...');
      await Article.insertMany(defaultArticles);
      console.log(`[Seed] Seeded ${defaultArticles.length} educational articles successfully.`);
    }

    // 2. Seed initial sample progress logs if empty
    const progressCount = await ProgressLog.countDocuments();
    if (progressCount === 0) {
      console.log('[Seed] Seeding realistic sample progress logs for analytics demo...');
      const sampleLogs = [];
      const baseWeight = 74.5;
      const baseScore = 68;

      for (let i = 14; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);

        // Realistic subtle fluctuation
        const weight = Number((baseWeight - (14 - i) * 0.12 + (Math.sin(i) * 0.2)).toFixed(1));
        const water = Number((2.2 + (i % 3 === 0 ? 0.6 : 0.3)).toFixed(1));
        const sleep = Number((6.8 + (Math.cos(i) * 0.5)).toFixed(1));
        const score = Math.min(88, Math.max(62, baseScore + Math.floor((14 - i) * 0.9)));
        const exerciseMins = (i % 2 === 0) ? 40 : (i % 3 === 0 ? 30 : 0);
        const exerciseType = exerciseMins > 0 ? (i % 4 === 0 ? 'Full Body Resistance' : 'Zone 2 Brisk Walk & Mobility') : 'Rest & Recovery Walk';

        sampleLogs.push({
          date: d,
          weightKg: weight,
          exerciseMinutes: exerciseMins,
          exerciseType,
          waterIntakeLiters: water,
          sleepHours: sleep,
          wellnessScore: score,
          notes: i === 0 ? 'Felt energized and well-hydrated today.' : 'Consistent routine.'
        });
      }

      await ProgressLog.insertMany(sampleLogs);
      console.log(`[Seed] Seeded ${sampleLogs.length} historical progress records.`);
    }
  } catch (err) {
    console.error(`[Seed] Error seeding database: ${err.message}`);
  }
}

module.exports = { seedDatabase, defaultArticles };
