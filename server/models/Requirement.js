// models/Requirement.js

const pool = require('./database');

/**
 * Requirement model to handle database operations related to requirements.
 */
const Requirement = {
  /**
   * Retrieves all requirement groups with their respective requirements.
   * This method performs a SQL query to fetch requirement groups and their
   * associated requirements, then transforms the result into a structured JSON format.
   * 
   * @returns {Promise<Array>} A promise that resolves to an array of requirement groups,
   * each with an array of its requirements.
   */
  async getRequirements() {
    const query = `
      SELECT rg.id as group_id, rg.name as group_name, 
             r.id as requirement_id, r.description as requirement_description, r.copies_needed
      FROM RequirementGroups rg 
      LEFT JOIN Requirements r 
      ON rg.id = r.group_id;
    `;
    const [rows] = await pool.query(query);

    // Transform the flat SQL result into a structured JSON format
    const groupedRequirements = rows.reduce((acc, row) => {
      // Initialize the group if not already present
      if (!acc[row.group_id]) {
        acc[row.group_id] = {
          id: row.group_id,
          name: row.group_name,
          requirements: []
        };
      }
      
      // Add requirement to the group if present
      if (row.requirement_id) {
        acc[row.group_id].requirements.push({
          id: row.requirement_id,
          description: row.requirement_description,
          copies_needed: row.copies_needed,
          is_completed: false
        });
      }

      return acc;
    }, {});

    return Object.values(groupedRequirements);
  },
  // more methods
};

module.exports = Requirement;

