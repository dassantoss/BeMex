// controllers/requirementController.js
const Requirement = require('../models/Requirement');

/**
 * Controller for handling requirements-related requests.
 */
module.exports = {
  /**
   * Controller method to handle the GET request for fetching all requirements.
   * Retrieves the requirements data from the model and sends a JSON response.
   * 
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async getRequirements(req, res) {
    try {
      const requirements = await Requirement.getRequirements();
      res.json(requirements);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Más controladores...
};
