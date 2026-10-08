const ProgressLog = require('../models/ProgressLog');

let memoryLogs = [];

exports.getProgressLogs = async (req, res) => {
  try {
    let logs = [];
    try {
      logs = await ProgressLog.find().sort({ date: 1 }).limit(60);
    } catch (dbErr) {
      console.warn('[ProgressController] DB error, using memory logs.');
      logs = [...memoryLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (logs.length === 0 && memoryLogs.length > 0) {
      logs = memoryLogs;
    }

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    console.error('[ProgressController] Error fetching progress logs:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProgressLog = async (req, res) => {
  try {
    const {
      weightKg,
      exerciseMinutes,
      exerciseType,
      waterIntakeLiters,
      sleepHours,
      wellnessScore,
      notes,
      date
    } = req.body;

    const parsedWeight = Number(weightKg);
    if (isNaN(parsedWeight) || parsedWeight < 30 || parsedWeight > 300) {
      return res.status(400).json({ success: false, message: 'Please enter a valid weight between 30 and 300 kg.' });
    }

    const logEntry = {
      date: date ? new Date(date) : new Date(),
      weightKg: parsedWeight,
      exerciseMinutes: Math.max(0, Number(exerciseMinutes) || 0),
      exerciseType: exerciseType || 'General Movement',
      waterIntakeLiters: Math.max(0, Number(waterIntakeLiters) || 2.0),
      sleepHours: Math.max(0, Number(sleepHours) || 7.0),
      wellnessScore: Math.min(100, Math.max(0, Number(wellnessScore) || 75)),
      notes: notes || '',
      createdAt: new Date()
    };

    let saved = null;
    try {
      saved = await ProgressLog.create(logEntry);
    } catch (dbErr) {
      console.warn('[ProgressController] DB create failed, saving to memory fallback.');
      logEntry._id = 'mem_log_' + Date.now();
      saved = logEntry;
      memoryLogs.push(logEntry);
    }

    return res.status(201).json({
      success: true,
      message: 'Progress recorded successfully.',
      data: saved
    });
  } catch (error) {
    console.error('[ProgressController] Error creating progress log:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
