const mongoose = require('mongoose');

const ProgressLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  weightKg: { type: Number, required: true },
  exerciseMinutes: { type: Number, default: 0 },
  exerciseType: { type: String, default: 'General Activity' },
  waterIntakeLiters: { type: Number, default: 2.0 },
  sleepHours: { type: Number, default: 7.0 },
  wellnessScore: { type: Number, default: 75 },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressLog', ProgressLogSchema);
