# FitGuide — Intelligent Personal Fitness & Lifestyle Assessment Platform

FitGuide is a production-quality, full-stack fitness and lifestyle assessment web application. Designed with the aesthetics and rigor of a modern health-tech SaaS product, FitGuide moves far beyond generic advice by implementing **deterministic metabolic calculations**, an **explainable 7-pillar wellness scoring system**, and a **rule-based recommendation engine** that reasons directly from user inputs.

---

## 🌟 Key Features & Architecture

### 1. Deterministic Biometric & Caloric Calculators
- **BMI (Body Mass Index)**: Calculated as $\frac{\text{weight (kg)}}{(\text{height (m)})^2}$ with interactive visual gauge positioning, classification bands, and an explicit disclaimer framing BMI as an epidemiological screening indicator rather than a complete measure of individual health.
- **BMR (Basal Metabolic Rate)**: Formulated using the clinically validated **Mifflin-St Jeor equation**:
  - **Male**: $10W + 6.25H - 5A + 5$
  - **Female**: $10W + 6.25H - 5A - 161$
  - **Other / Neutral**: $10W + 6.25H - 5A - 78$
- **TDEE (Total Daily Energy Expenditure)**: Evaluated through activity multipliers (Sedentary: 1.2, Lightly active: 1.375, Moderately active: 1.55, Very active: 1.725) refined with weekly workout frequency.
- **Goal-Calibrated Target Calories & Macronutrients**: Tailored energy balance for Fat Loss (moderate sustainable deficit), Muscle Hypertrophy (controlled lean surplus), Healthy Weight Gain, Pure Strength, or Maintenance, paired with protein, carbohydrate, and healthy fat distributions.

### 2. FitGuide Wellness Score (0–100)
A rule-based educational index evaluating seven physiological pillars:
1. **BMI Health Range** (15 points)
2. **Exercise Consistency & Routine** (20 points)
3. **Daily Physical Activity & Sedentary Mitigation** (15 points)
4. **Sleep Duration & Circadian Recovery** (15 points)
5. **Nutrition & Food Quality** (15 points)
6. **Hydration Habits** (10 points)
7. **Goal & Lifestyle Alignment** (10 points)

### 3. Explainable Recommendation Engine
Every recommendation strictly adheres to the schema:
$$\text{USER INPUT} \longrightarrow \text{ANALYSIS} \longrightarrow \text{CONDITION} \longrightarrow \text{WHY IT MATTERS} \longrightarrow \text{WHAT YOU CAN DO}$$
- **Top 3 Priorities**: Dynamically ranked to highlight the three highest-leverage improvements without cognitive overload. Each priority specifies the reason, recommended action, and a simple first step.
- **"Your Next Best Action"**: A high-visibility hero card identifying the single most immediate, achievable habit modification.
- **Adaptive Tone**: Respectful, non-judgmental guidance for individuals with low baseline habits, and nuanced reminders for users already in good ranges that health requires ongoing consistency.

### 4. Personalized Exercise Programming
- **Adaptive Splits**: 3-day Full Body Foundations, 4-day Upper/Lower splits, or 5-day athletic routines.
- **Equipment & Location Aware**: Dynamically switches between commercial gym movements and home/outdoor bodyweight and dumbbell alternatives.
- **Exercise Detail Cards**: Displays Target Area, Why Recommended, Beginner-Friendly Form Cue, Safety/Joint Reminder, and Rest Times.
- **Injury Guardrail**: When injuries or physical limitations are reported, high-impact plyometrics and axial spinal loading are safely replaced with joint-friendly movements alongside physician consultation reminders.

### 5. Nutrition Personalization & Smart Food Swaps
- **Diet-Specific Protein Anchors**: Curated whole foods reflecting cultural preferences:
  - *Vegetarian*: Paneer, Greek yogurt/curd, Dal, Chana, Rajma, Tofu, Sprouts.
  - *Non-Vegetarian*: Eggs, Chicken breast, Fish, Paneer, Dal, Curd.
  - *Vegan*: Tofu, Tempeh, Soya chunks, Lentils, Chickpeas, Hemp/chia seeds.
- **Smart Food Swaps**: Practical craving upgrades (e.g., deep-fried chips $\to$ roasted chana/makhana, sugary sodas $\to$ lemon-infused sparkling water or spiced buttermilk).

### 6. Progress Tracking & Analytics
- Log daily body weight, exercise minutes, water intake, sleep hours, and personal notes.
- Dynamic **Recharts** visualizations:
  - Body Weight Trend line chart.
  - FitGuide Wellness Score progression.
  - Daily Exercise Duration bar chart.
  - Sleep Duration vs. Recommended Target.
- Full historical assessment viewer to compare past assessment evaluations.

### 7. Evidence-Based Knowledge Base
Interactive library of concise educational guides:
- *Understanding BMI: Uses, Limits, and Nuance*
- *Why Exercise Matters: Beyond Simply Burning Calories*
- *Sleep and Recovery: The Unsung Foundation of Fitness*
- *Strength vs. Cardio: Why the Optimal Plan Integrates Both*
- *Hydration Truths: Cellular Fluid & Electrolyte Dynamics*
- *Balanced Nutrition: Whole Foods Over Extreme Restriction*
- *The Sedentary Desk Trap: Combating the Hidden Health Drain*
- *Beginner Fitness Mistakes: How to Build Lifelong Adherence*

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18
  - Vite 6
  - Tailwind CSS 3.4
  - Lucide React (clean health-tech iconography)
  - Recharts 2 (smooth responsive charts)
- **Backend**:
  - Node.js 22
  - Express 4
  - Mongoose 8
  - MongoDB 8 (local or cloud cluster)
  - CORS, Morgan logging, Dotenv
- **Design System**:
  - Strict 8px spacing grid
  - Emerald / Teal primary palette (`#059669`, `#0d9488`)
  - Slate secondary & neutral surface hierarchy
  - Subtle 200–300ms transitions (zero distracting floating/bouncing elements)

---

## 🚀 Getting Started

### Prerequisites
1. **Node.js** (v18.0.0 or higher)
2. **MongoDB** (running locally on port 27017 or a MongoDB Atlas URI)

### 1. Installation
Clone or navigate to the project directory:
```bash
cd FitnessGuide
npm run install:all
```

### 2. Environment Configuration
The backend comes pre-configured with `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/fitguide
NODE_ENV=development
```

### 3. Running the Application

#### Option A: Run Full Stack Concurrently
```bash
npm run dev
```
- Backend starts at: `http://localhost:5000`
- Frontend development server starts at: `http://localhost:5173`

#### Option B: Run Unified Production Server
The Express server is configured to serve the production-built Vite frontend directly:
```bash
npm start
```
Open **`http://localhost:5000`** in your browser.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status & database connection state |
| `POST` | `/api/assessments` | Evaluates biometrics, runs calculation engines, and persists assessment |
| `GET` | `/api/assessments/latest` | Retrieves most recent completed assessment |
| `GET` | `/api/assessments/history` | Retrieves list of all past assessments |
| `GET` | `/api/assessments/:id` | Retrieves assessment by ID |
| `GET` | `/api/progress` | Fetches chronological progress logs for charts |
| `POST` | `/api/progress` | Logs daily weight, exercise, water, and sleep |
| `GET` | `/api/articles` | Retrieves all educational articles |
| `GET` | `/api/articles/:slug` | Retrieves single article by slug |

---

## 🛡️ Medical Disclaimer
FitGuide provides general fitness and wellness information for educational purposes. It does not diagnose medical conditions or replace advice from a qualified healthcare professional. Always consult a physician before beginning any strenuous physical exercise program or making drastic dietary modifications.
