const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/', assessmentController.createAssessment);
router.get('/latest', assessmentController.getLatestAssessment);
router.get('/history', assessmentController.getAssessmentHistory);
router.get('/:id', assessmentController.getAssessmentById);

module.exports = router;
