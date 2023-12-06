// routes/studyRoutes.js
const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');

/**
 * Routes for study-related API endpoints.
 * Here, all study-related routes are defined and linked with their respective controllers.
 */
router.get('/study-materials', studyController.getStudyMaterials);

module.exports = router;
