// initializeDatabase.js

// Require the pool from database.js
const pool = require('../models/database');
const fs = require('fs');
const path = require('path');

const initializeDatabase = async () => {
  try {
    // Read the content of the SQL file
    const sql = fs.readFileSync(path.join(__dirname, 'setup_bemexdb.sql'), 'utf8');
    const statements = sql.split(/;\s*$/m); // Split into individual statements
    
    // Get a connection from the pool
    const connection = await pool.getConnection();
    
    // Execute each SQL statement
    for (const statement of statements) {
      if (statement.trim().length > 0) {
        await connection.query(statement);
      }
    }

    // Release the connection back to the pool
    connection.release();
    console.log('Database has been successfully initialized');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

// Execute the main function
initializeDatabase();
