// importData.js

const pool = require('../models/database');

/**
 * Seed the database with initial data for RequirementGroups, Requirements, and AnswerTypes.
 */
async function seedDatabase() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Load the initial data from JSON files
    const groupsData = require('./seeds/RequirementsData.json');
    const answerTypesData = require('./seeds/AnswerTypesData.json');
    const studyData = require('./seeds/StudyData.json');

    // Insert a RequirementGroup if it doesn't exist
    const insertRequirementGroup = async (group) => {
      // Check if the group already exists
      const [existingGroup] = await connection.query(
        'SELECT * FROM RequirementGroups WHERE name = ?',
        [group.name]
      );

      if (existingGroup.length === 0) {
        // Insert the group and get the id
        const [groupResult] = await connection.query(
          'INSERT INTO RequirementGroups (name, description) VALUES (?, ?)',
          [group.name, group.description || '']
        );
        console.log(`Inserted group: ${group.name}`);
        const groupId = groupResult.insertId;

        // Prepare and insert requirements
        const requirementsData = group.requirements.map((req) => [
          groupId,
          req.description,
          req.copies_needed,
        ]);
        await connection.query(
          'INSERT INTO Requirements (group_id, description, copies_needed) VALUES ?',
          [requirementsData]
        );
        console.log(`Inserted requirements for group: ${group.name}`);
      } else {
        console.log(`Skipped group (already exists): ${group.name}`);
      }
    };

    // Insert each group
    for (const group of groupsData) {
      await insertRequirementGroup(group);
    }

    // Insert AnswerTypes
    for (const answerType of answerTypesData) {
      const [existingAnswerType] = await connection.query(
        'SELECT * FROM AnswerTypes WHERE description = ?',
        [answerType.description]
      );

      if (existingAnswerType.length === 0) {
        await connection.query(
          'INSERT INTO AnswerTypes (description) VALUES (?)',
          [answerType.description]
        );
        console.log(`Inserted AnswerType: ${answerType.description}`);
      } else {
        console.log(`Skipped AnswerType (already exists): ${answerType.description}`);
      }
    }

    // Insert a StudyCategory if it doesn't exist
    const insertStudyCategory = async (category) => {
      const [existingCategory] = await connection.query(
        'SELECT * FROM StudyCategories WHERE name = ?',
        [category.category]
      );

      if (existingCategory.length === 0) {
        const [categoryResult] = await connection.query(
          'INSERT INTO StudyCategories (name) VALUES (?)',
          [category.category]
        );
        console.log(`Inserted StudyCategory: ${category.category}`);
        const categoryId = categoryResult.insertId;

        // Prepare and insert questions and answers
        for (const question of category.questions) {
          const [questionResult] = await connection.query(
            'INSERT INTO Questions (category_id, question_text) VALUES (?, ?)',
            [categoryId, question.question_text]
          );
          console.log(`Inserted Question: ${question.question_text}`);
          const questionId = questionResult.insertId;

          await connection.query(
            'INSERT INTO Answers (question_id, answer_text, learning_tips, type_id, is_correct) VALUES (?, ?, ?, ?, ?)',
            [questionId, question.answer_text, question.learning_tips, question.type_id, question.is_correct]
          );
          console.log(`Inserted Answer for Question: ${question.question_text}`);
        }
      } else {
        console.log(`Skipped StudyCategory (already exists): ${category.category}`);
      }
    };

    // Insert each category
    for (const category of studyData) {
      await insertStudyCategory(category);
    }

    // Release the connection back to the pool
    connection.release();
    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}

// Run the seed function
seedDatabase();
