// controllers/studyController.js
const Study = require('../models/Study');

/**
 * Controller for handling study-related requests.
 */
module.exports = {
  /**
   * Controller method to handle the GET request for fetching all study materials.
   * Retrieves the study materials data from the model and sends a JSON response.
   * 
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async getStudyMaterials(req, res) {
    try {
      console.log('Entró en getStudyMaterials'); // Agrega este console.log
      const studyMaterials = await Study.getStudyMaterials();
      res.json(studyMaterials);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Más controladores...
};
