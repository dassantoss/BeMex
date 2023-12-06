// models/Study.js

const pool = require('./database');

/**
 * Study model to handle database operations related to study.
 */
const Study = {
  /**
   * Retrieves all study categories with their respective questions and answers.
   * This method performs a SQL query to fetch study categories and their
   * associated questions and answers, then transforms the result into a structured JSON format.
   * 
   * @returns {Promise<Array>} A promise that resolves to an array of study categories,
   * each with an array of its questions, each with an array of its answers.
   */
  async getStudyMaterials() {
    const query = `
      SELECT sc.id as category_id, sc.name as category, q.id as question_id, 
        q.question_text, a.answer_text, a.learning_tips
      FROM StudyCategories sc
      LEFT JOIN Questions q ON sc.id = q.category_id
      LEFT JOIN Answers a ON q.id = a.question_id;
    `;

    const [rows] = await pool.query(query);

    // Transform the flat SQL result into structured JSON
    const structuredData = rows.reduce((acc, row) => {
      // Initialize the category if not already present
      if (!acc[row.category_id]) {
        acc[row.category_id] = {
          category_id: row.category_id,
          category: row.category,
          questions: []
        };
      }
      // Add question and answer to the category if present
      if (row.question_id) {
        acc[row.category_id].questions.push({
          id: row.question_id,
          question_text: row.question_text,
          answer_text: row.answer_text,
          learning_tips: row.learning_tips
        });
      }
      return acc;
    }, {});

    return Object.values(structuredData);
  },
  // more methods
};

module.exports = Study;
