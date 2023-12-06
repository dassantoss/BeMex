// routes/requirementsRoutes.js
const express = require('express');
const router = express.Router();
const requirementController = require('../controllers/requirementController');

/**
 * Routes for requirement-related API endpoints.
 * Here, all requirement-related routes are defined and linked with their respective controllers.
 */
router.get('/requirements', requirementController.getRequirements);

module.exports = router;
