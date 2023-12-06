// controllers/examController.js

const Exam = require('../models/Exam');

/**
 * Controller for handling exam-related requests.
 */
module.exports = {
  /**
   * Controller method to handle the GET request for fetching all exam questions.
   * Retrieves the exam questions data from the model and sends a JSON response.
   * 
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async getExamQuestions(req, res) {
    try {
      const questions = await Exam.getExamQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  // Más controladores
};
