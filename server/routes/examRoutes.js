// routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

/**
 * Routes for exam-related API endpoints.
 * Here, all exam-related routes are defined and linked with their respective controllers.
 */
router.get('/exam-questions', examController.getExamQuestions);

module.exports = router;
