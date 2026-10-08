/**
 * FitGuide Nutrition Engine
 * Personalized nutrition guidance, macronutrient breakdown, protein sources,
 * and healthy practical food swaps based on dietary preference and goals.
 */

function generateNutritionPlan(userData, calculationResults) {
  const dietPref = (userData.dietPreference || 'Vegetarian').toLowerCase();
  const goal = (userData.primaryGoal || 'Improve overall lifestyle').toLowerCase();
  const mealsPerDay = Number(userData.mealsPerDay) || 3;
  const foodsAvoided = userData.foodsAvoided || '';
  const allergies = userData.allergies || '';
  const macros = calculationResults.macros;
  const targetCalories = calculationResults.targetCalories;
  const strategy = calculationResults.strategy;

  // Curated Protein Sources by Diet Type
  let proteinSources = [];
  if (dietPref.includes('vegan')) {
    proteinSources = [
      { name: 'Organic Tofu & Tempeh', serving: '100g', protein: '15–19g', notes: 'Complete plant protein rich in calcium and isoflavones; versatile for stir-fries and scrambles.' },
      { name: 'Cooked Chickpeas (Chana) & Lentils (Dal)', serving: '1 cup cooked', protein: '14–18g', notes: 'High in prebiotic fiber and complex carbs to stabilize post-prandial blood sugar.' },
      { name: 'Kidney Beans (Rajma) & Black Beans', serving: '1 cup cooked', protein: '15g', notes: 'Rich in dietary iron and magnesium; ideal with whole grains.' },
      { name: 'Soy Chunks / Soya Mince (Textured Pea/Soy Protein)', serving: '50g dry', protein: '26g', notes: 'Extremely high protein density; easily absorbs curries and seasonings.' },
      { name: 'Sprouted Moong & Mixed Sprouts', serving: '1 cup raw', protein: '12g', notes: 'Sprouting significantly increases bioavailability and digestion ease.' },
      { name: 'Hemp Seeds & Chia Seeds', serving: '3 tbsp (30g)', protein: '10g', notes: 'Rich in alpha-linolenic acid (essential plant Omega-3) and magnesium.' }
    ];
  } else if (dietPref.includes('vegetarian')) {
    proteinSources = [
      { name: 'Fresh Paneer (Cottage Cheese)', serving: '100g', protein: '18g', notes: 'High-quality casein protein offering sustained amino acid release; choose low-fat if managing calories.' },
      { name: 'Thick Greek Yogurt / Strained Curd (Dahi)', serving: '1 cup (150g)', protein: '15–18g', notes: 'Abundant in gut-friendly active probiotics and bioavailable calcium.' },
      { name: 'Yellow & Black Dal (Moong, Toor, Urad)', serving: '1 medium bowl', protein: '9–12g', notes: 'Postural staple; pair with rice or roti for a complete amino acid profile.' },
      { name: 'Chickpeas (Kabuli Chana) & Black Chana', serving: '1 cup cooked', protein: '14–15g', notes: 'Sustained energy release with exceptional satiety ratings.' },
      { name: 'Organic Tofu / Soya Chunks', serving: '100g / 50g dry', protein: '16–25g', notes: 'Lean, plant-based protein staple that balances dairy-heavy fat intake.' },
      { name: 'Whole Cow Milk or Fortified Soy Milk', serving: '250ml glass', protein: '8–9g', notes: 'Quick bioavailable liquid protein with essential electrolytes.' },
      { name: 'Sprouted Green Gram (Moong Sprouts)', serving: '1 cup', protein: '12g', notes: 'High enzymatic and micronutrient profile with zero cooking required.' }
    ];
  } else {
    // Non-vegetarian / Flexible
    proteinSources = [
      { name: 'Whole Eggs & Egg Whites', serving: '2 whole eggs + 2 whites', protein: '20g', notes: 'Gold standard biological value protein; rich in choline, lutein, and vitamin D.' },
      { name: 'Skinless Chicken Breast', serving: '100g cooked', protein: '31g', notes: 'Lean, highly digestible complete protein with minimal saturated fat.' },
      { name: 'Fish (Salmon, Rohu, Tilapia, or Tuna)', serving: '100g', protein: '22–26g', notes: 'Abundant in EPA/DHA Omega-3 fatty acids for cardiovascular and joint health.' },
      { name: 'Greek Yogurt / Strained Curd', serving: '150g', protein: '15g', notes: 'Convenient breakfast or snack anchor supporting digestive flora.' },
      { name: 'Paneer / Cottage Cheese', serving: '100g', protein: '18g', notes: 'Sustained slow-digesting casein ideal for evening recovery.' },
      { name: 'Cooked Lentils (Dal) & Chickpeas', serving: '1 cup', protein: '12–15g', notes: 'Essential plant-fiber companion to animal proteins for bowel motility.' }
    ];
  }

  // Smart Food Swaps
  const foodSwaps = [
    {
      category: 'Crunchy Packaged Snacks',
      traditional: 'Deep-fried potato chips or packaged namkeen',
      smartSwap: 'Air-roasted chana (chickpeas) or roasted makhana (foxnuts) seasoned with rock salt & herbs',
      whyBetter: 'Cuts saturated oils by 75% while providing 8g of filling protein and natural fiber instead of empty calories.'
    },
    {
      category: 'Beverages & Soft Drinks',
      traditional: 'Sugary sodas, energy drinks, or sweetened fruit concentrates',
      smartSwap: 'Cold sparkling water with fresh lemon & mint, or unsweetened spiced buttermilk (chaas)',
      whyBetter: 'Prevents immediate 35g liquid sugar spikes while providing natural electrolyte replenishment and gut-friendly lactic cultures.'
    },
    {
      category: 'Afternoon Sweet Craving',
      traditional: 'Packaged pastries, milk chocolate bars, or bakery biscuits',
      smartSwap: 'Crisp apple slices with 1 tbsp natural peanut butter, or 2 dates stuffed with walnut halves',
      whyBetter: 'Combines dietary fiber with healthy unsaturated fats to slow glucose absorption and provide hours of stable energy.'
    },
    {
      category: 'Fried Street Foods & Fast Food',
      traditional: 'Deep-fried samosas, pakoras, or fast-food fries',
      smartSwap: 'Air-fried vegetable & paneer cutlets, or grilled paneer/tofu tikka with fresh mint chutney',
      whyBetter: 'Retains vibrant culinary spice profiles and crisp texture without inflammatory oxidized reuse-oil thermal toxins.'
    },
    {
      category: 'Salad Dressings & Dips',
      traditional: 'Commercial mayonnaise or bottled creamy ranch dressings',
      smartSwap: 'Whisked Greek yogurt seasoned with crushed garlic, lemon juice, black pepper, and extra virgin olive oil',
      whyBetter: 'Replaces processed trans/soybean oils with high-protein probiotics and monounsaturated fatty acids.'
    }
  ];

  // Meal Structure Strategy
  let mealPattern = [];
  if (mealsPerDay === 2) {
    mealPattern = [
      { meal: 'Meal 1 (Late Morning / Brunch)', focus: 'High protein anchor + complex carbohydrates + healthy fats', calories: Math.round(targetCalories * 0.5) },
      { meal: 'Meal 2 (Early Evening / Dinner)', focus: 'High protein + voluminous steamed/roasted vegetables + low-glycemic fiber', calories: Math.round(targetCalories * 0.5) }
    ];
  } else if (mealsPerDay === 4) {
    mealPattern = [
      { meal: 'Breakfast', focus: 'Protein-rich awakening meal (eggs, tofu scramble, or Greek yogurt + berries)', calories: Math.round(targetCalories * 0.25) },
      { meal: 'Lunch', focus: 'Balanced balanced plate: 1/2 vegetables, 1/4 protein, 1/4 whole grains', calories: Math.round(targetCalories * 0.35) },
      { meal: 'Late Afternoon Fuel', focus: 'High-fiber snack (roasted chana, fruit, or protein smoothie)', calories: Math.round(targetCalories * 0.15) },
      { meal: 'Dinner', focus: 'Lean protein + fibrous salad or vegetable soup + moderate carbs', calories: Math.round(targetCalories * 0.25) }
    ];
  } else {
    // 3 meals standard
    mealPattern = [
      { meal: 'Breakfast', focus: 'Protein + slow-burning complex carbs to kickstart cognitive alertness', calories: Math.round(targetCalories * 0.30) },
      { meal: 'Lunch', focus: 'Balanced macronutrient fuel: lean protein, legumes, vibrant greens, and whole grain', calories: Math.round(targetCalories * 0.40) },
      { meal: 'Dinner', focus: 'Light, restorative dinner prioritizing easy-to-digest protein and colorful vegetables', calories: Math.round(targetCalories * 0.30) }
    ];
  }

  // Dietary Cautions / Restrictions
  const safetyNotes = [];
  if (allergies) {
    safetyNotes.push(`Respect recorded dietary restrictions: ${allergies}. Ensure all whole foods match your tolerance.`);
  }
  if (foodsAvoided) {
    safetyNotes.push(`Preferences noted: Avoids ${foodsAvoided}. Swaps prioritize your tailored preferences.`);
  }
  safetyNotes.push('FitGuide provides educational lifestyle nutritional guidelines, not medical diets. Individuals with clinical conditions (such as diabetes, renal disease, or gastrointestinal disorders) should consult a registered clinical dietitian.');

  return {
    dietaryPreference: dietPref.charAt(0).toUpperCase() + dietPref.slice(1),
    targetCalories,
    strategy,
    macros,
    proteinSources,
    foodSwaps,
    mealPattern,
    safetyNotes
  };
}

module.exports = {
  generateNutritionPlan
};
