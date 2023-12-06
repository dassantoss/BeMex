// models/Exam.js

const pool = require('./database');

const Exam = {
  async getExamQuestions() {
    const query = `
    SELECT q.id as question_id, q.question_text, a.answer_text as correct_answer,
    (
        SELECT GROUP_CONCAT(wrong_a.answer_text ORDER BY RAND() SEPARATOR '|')
        FROM (
            SELECT DISTINCT answer_text
            FROM Answers
            WHERE type_id = a.type_id AND answer_text != a.answer_text
            ORDER BY RAND()
            LIMIT 3
        ) as wrong_a
    ) as wrong_answers
    FROM Questions q
    JOIN Answers a ON q.id = a.question_id
    WHERE a.is_correct = 1 AND a.type_id != 35
    ORDER BY RAND()
    LIMIT 10;
    `;
    const [rows] = await pool.query(query);

    return rows.map(row => {
      const wrongOptions = row.wrong_answers ? row.wrong_answers.split('|') : [];
      const options = shuffleArray([row.correct_answer, ...wrongOptions]);

      // Asegurar que siempre haya cuatro opciones
      if (options.length < 4) {
        // Llenar con placeholders o manejar el error según sea necesario
      }

      return {
        id: row.question_id,
        question_text: row.question_text,
        options: options,
        answer_text: row.correct_answer
      };
    });
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = Exam;
